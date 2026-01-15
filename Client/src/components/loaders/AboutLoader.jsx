import React from "react";

const AboutPageLoader = ({ darkMode }) => {
  const pulse = darkMode ? "bg-gray-700" : "bg-gray-200";

  return (
    <div className={`font-sans min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      {/* Section 1 Loader (About Hero) */}
      <section
        className={`relative py-20 px-6 md:px-12 transition-colors duration-500 ${
          darkMode ? "bg-gray-900" : "bg-gradient-to-r from-blue-50 to-teal-100"
        }`}
      >
        <div className="max-w-7xl pt-10 mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className={`h-12 w-3/4 rounded-xl animate-pulse ${pulse}`}></div>
            <div className={`h-5 w-full rounded-lg animate-pulse ${pulse}`}></div>
            <div className={`h-5 w-5/6 rounded-lg animate-pulse ${pulse}`}></div>

            {/* bullet points */}
            <div className="space-y-4">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full animate-pulse ${pulse}`}></div>
                    <div className="flex-1 space-y-2">
                      <div className={`h-4 w-full rounded-lg animate-pulse ${pulse}`}></div>
                      <div className={`h-4 w-5/6 rounded-lg animate-pulse ${pulse}`}></div>
                    </div>
                  </div>
                ))}
            </div>

            <div className={`h-12 w-48 rounded-full animate-pulse ${pulse}`}></div>
          </div>

          {/* Right Image */}
          <div className={`rounded-3xl overflow-hidden shadow-2xl h-80 md:h-[420px] animate-pulse ${pulse}`}></div>
        </div>
      </section>

      {/* Section 2 Loader (Why Us Cards) */}
      <section
        className={`py-20 px-6 md:px-12 transition-colors duration-500 ${
          darkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 to-teal-100"
        }`}
      >
        <div className="text-center mb-16 space-y-4">
          <div className={`h-10 w-72 mx-auto rounded-xl animate-pulse ${pulse}`}></div>
          <div className={`h-5 w-[520px] max-w-full mx-auto rounded-lg animate-pulse ${pulse}`}></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 shadow-md border animate-pulse ${
                  darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                }`}
              >
                <div className="flex justify-center mb-5">
                  <div className={`w-12 h-12 rounded-xl ${pulse}`}></div>
                </div>
                <div className={`h-6 w-2/3 mx-auto rounded-lg mb-4 ${pulse}`}></div>
                <div className={`h-4 w-full rounded-lg mb-2 ${pulse}`}></div>
                <div className={`h-4 w-5/6 rounded-lg mx-auto ${pulse}`}></div>
              </div>
            ))}
        </div>
      </section>

      {/* Section 3 Loader (FAQ) */}
      <section className={`py-16 px-4 ${darkMode ? "bg-gray-900" : "bg-indigo-50"}`}>
        <div className="text-center mb-10 space-y-4">
          <div className={`h-10 w-80 mx-auto rounded-xl animate-pulse ${pulse}`}></div>
          <div className={`h-5 w-72 mx-auto rounded-lg animate-pulse ${pulse}`}></div>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          {/* FAQ list */}
          <div className="space-y-4">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className={`rounded-lg shadow-sm border overflow-hidden animate-pulse ${
                    darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-center px-6 py-5">
                    <div className={`h-5 w-3/4 rounded-lg ${pulse}`}></div>
                    <div className={`w-7 h-7 rounded-lg ${pulse}`}></div>
                  </div>
                </div>
              ))}
          </div>

          {/* Right image */}
          <div className="flex justify-center items-center">
            <div className={`w-full max-w-sm h-72 rounded-2xl animate-pulse ${pulse}`}></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPageLoader;
