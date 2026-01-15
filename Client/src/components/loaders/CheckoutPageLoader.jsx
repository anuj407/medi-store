import React from "react";

const CheckoutPageLoader = ({ darkMode }) => {
  const pulse = darkMode ? "bg-gray-700" : "bg-gray-200";

  return (
    <section
      className={`min-h-screen px-6 py-16 max-w-5xl mx-auto transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Title */}
      <div className={`h-12 w-60 mx-auto rounded-xl animate-pulse ${pulse} mb-14`}></div>

      {/* Main Layout */}
      <div
        className={`grid grid-cols-1 md:grid-cols-4 gap-10 rounded-3xl shadow-lg p-10 animate-pulse ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Left: Customer Form Loader */}
        <div className="md:col-span-2 space-y-7">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="space-y-2">
                <div className={`h-4 w-32 rounded-md ${pulse}`}></div>
                <div className={`h-14 w-full rounded-xl ${pulse}`}></div>
              </div>
            ))}

          {/* Back Button */}
          <div className="flex justify-center mt-5 mb-5">
            <div className={`h-10 w-40 rounded-lg ${pulse}`}></div>
          </div>
        </div>

        {/* Right: Order Summary Loader */}
        <aside
          className={`md:col-span-2 rounded-3xl p-7 flex flex-col justify-between shadow-inner md:sticky md:top-24 h-fit ${
            darkMode ? "bg-gray-900" : "bg-green-50"
          }`}
        >
          <div>
            {/* Summary Title */}
            <div className={`h-8 w-52 rounded-lg ${pulse} mb-6`}></div>

            {/* Items */}
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex gap-3 items-center">
                    <div className={`w-12 h-12 rounded-lg ${pulse}`}></div>
                    <div className="flex-1 space-y-2">
                      <div className={`h-4 w-3/4 rounded-lg ${pulse}`}></div>
                      <div className={`h-3 w-24 rounded-lg ${pulse}`}></div>
                    </div>
                    <div className={`h-4 w-12 rounded-lg ${pulse}`}></div>
                    <div className={`w-7 h-7 rounded-lg ${pulse}`}></div>
                  </div>
                ))}
            </div>
          </div>

          {/* Total + Button */}
          <div className="border-t border-green-400 dark:border-green-600 pt-4 mt-6 space-y-4">
            <div className="flex justify-between">
              <div className={`h-5 w-16 rounded-lg ${pulse}`}></div>
              <div className={`h-5 w-24 rounded-lg ${pulse}`}></div>
            </div>
            <div className={`h-12 w-full rounded-2xl ${pulse}`}></div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default CheckoutPageLoader;
