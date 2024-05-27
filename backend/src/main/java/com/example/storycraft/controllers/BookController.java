//package com.example.storycraft.controllers;
//
//import org.springframework.data.repository.cdi.Eager;
//import org.springframework.http.HttpStatus;
//import com.example.storycraft.models.Book;
//import org.springframework.http.ResponseEntity;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//import com.example.storycraft.services.BookService;
//
//@RestController
//@RequestMapping("/books")
//public class BookController {
//    @Autowired
//    private BookService bookService;
//
//    @GetMapping
//    public ResponseEntity<?> getAllBooks() {
//        return ResponseEntity.ok(bookService.getAllBooks());
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<?> getBookById(@PathVariable Long id) {
//        return ResponseEntity.ok(bookService.getBookById(id));
//    }
//
//    @PostMapping
//    public ResponseEntity<?> addBook(@RequestBody Book book) {
//        return ResponseEntity.ok(bookService.addBook(book));
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<?> updateBook(@PathVariable Long id, @RequestBody Book book) {
//        return ResponseEntity.ok(bookService.updateBook(id, book));
//    }
//
//    @GetMapping("/user/{id}")
//    public ResponseEntity<?> getBooksByUserId(@PathVariable Long id) {
//        return ResponseEntity.ok(bookService.getBooksByUserId(id));
//    }
//}

package com.example.storycraft.controllers;

import com.example.storycraft.models.Book;
import com.example.storycraft.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping
    public ResponseEntity<?> getAllBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBookById(@PathVariable Long id) {
        return ResponseEntity.ok(bookService.getBookById(id));
    }

    @PostMapping
    public ResponseEntity<?> addBook(
            @RequestParam("title") String title,
            @RequestParam("author") String author,
            @RequestParam("category") String category,
            @RequestParam("language") String language,
            @RequestParam("description") String description,
            @RequestParam("photo") MultipartFile photo,
            @RequestParam("textFile") MultipartFile textFile
    ) {
        try {
            String coverPath = saveFile(photo, "./backend/images/", "images");
            String textFilePath = saveFile(textFile, "./backend/books/", "books");

            Book book = new Book();
            book.setBookName(title);
            book.setBookAuthor(author);
            book.setBookCategories(category);
            book.setBookLanguage(language);
            book.setBookDescription(description);
            book.setBookPhotoPath(coverPath);
            book.setBookFilePath(textFilePath);

            return ResponseEntity.ok(bookService.addBook(book));
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to save files");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBook(
            @PathVariable Long id,
            @RequestParam("title") String title,
            @RequestParam("author") String author,
            @RequestParam("category") String category,
            @RequestParam("language") String language,
            @RequestParam("description") String description,
            @RequestParam("photo") MultipartFile photo,
            @RequestParam("textFile") MultipartFile textFile
    ) {
        try {
            String coverPath = saveFile(photo, "./backend/images/", "images");
            String textFilePath = saveFile(textFile, "./backend/books/", "books");

            Book book = bookService.getBookById(id);
            book.setBookName(title);
            book.setBookAuthor(author);
            book.setBookCategories(category);
            book.setBookLanguage(language);
            book.setBookDescription(description);
            book.setBookPhotoPath(coverPath);
            book.setBookFilePath(textFilePath);

            return ResponseEntity.ok(bookService.updateBook(id, book));
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to save files");
        }
    }

    private String saveFile(MultipartFile file, String folder, String link) throws IOException {
        if (file != null && !file.isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get(folder, fileName).normalize().toAbsolutePath();
            Files.createDirectories(path.getParent());
            Files.copy(file.getInputStream(), path);
            return "http://localhost:8080/api/data/" + link + "/" + fileName;
        }
        return null;
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getBooksByUserId(@PathVariable Long id) {
        return ResponseEntity.ok(bookService.getBooksByUserId(id));
    }
}
