package com.example.storycraft.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/kafka")
public class KafkaController {

//    @Autowired
//    private KafkaTemplate<String, Object> kafkaTemplate;
//
//    @PostMapping("/publish")
//    public String publishMessage(@RequestBody Map<String, Object> message) {
//        System.out.println("Message: " + message);
//        kafkaTemplate.send("audiobook-creation", message);
//        return "Message sent to Kafka topic";
//    }

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @PostMapping("/publish")
    public String publishMessage(@RequestBody Map<String, String> message) {
        String bookId = message.get("bookId");
        String voiceModelId = message.get("voiceModelId");
        String userId = message.get("userId");

        String formattedMessage = bookId + "," + voiceModelId + "," + userId;
        kafkaTemplate.send("audiobook-creation", formattedMessage);

        return "Message published successfully";
    }
}
