import React, { useEffect, useState } from 'react';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

const NotificationPopup = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');



    useEffect(() => {

        const token = localStorage.getItem('token');

        if (!token) {
            console.error("No token found");
            return;
        }

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const checkTrainingStatus = async () => {
            try {
                const response = await axios.get(`${apiUrl}/training-status`, {headers});
                if (response.data.status === 'completed') {
                    setMessage(response.data.message);
                    setShowPopup(true);
                    console.log(response.data.message);
                }
            } catch (error) {
                console.error('Error checking training status:', error);
            }
        };

        const interval = setInterval(checkTrainingStatus, 60000); // Check every minute
        return () => clearInterval(interval);
    }, []);

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        showPopup && (
            <div className="notification-popup">
                <div className="notification-content">
                    <p>{message}</p>
                    <button onClick={handleClosePopup}>Close</button>
                </div>
            </div>
        )
    );
};

export default NotificationPopup;
