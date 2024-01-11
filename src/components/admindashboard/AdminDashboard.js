import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';

const BASE_URL = 'https://backendweb-0kwi.onrender.com/api';

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${BASE_URL}/properties`);
  
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
  
        const result = await response.json();
        console.log('Fetched properties data:', result.data);
        setProperties(result.data); // Update to use result.data
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProperties();
  }, []);

  const handleApproveProperty = async (propertyId) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/approve-property/${propertyId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'approved' }),
      });

      if (!response.ok) {
        throw new Error('Failed to approve property');
      }

      setProperties((prevProperties) =>
        prevProperties.map((property) =>
         property._id === propertyId ? { ...property, status: 'approved' } : property
        )
      );
    } catch (error) {
      console.error('Error approving property:', error);
      
    }
  };

  const handleDisapproveProperty = async (propertyId) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/approve-property/${propertyId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'disapproved' }),
      });

      if (!response.ok) {
        throw new Error('Failed to disapprove property');
      }

      setProperties((prevProperties) => prevProperties.filter((property) => property.id !== propertyId));
    } catch (error) {
      console.error('Error disapproving property:', error);
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
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property._id}>
                <td>{property.fullName}</td>
                <td>{property.emailAddress}</td>
                <td>{property.phoneNumber}</td>
                <td>{property.propertyType}</td>
                <td>{property.propertyAmount}</td>
                <td>
                  <h3>Property Pictures</h3>
                  {property.propertyPictures?.map((picture, index) => (
                    <img
                      key={index}
                      src={picture.url}
                      alt={`Property ${index}`}
                      style={{ maxWidth: '150px', maxHeight: '150px', margin: '5px' }}
                    />
                  ))}
                </td>
                <td>{property.propertyLocation?.address}</td>
                <td>{property.propertyLocation?.city}</td>
                <td>{property.propertyLocation?.state}</td>
                <td>{property.propertyCountry}</td>
                <td>propertyOwner Signature: {typeof property.propertyOwnerSignature === 'object' ? 'Signature Object' : 'No Signature'}</td>
                <td>{property.guarantor1FullName}</td>
                <td>{property.guarantor1Email}</td>
                <td>{property.guarantor1Phone}</td>
                <td>Guarantor 1 Signature: {typeof property.guarantor1Signature === 'object' ? 'Signature Object' : 'No Signature'}</td>
                <td>{property.guarantor2FullName}</td>
                <td>{property.guarantor2Email}</td>
                <td>{property.guarantor2Phone}</td>
                <td>Guarantor 2 Signature: {typeof property.guarantor2Signature === 'object' ? 'Signature Object' : 'No Signature'}</td>
                <td>{property.status}</td>
                <td>
                  {property.status === 'pending' && (
                    <>
                      <button className="approve-button" onClick={() => handleApproveProperty(property.id)}>
                        Approve
                      </button>
                      <button className="disapprove-button" onClick={() => handleDisapproveProperty(property.id)}>
                        Disapprove
                      </button>
                    </>
                  )}
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
