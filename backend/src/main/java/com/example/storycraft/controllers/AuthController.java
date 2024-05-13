package com.example.storycraft.controllers;
import com.example.storycraft.configs.UserAuthenticationProvider;
import com.example.storycraft.dtos.UserDto;
import com.example.storycraft.models.Credentials;
import com.example.storycraft.models.SignUp;
import com.example.storycraft.models.User;
import com.example.storycraft.repositories.UserRepository;
import com.example.storycraft.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final UserAuthenticationProvider userAuthenticationProvider;

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody @Valid Credentials credentialsDto) {
        System.out.println(credentialsDto);
        UserDto userDto = userService.login(credentialsDto);
        System.out.println(userDto);

        userDto.setToken(userAuthenticationProvider.createToken(userDto));
        System.out.println(userDto.getToken());

        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid SignUp user) {
        System.out.println(user.getPassword());
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        UserDto createdUser = userService.register(user);
        createdUser.setToken(userAuthenticationProvider.createToken(createdUser));
        return ResponseEntity.created(URI.create("/users/" + createdUser.getId())).body(createdUser);
    }

}