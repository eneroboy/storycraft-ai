package com.example.storycraft.controllers;

import com.example.storycraft.services.AudiobookService;
import com.example.storycraft.services.UserService;
import com.example.storycraft.services.VoiceModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/audiobooks")
public class AudioBookController {

    @Autowired
    private VoiceModelService voiceModelService;

    @Autowired
    private AudiobookService audiobookService;

    @Autowired
    private UserService userService;

//    @PostMapping
//    public addAudioBook(){
//
//    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getAudioBooksByUserId(@PathVariable Long id) {
        return ResponseEntity.ok(audiobookService.getAudiobooksByUserId(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAudioBookById(@PathVariable Long id) {
        return ResponseEntity.ok(audiobookService.getAudiobookById(id));
    }
}
