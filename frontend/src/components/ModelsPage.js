import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/models.css';

const apiUrl = process.env.REACT_APP_API_URL;

const ModelsPage = () => {
    const [voiceModels, setVoiceModels] = useState([]);
    const token = localStorage.getItem('token');  // Retrieve the JWT from local storage

    useEffect(() => {
        if (!token) {
            console.error("No token found");
            return;
        }

        const headers = {
            'Authorization': `Bearer ${token}`  // Prepare the Authorization header
        };

        axios.get(`${apiUrl}/voiceModels`, { headers })
            .then(response => {
                const voicemodels = response.data._embedded.voiceModels;
                setVoiceModels(voicemodels);
                console.log('Voice models:', voicemodels);
            })
            .catch(error => console.error('Error fetching voice models:', error));
    }, [token]);

    const openMenu = (menuId) => {
        document.querySelectorAll('.menu').forEach(menu => {
            menu.style.display = 'none';
        });

        const menu = document.getElementById(menuId);
        menu.style.display = 'block';

        window.onclick = function (event) {
            if (!event.target.matches('.actions')) {
                menu.style.display = 'none';
            }
        };
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.matches('.actions')) {
                document.querySelectorAll('.menu').forEach(menu => {
                    menu.style.display = 'none';
                });
            }
        };

        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div className="content-models">
            <h1>Your Voice Models</h1>
            {voiceModels.map((vm, index) => (
                <div key={index} className="voice-model">
                    <img src={vm.voiceAvatarPath} alt={vm.voiceName} />
                    <div className="info">
                        <h2>{vm.voiceName}</h2>
                        <p>Language: {vm.voiceLanguage}</p>
                    </div>
                    <div className="actions material-symbols-outlined" onClick={() => openMenu(`menu-${index}`)}>
                        more_horiz
                    </div>
                    <div id={`menu-${index}`} className="menu">
                        Edit
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ModelsPage;
