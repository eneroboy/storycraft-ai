//package com.example.storycraft.kafka;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.stereotype.Service;
//
//@Service
//public class KafkaConsumer {
//
////    @Autowired
////    private SimpMessagingTemplate messagingTemplate;
//
//    @KafkaListener(topics = "note_shared", groupId = "your-group-id")
//    public void consume(String message) {
//        System.out.println("Consumed message: " + message);
//        String[] parts = message.split(":");
//        String userId = parts[0];
//        String noteMessage = parts[1];
//        System.out.println("User ID: " + userId);
//        System.out.println("Note Message: " + noteMessage);
//
////        messagingTemplate.convertAndSend("/topic/notes/" + userId, noteMessage);
//    }
//}
