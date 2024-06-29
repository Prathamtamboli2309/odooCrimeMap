import React from "react";
import Hero from "../Components/HeroSection";

function HomePage() {
  return (
    <div>
      <Hero />
      <footer className="bg-gray-800 text-white py-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Real-Time Crime Reporting App. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
