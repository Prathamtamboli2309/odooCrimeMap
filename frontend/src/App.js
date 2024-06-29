import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import AuthForm from "./Components/AuthForm";
import { AppProvider } from "./context/AppContext";
import { Route, Routes } from "react-router-dom";
import Chatbot from "./Pages/Chatbotpage";
import Navbar from "./Components/Navbar";
import HomePage from "./Pages/HomePage";
import MapPage from "./Pages/MapPage";
import CrimeReports from "./Pages/ReportsPage";
import Dashboard from "./Pages/ProfilePage";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/add-report" element={<Chatbot />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/report" element={<CrimeReports />} />
        <Route path="/profile" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
