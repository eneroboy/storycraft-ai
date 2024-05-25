import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import '../css/books.css'; // Ensure you import the CSS
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

function getUserIdFromToken(token) {
    try {
      const decodedToken = jwtDecode(token); // Decoded token can be of any type
      if (decodedToken && decodedToken.sub) {
        return decodedToken.id;
      }
      return null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

const BooksPage = () => {
    const [voicemodels, setVoiceModels] = useState([]);
    const [books, setBooks] = useState([]);
    const [showVoiceModelPopup, setShowVoiceModelPopup] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [selectedVoiceModel, setSelectedVoiceModel] = useState(null);

    

    useEffect(() => {
        const token = localStorage.getItem('token');  // Retrieve the JWT from local storage

        if (!token) {
            console.error("No token found");
            return;
        }

        const userId = getUserIdFromToken(token);

        const headers = {
            'Authorization': `Bearer ${token}`  // Prepare the Authorization header
        };


        const fetchVoiceModels = async () => {
            try {
                const response = await axios.get(`${apiUrl}/voiceModels`, {
                    headers: headers
                });
                const voicemodels = response.data._embedded.voiceModels;
                setVoiceModels(voicemodels);
                // console.log('Voice models:', voicemodels);
            } catch (error) {
                console.error('Error fetching voice models:', error);
            }
        };

        fetchVoiceModels();


        // fetch(`${apiUrl}/voicemodels`, { method: 'GET', headers: headers })
        //     .then(response => response.json())
        //     .then(data => {
        //         setVoiceModels(data.voicemodels.map(voicemodel => JSON.parse(voicemodel)));
        //     })
        //     .catch(error => console.error('Error:', error));

        fetch(`${apiUrl}/books/user/` + userId, { method: 'GET', headers: headers })
            .then(response => response.json())
            .then(setBooks)
            .catch(error => console.error('Error:', error));
    }, []);

    const handleEditBook = (bookId) => {
        window.location.href = `/edit-book/${bookId}`;
    };

    const handleListen = (book) => {
        setSelectedBook(book);
        console.log("Selected book:", book);
        setShowVoiceModelPopup(true);
    };

    const handleVoiceModelSelect = (voicemodel) => {
        localStorage.setItem('voicemodel_path', voicemodel.voiceFilePath);
        localStorage.setItem('book_title', selectedBook.bookName);
        localStorage.setItem('book_description', selectedBook.bookDescription);
        localStorage.setItem('book_cover_path', selectedBook.bookPhotoPath);
        console.log("Selected voice model:", voicemodel);
        window.location.href = '/listen';
    };

    const handleClosePopup = () => {
        setShowVoiceModelPopup(false);
    };

    return (
        <div className="content">
            <h1>Books</h1>
            <div className="button-panel">
                <button className="button left-button">#Animals</button>
                <button className="button right-button">#MyBooks</button>
                <button className="button button-add" onClick={() => window.location.href = '/add-new-book'}>Add new</button>
            </div>
            <div className="book-container">
                {books.map(book => (
                    <div key={book.id} className="book-tile">
                        <img src={book.bookPhotoPath} alt={book.bookName} className="book-image" />
                        <div className="book-caption">{book.bookName}</div>
                        <div className="book-actions">
                            <button className="book-action-btn edit-btn" onClick={() => handleEditBook(book.id)}>Edit</button>
                            <button className="book-action-btn listen-btn" onClick={() => handleListen(book)}>Listen</button>
                        </div>
                    </div>
                ))}
            </div>
            {showVoiceModelPopup && (
                <div className="voicemodel-popup">
                    <div className="voicemodel-content">
                        <h2>Select Voice Model</h2>
                        <div className="voicemodel-list">
                            {voicemodels.map(voicemodel => (
                                <div key={voicemodel.recordId} className="voicemodel-item" onClick={() => handleVoiceModelSelect(voicemodel)}>
                                    {voicemodel.voiceName}
                                </div>
                            ))}
                        </div>
                        <button className="close-popup" onClick={handleClosePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BooksPage;
