// Filter.js

import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './filter.css';
// import { states, cities } from '../../data/Data';

const Filter = ({ onFilter, stateLocations, cityLocations, onLocationClick }) => {
  const [location, setLocation] = useState('All Nigeria');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000000000);


  // Ensure that minPrice is less than or equal to maxPrice
  if (minPrice > maxPrice) {
    // Swap values if needed
    const temp = minPrice;
    setMinPrice(maxPrice);
    setMaxPrice(temp);
  }

  const handleLocationClickInternal = (selectedLocation) => {
    setLocation(selectedLocation);
    onLocationClick(selectedLocation);
  };

  const handleApplyFilter = () => {
    const filterData = {
      minPrice,
      maxPrice,
      location,
    };
    onFilter(filterData);
  };


  return (
    <div className="container">
      <div className="row">
        <aside className="col-md-3">
          <Card>
            {/* Categories */}
            <article className="filter-group">
              <header className="card-header">
                  <a href="*#" data-toggle="collapse" data-target="#collapse_1" aria-expanded="true" className="">
                    <i className="icon-control fa fa-chevron-down"></i>
                    <h6 className="title">Categories</h6>
                  </a>
              </header>
              <div className="filter-content collapse show" id="collapse_1">
                <div className="card-body">
                  <form className="pb-3">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Search" />
                      <div className="input-group-append">
                        <button className="btn btn-light" type="button"><i className="fa fa-search"></i></button>
                      </div>
                    </div>
                  </form>
                  <ul className="list-menu">
                    <li><a href="*#">Commercial Buiding </a></li>
                    <li><a href="*#">Residential Building </a></li>
                    <li><a href="*#">Commercial Land </a></li>
                    <li><a href="*#">Residential Land </a></li>
                    <li><a href="*#">Agricultural Land </a></li>
                  </ul>
                </div>
              </div>
            </article>


            {/* Location */}
            <article className="filter-group">
              <header className="card-header">
                <a href="*#" data-toggle="collapse" data-target="#collapse_2" aria-expanded="true" className="*#">
                  <i className="icon-control fa fa-chevron-down"></i>
                  <h6 className="title">Location</h6>
                </a>
              </header>
              <div className="unique-filter-location">
                <div className="unique-filter-location-heading">Location</div>
                <div
                  className="unique-filter-current-location text-align-center cursor-pointer"
                  onClick={() => handleLocationClickInternal('All Nigeria')}
                >
                  {location}
                </div>
                <div className="filter-content collapse show" id="collapse_2">
                  <div className="card-body">
                    {/* Display states */}
                    <ul>
                      {stateLocations.map((state) => (
                        <li
                          key={state.label}
                          onClick={() => handleLocationClickInternal(state.label)}
                          className="cursor-pointer"
                        >
                          {state.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>

            {/* Price Range */}
            <article className="filter-group">
              <header className="card-header">
                <a href="*#" data-toggle="collapse" data-target="#collapse_3" aria-expanded="true" className="">
                  <i className="icon-control fa fa-chevron-down"></i>
                  <h6 className="title">Price range </h6>
                </a>
                </header>
              <div className="filter-content collapse show" id="collapse_3">
                <div className="card-body">
                  <input type="range" className="custom-range" min="0" max="100" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Min</label>
                      <input className="form-control" placeholder="₦0" type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                    </div>
                    <div className="form-group text-right col-md-6">
                      <label>Max</label>
                      <input className="form-control" placeholder="₦100,000,000,0000" type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                    </div>
                  </div>
                  <button className="btn btn-block btn-primary" onClick={handleApplyFilter}>
                    Apply
                  </button>
                </div>
              </div>
            </article>
      
            {/* Apply Button */}
            <div className="filter-actions">
              <button className="btn btn-primary btn-block" onClick={handleApplyFilter}>
                Apply
              </button>
            </div>
          </Card>
        </aside>

        <main className="col-md-9">
          <header className="border-bottom mb-4 pb-3">
            <div className="form-inline">
              <span className="mr-md-auto">32 Items found </span>
              <select className="mr-2 form-control">
                <option>Latest Properties</option>
                <option>Highest Price</option>
                <option>Normal Price</option>
                <option>Lowest Price</option>
              </select>
              <div className="btn-group">
                <a href="*#" className="btn btn-outline-secondary" data-toggle="tooltip" title="" data-original-title="List view">
                  <i className="fa fa-bars"></i></a>
                <a href="*#" className="btn btn-outline-secondary active" data-toggle="tooltip" title="" data-original-title="Grid view">
                  <i className="fa fa-th"></i></a>
              </div>
            </div>
          </header>
        </main>
      </div>
    </div>
  );
};

export default Filter;
