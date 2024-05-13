package com.example.storycraft.services;
import com.example.storycraft.dtos.UserDto;
import com.example.storycraft.exceptions.AppException;
import com.example.storycraft.mappers.UserMapper;
import com.example.storycraft.models.Credentials;
import com.example.storycraft.models.SignUp;
import com.example.storycraft.models.User;
import com.example.storycraft.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

//    @Autowired
//    public UserService(UserRepository userRepository, UserMapper userMapper) {
//        this.userRepository = userRepository;
//        this.userMapper = userMapper;
//    }

    @Transactional
    public User addUser(User user) {
        return userRepository.save(user);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

//    public User getUserByEmail(String email) {
//        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
//    }

    public UserDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new Error("User not found"));
        //Hibernate.initialize(user.getUserRoles());
        return userMapper.userToUserDto(user);
    }

    @Transactional
    public User updateUser(Long id, String name, String email, String password, String photoPath) {
        User user = getUserById(id);
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);
        user.setPhotoPath(photoPath);
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public UserDto login(Credentials credentialsDto) {
        System.out.println("getLogin: "+credentialsDto.getEmail());
        User user = userRepository.findByEmail(credentialsDto.getEmail())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        System.out.println("getUser: "+user.getEmail());

        if (bCryptPasswordEncoder.matches(new String(credentialsDto.getPassword()), user.getPassword())) {
            return userMapper.userToUserDto(user);
        }
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public UserDto register(SignUp userDto) {
        Optional<User> optionalUser = userRepository.findByEmail(userDto.getEmail());

        if (optionalUser.isPresent()) {
            throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
        }


        User user = userMapper.userDtoToUser(userDto);
//        user.setRole(UserRole.normal);

        user.setPassword(bCryptPasswordEncoder.encode(new String(userDto.getPassword())));

        // Save the user
        User savedUser = userRepository.save(user);

        return userMapper.userToUserDto(savedUser);
    }
}
