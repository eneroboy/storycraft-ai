// src/components/LoginPage.js
import React, { useState } from 'react';
import '../css/login.css';  // Specific CSS for the Login page

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log("Login attempt with", email, password);
        // Implement your fetch logic here
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

    return (
        <div className="login-container">
            <div className="image-side">
                <img className="image-login-page" src="login_page.png" alt="Logo" />
            </div>
            <div className="login-side">
                <div className="login-form">
                    <img src="storycraft.png" alt="Logo" />
                    <input type="email" placeholder="Email" name="email" class="email-input" onChange={(e) => setEmail(e.target.value)} />

                    <div class="password-container">
                        <input type="password" id="password-input" placeholder="Password" class="password-input" onChange={(e) => setPassword(e.target.value)} />
                        <button type="button" id="toggle-password" class="toggle-password material-symbols-outlined" onClick={togglePassword} >visibility</button>
                    </div>                
                    <button type="button" class="btn primary" onClick={handleLogin}>Log in</button>
                    <div class="divider">or</div>
                    <button type="button" class="btn secondary" id="button-signin">Sign in</button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
