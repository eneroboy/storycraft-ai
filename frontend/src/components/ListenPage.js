import React, { useState, useEffect, useRef } from 'react';
import '../css/listen.css';
const apiUrl = process.env.REACT_APP_API_URL;

const ListenPage = () => {
    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [speed, setSpeed] = useState(1);
    const [timer, setTimer] = useState(null);
    const [countdownTime, setCountdownTime] = useState(300); // 5 minutes
    const audioRef = useRef(new Audio());


    useEffect(() => {
        const audioPath = localStorage.getItem('voicemodel_path') || `${apiUrl}/data/records/red_riding_hood_300.mp3`;
        const audioElement = audioRef.current;
        audioElement.src = audioPath;
        audioElement.preload = "auto";

        const bookDict = {
            title: localStorage.getItem('book_title') || 'Little Red Riding Hood',
            description: localStorage.getItem('book_description') || 'Join Little Red Riding Hood on her thrilling adventure...',
            coverPath: localStorage.getItem('book_cover_path') || `${apiUrl}/data/images/little_red_riding_hood.png`
        };

        setAudio(audioElement);
        setDuration(parseInt(/_([0-9]+)\.mp3/.exec(audioPath)?.[1] || 0));

        document.getElementById("audiobook-title").textContent = bookDict.title;
        document.getElementById("audiobook-description").textContent = bookDict.description;
        document.getElementById("cover-art").src = bookDict.coverPath;

        const updateTime = () => {
            setCurrentTime(audioElement.currentTime);
        };

        audioElement.addEventListener('timeupdate', updateTime);
        return () => {
            audioElement.removeEventListener('timeupdate', updateTime);
        };
    }, []);

    const togglePlayPause = () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const changeSpeed = (newSpeed) => {
        audio.playbackRate = newSpeed;
        setSpeed(newSpeed);
    };

    const seek = (e) => {
        const seekTime = (e.target.value / 100) * duration;
        audio.currentTime = seekTime;
        setCurrentTime(seekTime);
    };

    const seekForward = () => {
        audio.currentTime = Math.min(audio.currentTime + 10, duration);
    };

    const seekBackward = () => {
        audio.currentTime = Math.max(audio.currentTime - 10, 0);
    };

    const setTimerAndStart = (seconds) => {
        if (timer) {
            clearTimeout(timer);
        }
        setTimer(setTimeout(() => {
            audio.pause();
            setIsPlaying(false);
        }, seconds * 1000));
        setCountdownTime(seconds);
    };

    useEffect(() => {
        let interval;
        if (countdownTime > 0 && timer) {
            interval = setInterval(() => {
                setCountdownTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (countdownTime <= 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [countdownTime, timer]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const partInSeconds = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${partInSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="content-listen">
            <div className="player">
                <div className="top-part">
                    <img src={`${apiUrl}/data/images/little_red_riding_hood.png`} alt="Little Red Riding Hood" id="cover-art" className="cover-art" />
                    <div className="info">
                        <h2 id="audiobook-title">Little Red Riding Hood</h2>
                        <p id="audiobook-description">Join Little Red Riding Hood on her thrilling adventure...</p>
                    </div>
                </div>
                <div className="down-part">
                    <div className="timeline">
                        <span id="currentTime">{formatTime(currentTime)}</span>
                        <input type="range" id="seek" className="slider" value={(currentTime / duration) * 100} min="0" max="100" onChange={seek} />
                        <span id="duration">{formatTime(duration)}</span>
                    </div>
                    <div className="controls">
                        <button id="timer" className="material-symbols-outlined" onClick={() => setTimerAndStart(300)}>clear_night</button>
                        <span id="timerValue" className="timer-tooltip">Timer: {formatTime(countdownTime)}</span>
                        <button id="prev" className="material-symbols-outlined" onClick={seekBackward}>fast_rewind</button>
                        <button id="play" className="material-symbols-outlined" onClick={togglePlayPause}>
                            {isPlaying ? 'pause' : 'play_arrow'}
                        </button>
                        <button id="next" className="material-symbols-outlined" onClick={seekForward}>fast_forward</button>
                        <select id="speed" value={speed} onChange={(e) => changeSpeed(parseFloat(e.target.value))}>
                            <option value="0.5">0.5x</option>
                            <option value="1">1x</option>
                            <option value="1.5">1.5x</option>
                            <option value="2">2x</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListenPage;
