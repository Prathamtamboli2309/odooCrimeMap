// MapPage.js

import React, { useState, useEffect } from "react";
import SearchSide from "../Components/SearchSide";
import Map from "../Components/Map/Map";
import axios from "axios";

function MapPage() {
  const [crimeReports, setCrimeReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCrimeReports(); // Fetch crime reports when component mounts
  }, []);

  const fetchCrimeReports = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/report/all"); // Replace with your API endpoint

      setCrimeReports(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching crime reports:", error);
      setIsLoading(false);
    }
  };

  const handleSearch = async (searchCriteria) => {
    console.log(searchCriteria);
    setIsLoading(true);
    try {
      // Example: Construct API call with search criteria
      const response = await axios.get(
        `http://localhost:5000/api/report/search?type=${searchCriteria.type}&startDate=${searchCriteria.startDate}&endDate=${searchCriteria.endDate}&location=${searchCriteria.location}`
      );
      setCrimeReports(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error searching crime reports:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Side - Search Side */}
      <div className="lg:w-1/3 bg-gray-100 p-4">
        <SearchSide onSearch={handleSearch} />
      </div>

      {/* Right Side - Map Component */}
      <div className="lg:w-2/3 h-full">
        {isLoading ? (
          <p className="text-gray-700">Loading...</p>
        ) : (
          <Map crimeReports={crimeReports} />
        )}
      </div>
    </div>
  );
}

export default MapPage;
