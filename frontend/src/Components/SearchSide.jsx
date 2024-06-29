// SearchSide.js

import React, { useState } from "react";

const SearchSide = ({ onSearch }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    type: "",
    startDate: "",
    endDate: "",
    location: "",
  });

  const handleSearch = () => {
    // Perform search based on searchCriteria
    onSearch(searchCriteria);
  };

  const handleChange = (e) => {
    setSearchCriteria({
      ...searchCriteria,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Search Filters</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label htmlFor="crimeType" className="block text-gray-700">
            Crime Type
          </label>
          <input
            type="text"
            id="type"
            name="type"
            value={searchCriteria.crimeType}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={searchCriteria.startDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="block text-gray-700">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={searchCriteria.endDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          onClick={handleSearch}
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchSide;
