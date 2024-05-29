// AddPage.js
import React, { useState } from 'react';
import '../css/add.css';

const AddPage = () => {
  const [step, setStep] = useState(1);
  const [stepsData, setStepsData] = useState([
    {
      icon: 'mic',
      title: 'Record yourself',
      description: 'Read a series of sentences aloud, which may take around an hour.'
    },
    {
      icon: 'model_training',
      title: 'Generate your voice model',
      description: 'Our service will create and securely store your voice model.'
    },
    {
      icon: 'book',
      title: 'Use your model to create audiobook',
      description: 'After creating your model, it will be available to create person personalized audiobooks for your children.'
    }
  ]);

  const handleContinueClick = () => {
    if (step === 1) {
      setStepsData([
        {
          icon: 'home',
          title: 'Find a quiet place',
          description: 'Get comfortable in a room that has no echo or background noise.'
        },
        {
          icon: 'record_voice_over',
          title: 'Speak naturally',
          description: 'Read aloud at a consistent volume, keeping your device about 15 centimeters from your mouth.'
        },
        {
          icon: 'timelapse',
          title: 'Take your time',
          description: 'Don\'t do it in rush. Read each phrase aloud and calmly. You can save your current progress at any time.'
        }
      ]);
      setStep(2);
    } else {
      window.location.href = '/record-voice';
    }
  };

  return (
    <div className="content">
      <div className="container-add">
        <div className="progress-indicator">{step} / 5</div>
        <h1 className="progress-title">{step === 1 ? 'Create Your Voice Model' : 'Get ready to Record Your Voice'}</h1>
        <ul className="steps">
          {stepsData.map((step, index) => (
            <li key={index}>
              <span className="material-symbols-outlined icons">{step.icon}</span>
              <div className="column">
                <p className="step-title">{step.title}</p>
                <p className="step-description">{step.description}</p>
              </div>
            </li>
          ))}
        </ul>
        <button id="continue-btn" onClick={handleContinueClick}>Continue</button>
      </div>
    </div>
  );
};

export default AddPage;
