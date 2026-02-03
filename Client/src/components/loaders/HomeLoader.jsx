import React from "react";

const HomeLoader = ({ darkMode }) => {
  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 via-white to-indigo-50"
      }`}
    >
      {/* HERO LOADER */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-6xl mx-auto text-center">
          <div className="space-y-5 mb-10">
            <div
              className={`h-10 md:h-16 w-3/4 mx-auto rounded-xl animate-pulse ${
                darkMode ? "bg-gray-700" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`h-6 md:h-8 w-2/3 mx-auto rounded-lg animate-pulse ${
                darkMode ? "bg-gray-700" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`h-5 w-1/2 mx-auto rounded-lg animate-pulse ${
                darkMode ? "bg-gray-700" : "bg-gray-200"
              }`}
            ></div>
          </div>

          {/* Search Skeleton */}
          <div
            className={`h-14 w-full max-w-2xl mx-auto rounded-2xl shadow-xl animate-pulse ${
              darkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          ></div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 max-w-4xl mx-auto">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="text-center space-y-2">
                  <div
                    className={`h-8 w-24 mx-auto rounded-lg animate-pulse ${
                      darkMode ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  ></div>
                  <div
                    className={`h-4 w-20 mx-auto rounded-lg animate-pulse ${
                      darkMode ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  ></div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES LOADER */}
      <section className={`px-4 py-20 sm:px-6 lg:px-8 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div
              className={`h-10 w-72 mx-auto rounded-xl animate-pulse ${
                darkMode ? "bg-gray-700" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`h-6 w-[520px] max-w-full mx-auto rounded-xl animate-pulse ${
                darkMode ? "bg-gray-700" : "bg-gray-200"
              }`}
            ></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className={`p-8 rounded-3xl border animate-pulse ${
                    darkMode
                      ? "bg-gradient-to-br from-gray-700 to-gray-800 border-gray-600"
                      : "bg-white border-gray-100 shadow-lg"
                  }`}
                >
                  <div className={`w-16 h-16 rounded-2xl mb-6 ${darkMode ? "bg-gray-600" : "bg-gray-200"}`}></div>
                  <div className={`h-6 w-3/4 rounded-lg mb-3 ${darkMode ? "bg-gray-600" : "bg-gray-200"}`}></div>
                  <div className={`h-4 w-full rounded-lg mb-2 ${darkMode ? "bg-gray-600" : "bg-gray-200"}`}></div>
                  <div className={`h-4 w-5/6 rounded-lg mb-4 ${darkMode ? "bg-gray-600" : "bg-gray-200"}`}></div>
                  <div className={`h-4 w-32 rounded-lg ${darkMode ? "bg-gray-600" : "bg-gray-200"}`}></div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS LOADER */}
      <section className={`px-4 py-20 sm:px-6 lg:px-8 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div
              className={`h-10 w-80 mx-auto rounded-xl animate-pulse ${
                darkMode ? "bg-gray-700" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`h-6 w-[560px] max-w-full mx-auto rounded-xl animate-pulse ${
                darkMode ? "bg-gray-700" : "bg-gray-200"
              }`}
            ></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className={`rounded-3xl overflow-hidden border animate-pulse ${
                    darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100 shadow-lg"
                  }`}
                >
                  <div className={`h-44 w-full ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}></div>
                  <div className="p-6 space-y-3">
                    <div className={`h-5 w-3/4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}></div>
                    <div className={`h-4 w-1/2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}></div>
                    <div className={`h-10 w-full rounded-2xl ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeLoader;
