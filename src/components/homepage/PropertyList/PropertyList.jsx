// components/PropertyList.js
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import './PropertyList.css';

function PropertyList({ properties, loading, onLocationClick }) {
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
