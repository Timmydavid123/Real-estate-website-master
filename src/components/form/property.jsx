import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import { states, Cities, LGAs } from '../data/Data';
import './property.css';


const PropertyForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    propertyType: '',
    propertyAmount: '',
    propertyPictures: [],
    propertyLocation: {
      state: '',
      city: '',
      lga: '', // Add LGA here
    },
    propertyAddress: '',
    propertyCountry: '',
    guarantor1FullName: '',
    guarantor1Email: '',
    guarantor1Phone: '',
    guarantor1Address: '',
    guarantor2FullName: '',
    guarantor2Email: '',
    guarantor2Phone: '',
    guarantor2Address: '',
  });

  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedLGA, setSelectedLGA] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? e.target.files : value,
    }));
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    setFormData((prevData) => ({
      ...prevData,
      propertyLocation: {
        ...prevData.propertyLocation,
        state: selectedOption.value,
      },
    }));
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    setFormData((prevData) => ({
      ...prevData,
      propertyLocation: {
        ...prevData.propertyLocation,
        city: selectedOption.value,
      },
    }));
  };

  const handleLGAChange = (selectedOption) => {
    setSelectedLGA(selectedOption);
    setFormData((prevData) => ({
      ...prevData,
      propertyLocation: {
        ...prevData.propertyLocation,
        lga: selectedOption.value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Display loader
    setLoading(true);

    // Validate all fields are filled
    const formFields = Object.values(formData).flat();
    if (formFields.some((field) => !field)) {
      toast.error('Please fill in all required fields.');
      // Hide loader
      setLoading(false);
      return;
    }

    try {
      // Send form data to backend
      const response = await fetch('https://backendweb-0kwi.onrender.com/submit-property-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form. Please try again.');
      }

      toast.success('Form submitted successfully!');
      // Hide loader
      setLoading(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit form. Please try again.');
      // Hide loader
      setLoading(false);
    }
  };

  return (
    <form className="property-form" onSubmit={handleSubmit}>
      <h2>Property Information</h2>

      {/* Full Name */}
      <label>
        Full Name:
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
      </label>

      {/* Email Address */}
      <label>
        Email Address:
        <input
          type="email"
          name="emailAddress"
          value={formData.emailAddress}
          onChange={handleChange}
        />
      </label>

      {/* Phone Number */}
      <label>
        Phone Number:
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </label>

      {/* Type of Property */}
      <label>
        Type of Property:
        <input
          type="text"
          name="propertyType"
          value={formData.propertyType}
          onChange={handleChange}
        />
      </label>

      {/* Amount of Property */}
      <label>
        Amount of Property (₦):
        <input
          type="text"
          name="propertyAmount"
          placeholder="₦"
          value={formData.propertyAmount}
          onChange={handleChange}
        />
      </label>

      {/* Picture of Properties (Camera Supported) */}
      <label>
        Pictures of Properties:
        <input
          type="file"
          accept="image/*"
          capture="environment"
          name="propertyPictures"
          onChange={handleChange}
          multiple // Allow multiple file selection
          required // Make it required
        />
        {/* Show uploaded pictures */}
        {Array.isArray(formData.propertyPictures) &&
          formData.propertyPictures.map((picture, index) => (
            <img key={index} src={URL.createObjectURL(picture)} alt={`Property ${index}`} />
          ))}
      </label>

      {/* Property Address */}
      <label>
        Address of Property:
        <textarea
          name="propertyLocation.address"
          value={formData.propertyLocation.address}
          onChange={handleChange}
        ></textarea>
      </label>

      {/* Property City */}
      <label className="location-label">
        <span>City of Property:</span>
        <div className="location-dropdown">
          <Select
            value={selectedCity}
            onChange={handleCityChange}
            options={Cities}
            placeholder="Select City"
          />
        </div>
      </label>

      {/* LGA of Property */}
      <label>
        <span>LGA of Property:</span>
        <div className="location-dropdo">
          <Select
            value={selectedLGA}
            onChange={handleLGAChange}
            options={LGAs}
            placeholder="Select LGA"
          />
        </div>
      </label>

      {/* State of Property */}
      <label>
        State of Property:
        <div className="location-dropdown">
          <Select
            value={selectedState}
            onChange={handleStateChange}
            options={states}
            placeholder="Select State"
          />
        </div>
      </label>

      {/* Country of Property */}
      <label>
        Country of Property:
        <input
          type="text"
          name="propertyCountry"
          value={formData.propertyCountry}
          onChange={handleChange}
        />
      </label>

      <h2>Guarantor 1 Information</h2>

      {/* Guarantor 1 Full Name */}
      <label>
        Full Name:
        <input
          type="text"
          name="guarantor1FullName"
          value={formData.guarantor1FullName}
          onChange={handleChange}
        />
      </label>

      {/* Guarantor 1 Email */}
      <label>
        Email Address:
        <input
          type="email"
          name="guarantor1Email"
          value={formData.guarantor1Email}
          onChange={handleChange}
        />
      </label>

      {/* Guarantor 1 Phone Number */}
      <label>
        Phone Number:
        <input
          type="tel"
          name="guarantor1Phone"
          value={formData.guarantor1Phone}
          onChange={handleChange}
        />
      </label>

      {/* Guarantor 1 Address */}
      <label>
        Address:
        <textarea
          name="guarantor1Address"
          value={formData.guarantor1Address}
          onChange={handleChange}
        ></textarea>
      </label>

      <h2>Guarantor 2 Information</h2>

      {/* Guarantor 2 Full Name */}
      <label>
        Full Name:
        <input
          type="text"
          name="guarantor2FullName"
          value={formData.guarantor2FullName}
          onChange={handleChange}
        />
      </label>

      {/* Guarantor 2 Email */}
      <label>
        Email Address:
        <input
          type="email"
          name="guarantor2Email"
          value={formData.guarantor2Email}
          onChange={handleChange}
        />
      </label>

      {/* Guarantor 2 Phone Number */}
      <label>
        Phone Number:
        <input
          type="tel"
          name="guarantor2Phone"
          value={formData.guarantor2Phone}
          onChange={handleChange}
        />
      </label>

      {/* Guarantor 2 Address */}
      <label>
        Address:
        <textarea
          name="guarantor2Address"
          value={formData.guarantor2Address}
          onChange={handleChange}
        ></textarea>
      </label>

      {/* Submit Button */}
      <button type="submit">Submit</button>
      {loading && <div className="loader"></div>}
      <ToastContainer />
    </form>
  );
};

export default PropertyForm;  
