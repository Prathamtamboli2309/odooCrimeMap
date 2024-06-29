import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/report/all"); // Replace with your API endpoint
      // Sort reports by date in descending order
      const sortedReports = response.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setReports(sortedReports);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching reports:", error);
      setIsLoading(false);
    }
  };

  // Calculate counts for different types of reports
  const countReports = () => {
    const reportCounts = {};
    reports.forEach((report) => {
      const { type, status } = report;
      if (status !== "pending") {
        if (reportCounts[type]) {
          reportCounts[type]++;
        } else {
          reportCounts[type] = 1;
        }
      }
    });
    return reportCounts;
  };

  const reportCounts = countReports();

  const handleAction = async (reportId, action) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/report/${reportId}/${action}`
      );
      if (response.data.success) {
        // Update report status in local state
        const updatedReports = reports.map((report) =>
          report._id === reportId ? { ...report, status: action } : report
        );
        setReports(updatedReports);
      } else {
        console.error("Failed to update report status");
      }
    } catch (error) {
      console.error("Error updating report status:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      // Optionally redirect or perform other actions after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="m-6 flex flex-col gap-6">
      {/* Reports Section */}

      {/* User Details Section */}
      {user && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <h2 className="text-xl font-semibold mb-4">User Details</h2>
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faUser} className="text-2xl mr-2" />
            <span className="text-lg font-semibold">{user.username}</span>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">Email: {user.email}</p>
            <span className="text-lg font-semibold">Role: {user.role}</span>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
      <div className="flex flex-col gap-5">
        {/* Counts Section */}
        {user.role !== "citizen" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Report Counts</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(reportCounts).map((type) => (
                <div key={type} className="text-center">
                  <p className="text-lg font-semibold">{type}</p>
                  <p className="text-gray-700">{reportCounts[type]}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Reports</h2>
          {isLoading ? (
            <p className="text-gray-700">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reports.map((report) =>
                // Conditional rendering based on user's role
                user?.role !== "citizen" ? (
                  <ReportCardReq
                    key={report._id}
                    report={report}
                    handleAction={handleAction}
                  />
                ) : (
                  <ReportCard key={report._id} report={report} />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Component to display each report card
const ReportCard = ({ report }) => {
  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{report.type}</h3>
        <p className="text-gray-700 mb-2">{report.description}</p>
        <p className="text-gray-600">
          Location: {report.location.latitude}, {report.location.longitude}
        </p>
        {/* Display date if available */}
        {report.date && (
          <p className="text-gray-600">
            Date: {new Date(report.date).toLocaleDateString()}
          </p>
        )}
        {/* Display status */}
        {report.status && (
          <p className="text-gray-600">Status: {report.status}</p>
        )}
      </div>
    </div>
  );
};

// Component to display each report card
const ReportCardReq = ({ report, handleAction }) => {
  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{report.type}</h3>
        <p className="text-gray-700 mb-2">{report.description}</p>
        <p className="text-gray-600">
          Location: {report.location.latitude}, {report.location.longitude}
        </p>
        {/* Display date if available */}
        {report.date && (
          <p className="text-gray-600">
            Date: {new Date(report.date).toLocaleDateString()}
          </p>
        )}
        {/* Display status */}
        {report.status && (
          <p className="text-gray-600">Status: {report.status}</p>
        )}

        {report.status === "pending" && (
          <div className="mt-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-green-600"
              onClick={() => handleAction(report._id, "accept")}
            >
              <FontAwesomeIcon icon={faCheckCircle} className="mr-1" />
              Accept
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              onClick={() => handleAction(report._id, "reject")}
            >
              <FontAwesomeIcon icon={faTimesCircle} className="mr-1" />
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
