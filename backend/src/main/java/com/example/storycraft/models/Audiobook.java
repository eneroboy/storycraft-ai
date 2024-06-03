package com.example.storycraft.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "audiobooks")
public class Audiobook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @ManyToOne
    @JoinColumn(name = "voicemodel_id", nullable = false)
    private VoiceModel voicemodel;

    @Column(name = "audiobook_file_path", nullable = false)
    private String audiobookFilePath;

    @Column(name = "audiobook_created_at", columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime audiobookCreatedAt;

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Book getBook() {
        return book;
    }

    public VoiceModel getVoicemodel() {
        return voicemodel;
    }

    public String getAudiobookFilePath() {
        return audiobookFilePath;
    }

    public LocalDateTime getAudiobookCreatedAt() {
        return audiobookCreatedAt;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public void setVoicemodel(VoiceModel voicemodel) {
        this.voicemodel = voicemodel;
    }

    public void setAudiobookFilePath(String audiobookFilePath) {
        this.audiobookFilePath = audiobookFilePath;
    }

    public void setAudiobookCreatedAt(LocalDateTime audiobookCreatedAt) {
        this.audiobookCreatedAt = audiobookCreatedAt;
    }
}
