package com.example.storycraft.services;
import com.example.storycraft.models.VoiceModel;
import com.example.storycraft.repositories.VoiceModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class VoiceModelService {

    private final VoiceModelRepository voiceModelRepository;

    @Autowired
    public VoiceModelService(VoiceModelRepository voiceModelRepository) {
        this.voiceModelRepository = voiceModelRepository;
    }

    @Transactional
    public VoiceModel addVoiceModel(VoiceModel voiceModel) {
        return voiceModelRepository.save(voiceModel);
    }

    public List<VoiceModel> getVoiceModelsByUserId(Long userId) {
        return voiceModelRepository.findByUserId(userId);
    }
}
