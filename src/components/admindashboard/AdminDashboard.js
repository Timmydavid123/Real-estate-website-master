import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('https://backendweb-0kwi.onrender.com/api/get-pending-properties');
        if (!response.ok) {
          throw new Error('Failed to fetch pending properties');
        }
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error('Error fetching pending properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleApproveProperty = async (propertyId) => {
    try {
      const response = await fetch(`https://backendweb-0kwi.onrender.com/api/approve-property/${propertyId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to approve property');
      }

      // Remove the approved property from the local state
      setProperties((prevProperties) => prevProperties.filter((property) => property.id !== propertyId));
    } catch (error) {
      console.error('Error approving property:', error);
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Loading properties...</p>
        </div>
      ) : (
        <table className="property-table">
          <thead>
            <tr>
            <th>Full Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Property Type</th>
              <th>Property Amount</th>
              <th>Property Pictures</th>
              <th>Property Address</th>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
              <th>Guarantor 1 Name</th>
              <th>Guarantor 1 Email</th>
              <th>Guarantor 1 Phone</th>
              <th>Guarantor 2 Name</th>
              <th>Guarantor 2 Email</th>
              <th>Guarantor 2 Phone</th>
              {/* Add other headers */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property, index) => (
              <tr key={index}>
                <td>{property.fullName}</td>
                <td>{property.emailAddress}</td>
                <td>{property.phoneNumber}</td>
                <td>{property.propertyType}</td>
                <td>{property.propertyAmount}</td>
                <td>
                  {/* Display property pictures (assuming propertyPictures is an array of URLs) */}
                  {property.propertyPictures.map((pictureUrl, picIndex) => (
                    <img
                      key={picIndex}
                      src={pictureUrl}
                      alt={`Property ${picIndex + 1}`}
                      style={{ maxWidth: '50px', maxHeight: '50px', margin: '5px' }}
                    />
                  ))}
                </td>
                <td>{property.propertyLocation.address}</td>
                <td>{property.propertyLocation.city}</td>
                <td>{property.propertyLocation.state}</td>
                <td>{property.propertyCountry}</td>
                <td>{property.guarantor1FullName}</td>
                <td>{property.guarantor1Email}</td>
                <td>{property.guarantor1Phone}</td>
                <td>{property.guarantor2FullName}</td>
                <td>{property.guarantor2Email}</td>
                <td>{property.guarantor2Phone}</td>
                {/* Display other property details */}
                <td>
                  <button className="approve-button" onClick={() => handleApproveProperty(property.id)}>
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
