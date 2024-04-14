package com.example.storycraft.services;
import com.example.storycraft.models.Recording;
import com.example.storycraft.repositories.RecordingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class RecordingService {

    private final RecordingRepository recordingRepository;

    @Autowired
    public RecordingService(RecordingRepository recordingRepository) {
        this.recordingRepository = recordingRepository;
    }

    @Transactional
    public Integer addRecord(Recording record) {
        Recording savedRecord = recordingRepository.save(record);
        return savedRecord.getId();
    }

    public Recording getRecordById(int recordId) {
        Optional<Recording> record = recordingRepository.findById(recordId);
        return record.orElse(null);
    }

    public Object getRecordsByUserId(Long userId) {
        return recordingRepository.findByUserId(userId);
    }
}
