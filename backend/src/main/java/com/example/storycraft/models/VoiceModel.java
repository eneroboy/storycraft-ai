package com.example.storycraft.models;
import jakarta.persistence.*;

@Entity
@Table(name = "voicemodels")
public class VoiceModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "voice_name", length = 255)
    private String voiceName;

    @Column(name = "voice_language", length = 50)
    private String voiceLanguage;

    @Column(name = "voice_avatar_path")
    private String voiceAvatarPath;

    @Column(name = "record_id")
    private Integer recordId;

    @Column(name = "voice_method")
    private String voiceMethod;

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public String getVoiceName() {
        return voiceName;
    }

    public String getVoiceLanguage() {
        return voiceLanguage;
    }

    public String getVoiceAvatarPath() {
        return voiceAvatarPath;
    }

    public Integer getRecordId() {
        return recordId;
    }

    public String getVoiceMethod() {
        return voiceMethod;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setVoiceName(String voiceName) {
        this.voiceName = voiceName;
    }

    public void setVoiceLanguage(String voiceLanguage) {
        this.voiceLanguage = voiceLanguage;
    }

    public void setVoiceAvatarPath(String voiceAvatarPath) {
        this.voiceAvatarPath = voiceAvatarPath;
    }

    public void setRecordId(Integer recordId) {
        this.recordId = recordId;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setVoiceMethod(String voiceMethod) {
        this.voiceMethod = voiceMethod;
    }
}
