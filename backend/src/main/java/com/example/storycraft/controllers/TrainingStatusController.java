//package com.example.storycraft.controllers;
//
//import com.example.storycraft.services.TrainingStatusService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/training-status")
//public class TrainingStatusController {
//
//    @Autowired
//    private TrainingStatusService trainingStatusService;
//
//    @GetMapping
//    public ResponseEntity<?> getTrainingStatus() {
//        return ResponseEntity.ok(trainingStatusService.getTrainingStatus());
//    }
//}

package com.example.storycraft.controllers;

import com.example.storycraft.services.TrainingStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/training-status")
public class TrainingStatusController {

    @Autowired
    private TrainingStatusService trainingStatusService;

    @GetMapping
    public ResponseEntity<?> getTrainingStatus() {
        return ResponseEntity.ok(trainingStatusService.getTrainingStatus());
    }

    @PostMapping("/shown")
    public ResponseEntity<?> setShownStatus(@RequestBody Map<String, Boolean> request) {
        boolean shown = request.getOrDefault("shown", false);
        trainingStatusService.setShownStatus(shown);
        return ResponseEntity.ok().build();
    }
}
