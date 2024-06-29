import React from "react";

function SearchSide() {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-xl font-semibold mb-4">Search Filters</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter location..."
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Type of Crime
        </label>
        <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">Select type...</option>
          <option value="theft">Theft</option>
          <option value="assault">Assault</option>
          <option value="vandalism">Vandalism</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      {/* Add more fields and buttons as needed */}
    </div>
  );
}

export default SearchSide;
