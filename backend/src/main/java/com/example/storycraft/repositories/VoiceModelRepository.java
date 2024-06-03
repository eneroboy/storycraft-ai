package com.example.storycraft.repositories;
import com.example.storycraft.models.VoiceModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VoiceModelRepository extends JpaRepository<VoiceModel, Long> {
    List<VoiceModel> findByUserId(Long userId);
    VoiceModel findById(long id);
}
