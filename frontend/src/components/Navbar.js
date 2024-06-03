import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../css/navbar.css'; // Assuming your CSS is in this file


const Navbar = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const location = useLocation();
    return (
        <div className="navbar-container">
            {/* Navbar for Desktop */}
            <nav className="navbar desktop-navbar">
                <ul className="nav-links">
                    <li><NavLink to="/" className={({ isActive }) => isActive ? "active-page" : ""}><img src={`${apiUrl}/data/images/storycraft.png`} alt="Logo" className="logo" /></NavLink></li>
                    <li><NavLink to="/books" className={({ isActive }) => isActive ? "active-page" : ""}>Books</NavLink></li>
                    <li><NavLink to="/listen" className={({ isActive }) => isActive ? "active-page" : ""}>Listen</NavLink></li>
                    <li><NavLink to="/add" className={({ isActive }) => location.pathname.startsWith("/add") ? "active-page" : ""}>Add</NavLink></li>
                    <li><NavLink to="/models" className={({ isActive }) => isActive ? "active-page" : ""}>Models</NavLink></li>
                    <li><NavLink to="/profile" className={({ isActive }) => isActive ? "active-page" : ""}>Profile</NavLink></li>
                </ul>
            </nav>
            
            {/* Navbar for Mobile */}
            <nav className="navbar mobile-navbar">
                <ul className="nav-links">
                    <li><NavLink to="/books" className={({ isActive }) => isActive ? "active-page" : ""}><span className="material-symbols-outlined">book</span></NavLink></li>
                    <li><NavLink to="/listen" className={({ isActive }) => isActive ? "active-page" : ""}><span className="material-symbols-outlined">headset</span></NavLink></li>
                    <li><NavLink to="/add" className={({ isActive }) => location.pathname.startsWith("/add") ? "active-page" : ""}><span className="material-symbols-outlined">add_circle</span></NavLink></li>
                    <li><NavLink to="/models" className={({ isActive }) => isActive ? "active-page" : ""}><span className="material-symbols-outlined">folder</span></NavLink></li>
                    <li><NavLink to="/profile" className={({ isActive }) => isActive ? "active-page" : ""}><span className="material-symbols-outlined">person</span></NavLink></li>
                </ul>
            </nav>
        </div>
    );
};


export default Navbar;
