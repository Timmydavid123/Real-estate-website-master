import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Webcam from 'react-webcam';
import Dropzone from 'react-dropzone';
import alike from 'image-alike';
import Tesseract from 'tesseract.js';
import './identification.css';

const IdentificationPage = () => {
  const [idCardImage, setIdCardImage] = useState(null);
  const [thumbImage, setThumbImage] = useState(null);

  const webcamRef = React.useRef(null);

  const captureThumb = () => {
    const thumbImageSrc = webcamRef.current.getScreenshot();
    setThumbImage(thumbImageSrc);
  };

  const handleDrop = (acceptedFiles) => {
    const thumbImageSrc = webcamRef.current.getScreenshot();
    setThumbImage(thumbImageSrc);

    // Assuming only one file is allowed for ID card upload
    const idCardImageSrc = URL.createObjectURL(acceptedFiles[0]);
    setIdCardImage(idCardImageSrc);

    // Perform image validation against a clear background
    alike(thumbImageSrc, idCardImageSrc, { tolerance: 5 }, (result) => {
      if (!result.match) {
        toast.error('Please upload a valid ID card against a clear background.');
        setIdCardImage(null);
      }
    });

    // Perform OCR to check if the ID card contains valid text
    Tesseract.recognize(
      idCardImageSrc,
      'eng',
      { logger: (info) => console.log(info) }
    ).then(({ data: { text } }) => {
      if (!isValidIdCard(text)) {
        toast.error('Invalid ID card format. Please upload a valid ID card.');
        setIdCardImage(null);
      }
    });
  };

  const isValidIdCard = (text) => {
    // Add your custom logic to check if the OCR result contains valid information based on your ID card format
    // For example, you can check for specific keywords or patterns in the text.
    // Return true if valid, false otherwise.
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!thumbImage) {
      toast.error('Please capture your face before submitting.');
      return;
    }

    if (!idCardImage) {
      toast.error('Please upload a valid ID card before submitting.');
      return;
    }

    // Include logic to send captured images and data to the backend
    // ...

    toast.success('Identification details submitted successfully!');
  };

  return (
    <div className="identification-page">
      <h2>Means of Identification</h2>

      {/* Webcam for Thumb Capture */}
      <label>
        Capturing:
        Please position your face correctly directly to the screen for capturing:
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{ width: 500, height: 200 }}
        />
        <button onClick={captureThumb}>Capture</button>
        {thumbImage && <img src={thumbImage} alt="Thumb Biometric" />}
      </label>

      {/* Dropzone for ID Card Upload */}
      <label>
        Upload ID Card (NIN, Passport, etc.):
        <Dropzone accept="image/*" onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              <p>Drag and drop some files here, or click to select files</p>
            </div>
          )}
        </Dropzone>
        {idCardImage && <img src={idCardImage} alt="ID Card" />}
      </label>

      {/* Submit Button */}
      <button type="submit" onClick={handleSubmit}>
        Submit Identification
      </button>

      <ToastContainer />
    </div>
  );
};

export default IdentificationPage;
