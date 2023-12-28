// components/PropertyList.js
import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import './PropertyList.css';

function PropertyList({  loading, onLocationClick }) {

  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Update the URL to your backend API endpoint
        const response = await fetch('https://your-backend-api.com/properties');
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
        
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProperties();
  }, []); // Empty dependency array to fetch data only once on component mount

  if (loading) {
    return <p className="property-list-loader">Loading properties...</p>;
  }

  if (properties.length === 0) {
    return (
      <div className="property-list-error">
        <FaExclamationTriangle className="error-icon" />
        <p>No properties found.</p>
      </div>
    );
  }

  return (
    <div className="property-list">
      {properties.map(property => (
        <div className="property-card" key={property.id}>
          <div className="property-image">
            <img src={property.image_url} alt={property.title} />
          </div>
          <div className="property-details">
            <div className="property-header">
              <h2>{property.title}</h2>
              {property.verified && <p className="verified-label">Verified</p>}
            </div>
            <p className="property-type">{property.property_type}</p>
            <p className="property-address">{property.address}</p>
            <p className="property-price">Price: {property.price}</p>

            {/* Display additional form-submitted information */}
            <div className="additional-info">
              <h3>Additional Information:</h3>
              <p>Property Type: {property.formSubmittedData.propertyType}</p>
              <p>Amount: {property.formSubmittedData.propertyAmount}</p>
              <p>Location: {property.formSubmittedData.propertyLocation.city}, {property.formSubmittedData.propertyLocation.state}</p>

              {/* Display multiple property pictures */}
              <div className="property-pictures">
                {property.formSubmittedData.propertyPictures.map((picture, index) => (
                  <img key={index} src={URL.createObjectURL(picture)} alt={`Property ${index}`} />
                ))}
              </div>
            </div>

            <a href={`/property/${property.id}`} className="view-details">
              View Details
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PropertyList;
