import React, { useState} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import Select from 'react-select';
import { states, Cities, LGAs } from '../data/Data';
import './property.css';
import PropertyList from '../homepage/PropertyList/PropertyList'; 


const PropertyForm = () => {
  // Use useHistory instead of useNavigate
  const history = useHistory();

  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    propertyType: '',
    propertyAmount: '',
    propertyPictures: [], // Ensure propertyPictures is initialized as an empty array
    propertyLocation: {
      state: '',
      city: '',
      lga: '', 
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

  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedLGA, setSelectedLGA] = useState(null);

  const [loading, setLoading] = useState(false);
  const [submittedFormData, setSubmittedFormData] = useState(null); 
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = async (e) => {
    const { name, type } = e.target;

    if (name === 'propertyPictures') {
      const files = e.target.files;

        if (files) {
          const picturePreviews = [];
  
          for (const file of files) {
            const dataUrl = await readFileAsync(file);
            picturePreviews.push(dataUrl);
          }
  
          setFormData((prevData) => ({
            ...prevData,
            propertyPictures: files, // Keep the files for backend upload
          }));
  
          setImagePreviews(picturePreviews);
        }
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: type === 'file' ? e.target.files : e.target.value,
        }));
      }
    };
  

  const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
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
  const handlePropertyOwnerSignature = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      propertyOwnerSignature: data,
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


    try {
      // Send form data to backend
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        // If it's an array of files, append each file separately
        if (Array.isArray(value) && value[0] instanceof File) {
          value.forEach((file, index) => {
            formDataToSend.append(`${key}_${index}`, file);
          });
        } else {
          formDataToSend.append(key, value);
        }
      });

      const response = await fetch('https://backendweb-0kwi.onrender.com/api/submit-property-form', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to submit form. Please try again.');
      }

      toast.success('Form submitted successfully!');
      // Hide loader
      setLoading(false);

      // Save form data if needed
      setSubmittedFormData(formData);

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
    <div>
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
          // capture="user"
          name="propertyPictures"
          onChange={handleChange}
          required // Make it required
        />
        {/* Show uploaded pictures */}
        {imagePreviews.length > 0 && (
          <img
            src={imagePreviews[0]} // Only display the first image (the one snapped)
            alt={`Property 0`}
            style={{ maxWidth: '150px', maxHeight: '150px', margin: '5px' }}
          />
        )}
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
          onEnd={(data) => handlePropertyOwnerSignature (data)}
          required
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

      {/* Submit Button */}
      <button type="submit">Submit</button>
      {loading && <div className="loader"></div>}
      <ToastContainer />
    </form>

      {/* Render PropertyList with submittedFormData */}
      {submittedFormData && <PropertyList formSubmittedData={submittedFormData} />}
    </div>
  );
};

export default PropertyForm; 
