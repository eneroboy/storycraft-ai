package com.example.storycraft.auth;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {
    private String password;
    private String email;
}

