package com.example.storycraft.models;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignUp {

    @NotEmpty
    private String name;
    @NotEmpty
    private String email;
    @NotEmpty
    private char[] password;
    private MultipartFile photo;
}