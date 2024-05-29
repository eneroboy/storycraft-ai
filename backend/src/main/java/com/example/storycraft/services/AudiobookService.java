package com.example.storycraft.services;

import com.example.storycraft.models.Audiobook;
import com.example.storycraft.repositories.AudiobookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AudiobookService {

    private final AudiobookRepository audiobookRepository;

    @Autowired
    public AudiobookService(AudiobookRepository audiobookRepository) {
        this.audiobookRepository = audiobookRepository;
    }

    public Audiobook addAudiobook(Audiobook audiobook) {
        return audiobookRepository.save(audiobook);
    }

    public Audiobook updateAudiobook(Long id, Audiobook updatedAudiobook) {
        return audiobookRepository.findById(id).map(audiobook -> {
            audiobook.setVoicemodel(updatedAudiobook.getVoicemodel());
            audiobook.setAudiobookDuration(updatedAudiobook.getAudiobookDuration());
            audiobook.setUser(updatedAudiobook.getUser());
            audiobook.setBook(updatedAudiobook.getBook());
            audiobook.setAudiobookFilePath(updatedAudiobook.getAudiobookFilePath());
            return audiobookRepository.save(audiobook);
        }).orElseThrow(() -> new RuntimeException("Audiobook not found"));
    }

    public void deleteAudiobook(Long id) {
        audiobookRepository.deleteById(id);
    }

    public Audiobook getAudiobookById(Long id) {
        return audiobookRepository.findById(id).orElseThrow(() -> new RuntimeException("Audiobook not found"));
    }

    public List<Audiobook> getAudiobooksByUserId(Long userId) {
        return audiobookRepository.findByUserId(userId);
    }

    public List<Audiobook> getAudiobooksByBookId(Long bookId) {
        return audiobookRepository.findByBookId(bookId);
    }

    public List<Audiobook> getAudiobooksByVoicemodelId(Long voicemodelId) {
        return audiobookRepository.findByVoicemodelId(voicemodelId);
    }

    public List<Audiobook> getAllAudiobooks() {
        return audiobookRepository.findAll();
    }
}
