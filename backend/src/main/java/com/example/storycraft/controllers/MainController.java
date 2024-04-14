package com.example.storycraft.controllers;
import com.example.storycraft.models.Book;
import com.example.storycraft.models.Recording;
import com.example.storycraft.models.User;
import com.example.storycraft.models.VoiceModel;
import com.example.storycraft.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class MainController {

    @Autowired
    private UserService userService;

    @Autowired
    private BookService bookService;

    @Autowired
    private RecordingService recordingService;

    @Autowired
    private VoiceModelService voiceModelService;


    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PostMapping("/users")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.addUser(user));
    }

    @GetMapping("/books/{userId}")
    public ResponseEntity<?> getBooksByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(bookService.getBooksByUserId(userId));
    }

    @PostMapping("/books")
    public ResponseEntity<?> addBook(@RequestBody Book book) {
        return ResponseEntity.ok(bookService.addBook(book));
    }

    @GetMapping("/records/{userId}")
    public ResponseEntity<?> getRecordsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(recordingService.getRecordsByUserId(userId));
    }

    @PostMapping("/records")
    public ResponseEntity<?> addRecord(@RequestBody Recording record) {
        return ResponseEntity.ok(recordingService.addRecord(record));
    }

    @GetMapping("/voicemodels/{userId}")
    public ResponseEntity<?> getVoiceModelsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(voiceModelService.getVoiceModelsByUserId(userId));
    }

    @PostMapping("/voicemodels")
    public ResponseEntity<?> addVoiceModel(@RequestBody VoiceModel voiceModel) {
        return ResponseEntity.ok(voiceModelService.addVoiceModel(voiceModel));
    }
}
