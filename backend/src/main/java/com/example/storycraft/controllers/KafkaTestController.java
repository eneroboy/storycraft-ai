//package com.example.storycraft.controllers;
//
//import com.example.storycraft.kafka.KafkaProducer;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/kafkatest")
//public class KafkaTestController {
//    @Autowired
//    private KafkaProducer kafkaProducer;
//
//    public KafkaTestController(KafkaProducer kafkaProducer) {
//        this.kafkaProducer = kafkaProducer;
//    }
//
//    @GetMapping("/send")
//    public String sendMessage() {
//        kafkaProducer.sendMessage("note_shared", "Hello:Kafka");
//        System.out.println("Message sent to Kafka");
//        return "Message sent to Kafka";
//    }
//
//}
