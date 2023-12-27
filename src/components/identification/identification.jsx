// Import necessary libraries
import React, { useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Webcam from 'react-webcam';
import Dropzone from 'react-dropzone';
import './identification.css';

const IdentificationPage = () => {
  const [propertyOwner, setPropertyOwner] = useState({ idCardImage: null, faceImage: null });
  const [guarantor1, setGuarantor1] = useState({ idCardImage: null, faceImage: null });
  const [guarantor2, setGuarantor2] = useState({ idCardImage: null, faceImage: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const webcamRef = useRef(null);
  const history = useHistory();

  const handleDrop = (acceptedFiles, setImages) => {
    const file = acceptedFiles[0];

    if (!file || !file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file (e.g., JPEG, PNG) as your ID card.');
      return;
    }

    const idCardImageSrc = URL.createObjectURL(file);
    setImages({ idCardImage: idCardImageSrc, faceImage: null });
  };

  const captureImage = (setImages) => {
    const faceImageSrc = webcamRef.current.getScreenshot();
    setImages((prevImages) => ({ ...prevImages, faceImage: faceImageSrc }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

        // Check if all required images are uploaded
        if (
          !propertyOwner.faceImage ||
          !propertyOwner.idCardImage ||
          !guarantor1.faceImage ||
          !guarantor1.idCardImage ||
          !guarantor2.faceImage ||
          !guarantor2.idCardImage
        ) {
          setError('Please upload images for all sections');
          return;
        }
    
        // Reset error state
        setError('');

    setLoading(true);

    try {
      const response = await fetch('https://backendweb-0kwi.onrender.com/api/submit-identification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyOwner,
          guarantor1,
          guarantor2,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit identification details');
      }

      setLoading(false);
      toast.success('Identification details submitted successfully!');
      // Navigate to the property page after successful submission
      history.push('/property');
    } catch (error) {
      console.error('Error submitting identification details:', error);
      setLoading(false);
      toast.error('Failed to submit identification details. Please try again.');
    }
  };

  return (
    <div className="identification-page">
      <h2>Means of Identification</h2>

      {/* Property Owner Section */}
      <div className="identification-section">
        <h3>Property Owner</h3>
        <div className="webcam-container">
          <label className="webcam-label">
            Capturing:
            Please position your face correctly directly to the screen for capturing:
          </label>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            style={{ width: '100%', maxWidth: '500px' }}
            videoConstraints={{
              facingMode: 'user',
            }}
          />
          <button className="capture-btn" onClick={() => captureImage(setPropertyOwner)}>
            Capture Image
          </button>
        </div>
        <div className="captured-face-container">
          <label className="captured-face-label">Captured Face:</label>
          {propertyOwner.faceImage && (
            <img
              src={propertyOwner.faceImage}
              alt="Property Owner's Captured Face"
              className="captured-face-image"
            />
          )}
        </div>
        <div className="dropzone-container">
          <label className="dropzone-label">Upload ID Card (NIN, Passport, etc.):</label>
          <Dropzone accept="image/*" onDrop={(files) => handleDrop(files, setPropertyOwner)}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <p>Drag and drop some files here, or click to select files</p>
              </div>
            )}
          </Dropzone>
          {propertyOwner.idCardImage && (
            <img
              src={propertyOwner.idCardImage}
              alt="Property Owner's ID Card"
              className="id-card-image"
            />
          )}
        </div>
      </div>

      {/* Guarantor 1 Section */}
      <div className="identification-section">
        <h3>Guarantor 1</h3>
        <div className="webcam-container">
          <label className="webcam-label">
            Capturing:
            Please position your face correctly directly to the screen for capturing:
          </label>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            style={{ width: '100%', maxWidth: '500px' }}
            videoConstraints={{
              facingMode: 'user',
            }}
          />
          <button className="capture-btn" onClick={() => captureImage(setGuarantor1)}>
            Capture Image
          </button>
        </div>
        <div className="captured-face-container">
          <label className="captured-face-label">Captured Face:</label>
          {guarantor1.faceImage && (
            <img
              src={guarantor1.faceImage}
              alt="Guarantor 1's Captured Face"
              className="captured-face-image"
            />
          )}
        </div>
        <div className="dropzone-container">
          <label className="dropzone-label">Upload ID Card (NIN, Passport, etc.):</label>
          <Dropzone accept="image/*" onDrop={(files) => handleDrop(files, setGuarantor1)}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <p>Drag and drop some files here, or click to select files</p>
              </div>
            )}
          </Dropzone>
          {guarantor1.idCardImage && (
            <img
              src={guarantor1.idCardImage}
              alt="Guarantor 1's ID Card"
              className="id-card-image"
            />
          )}
        </div>
      </div>

      {/* Guarantor 2 Section */}
      <div className="identification-section">
        <h3>Guarantor 2</h3>
        <div className="webcam-container">
          <label className="webcam-label">
            Capturing:
            Please position your face correctly directly to the screen for capturing:
          </label>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            style={{ width: '100%', maxWidth: '500px' }}
            videoConstraints={{
              facingMode: 'user',
            }}
          />
          <button className="capture-btn" onClick={() => captureImage(setGuarantor2)}>
            Capture Image
          </button>
        </div>
        <div className="captured-face-container">
          <label className="captured-face-label">Captured Face:</label>
          {guarantor2.faceImage && (
            <img
              src={guarantor2.faceImage}
              alt="Guarantor 2's Captured Face"
              className="captured-face-image"
            />
          )}
        </div>
        <div className="dropzone-container">
          <label className="dropzone-label">Upload ID Card (NIN, Passport, etc.):</label>
          <Dropzone accept="image/*" onDrop={(files) => handleDrop(files, setGuarantor2)}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <p>Drag and drop some files here, or click to select files</p>
              </div>
            )}
          </Dropzone>
          {guarantor2.idCardImage && (
            <img
              src={guarantor2.idCardImage}
              alt="Guarantor 2's ID Card"
              className="id-card-image"
            />
          )}
        </div>
      </div>
      {/* Error message */}
      {error && <div className="error-message">{error}</div>}

      {/* Submit Button */}
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={
          loading ||
          !propertyOwner.faceImage ||
          !propertyOwner.idCardImage ||
          !guarantor1.faceImage ||
          !guarantor1.idCardImage ||
          !guarantor2.faceImage ||
          !guarantor2.idCardImage
        }
        className="submit-btn"
      >
        {loading ? (
          <div className="loader"></div>
        ) : (
          'Submit Identification'
        )}
      </button>


      <ToastContainer />
    </div>
  );
};

export default IdentificationPage;
