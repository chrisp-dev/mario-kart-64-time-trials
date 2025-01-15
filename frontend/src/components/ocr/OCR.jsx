import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const OCR = ({ image }) => {
  const [text, setText] = useState('');

  React.useEffect(() => {
    if (image) {
      Tesseract.recognize(
        image,
        'eng',
        {
          logger: (m) => console.log(m),
        }
      ).then(({ data: { text } }) => {
        setText(text);
      });
    }
  }, [image]);

  return (
    <div>
      <h3>OCR Result</h3>
      <p>{text}</p>
    </div>
  );
};

export default OCR;