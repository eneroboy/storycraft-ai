package com.example.storycraft.controllers;


import com.example.storycraft.models.VoiceModel;
import com.example.storycraft.services.VoiceModelService;
import com.example.storycraft.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/voicemodels")
public class VoiceModelsController {

    @Autowired
    private VoiceModelService voiceModelService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> addVoiceModel(
            @RequestParam("userId") String userId,
            @RequestParam("title") String title,
            @RequestParam("language") String language,
            @RequestParam("photo") MultipartFile photo,
            @RequestParam("method") String method
    ) {
        try {
            String fileNameExtension = photo.getOriginalFilename().substring(photo.getOriginalFilename().lastIndexOf("."));
            String fileName = userId + "_" + System.currentTimeMillis() + fileNameExtension;
            System.out.println(fileName);
             Path path = Paths.get("./backend/images/" + fileName);
             Files.copy(photo.getInputStream(), path);

            VoiceModel voiceModel = new VoiceModel();
            voiceModel.setUser(userService.getUserById(Long.parseLong(userId)));
            voiceModel.setVoiceName(title);
            voiceModel.setVoiceLanguage(language);
            voiceModel.setVoiceAvatarPath("http://localhost:8080/api/data/images/" + fileName);
            voiceModel.setVoiceMethod(method);
            return ResponseEntity.ok().body(voiceModelService.addVoiceModel(voiceModel));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to add voice model");
        }
    };

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getVoiceModelsByUserId(@PathVariable Long id) {
        return ResponseEntity.ok(voiceModelService.getVoiceModelsByUserId(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getVoiceModelById(@PathVariable Long id) {
        return ResponseEntity.ok(voiceModelService.getVoiceModelById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateVoiceModel(
            @PathVariable Long id,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "language", required = false) String language,
            @RequestParam(value = "photo", required = false) MultipartFile photo,
            @RequestParam(value = "method", required = false) String method,
            @RequestParam("recordId") Integer recordId
    ) {
        try {
            VoiceModel voiceModel = voiceModelService.getVoiceModelById(id);
            if (title != null) {voiceModel.setVoiceName(title);}
            if (language != null) {voiceModel.setVoiceLanguage(language);}
            if (method != null) {voiceModel.setVoiceMethod(method);}

            if (photo != null) {
                String fileNameExtension = photo.getOriginalFilename().substring(photo.getOriginalFilename().lastIndexOf("."));
                String fileName = id + "_" + System.currentTimeMillis() + fileNameExtension;
                System.out.println(fileName);
                Path path = Paths.get("./backend/images/" + fileName);
                Files.copy(photo.getInputStream(), path);
                voiceModel.setVoiceAvatarPath("http://localhost:8080/api/data/images/" + fileName);
            }
            if (recordId != null) {voiceModel.setRecordId(recordId);}
            return ResponseEntity.ok().body(voiceModelService.updateVoiceModel(id, voiceModel));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to update voice model");
        }
    }
}
