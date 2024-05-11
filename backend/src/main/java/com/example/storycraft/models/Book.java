package com.example.storycraft.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "book_name", nullable = false, length = 255)
    private String bookName;

    @Column(name = "book_author", length = 255)
    private String bookAuthor;

    @Column(name = "book_language", length = 50)
    private String bookLanguage;

    @Column(name = "book_file_path")
    private String bookFilePath;

    @Column(name = "book_photo_path")
    private String bookPhotoPath;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @Column(name = "book_description")
    private String bookDescription;

    @Column(name = "book_categories")
    private String bookCategories;

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public String getBookName() {
        return bookName;
    }

    public String getBookAuthor() {
        return bookAuthor;
    }

    public String getBookLanguage() {
        return bookLanguage;
    }

    public String getBookFilePath() {
        return bookFilePath;
    }

    public String getBookPhotoPath() {
        return bookPhotoPath;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public String getBookDescription() {
        return bookDescription;
    }

    public String getBookCategories() {
        return bookCategories;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public void setBookAuthor(String bookAuthor) {
        this.bookAuthor = bookAuthor;
    }

    public void setBookLanguage(String bookLanguage) {
        this.bookLanguage = bookLanguage;
    }

    public void setBookFilePath(String bookFilePath) {
        this.bookFilePath = bookFilePath;
    }

    public void setBookPhotoPath(String bookPhotoPath) {
        this.bookPhotoPath = bookPhotoPath;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setBookDescription(String bookDescription) {
        this.bookDescription = bookDescription;
    }

    public void setBookCategories(String bookCategories) {
        this.bookCategories = bookCategories;
    }
}
