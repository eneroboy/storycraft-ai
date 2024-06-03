// RecordPage.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import '../css/record_voice.css';
import { useParams } from 'react-router-dom';
import audioBufferToWav from 'audiobuffer-to-wav';

const apiUrl = process.env.REACT_APP_API_URL;

function getAuthHeaders() {
    const token = localStorage.getItem('token');  // Retrieve the JWT from local storage

    if (!token) {
        console.error("No token found");
        return null;
    }

    const headers = {
        'Authorization': `Bearer ${token}`  // Prepare the Authorization header
    };

    return headers;
}

function getUserIdFromToken(token) {
  try {
    const decodedToken = jwtDecode(token); // Decoded token can be of any type
    if (decodedToken && decodedToken.sub) {
      return decodedToken.id;
    }
    return null;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

const RecordPage = () => {
  const text = `Once upon a time, in a quaint village nestled among rolling hills and vibrant meadows, lived a young girl known to all as Little Red Riding Hood. Named for her beloved red cloak, a gift from her doting grandmother, she was cherished for her bright smile and kind heart. One sunny morning, Little Red Riding Hood's mother asked her to deliver a basket of fresh treats to her grandmother, who lived deep in the forest. With a promise to stay off the path and not dally, she set on, her red cloak fluttering behind her like a banner of cheer.`;
  const { id: voiceModelId } = useParams(); 
  const [reading, setReading] = useState(false);
  const [readIndex, setReadIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const textContainerRef = useRef(null);
  const playPauseButtonRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    textContainerRef.current.innerHTML = wrapText(text);
  }, [text]);

  useEffect(() => {
    if (reading) {
      const timeoutId = setTimeout(() => {
        if (readIndex < text.length) {
          textContainerRef.current.getElementsByTagName('span')[readIndex].classList.add('read-text');
          setReadIndex(readIndex + 1);
        } else {
          setReading(false);
        }
      }, 70);
      return () => clearTimeout(timeoutId);
    }
  }, [reading, readIndex, text]);

  const wrapText = (text) => {
    return text.split('').map(char => char === ' ' ? `<span class="unread-text">&nbsp;</span>` : `<span class="unread-text">${char}</span>`).join('');
  };

  const handleContinueClick = () => {
    window.location.href = '/add-successful';
  };

  const handlePlayPauseClick = () => {
    setReading(!reading);
    if (reading) {
      playPauseButtonRef.current.textContent = 'play_arrow';
      pauseRecording();
    } else {
      playPauseButtonRef.current.textContent = 'pause';
      readText();
      startRecording();
    }
  };

  const handleStopClick = () => {
    setReading(false);
    setReadIndex(0);
    textContainerRef.current.innerHTML = wrapText(text);
    playPauseButtonRef.current.textContent = 'mic';
    resetRecording();
  };

  const handleSaveClick = () => {
    saveRecording();
  };

  const readText = () => {
    if (reading && readIndex < text.length) {
      textContainerRef.current.getElementsByTagName('span')[readIndex].classList.remove('unread-text');
      textContainerRef.current.getElementsByTagName('span')[readIndex].classList.add('read-text');
      setReadIndex(readIndex + 1);
      setTimeout(readText, 70);
    }
  };

  const startRecording = async () => {
    if (!mediaRecorder || mediaRecorder.state === 'inactive') {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const newMediaRecorder = new MediaRecorder(stream);
        newMediaRecorder.ondataavailable = event => {
          setAudioChunks((prevChunks) => [...prevChunks, event.data]);
        };
        setMediaRecorder(newMediaRecorder);
        newMediaRecorder.start();
        startTimer();
        setIsRecording(true);
      } catch (err) {
        console.error('Error accessing the microphone', err);
      }
    } else if (mediaRecorder.state === 'paused') {
      mediaRecorder.resume();
      startTimer();
    }
  };

  const pauseRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.pause();
      stopTimer();
    }
  };

  const convertToWav = async (blob) => {
    const audioContext = new AudioContext();
    const arrayBuffer = await blob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const wavBuffer = audioBufferToWav(audioBuffer);
    const wavBlob = new Blob([wavBuffer], { type: 'audio/wav' });

    return { wavBlob, duration: audioBuffer.duration };
  };

  const saveRecording = async () => {
    const userId = getUserIdFromToken(localStorage.getItem('token'));
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
    const { wavBlob, duration } = await convertToWav(audioBlob); // Konwersja do formatu WAV
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('audio', wavBlob, 'recording.wav');
    formData.append('length', wavBlob.size);
    formData.append('duration', duration);
    formData.append('language', 'English');
    formData.append('text', text);
    formData.append('number_of_words', text.split(' ').length);

    const headers = getAuthHeaders();
    if (!headers) {
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/records`, formData, { headers });
      // const response = { data: { success: true } };
      if (response.data.success) {
        console.log('Recording saved successfully');
        const formData = new FormData();
        const recordId = response.data.recordId;
        formData.append('recordId', recordId);
        const response1 = axios.put(`${apiUrl}/voicemodels/${voiceModelId}`, formData, { headers });
        console.log('Voice model updated:', response1.data);
        alert('Recording saved successfully');
      } else {
        console.error('Failed to save recording');
      }
    } catch (error) {
      console.error('Error saving recording:', error);
    }

    // setAudioChunks([]);
  };

  const resetRecording = () => {
    if (isRecording && mediaRecorder) {
      mediaRecorder.stop();
    }
    resetTimer();
    setAudioChunks([]);
    setIsRecording(false);
  };

  const startTimer = () => {
    const intervalId = setInterval(() => {
      setElapsedTime(prevTime => prevTime + 1000);
    }, 1000);
    setTimerInterval(intervalId);
  };

  const stopTimer = () => {
    clearInterval(timerInterval);
  };

  const resetTimer = () => {
    stopTimer();
    setElapsedTime(0);
  };

  useEffect(() => {
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    timerRef.current.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }, [elapsedTime]);

  return (
    <div className="content">
      <div className="container-record">
        <div className="progress-indicator">4 / 5</div>
        <h1 className="progress-title">Record your voice</h1>
        <div className="text-container" id="text-container" ref={textContainerRef}></div>
        <div id="time" ref={timerRef}>00:00</div>
        <div className="controls-container">
          <div className="controls">
            <button className="control_button material-symbols-outlined" id="save" onClick={handleSaveClick}>save</button>
            <button className="control_button material-symbols-outlined" id="play-pause" ref={playPauseButtonRef} onClick={handlePlayPauseClick}>mic</button>
            <button className="control_button material-symbols-outlined" id="stop" onClick={handleStopClick}>stop</button>
          </div>
        </div>
        <button id="continue-btn" onClick={handleContinueClick}>Continue</button>
      </div>
    </div>
  );
};

export default RecordPage;
