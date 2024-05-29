package com.example.storycraft.repositories;

import com.example.storycraft.models.Audiobook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AudiobookRepository extends JpaRepository<Audiobook, Long> {
    List<Audiobook> findByUserId(Long userId);
    List<Audiobook> findByBookId(Long bookId);
    List<Audiobook> findByVoicemodelId(Long voicemodelId);
}
