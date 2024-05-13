// src/components/HomePage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/index.css';  // Specific CSS for the Home page

function HomePage() {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const redirectTo = token ? '/books' : '/login';

        const timer = setTimeout(() => {
            navigate(redirectTo);
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);


    return (
        <div className="loading-container">
            <div className="image-side">
                <img className="image-loading-page" src="login_page.png" alt="Logo" />
            </div>
            <div className="loading-side">
                <div className="loading-page">
                    <img src="storycraft.png" alt="Logo" />
                    <div className="progress-bar-container">
                        <div className="progress-bar"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
