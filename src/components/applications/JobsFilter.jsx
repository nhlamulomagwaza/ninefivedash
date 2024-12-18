import React from 'react'
import { Link } from 'react-router-dom';
import { IoMdSearch } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import './jobsfilter.scss';
const JobsFilter = ({southAfricanCities,
search,
  selectedCity,
  setSearch,
  setSelectedCity,
  remoteOnly,
  setRemoteOnly}) => {


  
  return (
    <div className="filter">
    <div className="filtercanvas">
      <div className="search">
        <IoMdSearch size={30} className="icon" />
        <input
            type="text"
            placeholder="filter by job title or industry"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
      </div>

      <div className="location">
          <IoLocation size={21} className="icon" />
          <div className="city">
            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
              }}
            >
              <option value="">
                {selectedCity ? "All" : "filter by city"}
              </option>
              {southAfricanCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="remote">
          <input
            type="checkbox"
            name="check"
            id="check"
            checked={remoteOnly}
            onChange={(e) => setRemoteOnly(e.target.checked)}
          />
          <p className="remote">Remote Only</p>
        </div>

      <Link>
       
      </Link>
    </div>
  </div>
  )
}

export default JobsFilter