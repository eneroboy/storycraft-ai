// src/components/LoginPage.js
// import React, { useState } from 'react';
// import '../css/login.css';  // Specific CSS for the Login page

// function LoginPage() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleLogin = () => {
//         console.log("Login attempt with", email, password);
//         // Implement your fetch logic here
//     };

//     const togglePassword = () => {
//         const passwordInput = document.getElementById('password-input');
//         const togglePassword = document.getElementById('toggle-password');
//         if (passwordInput.type === 'password') {
//             passwordInput.type = 'text';
//             togglePassword.innerHTML = 'visibility_off';
//         } else {
//             passwordInput.type = 'password';
//             togglePassword.innerHTML = 'visibility';
//         }
//     }

//     return (
//         <div className="login-container">
//             <div className="image-side">
//                 <img className="image-login-page" src="login_page.png" alt="Logo" />
//             </div>
//             <div className="login-side">
//                 <div className="login-form">
//                     <img src="storycraft.png" alt="Logo" />
//                     <input type="email" placeholder="Email" name="email" class="email-input" onChange={(e) => setEmail(e.target.value)} />

//                     <div class="password-container">
//                         <input type="password" id="password-input" placeholder="Password" class="password-input" onChange={(e) => setPassword(e.target.value)} />
//                         <button type="button" id="toggle-password" class="toggle-password material-symbols-outlined" onClick={togglePassword} >visibility</button>
//                     </div>                
//                     <button type="button" class="btn primary" onClick={handleLogin}>Log in</button>
//                     <div class="divider">or</div>
//                     <button type="button" class="btn secondary" id="button-signin">Sign in</button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default LoginPage;

import React, { useState } from 'react';
import '../css/login.css';  // Specific CSS for the Login page


function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');  // To display error messages

    const handleLogin = async () => {
        console.log("Login attempt with", email, password);

        // Build the request payload
        const payload = {
            email: email,
            password: password
        };

        try {
            // Send a POST request to the backend
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            // Extract the JWT from the response
            const data = await response.json();
            const token = data.token;

            // Save the JWT in local storage or context for future requests
            localStorage.setItem('token', token);

            // Redirect or do something upon successful login
            console.log('Logged in successfully!');
            window.location.href = '/books';  // Redirect to the books page
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message);
        }
    };

    const handleRegister = () => {
        window.location.href = '/register';  // Redirect to the register page
    };

    const togglePassword = () => {
        const passwordInput = document.getElementById('password-input');
        const togglePassword = document.getElementById('toggle-password-login');
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
                    <input type="email" placeholder="Email" name="email" className="email-input" onChange={(e) => setEmail(e.target.value)} />

                    <div className="password-container">
                        <input type="password" id="password-input" placeholder="Password" className="password-input" onChange={(e) => setPassword(e.target.value)} />
                        <button type="button" id="toggle-password" className="toggle-password-login material-symbols-outlined" onClick={togglePassword} >visibility</button>
                    </div>
                    <button type="button" className="btn primary" onClick={handleLogin}>Log in</button>
                    {error && <p className="error">{error}</p>}  {/* Display any error message */}
                    <div className="divider">or</div>
                    <button type="button" className="btn secondary" id="button-signin" onClick={handleRegister}>Sign in</button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
