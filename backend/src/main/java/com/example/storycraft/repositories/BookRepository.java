package com.example.storycraft.repositories;
import com.example.storycraft.models.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByUserId(Long userId);

    Book findById(long id);

    @Transactional
    @Modifying
    @Query("UPDATE Book b SET b.bookName = ?2, b.bookAuthor = ?3, b.bookCategories = ?4, b.bookDescription = ?5, b.bookPhotoPath = ?6, b.bookLanguage = ?7, b.bookFilePath = ?8 WHERE b.id = ?1")
    void editBook(@Param("bookId") Long bookId, @Param("title") String title, @Param("author") String author, @Param("categories") String categories, @Param("description") String description, @Param("coverPath") String coverPath, @Param("language") String language, @Param("filePath") String filePath);
   }
