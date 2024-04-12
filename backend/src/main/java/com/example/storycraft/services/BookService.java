package com.example.storycraft.services;
import com.example.storycraft.models.Book;
import com.example.storycraft.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    // Dodawanie nowej książki
    @Transactional
    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    // Aktualizacja istniejącej książki
    @Transactional
    public Book updateBook(Long bookId, String title, String author, String categories, String description, String coverPath, String language, String filePath) {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new RuntimeException("Book not found"));
        book.setBookName(title);
        book.setBookAuthor(author);
        book.setBookCategories(categories);
        book.setBookDescription(description);
        book.setBookPhotoPath(coverPath);
        book.setBookLanguage(language);
        book.setBookFilePath(filePath);
        return bookRepository.save(book);
    }

    // Usuwanie książki
    @Transactional
    public void deleteBook(Long bookId) {
        bookRepository.deleteById(bookId);
    }

    // Pobieranie książki po ID
    public Book getBookById(Long bookId) {
        return bookRepository.findById(bookId).orElseThrow(() -> new RuntimeException("Book not found"));
    }

    // Pobieranie wszystkich książek użytkownika
    public List<Book> getBooksByUserId(Long userId) {
        return bookRepository.findByUserId(userId);
    }

    // Pobieranie wszystkich książek
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
}
