import React from "react";

const ProductsPageLoader = ({ darkMode }) => {
  const pulse = darkMode ? "bg-gray-700" : "bg-gray-200";

  return (
    <div
      className={`pt-20 pb-4 px-4 sm:px-8 lg:px-16 min-h-screen ${
        darkMode ? "text-white bg-gray-900" : "text-black bg-white"
      }`}
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Title */}
        <div className={`h-12 w-72 mx-auto rounded-xl animate-pulse ${pulse} mb-12`}></div>

        {/* Search Bar */}
        <div className="w-full max-w-2xl mx-auto mb-10">
          <div className={`h-14 w-full rounded-2xl shadow-md animate-pulse ${pulse}`}></div>
        </div>

        {/* Product Grid Skeleton */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className={`rounded-2xl shadow-md border overflow-hidden animate-pulse ${
                  darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                }`}
              >
                {/* image */}
                <div className={`h-44 w-full ${pulse}`}></div>

                {/* body */}
                <div className="p-4 space-y-3">
                  <div className={`h-5 w-3/4 rounded-lg ${pulse}`}></div>
                  <div className={`h-4 w-1/2 rounded-lg ${pulse}`}></div>
                  <div className={`h-4 w-2/3 rounded-lg ${pulse}`}></div>

                  {/* button */}
                  <div className={`h-10 w-full rounded-xl ${pulse}`}></div>
                </div>
              </div>
            ))}
        </section>

        {/* Pagination Skeleton */}
        <div className="flex justify-center mt-10">
          <div className="flex items-center gap-3 animate-pulse">
            <div className={`h-10 w-10 rounded-lg ${pulse}`}></div>
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className={`h-10 w-10 rounded-lg ${pulse}`}></div>
              ))}
            <div className={`h-10 w-10 rounded-lg ${pulse}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPageLoader;
