import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { Menu, Search } from "lucide-react";
import { AppContext } from "../Context/AppContext.jsx";
import { getCart } from "../api/cartApi";
import { useLocation } from "react-router-dom";
import CategoryPageLoader from "@/components/loaders/CategoryPageLoader.jsx";

const CategoryPage = ({ userId }) => {
  const getUniqueValues = (items, key) => [
    "All",
    ...Array.from(new Set(items.map((item) => item[key]))),
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [availability, setAvailability] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [updatedProducts, setUpdatedProducts] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { setCartCount ,products,darkMode} = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  // 🔄 Load cart state from API on mount
  useEffect(() => {
    const initializeProducts = async () => {
      try {
        let cartItems = [];
        if (userId) {
          const cart = await getCart(userId);
          cartItems = cart.items.map((item) => item.productId);
          setCartCount(cartItems.length);
        }
        const updatedProducts = products.map((product) => ({
          ...product,
          inCart: cartItems.includes(product._id),
        }));
        setUpdatedProducts(updatedProducts);
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
      } catch (err) {
        console.error(err);
      }
    };
    initializeProducts();
  }, [userId, setCartCount, products]);

  const categories = getUniqueValues(updatedProducts, "category");
  const companies = getUniqueValues(updatedProducts, "company");
  const prices = ["All", "$0 - $5", "$5 - $10", "$10+"];
  const availabilityOptions = ["All", "In Stock", "Out of Stock"];
  const sortOptions = [
    "default",
    "priceAsc",
    "priceDesc",
    "nameAsc",
    "nameDesc",
  ];

  const filterOptions = [
    { label: "Company", value: selectedCompany, onChange: setSelectedCompany, options: companies },
    { label: "Price", value: priceRange, onChange: setPriceRange, options: prices },
    { label: "Availability", value: availability, onChange: setAvailability, options: availabilityOptions },
    { 
      label: "Sort By", 
      value: sortOption, 
      onChange: setSortOption, 
      options: sortOptions.map((opt) => ({ value: opt, label: opt === "default" ? "Default" : opt.replace(/([A-Z])/g, " $1").trim() })) 
    },
  ];

  const filterByPrice = (price, range) => {
    const val = parseFloat(price.replace("$", ""));
    if (range === "$0 - $5") return val <= 5;
    if (range === "$5 - $10") return val > 5 && val <= 10;
    if (range === "$10+") return val > 10;
    return true;
  };

  const filteredProducts = updatedProducts.filter((product) => {
    const matchCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchCompany = selectedCompany === "All" || product.company === selectedCompany;
    const matchPrice = filterByPrice(product.price, priceRange);
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchCompany && matchPrice && matchSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "priceAsc") return parseFloat(a.price) - parseFloat(b.price);
    if (sortOption === "priceDesc") return parseFloat(b.price) - parseFloat(a.price);
    if (sortOption === "nameAsc") return a.name.localeCompare(b.name);
    if (sortOption === "nameDesc") return b.name.localeCompare(a.name);
    return 0;
  });

  // Refresh cart count globally
  const refreshCart = async () => {
    if (!userId) return;
    try {
      const cart = await getCart(userId);
      setCartCount(cart.items.length);
      const updatedProducts = products.map((product) => ({
        ...product,
        inCart: cart.items.some((item) => item.productId === product._id),
      }));
      setUpdatedProducts(updatedProducts);
    } catch (err) {
      console.error(err);
    }
  };
const {pathname}=useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  },[pathname]);

  // 🔹 Loading state
  if (loading) {
    return <CategoryPageLoader darkMode={darkMode} />;
  }
  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 p-4 pt-20 ${darkMode ? "text-white bg-gray-900" : "text-black bg-white"}`}>
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-green-600 mb-2">
        Browse Medicines by Category
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-6 text-sm sm:text-base">
        Filter your results by category, company, and more
      </p>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Mobile header */}
        <div className="flex items-center justify-between lg:hidden mb-4">
          <button onClick={() => setShowMobileFilters((prev) => !prev)} className="text-green-600" aria-label="Toggle Filters">
            <Menu size={24} />
          </button>
          <div className="flex-1 ml-4 relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-sm"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300" size={18} />
          </div>
        </div>

        {/* Sidebar for large screens */}
        <aside className={`"hidden lg:block lg:w-1/5 h-fit  p-4 rounded-xl shadow-md sticky top-24 ${darkMode ? "text-white bg-gray-800" : "text-black bg-white"}`}>
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`cursor-pointer px-4 py-2 rounded-md transition font-medium text-sm sm:text-base ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 dark:text-gray-300"
                }`}
              >
                {cat}
              </li>
            ))}
          </ul>
        </aside>

        {showMobileFilters && (
  <div
    className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 lg:hidden p-4 rounded-xl shadow-md ${
      darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
    }`}
  >
    {filterOptions.map((filter, i) => (
      <div key={i} className="w-full">
        <label className="block text-sm font-medium mb-1">
          {filter.label}
        </label>
        <select
          value={filter.value}
          onChange={(e) => filter.onChange(e.target.value)}
          className={`w-full px-3 py-2 rounded-md border outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-sm ${
            darkMode
              ? "border-gray-600 bg-gray-700 text-white"
              : "border-gray-300 bg-white text-black"
          }`}
        >
          {(filter.options || []).map((opt) => (
            <option key={opt.value || opt} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
      </div>
    ))}
  </div>
)}

{/* Main content */}
<div className="flex-1 flex flex-col gap-4">
  {/* Top filters */}
  <div
    className={`hidden lg:grid sticky top-16 z-10 p-4 rounded-b-xl shadow-md grid-cols-1 items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ${
      darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
    }`}
  >
    <div className="col-span-full lg:col-span-2 relative">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`w-full pl-4 pr-10 py-2 rounded-md border outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-sm ${
          darkMode
            ? "border-gray-600 bg-gray-700 text-white"
            : "border-gray-300 bg-white text-black"
        }`}
      />
      <Search
        className={`absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none ${
          darkMode ? "text-gray-300" : "text-gray-500"
        }`}
      />
    </div>
    {filterOptions?.map((filter, i) => (
      <div key={i} className="w-full">
        <label className="block text-sm font-medium mb-1">
          {filter?.label}
        </label>
        <select
          value={filter?.value}
          onChange={(e) => filter?.onChange(e.target.value)}
          className={`w-full px-3 py-2 rounded-md border outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-sm ${
            darkMode
              ? "border-gray-600 bg-gray-700 text-white"
              : "border-gray-300 bg-white text-black"
          }`}
        >
          {(filter?.options || []).map((opt, index) => (
            <option key={index} value={opt?.value || opt}>
              {opt?.label || opt}
            </option>
          ))}
        </select>
      </div>
    ))}
  </div>

  {/* Product Grid */}
  <div className="h-6/7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {sortedProducts.length > 0 ? (
      sortedProducts.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          darkMode={darkMode}
          userId={userId}
          refreshCart={refreshCart} // pass API refresh function
        />
      ))
    ) : (
      <p
        className={`col-span-full text-center ${
          darkMode ? "text-gray-300" : "text-gray-500"
        }`}
      >
        No matching products found.
      </p>
    )}
  </div>
</div>

      </div>
    </div>
  );
};

export default CategoryPage;
