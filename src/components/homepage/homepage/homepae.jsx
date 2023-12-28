import React, { useState, useEffect } from 'react';
import './homepage.css';
import Filter from '../filter/filter';
import PropertyList from '../PropertyList/PropertyList';
import Pagination from '../pagination/pagination';
import { states, Cities } from '../../data/Data';

const Property = () => {
  const [isLoggedIn, setLoggedIn] = useState(false); // Add this line
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [stateLocations, ] = useState(states);
  const [cityLocations, ] = useState(Cities);
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(10); 
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isLocationPopupVisible, setLocationPopupVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertyTypesResponse = await fetch('https://api.example.com/property-types');
        const propertyTypesData = await propertyTypesResponse.json();
        setPropertyTypes(propertyTypesData);

        const propertiesResponse = await fetch('https://api.example.com/properties');
        const propertiesData = await propertiesResponse.json();
        setProperties(propertiesData);
        setFilteredProperties(propertiesData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilter = (price, propertyTitle, location, propertyType) => {
    const filtered = properties.filter(property => {
      const isWithinPriceRange =
        (!price.min || property.price >= parseFloat(price.min)) &&
        (!price.max || property.price <= parseFloat(price.max));
      const isWithinPropertyTitle = !propertyTitle || property.title.includes(propertyTitle);
      const isWithinLocation = !location || property.location === location;
      const isWithinPropertyType = !propertyType || property.property_type === propertyType;

      return isWithinPriceRange && isWithinPropertyTitle && isWithinLocation && isWithinPropertyType;
    });

    setFilteredProperties(filtered);
    setCurrentPage(1);
  };

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleLocationClick = location => {
    setSelectedLocation(location);
    setLocationPopupVisible(true);
  
    // Filter properties based on the selected state
    const filtered = properties.filter(property => {
      return property.location === location;
    });
  
    setFilteredProperties(filtered);
    setCurrentPage(1);
  };
  
  const closeLocationPopup = () => {
    setSelectedLocation('');
    setLocationPopupVisible(false);
  };
  const handleLogout = () => {
    // Perform any necessary logout actions
    setLoggedIn(false);
  };

  const renderLocationPopup = () => {
    if (!selectedLocation || !isLocationPopupVisible) return null;
  
    const isState = stateLocations.includes(selectedLocation);
    const isCity = cityLocations.includes(selectedLocation);

    return (
      <div className="location-popup">
        <h2>{selectedLocation}</h2>
        <p>State: {isState ? selectedLocation : 'N/A'}</p>
        <p>City: {isCity ? selectedLocation : 'N/A'}</p>
        {isState && (
          <div>
            <h3>Cities</h3>
            <ul>
              {cityLocations
                .filter(city => city.state === selectedLocation)
                .map(city => (
                  <li key={city.name}>
                    {city.name} - {filteredProperties.filter(property => property.location === city.name).length} properties
                  </li>
                ))}
            </ul>
          </div>
        )}
        <button onClick={closeLocationPopup}>Close</button>
      </div>
    );
  };

  return (
<div className="App">
      <div className="top-bar">
        {/* <div className="logo-container">
          <img src="../images/logo.png" alt="Logo" className="logo" />
        </div> */}
        <button className="top-button">Settings</button>
        {isLoggedIn && <button className="top-button" onClick={handleLogout}>Logout</button>}
        <button className="top-button">Buy</button>
      </div>


      <div className="filter-container">
        <Filter
          onFilter={handleFilter}
          propertyTypes={propertyTypes}
          stateLocations={stateLocations}
          cityLocations={cityLocations}
          onLocationClick={handleLocationClick}
          filteredProperties={filteredProperties}
        />
      </div>

      {loading && <p className="loading-message">Loading properties...</p>}
      {error && <p className="error-message">Error loading properties. Please try again later.</p>}
      {!loading && !error && (
        <div className="property-list-container">
          <PropertyList properties={currentProperties} loading={loading} onLocationClick={handleLocationClick} />
          <Pagination
            propertiesPerPage={propertiesPerPage}
            totalProperties={filteredProperties.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      )}
      {renderLocationPopup()}
    </div>
  );
};

export default Property;
