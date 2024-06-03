import React, { useState } from 'react';
import axios from 'axios';
import '../css/add_voice_model.css';
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

const AddVoiceModelPage = () => {
    const [photo, setPhoto] = useState(null);
    const [profileImage, setProfileImage] = useState('');
    const [title, setTitle] = useState('');
    const [language, setLanguage] = useState('english');
    const [method, setMethod] = useState('coqui-ai');
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

    const handleSubmit = () => {
        const headers = getAuthHeaders();
        const formData = new FormData();

        formData.append('userId', userId);
        formData.append('photo', photo);
        formData.append('title', title);
        formData.append('language', language);
        formData.append('method', method);

        axios.post(`${apiUrl}/voicemodels`, formData, { headers })
            .then(response => {
                alert('Voice model added successfully');
                const voiceModelId = response.data.id;
                console.log('Voice model added:', response.data);
                window.location.pathname = '/add-record-voice/' + voiceModelId;
            })
            .catch(error => {
                console.error('Error adding voice model:', error);
            });
    };

    return (
        <div className="content-add-voice-model">
            <div className="add-voice-model-form">
                <div className="progress-indicator">3 / 5</div>
                <h1 className="title-text-add-voice-model">Name Your Voice Model</h1>
                <div className="profile-photo-uploader-add-voice-model">
                    <input type="file" id="file-input" className="file-input-add-voice-model" accept="image/*" onChange={handleImageChange} required />
                    <label htmlFor="file-input" className="file-label-add-voice-model">
                        <div className="dashed-circle-add-voice-model">
                            {profileImage && <img id="profile-image" src={profileImage} alt="Profile" className="profile-photo-add-voice-model visible" />}
                            {!profileImage && <span className="upload-text-add-voice-model">upload photo</span>}
                        </div>
                        <span className="photo-text-add-voice-model">Voice avatar</span>
                    </label>
                </div>
                <label htmlFor="title-input" className="form-label-add-voice-model">Voice model</label>
                <input id="title-input" type="text" placeholder="Type here voice model name" className="title-input-add-voice-model" value={title} onChange={(e) => setTitle(e.target.value)} required />
                
                <label htmlFor="language-select" className="form-label-add-voice-model">Language</label>
                <select id="language-select" className="language-select-add-voice-model" value={language} onChange={(e) => setLanguage(e.target.value)} required>
                    <option value="english">English</option>
                    <option value="polish">Polish</option>
                </select>
                <label htmlFor="method-select" className="form-label-add-voice-model">Language</label>
                <select id="method-select" className="language-select-add-voice-model" value={method} onChange={(e) => setMethod(e.target.value)} required>
                    <option value="coqui-ai">coqui-ai</option>
                    <option value="Elevenlabs">Elevenlabs</option>
                </select>
                <button type="button" id="ctn-button" className="btn primary" onClick={handleSubmit}>Continue</button>
            </div>
        </div>
    );
};

export default AddVoiceModelPage;
