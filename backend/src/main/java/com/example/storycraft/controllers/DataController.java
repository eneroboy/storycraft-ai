package com.example.storycraft.controllers;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/data")
public class DataController {

    private final Path rootLocation = Paths.get("./backend");
    private final Path imagesLocation = Paths.get("./backend/images");

    @GetMapping("/images/{filename:.+}")
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        System.out.println(imagesLocation);
        try {

            Path file = imagesLocation.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG) // or determine type dynamically
                        .body(resource);
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    private final Path audiobooksLocation = Paths.get("./backend/audiobooks");

    @GetMapping("/audiobooks/{filename:.+}")
    public ResponseEntity<Resource> serveAudiobook(@PathVariable String filename, @RequestHeader(value = "Range", required = false) String rangeHeader) {
        try {
            Path file = audiobooksLocation.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                long fileLength = Files.size(file);

                if (rangeHeader == null || !rangeHeader.startsWith("bytes=")) {
                    return ResponseEntity.ok()
                            .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_OCTET_STREAM_VALUE)
                            .header(HttpHeaders.CONTENT_LENGTH, String.valueOf(fileLength))
                            .body(resource);
                }

                String rangeValue = rangeHeader.replace("bytes=", "");
                long rangeStart = 0;
                long rangeEnd = fileLength - 1;

                if (rangeValue.startsWith("-")) {
                    rangeStart = fileLength - 1 - Long.parseLong(rangeValue.substring(1));
                } else if (rangeValue.endsWith("-")) {
                    rangeStart = Long.parseLong(rangeValue.substring(0, rangeValue.length() - 1));
                } else {
                    String[] range = rangeValue.split("-");
                    rangeStart = Long.parseLong(range[0]);
                    rangeEnd = Long.parseLong(range[1]);
                }

                if (rangeStart > rangeEnd || rangeEnd >= fileLength) {
                    return ResponseEntity.status(HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE)
                            .header(HttpHeaders.CONTENT_RANGE, "bytes */" + fileLength)
                            .build();
                }

                long rangeLength = rangeEnd - rangeStart + 1;

                return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_OCTET_STREAM_VALUE)
                        .header(HttpHeaders.CONTENT_LENGTH, String.valueOf(rangeLength))
                        .header(HttpHeaders.CONTENT_RANGE, "bytes " + rangeStart + "-" + rangeEnd + "/" + fileLength)
                        .body(new UrlResource(file.toUri()) {
                            @Override
                            public long contentLength() throws IOException {
                                return rangeLength;
                            }

                            @Override
                            public Resource createRelative(String relativePath) throws MalformedURLException {
                                return this;
                            }

                            @Override
                            public long lastModified() throws IOException {
                                return Files.getLastModifiedTime(file).toMillis();
                            }
                        });
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        } catch (IOException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }
}
