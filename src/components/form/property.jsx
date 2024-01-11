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
          propertyPicture: null, 
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
        const [submittedFormData] = useState(null); 
        

        const handleChange = (e) => {
          const { name, value, files } = e.target;
        
          if (name === 'propertyPicture') {
            // Handle file input separately
            setFormData((prevData) => ({
              ...prevData,
              propertyPicture: files[0],
            }));
          } else {
            // Handle regular inputs
            setFormData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
          }
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
          console.log('Property Owner Signature Data:', data);
        
          // Check if data is not null before updating the state
          if (data) {
            setFormData((prevData) => ({
              ...prevData,
              propertyOwnerSignature: data,
            }));
          }
        };
        
        const handleGuarantor1Signature = (data) => {
          console.log('Guarantor 1 Signature Data:', data);
        
          if (data) {
            setFormData((prevData) => ({
              ...prevData,
              guarantor1Signature: data,
            }));
          }
        };

        
        const handleGuarantor2Signature = (data) => {
          console.log('Guarantor 2 Signature Data:', data);
        
          if (data) {
            setFormData((prevData) => ({
              ...prevData,
              guarantor2Signature: data,
            }));
          }
        };


        const propertyTypeOptions = [
          { label: "Commercial Bulding", value: "Commercial Bulding" },
          { label: "Residential Building", value: "Residential Building" },
          { label: "Residential Land", value: "Residential Land" },
          { label: "Commercial Land", value: "Commercial Land" },
          { label: "Agricultural Land", value: "Agricultural Land" },
        ];
        if (!window.dataURLtoFile) {
          window.dataURLtoFile = async (dataUrl, filename) => {
            try {
              const response = await fetch(dataUrl);
              const blob = await response.blob();
              return new File([blob], filename, { type: blob.type });
            } catch (error) {
              console.error('Error converting data URL to file:', error);
              throw error;
            }
          };
        };
        const handleSubmit = async (e) => {
          e.preventDefault();
          setLoading(true);
        
          if (!formData.guarantor1Signature || !formData.guarantor2Signature) {
            toast.error('Guarantor signatures are required.');
            setLoading(false);
            return;
          }
        
          try {
            const formDataToSend = new FormData();
        
            // Append picture to the FormData
            if (formData.propertyPicture) {
              formDataToSend.append('propertyPicture', formData.propertyPicture);
            }
        
            // Convert signature data to files and append to FormData
            const appendSignatureToFormData = async (signature, name) => {
              if (signature) {
                const signatureBlob = await dataURLtoFile(signature, `${name}.png`);
                formDataToSend.append(name, signatureBlob);
              }
            };
        
            await appendSignatureToFormData(formData.propertyOwnerSignature, 'propertyOwnerSignature');
            await appendSignatureToFormData(formData.guarantor1Signature, 'guarantor1Signature');
            await appendSignatureToFormData(formData.guarantor2Signature, 'guarantor2Signature');
        
            // Append other form data
            Object.entries(formData).forEach(([key, value]) => {
              if (!['propertyPicture', 'propertyOwnerSignature', 'guarantor1Signature', 'guarantor2Signature'].includes(key)) {
                formDataToSend.append(key, value);
              }
            });
        
            const response = await fetch('https://backendweb-0kwi.onrender.com/api/submit-property-form', {
              method: 'POST',
              body: formDataToSend,
            });
        
            const responseData = await response.json(); 
            console.log('Server Response:', responseData);
        
            if (!response.ok) {
              throw new Error(responseData.error || 'Failed to submit form. Please try again.');
            }
        
            toast.success('Form submitted successfully!');
            setLoading(false);
            history.push('/identification');
          } catch (error) {
            console.error('Error submitting form:', error);
            toast.error(error.message || 'Failed to submit form. Please try again.');
            setLoading(false);
          }
        };

        const dataURLtoFile = async (dataUrl, filename) => {
          const response = await fetch(dataUrl);
          const blob = await response.blob();
          return new File([blob], filename, { type: blob.type });
        };
        
        return (
          <div>
          <form className="property-form" onSubmit={handleSubmit} encType="multipart/form-data">
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
            <label>
              Pictures of Properties:
              <input
                type="file"
                accept="image/*"
                name="propertyPicture"
                onChange={handleChange}
                required
              />
            </label>

            {/* Property Address */}
            <label>
              Address of Property:
              <textarea
                name="propertyAddress"  // Update here
                value={formData.propertyAddress}
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
                // ref={(ref) => handlePropertyOwnerSignature(ref)}
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
                // ref={(ref) => handleGuarantor1Signature(ref)}
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
                // ref={(ref) => handleGuarantor2Signature(ref)}
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
