import React from "react";

const NavbarLoader = ({ darkMode }) => {
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 pb-2 pt-1 transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-white"
      } shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Loader */}
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg animate-pulse ${
                darkMode ? "bg-gray-700" : "bg-gray-200"
              }`}
            ></div>
            <div className="space-y-1">
              <div
                className={`h-5 w-24 rounded-md animate-pulse ${
                  darkMode ? "bg-gray-700" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`h-3 w-16 rounded-md animate-pulse ${
                  darkMode ? "bg-gray-700" : "bg-gray-200"
                }`}
              ></div>
            </div>
          </div>

          {/* Desktop Nav Loader */}
          <div className="hidden md:flex items-center space-x-6">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className={`h-9 w-20 rounded-md animate-pulse ${
                    darkMode ? "bg-gray-700" : "bg-gray-200"
                  }`}
                ></div>
              ))}
          </div>

          {/* Profile/Login Loader */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <div
                className={`h-10 w-36 rounded-4xl animate-pulse ${
                  darkMode ? "bg-gray-700" : "bg-gray-200"
                }`}
              ></div>
            </div>

            {/* Mobile Menu Icon Loader */}
            <div
              className={`md:hidden w-10 h-10 rounded-lg animate-pulse ${
                darkMode ? "bg-gray-700" : "bg-gray-200"
              }`}
            ></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarLoader;
