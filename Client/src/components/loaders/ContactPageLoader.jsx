import React from "react";

const ContactPageLoader = ({ darkMode }) => {
  const pulse = darkMode ? "bg-gray-700" : "bg-gray-200";

  return (
    <section
      className={`px-4 py-16 transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-6xl pt-8 mx-auto">
        {/* Heading */}
        <div className={`h-10 w-64 mx-auto rounded-xl animate-pulse ${pulse} mb-4`}></div>
        <div className={`h-5 w-[520px] max-w-full mx-auto rounded-lg animate-pulse ${pulse} mb-10`}></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Form Loader */}
          <div
            className={`col-span-2 w-full mx-auto p-6 md:p-8 rounded-2xl shadow-xl animate-pulse ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="space-y-5">
              {/* Input skeletons */}
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className={`h-4 w-28 rounded-md ${pulse}`}></div>
                    <div className={`h-12 w-full rounded-xl ${pulse}`}></div>
                  </div>
                ))}

              {/* Message skeleton */}
              <div className="space-y-2">
                <div className={`h-4 w-28 rounded-md ${pulse}`}></div>
                <div className={`h-28 w-full rounded-xl ${pulse}`}></div>
              </div>
            </div>

            {/* Button skeleton */}
            <div className={`mt-6 h-12 w-full rounded-xl ${pulse}`}></div>
          </div>

          {/* Address Card Loader */}
          <div
            className={`rounded-2xl shadow-xl p-6 animate-pulse ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className={`h-6 w-36 rounded-lg ${pulse} mb-6`}></div>

            <div className="space-y-3 mb-6">
              <div className={`h-4 w-full rounded-lg ${pulse}`}></div>
              <div className={`h-4 w-5/6 rounded-lg ${pulse}`}></div>
              <div className={`h-4 w-4/6 rounded-lg ${pulse}`}></div>
            </div>

            <div className={`h-4 w-32 rounded-lg ${pulse} mb-4`}></div>

            {/* social icons */}
            <div className="flex gap-4">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className={`w-10 h-10 rounded-xl ${pulse}`}></div>
                ))}
            </div>
          </div>
        </div>

        {/* Map Loader */}
        <div className={`mt-12 h-[300px] rounded-xl overflow-hidden shadow-md animate-pulse ${pulse}`}></div>
      </div>
    </section>
  );
};

export default ContactPageLoader;
