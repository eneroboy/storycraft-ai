package com.example.storycraft.services;

import com.example.storycraft.models.*;
import javazoom.jl.decoder.Bitstream;
import javazoom.jl.decoder.Header;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Path;
import java.nio.file.Paths;


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

    @Autowired
    private UserService userService;

    public KafkaConsumerService(TrainingStatusService trainingStatusService) {
        this.trainingStatusService = trainingStatusService;
    }

    @KafkaListener(topics = "audiobook-creation", groupId = "group_id")
    public void consumeMessage(String message) throws IOException {

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

        User user = userService.getUserById(Long.parseLong(userId));

        String textFilePath = book.getBookFilePath();
        String audioFilePath = record.getRecordFilePath();
        String textFileName = "./backend/books/" + textFilePath.substring(textFilePath.lastIndexOf("/") + 1);
        String audioFileName = "./backend/records/" + audioFilePath.substring(audioFilePath.lastIndexOf("/") + 1);
        String outputFilePath = "./backend/audiobooks/" + userId + "_" + System.currentTimeMillis() + "_" + voiceModel.getVoiceName() + ".mp3";

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
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Error executing Python script");
            trainingStatusService.setTrainingStatus(true, "Error executing Python script");
        } catch (InterruptedException e) {
            e.printStackTrace();
            Thread.currentThread().interrupt();
            System.out.println("Script execution was interrupted");
            trainingStatusService.setTrainingStatus(true, "Script execution was interrupted");
        }

        String linkPath = outputPath.toString().substring(outputPath.toString().lastIndexOf("\\") + 1);
        Audiobook audiobook = new Audiobook();
        audiobook.setAudiobookFilePath("http://localhost:8080/api/data/audiobooks/" + linkPath);
        audiobook.setBook(book);
        audiobook.setVoicemodel(voiceModel);
        audiobook.setUser(user);

        String filePath = "./backend/audiobooks/" + linkPath;
        Path filePathPath = Paths.get(filePath).normalize().toAbsolutePath();
        System.out.println("MP3 File Path: " + filePathPath);
        System.out.println("MP3 File Path: " + filePath);
        try {
            int durationInSeconds = getMp3Duration(filePathPath.toString());
            System.out.println("MP3 Duration: " + durationInSeconds + " seconds");

        } catch (Exception e) {
            e.printStackTrace();
        }
        audiobook.setAudiobookDuration(50);
        audioBookService.addAudiobook(audiobook);
    }

    public static int getMp3Duration(String filePath) throws IOException {
        try (FileInputStream fileInputStream = new FileInputStream(filePath)) {
            Bitstream bitstream = new Bitstream(fileInputStream);
            Header header = bitstream.readFrame();
            int totalFrames = 0;
            int totalDuration = 0;

            while (header != null) {
                totalFrames++;
                totalDuration += header.ms_per_frame();
                bitstream.closeFrame();
                header = bitstream.readFrame();
            }

            return totalDuration / 1000; // Convert milliseconds to seconds
        } catch (Exception e) {
            throw new IOException("Error reading MP3 file", e);
        }
    }
}
