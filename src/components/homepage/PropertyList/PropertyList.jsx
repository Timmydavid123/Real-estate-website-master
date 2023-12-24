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
          <img src={property.image_url} alt={property.title} />
          <h2>{property.title}</h2>
          <p>Price: {property.price}</p>
          <p>Location: {property.location}</p>
          <a href={`/property/${property.id}`} className="view-details">
            View Details
          </a>
        </div>
      ))}
    </div>
  );
}

export default PropertyList;
