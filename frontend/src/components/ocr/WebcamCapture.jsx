import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [validationMessage, setValidationMessage] = useState('');

  const validateText = (text) => {
    // Add your validation logic here
    return text.includes('1.');
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    Tesseract.recognize(
      imageSrc,
      'eng',
      {
        logger: (m) => console.log(m),
      }
    ).then(({ data: { text } }) => {
      if (validateText(text)) {
        setValidationMessage('Race results are valid!');
        // Send the extracted text to your backend server
        fetch('http://localhost:3000/results', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: text }),
        });
      } else {
        setValidationMessage('Invalid race results. Please try again.');
      }
    });
  }, [webcamRef]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
      />
      <button onClick={capture}>Capture</button>
      <p>{validationMessage}</p>
    </div>
  );
};

export default WebcamCapture;
