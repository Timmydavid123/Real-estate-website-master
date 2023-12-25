import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import Select from 'react-select';
import { states, Cities, LGAs } from '../data/Data';
import './property.css';
import Fingerprint2 from 'fingerprintjs2';


const PropertyForm = () => {
  // Use useHistory instead of useNavigate
  const history = useHistory();

  const getFingerprint = async () => {
    return new Promise((resolve, reject) => {
      Fingerprint2.get({}, (components) => {
        const values = components.map((component) => component.value);
        const fingerprint = Fingerprint2.x64hash128(values.join(''), 31);
        resolve(fingerprint);
      });
    });
  };
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
    propertyOwnerSignature: null,
    guarantor1Signature: null,
    guarantor2Signature: null,
  });
  const [thumbprints, setThumbprints] = useState({
    propertyOwnerThumb: null,
    guarantor1Thumb: null,
    guarantor2Thumb: null,
  });

  const isValidThumbprint = (data) => {
    // Implement your thumbprint validation logic here
    // For example, you can check the length of the data or use a library for thumbprint recognition
    return data.length > 100; // Adjust this condition based on your thumbprint characteristics
  };

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
  const handlepropertyOwnerSignature = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      guarantor1Signature: data,
    }));
  };
  const handleGuarantor1Signature = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      guarantor1Signature: data,
    }));
  };

  const handleGuarantor2Signature = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      guarantor2Signature: data,
    }));
  };



  const handlePropertyOwnerThumb = async (data) => {
    try {
      const fingerprint = await getFingerprint();
      if (isValidThumbprint(fingerprint)) {
        setThumbprints((prevThumbprints) => ({
          ...prevThumbprints,
          propertyOwnerThumb: fingerprint,
        }));
      } else {
        toast.error('Invalid thumbprint. Please try again.');
      }
    } catch (error) {
      console.error('Error getting fingerprint:', error);
      toast.error('Failed to get fingerprint. Please try again.');
    }
  };

  const handleGuarantor1Thumb = async (data) => {
    try {
      const fingerprint = await getFingerprint();
      if (isValidThumbprint(fingerprint)) {
        setThumbprints((prevThumbprints) => ({
          ...prevThumbprints,
          guarantor1Thumb: fingerprint,
        }));
      } else {
        toast.error('Invalid thumbprint. Please try again.');
      }
    } catch (error) {
      console.error('Error getting fingerprint:', error);
      toast.error('Failed to get fingerprint. Please try again.');
    }
  };
  
  const handleGuarantor2Thumb = async (data) => {
    try {
      const fingerprint = await getFingerprint();
      if (isValidThumbprint(fingerprint)) {
        setThumbprints((prevThumbprints) => ({
          ...prevThumbprints,
          guarantor2Thumb: fingerprint,
        }));
      } else {
        toast.error('Invalid thumbprint. Please try again.');
      }
    } catch (error) {
      console.error('Error getting fingerprint:', error);
      toast.error('Failed to get fingerprint. Please try again.');
    }
  };
  const handleResetPropertyOwner = () => {
    setFormData((prevData) => ({
      ...prevData,
      fullName: '',
      emailAddress: '',
      phoneNumber: '',
      propertyType: '',
      propertyAmount: '',
      propertyPictures: [],
      propertyLocation: {
        state: '',
        city: '',
        lga: '',
      },
      propertyAddress: '',
      propertyCountry: '',
      propertyOwnerSignature: null,
    }));
    setThumbprints((prevThumbprints) => ({
      ...prevThumbprints,
      propertyOwnerThumb: null,
    }));
  };

  const handleResetGuarantor1 = () => {
    setFormData((prevData) => ({
      ...prevData,
      guarantor1FullName: '',
      guarantor1Email: '',
      guarantor1Phone: '',
      guarantor1Address: '',
      guarantor1Signature: null,
    }));
    setThumbprints((prevThumbprints) => ({
      ...prevThumbprints,
      guarantor1Thumb: null,
    }));
  };

  const handleResetGuarantor2 = () => {
    setFormData((prevData) => ({
      ...prevData,
      guarantor2FullName: '',
      guarantor2Email: '',
      guarantor2Phone: '',
      guarantor2Address: '',
      guarantor2Signature: null,
    }));
    setThumbprints((prevThumbprints) => ({
      ...prevThumbprints,
      guarantor2Thumb: null,
    }));
  };


  const propertyTypeOptions = [
    { label: "Commercial Bulding", value: "Commercial Bulding" },
    { label: "Residential Building", value: "Residential Building" },
    { label: "Residential Land", value: "Residential Land" },
    { label: "Commercial Land", value: "Commercial Land" },
    { label: "Agricultural Land", value: "Agricultural Land" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Display loader
    setLoading(true);


    // Check if guarantor signatures are provided
    if (!formData.guarantor1Signature || !formData.guarantor2Signature) {
      toast.error('Guarantor signatures are required.');
      setLoading(false);
      return;
    }

    // // Validate all fields are filled
    // const formFields = Object.values(formData).flat();
    // if (formFields.some((field) => !field)) {
    //   toast.error('Please fill in all required fields.');
    //   // Hide loader
    //   setLoading(false);
    //   return;
    // }

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

      // Navigate to the identification page after successful submission
      history.push('/identification');

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
          required
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
          required
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
          required
        />
      </label>

       {/* Type of Property */}
       <label>
        Type of Property:
        <Select
          value={propertyTypeOptions.find(option => option.value === formData.propertyType)}
          onChange={(selectedOption) => setFormData((prevData) => ({
            ...prevData,
            propertyType: selectedOption.value,
          }))}
          options={propertyTypeOptions}
          placeholder="Select Property Type"
          required
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
          required
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
          required
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
            required
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
            required
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
            required
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
          required
        />
      </label>

      <label>
        <h5 className="small-text">Please sign on the blank space below</h5>
        Signature:
        <SignatureCanvas
          penColor="black"
          canvasProps={{ width: 400, height: 200, className: 'signature-canvas' }}
          onEnd={(data) => handlepropertyOwnerSignature(data)}
          required
        />
      </label>

      {/* Property Owner Thumbprint */}
      <label>
      <h5 className="small-text">Please place your thumb on the blank space below</h5>
        Thumbprint:
        <SignatureCanvas
          penColor="black"
          canvasProps={{ width: 400, height: 200, className: 'thumbprint-canvas' }}
          onEnd={(data) => handlePropertyOwnerThumb(data)}
          required
        />
      </label>  
      <button type="button" onClick={handleResetPropertyOwner}>
        Reset Property Owner Form
      </button>

      <h2>Guarantor 1 Information</h2>

      {/* Guarantor 1 Full Name */}
      <label>
        Full Name:
        <input
          type="text"
          name="guarantor1FullName"
          value={formData.guarantor1FullName}
          onChange={handleChange}
          required
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
          required
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
          required
        />
      </label>

      {/* Guarantor 1 Address */}
      <label>
        Address:
        <textarea
          name="guarantor1Address"
          value={formData.guarantor1Address}
          onChange={handleChange}
          required
        ></textarea>
      </label>
      <label>
      <h5 className="small-text">Please sign on the blank space below</h5>
        Signature:
        <SignatureCanvas
          penColor="black"
          canvasProps={{ width: 400, height: 200, className: 'signature-canvas' }}
          onEnd={(data) => handleGuarantor1Signature(data)}
          required
        />
      </label>

        {/* Guarantor 1 Thumbprint */}
        <label>
          Thumbprint:
          <h5 className="small-text">Please place your thumb on the blank space below</h5>
          <SignatureCanvas
            penColor="black"
            canvasProps={{ width: 400, height: 200, className: 'thumbprint-canvas' }}
            onEnd={(data) => handleGuarantor1Thumb(data)}
            required
          />
        </label>

      <button type="button" onClick={handleResetGuarantor1}>
        Reset Guarantor 1 Form
      </button>

      <h2>Guarantor 2 Information</h2>

      {/* Guarantor 2 Full Name */}
      <label>
        Full Name:
        <input
          type="text"
          name="guarantor2FullName"
          value={formData.guarantor2FullName}
          onChange={handleChange}
          required
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
          required
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
          required
        />
      </label>

      {/* Guarantor 2 Address */}
      <label>
        Address:
        <textarea
          name="guarantor2Address"
          value={formData.guarantor2Address}
          onChange={handleChange}
          required
        ></textarea>
      </label>
      <label>
      <h5 className="small-text">Please sign on the blank space below</h5>
        Signature:
        <SignatureCanvas
          penColor="black"
          canvasProps={{ width: 400, height: 200, className: 'signature-canvas' }}
          onEnd={(data) => handleGuarantor2Signature(data)}
          required
        />
      </label>
        {/* Guarantor 2 Thumbprint */}
        <label >
        <h5 className="small-text">Please place you thumb on the blank space below</h5>
          Thumbprint:
          <SignatureCanvas
            penColor="black"
            canvasProps={{ width: 400, height: 200, className: 'thumbprint-canvas' }}
            onEnd={(data) => handleGuarantor2Thumb(data)}
            required
          />
        </label>

        <button type="button" onClick={handleResetGuarantor2}>
        Reset Guarantor 2 Form
      </button>

      {/* Submit Button */}
      <button type="subt">Submit</button>
      {loading && <div className="loader"></div>}
      <ToastContainer />
    </form>
  );
};

export default PropertyForm;  
