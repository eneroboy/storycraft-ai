import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../css/navbar.css';
import { jwtDecode } from "jwt-decode";


const getUserIdFromToken = (token) => {
    try {
        const decodedToken = jwtDecode(token);
        if (decodedToken && decodedToken.id) {
            return decodedToken.id;
        }
        return null;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;
    const location = useLocation();
    const token = localStorage.getItem('token');
    const isAdminPath = location.pathname === '/admin';

    useEffect(() => {
        if (token) {
            const headers = {
                'Authorization': `Bearer ${token}`
            };

            const userId = getUserIdFromToken(token);

            if (userId) {
                // Fetch user data
                axios.get(`${apiUrl}/users/${userId}`, { headers })
                    .then(response => {
                        const userData = response.data;
                        console.log(userData);

                        // Set user data
                        setUser(userData);

                        // Extract and set user role
                        if (userData.userRoles && userData.userRoles.length > 0) {
                            const roleName = userData.userRoles[0].role.roleName;
                            setRole(roleName);
                        }
                    })
                    .catch(error => console.error('Error fetching user data:', error));
            } else {
                console.error('No valid userId found in token');
            }
        } else {
            console.error("No token found");
        }
    }, [token, apiUrl]);

    const renderLinks = () => {
        switch (role) {
            case 'admin':
                return (
                    <>
                        <li><NavLink to="/books" className={({ isActive }) => isActive ? "active-page" : ""}>Books</NavLink></li>
                        <li><NavLink to="/listen" className={({ isActive }) => isActive ? "active-page" : ""}>Listen</NavLink></li>
                        <li><NavLink to="/add" className={({ isActive }) => location.pathname.startsWith("/add") ? "active-page" : ""}>Add</NavLink></li>
                        <li><NavLink to="/models" className={({ isActive }) => isActive ? "active-page" : ""}>Models</NavLink></li>
                        <li><NavLink to="/profile" className={({ isActive }) => isActive ? "active-page" : ""}>Profile</NavLink></li>
                        {isAdminPath && <li><NavLink to="/admin" className={({ isActive }) => isActive ? "active-page" : ""}>Admin</NavLink></li>}
                    </>
                );
            case 'parent':
                return (
                    <>
                        <li><NavLink to="/books" className={({ isActive }) => isActive ? "active-page" : ""}>Books</NavLink></li>
                        <li><NavLink to="/listen" className={({ isActive }) => isActive ? "active-page" : ""}>Listen</NavLink></li>
                        <li><NavLink to="/add" className={({ isActive }) => location.pathname.startsWith("/add") ? "active-page" : ""}>Add</NavLink></li>
                        <li><NavLink to="/models" className={({ isActive }) => isActive ? "active-page" : ""}>Models</NavLink></li>
                        <li><NavLink to="/profile" className={({ isActive }) => isActive ? "active-page" : ""}>Profile</NavLink></li>
                    </>
                );
            case 'child':
                return (
                    <>
                        <li><NavLink to="/books" className={({ isActive }) => isActive ? "active-page" : ""}>Books</NavLink></li>
                        <li><NavLink to="/listen" className={({ isActive }) => isActive ? "active-page" : ""}>Listen</NavLink></li>
                        <li><NavLink to="/profile" className={({ isActive }) => isActive ? "active-page" : ""}>Profile</NavLink></li>
                    </>
                );
            default:
                return null;
        }
    };

    const renderMobileLinks = () => {
        switch (role) {
            case 'admin':
                return (
                    <>
                        <li><NavLink to="/books" className={({ isActive }) => isActive ? "active-page" : ""}><span className="material-symbols-outlined">book</span></NavLink></li>
                        <li><NavLink to="/listen" className={({ isActive }) => isActive ? "active-page" : ""}><span className="material-symbols-outlined">headset</span></NavLink></li>
                        <li><NavLink to="/add" className={({ isActive }) => location.pathname.startsWith("/add") ? "active-page" : ""}><span className="material-symbols-outlined">add_circle</span></NavLink></li>
                        <li><NavLink to="/models" className={({ isActive }) => isActive ? "active-page" : ""}><span className="material-symbols-outlined">folder</span></NavLink></li>
                        <li><NavLink to="/profile" className={({ isActive }) => isActive ? "active-page" : ""}><span className="material-symbols-outlined">person</span></NavLink></li>
                        {isAdminPath && <li><NavLink to="/admin" className={({ isActive }) => isActive ? "active-page" : ""}><span className="material-symbols-outlined">admin_panel_settings</span></NavLink></li>}
                    </>
                );
            case 'parent':
                return (
                    <>
                        <li><NavLink to="/books" className={({ isActive }) => isActive ? "active-page" : ""}><span className="material-symbols-outlined">book</span></NavLink></li>
                        <li><NavLink to="/listen" className={({ isActive }) => isActive ? "active-page" : ""}><span className="material-symbols-outlined">headset</span></NavLink></li>
                        <li><NavLink to="/add" className={({ isActive }) => location.pathname.startsWith("/add") ? "active-page" : ""}><span className="material-symbols-outlined">add_circle</span></NavLink></li>
                        <li><NavLink to="/models" className={({ isActive }) => isActive ? "active-page" : ""}><span className="material-symbols-outlined">folder</span></NavLink></li>
                        <li><NavLink to="/profile" className={({ isActive }) => isActive ? "active-page" : ""}><span className="material-symbols-outlined">person</span></NavLink></li>
                    </>
                );
            case 'child':
                return (
                    <>
                        <li><NavLink to="/books" className={({ isActive }) => isActive ? "active-page" : ""}><span className="material-symbols-outlined">book</span></NavLink></li>
                        <li><NavLink to="/listen" className={({ isActive }) => isActive ? "active-page" : ""}><span className="material-symbols-outlined">headset</span></NavLink></li>
                        <li><NavLink to="/profile" className={({ isActive }) => isActive ? "active-page" : ""}><span className="material-symbols-outlined">person</span></NavLink></li>

                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="navbar-container">
            {/* Navbar for Desktop */}
            <nav className="navbar desktop-navbar">
                <ul className="nav-links">
                    <li><NavLink to="/" className={({ isActive }) => isActive ? "active-page" : ""}><img src={`${apiUrl}/data/images/storycraft.png`} alt="Logo" className="logo" /></NavLink></li>
                    {renderLinks()}
                </ul>
            </nav>

            {/* Navbar for Mobile */}
            <nav className="navbar mobile-navbar">
                <ul className="nav-links">
                    {renderMobileLinks()}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;