import React, { useState } from 'react';
import axios from 'axios';
import '../css/add_book.css';
import { jwtDecode } from "jwt-decode";
const apiUrl = process.env.REACT_APP_API_URL;

function getAuthHeaders() {
    const token = localStorage.getItem('token');  // Retrieve the JWT from local storage

    if (!token) {
        console.error("No token found");
        return null;
    }

    const headers = {
        'Authorization': `Bearer ${token}`  // Prepare the Authorization header
    };

    return headers;
}


const AddBookPage = () => {
    const [photo, setPhoto] = useState(null);
    const [profileImage, setProfileImage] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [language, setLanguage] = useState('english');
    const [description, setDescription] = useState('');
    const [textFile, setTextFile] = useState(null);
    const [textFileName, setTextFileName] = useState('');
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPhoto(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setTextFile(file);
            setTextFileName(file.name);
        }
    };

    const handleSubmit = () => {
        const headers = getAuthHeaders();
        const formData = new FormData();

        formData.append('userId', userId);
        formData.append('photo', photo);
        formData.append('title', title);
        formData.append('author', author);
        formData.append('category', category);
        formData.append('language', language);
        formData.append('description', description);
        formData.append('textFile', textFile);

        axios.post(`${apiUrl}/books`, formData, { headers })
            .then(response => {
                alert('Book added successfully');
                window.location.pathname = '/books';
            })
            .catch(error => {
                console.error('Error adding book:', error);
            });
    };

    return (
        <div className="content-add-book">
            <div className="add-book-form">
                <h1 className="title-text">Add new book</h1>
                <div className="profile-photo-uploader">
                    <input type="file" id="file-input" className="file-input" accept="image/*" onChange={handleImageChange} required />
                    <label htmlFor="file-input" className="file-label">
                        <div className="dashed-circle">
                            {profileImage && <img id="profile-image" src={profileImage} alt="Profile" className="profile-photo visible" />}
                            {!profileImage && <span className="upload-text">Upload photo</span>}
                        </div>
                        <span className="photo-text">Books photo</span>
                    </label>
                </div>
                <label htmlFor="title-input" className="form-label">Book Title</label>
                <input id="title-input" type="text" placeholder="Type here book title" className="title-input" value={title} onChange={(e) => setTitle(e.target.value)} required />
                
                <label htmlFor="author-input" className="form-label">Author Name</label>
                <input id="author-input" type="text" placeholder="Type here author name" className="author-input" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                
                <label htmlFor="category-input" className="form-label">Book Category</label>
                <input id="category-input" type="text" placeholder="Type here book category" className="category-input" value={category} onChange={(e) => setCategory(e.target.value)} required />
                
                <label htmlFor="language-select" className="form-label">Language</label>
                <select id="language-select" className="language-select" value={language} onChange={(e) => setLanguage(e.target.value)} required>
                    <option value="english">English</option>
                    <option value="polish">Polish</option>
                </select>
                
                <label htmlFor="description-input" className="form-label">Book Description</label>
                <textarea id="description-input" className="description-input" placeholder="Type here book short description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                
                <span className="form-label">File upload</span>
                <label htmlFor="text-file-input" id="text-file-input-label" className="custom-file-upload">
                    {textFileName || 'Upload File'}
                </label>
                <input type="file" id="text-file-input" className="text-file-input" accept=".txt" onChange={handleFileChange} required />
                <button type="button" className="btn primary" onClick={handleSubmit}>Save</button>
            </div>
        </div>
    );
};

export default AddBookPage;
