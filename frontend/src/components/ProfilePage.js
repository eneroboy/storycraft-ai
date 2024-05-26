import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import '../css/profile.css';

const apiUrl = process.env.REACT_APP_API_URL;

// Function to decode the token and get the userId
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

const ProfilePage = () => {
    const [user, setUser] = useState({});
    const [role, setRole] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = getUserIdFromToken(token);

        const headers = {
            'Authorization': `Bearer ${token}`  // Prepare the Authorization header
        };

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
    }, []);

    const handleLogout = () => {
        // Clear the token and redirect to login page
        localStorage.removeItem('token');
        window.location.pathname = '/login';
    };

    return (
        <div className="content-profile">
            <div className="profile-card">
                <img id="profile-image" src={user.photoPath || ''} alt="Profile Image" className="profile-image" />
                <h2 className="profile-name">{user.name || ''}</h2>
                <div className="profile-menu" id="profile-menu">
                    <div className="menu-item">
                        <span className="material-symbols-outlined">settings</span>
                        Settings
                    </div>
                    <div className="menu-item">
                        <span className="material-symbols-outlined">credit_card</span>
                        Payment
                    </div>
                    <div className="menu-item">
                        <span className="material-symbols-outlined">notifications</span>
                        Notifications
                    </div>
                    <div className="menu-item">
                        <span className="material-symbols-outlined">support_agent</span>
                        Support
                    </div>
                    <div className="menu-item">
                        <span className="material-symbols-outlined">privacy_tip</span>
                        Privacy
                    </div>
                    {role === 'admin' && (
                        <div className="menu-item" onClick={() => window.location.pathname = '/admin'}>
                            <span className="material-symbols-outlined">supervisor_account</span>
                            Admin panel
                        </div>
                    )}
                </div>
                <button id="logout" className="logout-button" onClick={handleLogout}>Sign out</button>
            </div>
        </div>
    );
};

export default ProfilePage;
