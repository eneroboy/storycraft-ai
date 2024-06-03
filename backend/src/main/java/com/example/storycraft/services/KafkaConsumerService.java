package com.example.storycraft.services;

import com.example.storycraft.models.Audiobook;
import com.example.storycraft.models.Book;
import com.example.storycraft.models.Recording;
import com.example.storycraft.models.VoiceModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

@Service
public class KafkaConsumerService {

    private final TrainingStatusService trainingStatusService;

    @Autowired
    private BookService bookService;

    @Autowired
    private VoiceModelService voiceModelService;

    @Autowired
    private RecordingService recordService;

    @Autowired
    private AudiobookService audioBookService;

    public KafkaConsumerService(TrainingStatusService trainingStatusService) {
        this.trainingStatusService = trainingStatusService;
    }

    @KafkaListener(topics = "audiobook-creation", groupId = "group_id")
    public void consumeMessage(String message) {

        System.out.println("Message received: " + message);
        // Reset status before starting new training
        trainingStatusService.setTrainingStatus(false, "Training in progress...");

        String[] parts = message.split(",");
        String bookId = parts[0];
        String voiceModelId = parts[1];
        String userId = parts[2];

        Book book = bookService.getBookById(Long.parseLong(bookId));

        VoiceModel voiceModel = voiceModelService.getVoiceModelById(Long.parseLong(voiceModelId));
        Integer recordId = voiceModel.getRecordId();

        Recording record = recordService.getRecordById(recordId);

        String textFilePath = book.getBookFilePath();
        String audioFilePath = record.getRecordFilePath();
        String textFileName = "./backend/books/" + textFilePath.substring(textFilePath.lastIndexOf("/") + 1);
        String audioFileName = "./backend/records/" + audioFilePath.substring(audioFilePath.lastIndexOf("/") + 1);
        String outputFilePath = "./backend/audiobooks/test.wav";

        Path textPath = Paths.get(textFileName).normalize().toAbsolutePath();
        Path audioPath = Paths.get(audioFileName).normalize().toAbsolutePath();
        Path outputPath = Paths.get(outputFilePath).normalize().toAbsolutePath();

        System.out.println("Text path: " + textPath + ", Audio path: " + audioPath + ", Output path: " + outputPath);

        String pythonPath = "E:\\sem6\\ZTPAI\\TTS\\venv_tts\\Scripts\\python.exe";
        ProcessBuilder processBuilder = new ProcessBuilder(
                pythonPath, "E:\\sem6\\ZTPAI\\storycraft-ai\\backend\\src\\main\\java\\com\\example\\storycraft\\tts\\coqui-ai-api.py", textPath.toString(), audioPath.toString(), outputPath.toString());

        try {
            Process process = processBuilder.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            process.waitFor();
            trainingStatusService.setTrainingStatus(true, "Training completed successfully");

            String linkPath = "" + textPath.toString().substring(textFilePath.lastIndexOf("/") + 1);
            Audiobook audiobook = audioBookService.addAudiobook(new Audiobook());
            audiobook.setAudiobookFilePath("http://localhost:8080/api/data/audiobooks/" + linkPath);
            audiobook.setBook(book);
            audiobook.setVoicemodel(voiceModel);
            audioBookService.addAudiobook(audiobook);
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Error executing Python script");
        } catch (InterruptedException e) {
            e.printStackTrace();
            Thread.currentThread().interrupt();
            System.out.println("Script execution was interrupted");
        }
    }
}
