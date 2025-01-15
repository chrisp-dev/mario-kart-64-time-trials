import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

const Camera = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [key, setKey] = useState(0);
  const [error, setError] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  }, [webcamRef, onCapture]);

  const refreshWebcam = () => {
    setKey(prevKey => prevKey + 1);
    setError(null); // Reset error when refreshing the webcam
  };

  const handleUserMediaError = (error) => {
    setError('Error accessing the webcam. Please check your camera settings.');
    console.error('Webcam error:', error);
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Webcam
        key={key}
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
        height="100%"
        videoConstraints={{
          width: 1280,
          height: 720,
          facingMode: "user"
        }}
        onUserMediaError={handleUserMediaError}
      />
      <button onClick={capture}>Capture</button>
      <button onClick={refreshWebcam}>Refresh Webcam</button>
    </div>
  );
};

export default Camera;