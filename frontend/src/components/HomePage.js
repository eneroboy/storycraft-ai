// src/components/HomePage.js
import React from 'react';
import '../css/index.css';  // Specific CSS for the Home page

function HomePage() {
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
