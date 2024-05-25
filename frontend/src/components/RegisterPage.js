import React, { useState } from 'react';
import '../css/register.css';  // Make sure to import your CSS styles
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState('');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImageUrl(e.target.result);
            };
            reader.readAsDataURL(file);

        }
    };

    const togglePassword = () => {
        const passwordInput = document.getElementById('password-input');
        const togglePassword = document.getElementById('toggle-password');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePassword.innerHTML = 'visibility_off';
        } else {
            passwordInput.type = 'password';
            togglePassword.innerHTML = 'visibility';
        }
    }

    const togglePasswordRepeat = () => {
        const passwordInputRepeat = document.getElementById('password-input-repeat');
        const togglePasswordRepeat = document.getElementById('toggle-password-repeat');
        if (passwordInputRepeat.type === 'password') {
            passwordInputRepeat.type = 'text';
            togglePasswordRepeat.innerHTML = 'visibility_off';
        } else {
            passwordInputRepeat.type = 'password';
            togglePasswordRepeat.innerHTML = 'visibility';
        }
    }

    // // RegisterPage.js
    // const handleSubmit = async () => {
    //     const response = await fetch(`${apiUrl}/register`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             name,
    //             email,
    //             password
    //         })
    //     });
    //     const data = await response.json();
        
    //     if (response.ok) {
    //         const token = data.token;

    //         localStorage.setItem('token', token);
    //         console.log("Registration successful");
    //         window.location.href = '/books';
    //     } else {
    //         console.error("Registration failed:", data.message);
    //     }
    // };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        if (profileImage) {
            formData.append('photo', profileImage);
        }

        try {
            const response = await axios.post(`${apiUrl}/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const data = response.data;
            if (response.status === 201) {
                const token = data.token;
                localStorage.setItem('token', token);
                console.log("Registration successful");
                window.location.href = '/books';
            } else {
                console.error("Registration failed:", data.message);
            }
        } catch (error) {
            console.error("There was an error!", error);
        }
    };


    return (
        <div className="login-container">
            <div className="image-side">
                <img className="image-login-page" src="login_page.png" alt="Logo" />
            </div>
            <div className="login-side">
                <div className="login-form">
                    <div className="profile-photo-uploader">
                        <input type="file" id="file-input" className="file-input" accept="image/*" onChange={handleImageChange} />
                        <label htmlFor="file-input" className="file-label">
                            <div className="dashed-circle">
                                {profileImageUrl ? <img id="profile-image" src={profileImageUrl} alt="Profile" className="profile-photo visible" /> : <span className="upload-text">Upload photo</span>}
                            </div>
                            <span className="photo-text">Your profile photo</span>
                        </label>
                    </div>
                    <input type="text" placeholder="Name" className="email-input" onChange={e => setName(e.target.value)} />
                    <input type="email" placeholder="Email" className="email-input" onChange={e => setEmail(e.target.value)} />
                    <div className="password-container">
                        <input type="password" id="password-input" placeholder="Password" className="password-input" onChange={e => setPassword(e.target.value)} />
                        <button type="button" id="toggle-password"  className="toggle-password material-symbols-outlined" onClick={togglePassword}>visibility</button>
                        <input type="password" id="password-input-repeat" placeholder="Repeat password" className="password-input" onChange={e => setRepeatPassword(e.target.value)} />
                        <button type="button" id="toggle-password-repeat" className="toggle-password-repeat material-symbols-outlined" onClick={togglePasswordRepeat}>visibility</button>
                    </div>
                    <button type="button" className="btn primary" onClick={handleSubmit}>Create account</button>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
