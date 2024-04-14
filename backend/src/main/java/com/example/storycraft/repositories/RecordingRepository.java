package com.example.storycraft.repositories;
import com.example.storycraft.models.Recording;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordingRepository extends JpaRepository<Recording, Integer> {
    Object findByUserId(Long userId);
}
