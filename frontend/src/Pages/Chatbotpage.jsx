import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const crimeTypes = [
  "Theft",
  "Assault",
  "Burglary",
  "Robbery",
  "Vandalism",
  "Drug Offense",
  "Other", // Allow custom input
];

const Chatbot = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [description, setDescription] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [media, setMedia] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLocation({ latitude, longitude });
        },
        async (error) => {
          console.error(
            "Error with Geolocation API, using IP geolocation:",
            error
          );
          const ipLocation = await getIPGeolocation();
          setLocation(ipLocation);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      console.error(
        "Geolocation is not supported by this browser. Using IP geolocation as fallback."
      );
      getIPGeolocation().then((ipLocation) => setLocation(ipLocation));
    }
  };

  const getIPGeolocation = async () => {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    return {
      latitude: data.latitude,
      longitude: data.longitude,
    };
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setAnonymous(checked);
    } else if (type === "file") {
      setMedia(files[0]); // Store only the first file for simplicity
    } else {
      switch (name) {
        case "type":
          setType(value);
          break;
        case "description":
          setDescription(value);
          break;
        default:
          break;
      }
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      type,
      location: `${location.latitude}, ${location.longitude}`,
      description,
      anonymous,
      media,
    };

    try {
      const formDataObj = new FormData();
      formDataObj.append("type", formData.type);
      formDataObj.append("location", formData.location);
      formDataObj.append("description", formData.description);
      formDataObj.append("anonymous", formData.anonymous);
      if (formData.media) {
        formDataObj.append("media", formData.media);
      }

      const response = await fetch("http://localhost:5000/api/report/new", {
        method: "POST",
        body: formDataObj,
      });
      const result = await response.json();

      if (response.ok) {
        navigate("/");
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Report Submission</h2>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">
            Type of Crime:
            <select
              name="type"
              value={type}
              onChange={handleChange}
              required
              className="border border-gray-300 px-3 py-2 rounded-lg w-full mt-1"
            >
              <option value="" disabled>
                Select crime type
              </option>
              {crimeTypes.map((crimeType) => (
                <option key={crimeType} value={crimeType}>
                  {crimeType}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label className="block mb-1">
            Description:
            <textarea
              name="description"
              value={description}
              onChange={handleChange}
              required
              rows={4}
              className="border border-gray-300 px-3 py-2 rounded-lg w-full mt-1"
            />
          </label>
        </div>
        <div>
          <label className="block mb-1">
            Anonymous:
            <input
              type="checkbox"
              name="anonymous"
              checked={anonymous}
              onChange={handleChange}
              className="mt-1"
            />
          </label>
        </div>
        <div>
          <label className="block mb-1">
            Upload Media:
            <input
              type="file"
              name="media"
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded-lg w-full mt-1"
            />
          </label>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
          >
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatbot;
