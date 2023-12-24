import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './filter.css';

const Filter = ({ onFilter }) => {
  const [location, setLocation] = useState('All Nigeria');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000000000);
  const [condition, setCondition] = useState('Any condition');


    // Ensure that minPrice is less than or equal to maxPrice
    if (minPrice > maxPrice) {
      // Swap values if needed
      const temp = minPrice;
      setMinPrice(maxPrice);
      setMaxPrice(temp);
    }

  const handleApplyFilter = () => {
    const filterData = {
      minPrice,
      maxPrice,
      location,
      condition,
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
                  <a href="#" data-toggle="collapse" data-target="#collapse_1" aria-expanded="true" className="">
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
                    <li><a href="*#">Commercial Properties </a></li>
                    <li><a href="*#">Residential </a></li>
                    <li><a href="*#">Land </a></li>
                    <li><a href="*#">Personal property </a></li>
                    <li><a href="*#">Single-family home </a></li>
                    <li><a href="*#">Apartment</a></li>
                    <li><a href="*#">Corporeal and incorporeal property </a></li>
                    <li><a href="*#">Manufactured homes </a></li>
                    <li><a href="*#">Villa </a></li>
                  </ul>
                </div>
              </div>
            </article>
            {/* Location */}
            <article className="filter-group">
              <header className="card-header">
                <a href="*#" data-toggle="collapse" data-target="#collapse_2" aria-expanded="true" className="*#">
                  <i className="icon-control fa fa-chevron-down"></i>
                  <h6 className="title">Location </h6>
                </a>
              </header>
              <div className="unique-filter-location">
                <div className="unique-filter-location-heading">Location</div>
                <div className="unique-filter-current-location text-align-center">{location}</div>
                <div className="filter-content collapse show" id="collapse_2">
                  <div className="card-body">
                    {/* Additional location content goes here */}
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
      
            {/* Condition */}
            <article className="filter-group">
              <div className="filter-content collapse in" id="collapse_5">
                <div className="card-body">
                  <label className="custom-control custom-radio">
                    <input type="radio" name="myfilter_radio" checked={condition === 'Any condition'} onChange={() => setCondition('Any condition')} className="custom-control-input" />
                    <div className="custom-control-label">Any condition</div>
                  </label>

                  <label className="custom-control custom-radio">
                    <input type="radio" name="myfilter_radio" checked={condition === 'Brand new'} onChange={() => setCondition('Brand new')} className="custom-control-input" />
                    <div className="custom-control-label">Brand new </div>
                  </label>

                  <label className="custom-control custom-radio">
                    <input type="radio" name="myfilter_radio" checked={condition === 'Used items'} onChange={() => setCondition('Used items')} className="custom-control-input" />
                    <div className="custom-control-label">Used items</div>
                  </label>

                  <label className="custom-control custom-radio">
                    <input type="radio" name="myfilter_radio" checked={condition === 'Very old'} onChange={() => setCondition('Very old')} className="custom-control-input" />
                    <div className="custom-control-label">Very old</div>
                  </label>
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
                <option>Trending</option>
                <option>Most Popular</option>
                <option>Cheapest</option>
              </select>
              <div className="btn-group">
                <a href="#" className="btn btn-outline-secondary" data-toggle="tooltip" title="" data-original-title="List view">
                  <i className="fa fa-bars"></i></a>
                <a href="#" className="btn btn-outline-secondary active" data-toggle="tooltip" title="" data-original-title="Grid view">
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
