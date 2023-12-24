import React, { useState } from "react";
import Heading from "../../common/Heading";
import Select from "react-select"; 
import "./hero.css";
import { Cities, states } from "../../data/Data"; // Import the cities and states data
import "@fortawesome/fontawesome-free/css/all.min.css";

const Hero = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState('');

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption.value);
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption.value);
  };

  const handlePropertyTypeChange = (selectedOption) => {
    setSelectedPropertyType(selectedOption.value);
  };

  // Options for Property Type
  const propertyTypeOptions = [
    { label: "Commercial Bulding", value: "Commercial Bulding" },
    { label: "Residential Building", value: "Residential Building" },
    { label: "Residential Land", value: "Land" },
    { label: "Commercial Land", value: "Commercial Land" },
    { label: "Agricultural Land", value: "Agricultural Land" },
  ];

  return (
    <>
      <section className='hero'>
        <div className='container'>
          <div className="top-left-content">
            <h5>BUY | SELL</h5>
            <h3>Payment Option: Full Payment | Installmental Payment | Crowd Funding </h3>
          </div>
          <Heading title='Buy and Sell Homes at Your Own Price with Flexibility!: Unlock Your Ideal Property Journey:' />

          <form className='flex'>
            <div className='box'>
              <Select
                value={Cities.find(city => city.value === selectedCity)}
                onChange={handleCityChange}
                options={Cities}
                placeholder="Select City"
              />
            </div>
            <div className='box'>
              <Select
                value={states.find(state => state.value === selectedState)}
                onChange={handleStateChange}
                options={states}
                placeholder="Select State"
              />
            </div>
            <div className='box'>
              <Select
                value={propertyTypeOptions.find(type => type.value === selectedPropertyType)}
                onChange={handlePropertyTypeChange}
                options={propertyTypeOptions}
                placeholder="Select Property Type"
              />
            </div>
            <div className='box'>
              <h4>Advance Filter</h4>
            </div>
            <button className='btn10'>
              <i className='fa fa-search'></i>
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Hero;
