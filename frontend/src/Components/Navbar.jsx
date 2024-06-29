import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUser,
  faSignOutAlt,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <nav className="bg-gray-500 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side - Logo and Navigation Links */}
        <div className="flex items-center">
          <Link to="/" className="text-white text-lg font-semibold mr-6"></Link>
          <div className="hidden md:flex space-x-4">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/map">Map</NavLink>
            <NavLink to="/report">Report</NavLink>
            {user && <NavLink to="/add-report">Add Report</NavLink>}
          </div>
        </div>

        {/* Center - Mobile Menu Icon */}

        {/* Right Side - Authentication Buttons */}
        <div className="flex items-center md:block hidden space-x-4">
          {user ? (
            <div className="relative flex">
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200 text-left"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </button>
              <Link to="/profile">
                <button className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200 text-left">
                  {" "}
                  Profile
                </button>
              </Link>
            </div>
          ) : (
            <Link to="/login">
              <button className="bg-white text-blue-500 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100">
                Login
              </button>
            </Link>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white">
            <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      <div className={`md:hidden ${showMobileMenu ? "block" : "hidden"}`}>
        <div className="flex flex-col space-y-2 mt-2">
          {/* Include Logo and Profile links in Mobile Dropdown */}

          <MobileNavLink to="/profile">Profile</MobileNavLink>
          <MobileNavLink to="/">Home</MobileNavLink>
          <MobileNavLink to="/map">Map</MobileNavLink>
          <MobileNavLink to="/report">Report</MobileNavLink>
          {user && <MobileNavLink to="/add-report">Add Report</MobileNavLink>}
          {user && (
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200 text-left"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

// Custom NavLink component for consistent styling
const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-white font-semibold hover:text-gray-200 transition duration-300"
  >
    {children}
  </Link>
);

// Custom DropdownLink component for dropdown menu items
const DropdownLink = ({ to, children }) => (
  <Link
    to={to}
    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-300"
  >
    {children}
  </Link>
);

// Custom MobileNavLink component for mobile menu items
const MobileNavLink = ({ to, children }) => (
  <Link
    to={to}
    className="block text-white font-semibold hover:text-gray-200 px-3 py-2 rounded-lg"
  >
    {children}
  </Link>
);

export default Navbar;
