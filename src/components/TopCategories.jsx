import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api-axios";

export default function TopCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await API.get('/categories');
      console.log("Categories API response:", response.data);
      
      // Process the API response to match the expected structure
      const categoriesData = response.data || [];
      
      // Filter active categories and transform to match the expected structure
      const activeCategories = categoriesData
        .filter(cat => cat.isActive !== false)
        .map(cat => ({
          id: cat._id || cat.id,
          name: cat.name,
          img: cat.image || cat.img || getDefaultCategoryImage(cat.name),
          // Add any other properties you need
        }));

      // Limit to top categories (you can adjust this logic)
      const topCategories = activeCategories.slice(0, 8); // Show first 8 categories
      
      setCategories(topCategories);
      
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories");
      // Fallback to empty array
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get default category images based on category name
  const getDefaultCategoryImage = (categoryName) => {
    const defaultImages = {
      'Electronics': '/images/electronics.png',
      'Clothing': '/images/clothing.png',
      'Books': '/images/books.png',
      'Home & Garden': '/images/home-garden.png',
      'Sports': '/images/sports.png',
      'Beauty': '/images/beauty.png',
      'Toys': '/images/toys.png',
      'Automotive': '/images/automotive.png',
      // Add more mappings as needed
    };
    
    return defaultImages[categoryName] || '/images/default-category.png';
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="max-w-[95%] mx-auto px-4 sm:px-6 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-semibold">
            Shop From <span className="text-blue-600">Top Categories</span>
            <div className="w-45 h-1 bg-blue-400 rounded mt-1 sm:w-53"></div>
          </h3>
          <div className="text-blue-600 text-sm">View All →</div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto sm:overflow-x-hidden hide-scrollbar pb-3">
          {/* Loading skeleton */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center min-w-[90px] sm:min-w-[110px]"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-200 flex items-center justify-center shadow border border-gray-300 animate-pulse">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-full"></div>
              </div>
              <div className="mt-2 sm:mt-3 w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-[95%] mx-auto px-4 sm:px-6 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-semibold">
            Shop From <span className="text-blue-600">Top Categories</span>
            <div className="w-45 h-1 bg-blue-400 rounded mt-1 sm:w-53"></div>
          </h3>
          <Link
            to="/listing"
            className="text-blue-600 text-sm hover:underline hover:text-blue-800 transition"
          >
            View All →
          </Link>
        </div>

        <div className="text-center py-8 text-gray-500">
          <p>Failed to load categories. Please try again later.</p>
          <button 
            onClick={fetchCategories}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (categories.length === 0) {
    return (
      <div className="max-w-[95%] mx-auto px-4 sm:px-6 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-semibold">
            Shop From <span className="text-blue-600">Top Categories</span>
            <div className="w-45 h-1 bg-blue-400 rounded mt-1 sm:w-53"></div>
          </h3>
          <Link
            to="/listing"
            className="text-blue-600 text-sm hover:underline hover:text-blue-800 transition"
          >
            View All →
          </Link>
        </div>

        <div className="text-center py-8 text-gray-500">
          <p>No categories available at the moment.</p>
        </div>
      </div>
    );
  }

  // Main render with categories
  return (
    <div className="max-w-[95%] mx-auto px-4 sm:px-6 mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-semibold">
          Shop From <span className="text-blue-600">Top Categories</span>
          <div className="w-45 h-1 bg-blue-400 rounded mt-1 sm:w-53"></div>
        </h3>
        <Link
          to="/listing"
          className="text-blue-600 text-sm hover:underline hover:text-blue-800 transition"
        >
          View All →
        </Link>
      </div>

      <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto sm:overflow-x-hidden hide-scrollbar pb-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/listing?category=${category.id}`}
            className="flex flex-col items-center min-w-[90px] sm:min-w-[110px] group"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center shadow border border-[#eef6fb] group-hover:shadow-md group-hover:border-blue-300 transition-all duration-300">
              <img
                src={category.img}
                alt={category.name}
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  // Fallback if image fails to load
                  e.target.src = '/images/default-category.png';
                }}
              />
            </div>
            <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-700 group-hover:text-blue-600 transition-colors duration-300 text-center">
              {category.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}