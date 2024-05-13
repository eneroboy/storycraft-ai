package com.example.storycraft.mappers;

import com.example.storycraft.dtos.UserDto;
import com.example.storycraft.models.SignUp;
import com.example.storycraft.models.User;
import com.example.storycraft.models.UserRole;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mappings({
            @Mapping(source = "id", target = "id"),
            @Mapping(source = "name", target = "name"),
            @Mapping(source = "email", target = "email"),
            @Mapping(source = "createdAt", target = "createdAt"),
            @Mapping(source = "lastLogin", target = "lastLogin"),
            @Mapping(source = "photoPath", target = "photoPath"),
            @Mapping(source = "userRoles", target = "roles", qualifiedByName = "rolesFromUserRoles"),
            // Nie mapujemy hasła dla bezpieczeństwa
            @Mapping(target = "password", ignore = true)
    })
    UserDto userToUserDto(User user);

    @Named("rolesFromUserRoles")
    default Set<String> mapRolesFromUserRoles(Set<UserRole> userRoles) {
        if (userRoles == null) {
            return null;
        }
        return userRoles.stream()
                .map(userRole -> userRole.getRole().getRoleName())  // Zakładam, że istnieje getRoleName()
                .collect(Collectors.toSet());
    }


    // Mapowanie przy zakładaniu konta
    @Mapping(target = "password", ignore = true)
    @Mappings({
            @Mapping(source = "email", target = "email"),
            @Mapping(source = "name", target = "name")
//            @Mapping(source = "password", target = "password"), // Można zmapować hasło przy zakładaniu konta
//            @Mapping(target = "createdAt", ignore = true),
//            @Mapping(target = "lastLogin", ignore = true),
//            @Mapping(target = "photoPath", ignore = true),
//            @Mapping(target = "id", ignore = true),
//            @Mapping(target = "userRoles", ignore = true)
    })
    User userDtoToUser(SignUp signUp);
}
