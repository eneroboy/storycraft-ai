package com.example.storycraft.controllers;
import com.example.storycraft.models.Recording;
import com.example.storycraft.models.User;
import com.example.storycraft.services.RecordingService;
import com.example.storycraft.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sound.sampled.AudioFileFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.UnsupportedAudioFileException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/records")
public class RecordController {

        @Autowired
        private RecordingService recordingService;

        @Autowired
        private UserService userService;


        @PostMapping
        public ResponseEntity<?> addRecord(
                @RequestParam("audio") MultipartFile file,
                @RequestParam("userId") Long userId,
                @RequestParam("duration") float duration,
                @RequestParam("language") String language,
                @RequestParam("text") String text,
                @RequestParam("number_of_words") int numberOfWords) {
            try {

                String fileNameExtension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
                String fileName = System.currentTimeMillis() + fileNameExtension;
                System.out.println(fileName);
                Path path = Paths.get("./backend/records/" + fileName);
                Files.copy(file.getInputStream(), path);

                Recording record = new Recording();
                User user = userService.getUserById(userId);
                record.setUser(user);
                record.setRecordFilePath("http://localhost:8080/api/data/records/" + fileName);
                record.setRecordDuration(duration);
                record.setRecordLanguage(language);
                record.setRecordTextFilePath(text);
                record.setNumberOfWordsInRecord(numberOfWords);
                Integer recordId = recordingService.addRecord(record);

                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("recordId", recordId);
                return ResponseEntity.ok().body(response);
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.badRequest().body(Collections.singletonMap("success", false));
            }
        }


        @GetMapping("/{id}")
        public ResponseEntity<?> getRecordById(@PathVariable int id) {
            return ResponseEntity.ok(recordingService.getRecordById(id));
        }

        @GetMapping("/user/{id}")
        public ResponseEntity<?> getRecordsByUserId(@PathVariable Long id) {
            return ResponseEntity.ok(recordingService.getRecordsByUserId(id));
        }
}
