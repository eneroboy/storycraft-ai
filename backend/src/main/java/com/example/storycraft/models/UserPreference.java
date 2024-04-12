package com.example.storycraft.models;

import jakarta.persistence.*;

@Entity
@Table(name = "userpreferences")
public class UserPreference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(columnDefinition = "jsonb")
    private String preferences;

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public String getPreferences() {
        return preferences;
    }

    public void setPreferences(String preferences) {
        this.preferences = preferences;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
