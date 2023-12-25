import React, { useState, useRef, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Webcam from 'react-webcam';
import Dropzone from 'react-dropzone';
import * as faceapi from 'face-api.js';
import './identification.css';

// Tolerance threshold for face recognition
const TOLERANCE_THRESHOLD = 5;

const IdentificationPage = () => {
  const [idCardImage, setIdCardImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isWebcamReady, setWebcamReady] = useState(false);

  const webcamRef = useRef(null);

  // Function to load Face API models
  const loadFaceApiModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
  };

  useEffect(() => {
    loadFaceApiModels();
  }, []);

  // Function to capture face from the webcam
  const captureFace = async () => {
    if (!webcamRef.current) return;

    // Wait for the webcam to be ready
    if (!isWebcamReady) {
      toast.error('Webcam is not ready. Please try again.');
      return;
    }

    const faceImageSrc = webcamRef.current.getScreenshot();

    const faceCanvas = await faceapi.createCanvasFromMedia(faceImageSrc);
    const detections = await faceapi
      .detectAllFaces(faceCanvas, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors();

    if (detections.length > 0) {
      const faceDescriptor = detections[0].descriptor;

      // You can add your face recognition logic here
      // Compare face descriptor with other descriptors based on TOLERANCE_THRESHOLD

      console.log('Face Descriptor:', faceDescriptor);

      // Continue with the captured face image
    } else {
      toast.error('No face detected. Please try again.');
    }
  };

  // Function to handle the ID card upload
  const handleDrop = async (acceptedFiles) => {
    const idCardImageSrc = URL.createObjectURL(acceptedFiles[0]);
    setIdCardImage(idCardImageSrc);

    setLoading(true);

    // Perform face recognition against the captured face
    await captureFace();

    // Perform OCR to check if the ID card contains valid text
    // Add your OCR logic here

    setLoading(false);
  };

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idCardImage) {
      toast.error('Please upload a valid ID card before submitting.');
      return;
    }

    setLoading(true);

    // Perform face recognition against the captured face
    await captureFace();

    // Perform OCR to check if the ID card contains valid text
    // Add your OCR logic here

    // Include logic to send captured images and data to the backend
    // ...

    setLoading(false);
    toast.success('Identification details submitted successfully!');
  };

  // Callback function when the webcam is successfully loaded
  const handleWebcamUserMedia = () => {
    setWebcamReady(true);
  };

  return (
    <div className="identification-page">
      <h2>Means of Identification</h2>

      {/* Webcam for Face Capture */}
      <label>
        Capturing:
        Please position your face correctly directly to the screen for capturing:
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{ width: 500, height: 200 }}
          onUserMedia={handleWebcamUserMedia}
        />
        <button onClick={captureFace}>Capture Face</button>
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
      <button type="submit" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Identification'}
      </button>

      <ToastContainer />
    </div>
  );
};

export default IdentificationPage;
