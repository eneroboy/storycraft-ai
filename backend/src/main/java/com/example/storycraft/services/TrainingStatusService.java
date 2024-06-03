package com.example.storycraft.services;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class TrainingStatusService {

    private boolean isTrainingCompleted = false;
    private String trainingMessage = "";

    public Map<String, Object> getTrainingStatus() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", isTrainingCompleted ? "completed" : "in-progress");
        response.put("message", trainingMessage);
        return response;
    }

    public void setTrainingStatus(boolean isCompleted, String message) {
        this.isTrainingCompleted = isCompleted;
        this.trainingMessage = message;
    }
}
