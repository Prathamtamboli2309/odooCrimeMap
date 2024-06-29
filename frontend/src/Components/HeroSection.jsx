import React from "react";


const Hero = () => {
  return (
    <div className="hero bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 px-6 sm:px-12 md:px-24 lg:px-32 xl:px-40">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4">
          Welcome to the Real-Time Crime Reporting App
        </h1>
        <p className="text-lg sm:text-xl mb-8">
          Report crimes in real-time and stay informed about your neighborhood's
          safety.
        </p>
        <a
          href="#features"
          className="btn bg-white text-blue-500 py-2 px-6 rounded-full text-lg font-semibold hover:bg-gray-200 transition duration-300"
        >
          Learn More
        </a>
      </div>

      {/* Features Section */}
      <section id="features" className="mt-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Core Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              User Authentication and Authorization
            </h3>
            <p className="text-gray-700">
              Secure login for users (citizens, police, admin) with different
              access levels. OAuth Integration for social media login.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              Real-Time Crime Reporting
            </h3>
            <p className="text-gray-700">
              Submit crime reports with details like type, location, time,
              description, and optional media. Geolocation for accurate
              reporting. Option for anonymous reporting.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              Interactive Map
            </h3>
            <p className="text-gray-700">
              Real-time, interactive map showing crime reports. Clustering to
              prevent map clutter. Heatmaps to show crime intensity in different
              areas.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              Search and Filter
            </h3>
            <p className="text-gray-700">
              Search for reports by location, type of crime, date, etc. Filter
              crime reports based on categories like type, date range, severity,
              etc.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
