import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/edit_book.css';
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

const EditBook = () => {
    const { id: bookId } = useParams(); 

    const [photo, setPhoto] = useState(null);
    const [profileImage, setProfileImage] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [language, setLanguage] = useState('english');
    const [description, setDescription] = useState('');
    const [textFile, setTextFile] = useState(null);
    const [textFileName, setTextFileName] = useState('');

    

    useEffect(() => {

        const headers = getAuthHeaders();

        axios.get(`${apiUrl}/books/${bookId}`, { headers })
            .then(response => {
                const data = response.data;
                setProfileImage(data.bookPhotoPath);
                setTitle(data.bookName);
                setAuthor(data.bookAuthor);
                setCategory(data.bookCategories);
                setLanguage(data.bookLanguage);
                setDescription(data.bookDescription);
                setTextFileName(data.bookFilePath.split('/').pop());
            })
            .catch(error => {
                console.error('Error fetching book data:', error);
            });
    }, [bookId]);

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
        // formData.append('photo', photo);
        formData.append('title', title);
        formData.append('author', author);
        formData.append('category', category);
        formData.append('language', language);
        formData.append('description', description);
        // formData.append('textFile', textFile);
        if (photo) {
            formData.append('photo', photo);
        }
        
        if (textFile) {
            formData.append('textFile', textFile);
        }

        // console.log('formData:', textFile);

        axios.put(`${apiUrl}/books/${bookId}`, formData, { headers })
            .then(response => {
                alert('Book updated successfully');
                window.location.pathname = '/books';
            })
            .catch(error => {
                console.error('Error updating book:', error);
            });
    };

    return (
        <div className="content-edit-book">
            <div className="edit-form">
                <h1 className="title-text">Edit book</h1>
                <div className="profile-photo-uploader">
                    <input type="file" id="file-input" className="file-input" accept="image/*" onChange={handleImageChange} />
                    <label htmlFor="file-input" className="file-label">
                        <div className="dashed-circle">
                            {profileImage && <img id="profile-image" src={profileImage} alt="Profile" className="profile-photo visible" />}
                            {!profileImage && <span className="upload-text">Change photo</span>}
                        </div>
                        <span className="photo-text">Books photo</span>
                    </label>
                </div>
                <label htmlFor="title-input" className="form-label">Book Title</label>
                <input id="title-input" type="text" placeholder="Change book title" className="title-input" value={title} onChange={(e) => setTitle(e.target.value)} />
                
                <label htmlFor="author-input" className="form-label">Author Name</label>
                <input id="author-input" type="text" placeholder="Change author name" className="author-input" value={author} onChange={(e) => setAuthor(e.target.value)} />
                
                <label htmlFor="category-input" className="form-label">Book Category</label>
                <input id="category-input" type="text" placeholder="Change book category" className="category-input" value={category} onChange={(e) => setCategory(e.target.value)} />
                
                <label htmlFor="language-select" className="form-label">Language</label>
                <select id="language-select" className="language-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="english">English</option>
                    <option value="polish">Polish</option>
                </select>
                
                <label htmlFor="description-input" className="form-label">Book Description</label>
                <textarea id="description-input" className="description-input" placeholder="Change book short description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                
                <span className="form-label">File upload</span>
                <label htmlFor="text-file-input" id="text-file-input-label" className="custom-file-upload">
                    {textFileName || 'Change File'}
                </label>
                <input type="file" id="text-file-input" className="text-file-input" accept=".txt" onChange={handleFileChange} />
                <button type="button" className="btn primary" onClick={handleSubmit}>Save</button>
            </div>
        </div>
    );
};

export default EditBook;
