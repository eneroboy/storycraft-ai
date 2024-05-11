package com.example.storycraft.models;

import jakarta.persistence.*;
import org.hibernate.annotations.Type;

import java.time.Duration;
import java.time.LocalDateTime;

@Entity
@Table(name = "recordings")
public class Recording {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "record_text_file_path")
    private String recordTextFilePath;

    @Column(name = "number_of_words_in_record")
    private Integer numberOfWordsInRecord;

    @Column(name = "record_duration")
    private String recordDuration;

    @Column(name = "record_file_path")
    private String recordFilePath;

    @Column(name = "record_language", length = 50)
    private String recordLanguage;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public String getRecordTextFilePath() {
        return recordTextFilePath;
    }

    public Integer getNumberOfWordsInRecord() {
        return numberOfWordsInRecord;
    }

    public String getRecordDuration() {
        return recordDuration;
    }

    public String getRecordFilePath() {
        return recordFilePath;
    }

    public String getRecordLanguage() {
        return recordLanguage;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setRecordTextFilePath(String recordTextFilePath) {
        this.recordTextFilePath = recordTextFilePath;
    }

    public void setNumberOfWordsInRecord(Integer numberOfWordsInRecord) {
        this.numberOfWordsInRecord = numberOfWordsInRecord;
    }

    public void setRecordDuration(String recordDuration) {
        this.recordDuration = recordDuration;
    }

    public void setRecordFilePath(String recordFilePath) {
        this.recordFilePath = recordFilePath;
    }

    public void setRecordLanguage(String recordLanguage) {
        this.recordLanguage = recordLanguage;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
