import { useState, useContext, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { AppContext } from "../Context/AppContext";
import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom";
import ProductsPageLoader from "@/components/loaders/ProductsPageLoader";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // const [updatedProducts, setUpdatedProducts] = useState([]);
  const { products, darkMode } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * 8,
    currentPage * 8
  );
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [pathname]);
  // 🔹 Loading state
  if (loading) {
    return <ProductsPageLoader darkMode={darkMode} />;
  }
  return (
    <div
      className={`pt-20 pb-4 px-4 sm:px-8 lg:px-16  min-h-screen ${
        darkMode ? "text-white bg-gray-900" : "text-black bg-white"
      }`}
    >
      <div className="max-w-[1440px] mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-amber-700 dark:text-white mb-12">
          Explore Medicines
        </h1>

        {/* Search Bar */}
        <div className="w-full max-w-2xl mx-auto mb-10">
          <div
            className={`relative group transition-colors duration-300 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            {/* Input */}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for medications..."
              className={`w-full pl-12 pr-12 py-4 text-lg rounded-2xl shadow-md border focus:outline-none focus:ring-4 transition-all duration-300 group-hover:shadow-lg
        ${
          darkMode
            ? "bg-gray-900 text-white border-gray-700 focus:ring-blue-500/40 placeholder-gray-400"
            : "bg-white text-gray-900 border-gray-200 focus:ring-blue-400/50 placeholder-gray-500"
        }`}
            />

            {/* Search Icon Left */}
            <Search
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors
        ${darkMode ? "text-gray-300" : "text-gray-400"}`}
            />

            {/* Clear Button */}
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors
          ${
            darkMode
              ? "text-gray-400 hover:text-red-400"
              : "text-gray-500 hover:text-red-500"
          }`}
              >
                ✕
              </button>
            )}
          </div>

          {/* Suggestions Dropdown */}
          {searchTerm && (
            <div
              className={`mt-2 rounded-xl shadow-lg border overflow-hidden transition-colors duration-300
        ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
            >
              <ul
                className={`divide-y transition-colors duration-300
          ${darkMode ? "divide-gray-700" : "divide-gray-200"}`}
              >
                <li
                  className={`px-4 py-3 cursor-pointer transition-colors
            ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                >
                  Paracetamol
                </li>
                <li
                  className={`px-4 py-3 cursor-pointer transition-colors
            ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                >
                  Ibuprofen
                </li>
                <li
                  className={`px-4 py-3 cursor-pointer transition-colors
            ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                >
                  Amoxicillin
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Product Grid */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              darkMode={darkMode}
              // refreshCart={refreshCart}
            />
          ))}
        </section>

        {/* Pagination */}
        <div className="col-span-full flex justify-center">
          {filteredProducts.length > 8 && (
            <div className="flex items-center justify-center space-x-4 mt-10">
              <button
                className="text-white cursor-pointer"
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              >
                <ChevronLeft />
              </button>
              {Array.from({
                length: Math.ceil(filteredProducts.length / 8),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 flex justify-center items-center border border-gray-300 rounded ${
                    currentPage === index + 1
                      ? "bg-blue-100 text-blue-500"
                      : "text-gray-500"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="text-white cursor-pointer"
                onClick={() =>
                  setCurrentPage(
                    Math.min(
                      currentPage + 1,
                      Math.ceil(filteredProducts.length / 8)
                    )
                  )
                }
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
