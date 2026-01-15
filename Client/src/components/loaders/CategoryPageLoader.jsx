import React from "react";

const CategoryPageLoader = ({ darkMode }) => {
  const pulse = darkMode ? "bg-gray-700" : "bg-gray-200";

  return (
    <div
      className={`min-h-screen p-4 pt-20 transition-all duration-500 ${
        darkMode ? "text-white bg-gray-900" : "text-black bg-white"
      }`}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className={`h-9 w-96 max-w-full mx-auto rounded-xl animate-pulse ${pulse} mb-3`}></div>
        <div className={`h-5 w-[520px] max-w-full mx-auto rounded-lg animate-pulse ${pulse} mb-10`}></div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Skeleton */}
          <aside
            className={`hidden lg:block lg:w-1/5 h-fit p-4 rounded-xl shadow-md sticky top-24 animate-pulse ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className={`h-6 w-32 rounded-lg ${pulse} mb-6`}></div>

            <div className="space-y-3">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className={`h-10 w-full rounded-md ${pulse}`}></div>
                ))}
            </div>
          </aside>

          {/* Main Section Skeleton */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Top Filter Bar Skeleton */}
            <div
              className={`hidden lg:grid sticky top-16 z-10 p-4 rounded-b-xl shadow-md grid-cols-1 items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-pulse ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="col-span-full lg:col-span-2">
                <div className={`h-10 w-full rounded-md ${pulse}`}></div>
              </div>

              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="w-full space-y-2">
                    <div className={`h-4 w-20 rounded-md ${pulse}`}></div>
                    <div className={`h-10 w-full rounded-md ${pulse}`}></div>
                  </div>
                ))}
            </div>

            {/* Mobile Filter Bar Skeleton */}
            <div className="flex items-center justify-between lg:hidden mb-4">
              <div className={`h-10 w-10 rounded-lg animate-pulse ${pulse}`}></div>
              <div className="flex-1 ml-4">
                <div className={`h-10 w-full rounded-md animate-pulse ${pulse}`}></div>
              </div>
            </div>

            {/* Product Cards Skeleton Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Array(9)
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPageLoader;
