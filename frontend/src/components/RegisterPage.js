import React, { useState } from 'react';
import '../css/register.css';  // Make sure to import your CSS styles

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [profileImage, setProfileImage] = useState('');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);
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

    const handleSubmit = () => {
        console.log("Submitting:", { name, email, password, repeatPassword, profileImage });
        // Here you would usually handle the form submission request to your backend
        // For example, using Axios or Fetch API
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
                                {profileImage ? <img id="profile-image" src={profileImage} alt="Profile" className="profile-photo" /> : <span className="upload-text">Upload photo</span>}
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
                        <button type="button" className="toggle-password material-symbols-outlined" onClick={togglePassword}>visibility</button>
                    </div>
                    <button type="button" className="btn primary" onClick={handleSubmit}>Create account</button>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
