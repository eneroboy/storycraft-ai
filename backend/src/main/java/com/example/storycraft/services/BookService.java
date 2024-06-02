//package com.example.storycraft.services;
//import com.example.storycraft.models.Book;
//import com.example.storycraft.repositories.BookRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class BookService {
//
//    private final BookRepository bookRepository;
//
//    @Autowired
//    public BookService(BookRepository bookRepository) {
//        this.bookRepository = bookRepository;
//    }
//
//    // Dodawanie nowej książki
//    @Transactional
//    public Book addBook(Book book) {
//        return bookRepository.save(book);
//    }
//
//    // Aktualizacja istniejącej książki
//    @Transactional
//    public Book updateBook(Long bookId, Book book) {
//        bookRepository.editBook(bookId, book.getBookName(), book.getBookAuthor(), book.getBookCategories(), book.getBookDescription(), book.getBookPhotoPath(), book.getBookLanguage(), book.getBookFilePath());
//        return bookRepository.findById(bookId).orElseThrow(() -> new RuntimeException("Book not found"));
//    }
//
//    // Usuwanie książki
//    @Transactional
//    public void deleteBook(Long bookId) {
//        bookRepository.deleteById(bookId);
//    }
//
//    // Pobieranie książki po ID
//    public Book getBookById(Long bookId) {
//        return bookRepository.findById(bookId).orElseThrow(() -> new RuntimeException("Book not found"));
//    }
//
//    // Pobieranie wszystkich książek użytkownika
//    public List<Book> getBooksByUserId(Long userId) {
//        return bookRepository.findByUserId(userId);
//    }
//
//    // Pobieranie wszystkich książek
//    public List<Book> getAllBooks() {
//        return bookRepository.findAll();
//    }
//}

package com.example.storycraft.services;

import com.example.storycraft.models.Book;
import com.example.storycraft.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Transactional
    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    @Transactional
    public Book updateBook(Long bookId, Book book) {
        Book existingBook = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));
        existingBook.setBookName(book.getBookName());
        existingBook.setBookAuthor(book.getBookAuthor());
        existingBook.setBookCategories(book.getBookCategories());
        existingBook.setBookDescription(book.getBookDescription());
        existingBook.setBookPhotoPath(book.getBookPhotoPath());
        existingBook.setBookLanguage(book.getBookLanguage());
        existingBook.setBookFilePath(book.getBookFilePath());
        return bookRepository.save(existingBook);
    }

    public void deleteBook(Long id) throws IOException {
        Book book = bookRepository.findById(id).orElse(null);
        if (book != null) {
            // Delete book file
            deleteFile(book.getBookFilePath());
            // Delete book photo
            deleteFile(book.getBookPhotoPath());
            // Delete book from the repository
            bookRepository.deleteById(id);
        }
    }

    private void deleteFile(String filePath) throws IOException {
        if (filePath != null && !filePath.isEmpty()) {
            Path path = Paths.get("./backend", filePath.substring(filePath.lastIndexOf("/api/data/") + 9)).normalize().toAbsolutePath();
            if (Files.exists(path)) {
                Files.delete(path);
            }
        }
    }

    public Book getBookById(Long bookId) {
        return bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));
    }

    public List<Book> getBooksByUserId(Long userId) {
        return bookRepository.findByUserId(userId);
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
}
