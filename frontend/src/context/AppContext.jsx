import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    type: "",
    location: "",
    description: "",
    anonymous: false,
    media: null,
  });

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    const newValue = type === "checkbox" ? e.target.checked : value;
    setFormData({
      ...formData,
      [name]: files ? (name === "media" ? e.target.files : files[0]) : newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (key === "media" && formData[key]) {
        for (let i = 0; i < formData[key].length; i++) {
          data.append("media", formData[key][i]);
        }
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      // Replace with your actual API endpoint
      await axios.post("YOUR_BACKEND_API_URL", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Report submitted successfully!");
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Failed to submit report.");
    }
  };

  const contextValue = {
    formData,
    handleChange,
    handleSubmit,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
