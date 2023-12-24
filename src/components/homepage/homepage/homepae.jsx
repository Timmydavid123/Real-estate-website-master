import React, { useState, useEffect } from 'react';
import './homepage.css';
import Filter from '../filter/filter';
import PropertyList from '../PropertyList/PropertyList';
import Pagination from '../pagination/pagination';
import { states, Cities } from '../../data/Data';

const Property = () => {
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [stateLocations, setStateLocations] = useState(states);
  const [cityLocations, setCityLocations] = useState(Cities);
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(10);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isLocationPopupVisible, setLocationPopupVisible] = useState(false);

  useEffect(() => {
    fetch('https://api.example.com/property-types')
      .then(response => response.json())
      .then(data => setPropertyTypes(data))
      .catch(error => setError(error));

    fetch('https://api.example.com/properties')
      .then(response => response.json())
      .then(data => {
        setProperties(data);
        setFilteredProperties(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
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
  };

  const closeLocationPopup = () => {
    setSelectedLocation('');
    setLocationPopupVisible(false);
  };

  return (
    <div className="App">
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
      {selectedLocation && isLocationPopupVisible && (
        <div className="location-popup">
          <h2>{selectedLocation}</h2>
          <p>State: {stateLocations.includes(selectedLocation) ? selectedLocation : 'N/A'}</p>
          <p>City: {cityLocations.includes(selectedLocation) ? selectedLocation : 'N/A'}</p>
          {stateLocations.includes(selectedLocation) && (
            <div>
              <h3>Cities</h3>
              <ul>
                {cityLocations
                  .filter(city => city.state === selectedLocation)
                  .map(city => (
                    <li key={city.name}>
                      {city.name} -{' '}
                      {
                        filteredProperties.filter(property => property.location === city.name).length
                      }{' '}
                      properties
                    </li>
                  ))}
              </ul>
            </div>
          )}
          <button onClick={closeLocationPopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Property;