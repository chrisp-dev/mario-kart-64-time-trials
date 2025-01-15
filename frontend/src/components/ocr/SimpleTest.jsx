import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

const SimpleWebcamTest = () => {
    const webcamRef = useRef(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc);
    }, [webcamRef]);

    return (
        <div>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
            />
            <button onClick={capture}>Capture Image</button>
        </div>
    );
};

export default SimpleWebcamTest;
