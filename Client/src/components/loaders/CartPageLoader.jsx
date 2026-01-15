import React from "react";

const CartPageLoader = ({ darkMode }) => {
  const pulse = darkMode ? "bg-gray-700" : "bg-gray-200";

  return (
    <section
      className={`px-4 sm:px-6 lg:px-8 py-10 sm:py-16 transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className={`h-10 w-48 mx-auto rounded-xl animate-pulse ${pulse} mb-10`}></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items Loader */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className={`flex relative flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-2xl shadow-md animate-pulse ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  {/* image */}
                  <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-xl ${pulse}`}></div>

                  {/* content */}
                  <div className="flex-1 w-full space-y-3">
                    <div className={`h-6 w-2/3 rounded-lg ${pulse}`}></div>
                    <div className={`h-4 w-1/2 rounded-lg ${pulse}`}></div>

                    {/* qty controls */}
                    <div className="flex items-center gap-2 mt-3">
                      <div className={`h-8 w-8 rounded-lg ${pulse}`}></div>
                      <div className={`h-6 w-10 rounded-lg ${pulse}`}></div>
                      <div className={`h-8 w-8 rounded-lg ${pulse}`}></div>
                    </div>
                  </div>

                  {/* remove icon */}
                  <div className={`absolute right-4 top-4 w-7 h-7 rounded-lg ${pulse}`}></div>
                </div>
              ))}
          </div>

          {/* Order Summary Loader */}
          <div
            className={`rounded-2xl shadow-md p-6 h-fit animate-pulse ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className={`h-6 w-40 rounded-lg ${pulse} mb-6`}></div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <div className={`h-4 w-24 rounded-lg ${pulse}`}></div>
                <div className={`h-4 w-12 rounded-lg ${pulse}`}></div>
              </div>
              <div className="flex justify-between">
                <div className={`h-4 w-24 rounded-lg ${pulse}`}></div>
                <div className={`h-4 w-16 rounded-lg ${pulse}`}></div>
              </div>
              <div className={`h-12 w-full rounded-xl ${pulse} mt-6`}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPageLoader;
