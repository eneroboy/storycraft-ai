//package com.example.storycraft.services;
//
//import org.springframework.stereotype.Service;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@Service
//public class TrainingStatusService {
//
//    private final Map<String, Object> trainingStatus = new HashMap<>();
//
//    public TrainingStatusService() {
//        // Initialize with a default status
//        trainingStatus.put("status", "idle");
//        trainingStatus.put("message", "No training in progress");
//    }
//
//    public Map<String, Object> getTrainingStatus() {
//        return trainingStatus;
//    }
//
//    public void setTrainingStatus(boolean completed, String message) {
//        trainingStatus.put("status", completed ? "completed" : "in_progress");
//        trainingStatus.put("message", message);
//    }
//}

package com.example.storycraft.services;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class TrainingStatusService {

    private final Map<String, Object> trainingStatus = new HashMap<>();

    public TrainingStatusService() {
        // Initialize with a default status
        trainingStatus.put("status", "idle");
        trainingStatus.put("message", "No training in progress");
        trainingStatus.put("shown", false);
    }

    public Map<String, Object> getTrainingStatus() {
        return trainingStatus;
    }

    public void setTrainingStatus(boolean completed, String message) {
        trainingStatus.put("status", completed ? "completed" : "in_progress");
        trainingStatus.put("message", message);
        if (completed) {
            trainingStatus.put("shown", false); // Reset shown status on completion
        }
    }

    public void setShownStatus(boolean shown) {
        trainingStatus.put("shown", shown);
    }
}
