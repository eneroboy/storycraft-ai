import React from 'react';
import '../css/successful_job.css';
const apiUrl = process.env.REACT_APP_API_URL;

const SuccessfulJobPage = () => {

  const handleContinueClick = () => {
    window.location.pathname = '/books';
  };

  return (
    <div className="content">
      <div className="container">
        <div className="progress-indicator">5 / 5</div>
        <h1 className="progress-title">Successful job</h1>
        <img src="is_ready.png" className="ok-image" alt="Success" />
        <div className="text-container" id="text-container">
          Your Voice Model will be learned on your voice. It will take about 1-2 hours, so be patient and wait for the end of processing. The result will be worth it.
        </div>
        <button id="continue-btn" onClick={handleContinueClick}>Back to books page</button>
      </div>
    </div>
  );
};

export default SuccessfulJobPage;
