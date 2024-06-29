import React, { useEffect, useState } from "react";
import axios from "axios";

const CrimeReports = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchType, setSearchType] = useState("");
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    fetchCrimeReports();
  }, []);

  const fetchCrimeReports = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/report/all");
      setReports(
        response.data.filter((report) => report.status === "accepted")
      );
      setFilteredReports(
        response.data.filter((report) => report.status === "accepted")
      ); // Filter initially for "accepted" status
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching crime reports:", error);
      setIsLoading(false);
    }
  };

  // Handle type dropdown change
  const handleTypeChange = (e) => {
    setSearchType(e.target.value);
    filterReports(e.target.value, searchDate);
  };

  // Handle date input change
  const handleDateChange = (e) => {
    setSearchDate(e.target.value);
    filterReports(searchType, e.target.value);
  };

  // Filter reports based on type and/or date
  const filterReports = (type, date) => {
    let filtered = reports.filter((report) => {
      // Filter by type
      if (type && report.type !== type) {
        return false;
      }
      // Filter by date (if provided)
      if (date && !isSameDate(report.date, date)) {
        return false;
      }
      return true;
    });
    setFilteredReports(filtered);
  };

  // Function to check if two dates are on the same day
  const isSameDate = (date1, date2) => {
    const d1 = new Date(date1).toLocaleDateString();
    const d2 = new Date(date2).toLocaleDateString();
    return d1 === d2;
  };

  // Reset filters and show all reports
  const handleResetFilters = () => {
    setSearchType("");
    setSearchDate("");
    setFilteredReports(
      reports.filter((report) => report.status === "accepted")
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Crime Reports</h1>

      {/* Search Controls */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center  gap-4">
        {/* Type Dropdown */}
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <label className="block mb-1">Filter by Type:</label>
          <select
            value={searchType}
            onChange={handleTypeChange}
            className="border border-gray-300 px-3 py-2 rounded-lg w-full md:w-64"
          >
            <option value="">All Types</option>
            {/* Populate dropdown with unique types */}
            {[...new Set(reports.map((report) => report.type))].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Date Input */}
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <label className="block mb-1">Filter by Date:</label>
          <input
            type="date"
            value={searchDate}
            onChange={handleDateChange}
            className="border border-gray-300 px-3 py-2 rounded-lg w-full md:w-64"
          />
        </div>

        {/* Reset Button */}
        <div>
          <button
            type="button"
            onClick={handleResetFilters}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 mt-4 md:mt-0"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Display Filtered Reports */}
      {isLoading ? (
        <p className="text-gray-700">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <div
              key={report._id}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              {report.media && (
                <img
                  src={`http://localhost:5000/${report.media[0]}`}
                  alt="Report Media"
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{report.type}</h2>
                <p className="text-gray-700 mb-4">{report.description}</p>
                <div className="flex items-center">
                  <p className="text-gray-600">
                    Date: {new Date(report.date).toLocaleDateString()}
                  </p>
                  {report.anonymous && (
                    <span className="ml-2 px-2 py-1 bg-gray-200 text-gray-600 rounded-full text-xs">
                      Anonymous
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CrimeReports;
