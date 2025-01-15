import React, { useState } from 'react';
import Camera from '../components/ocr/Camera';
import OCR from '../components/ocr/OCR';

const OCRPage = () => {
  const [image, setImage] = useState(null);

  const handleCapture = (imageSrc) => {
    setImage(imageSrc);
  };

  return (
    <div className="full-window">
      <h1>OCR Page</h1>
      <Camera onCapture={handleCapture} />
      {image && <OCR image={image} />}
    </div>
  );
};

export default OCRPage;