import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../Assets/logo1.gif";

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
    <nav className="bg-gray-800 p-4 text-black">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/">
          <div className="flex gap-x-2 justify-center items-center">
            <img
              src={logo}
              alt="logo"
              className="w-[40px] h-[6vh] bg-white rounded-full p-2"
            />
            <h1 className="text-2xl text-white">City-Guard</h1>
          </div>
        </Link>
        {/* Left Side - Logo and Navigation Links */}
        <div className="flex items-center">
          <Link
            to="/"
            className="text-black text-lg font-semibold -mr-20"
          ></Link>
          <div className="hidden md:flex space-x-4  ">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/map">Map</NavLink>
            <NavLink to="/report">Report</NavLink>
            {user && <NavLink to="/add-report">Add Report</NavLink>}
          </div>
        </div>

        {/* Center - Mobile Menu Icon */}

        {/* Right Side - Authentication Buttons */}
        <div className="flex items-center md:block hidden space-x-2">
          {user ? (
            <div className="relative flex">
              <button
                onClick={handleLogout}
                className="btn bg-white text-blue-500 py-2 mr-2 px-4 rounded-full text-lg font-semibold hover:bg-gray-200 transition duration-300"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </button>
              <Link to="/profile">
                <button className="btn bg-white text-blue-500 py-2 px-4 rounded-full text-lg font-semibold hover:bg-gray-200 transition duration-300">
                  {" "}
                  Profile
                </button>
              </Link>
            </div>
          ) : (
            <Link to="/login">
              <button className="btn bg-white text-blue-500 py-2 px-6 rounded-full text-lg font-semibold hover:bg-gray-200 transition duration-300">
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

          {user && <MobileNavLink to="/profile">Profile</MobileNavLink>}
          <MobileNavLink to="/">Home</MobileNavLink>
          <MobileNavLink to="/map">Map</MobileNavLink>
          <MobileNavLink to="/report">Report</MobileNavLink>
          <MobileNavLink to="login">Login</MobileNavLink>
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
