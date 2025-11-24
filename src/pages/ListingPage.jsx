import { Grid3x3, List, ListFilter, Search, SlidersHorizontal, X } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import CartIcon from "../components/ui/CartIcon";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import API, { CURRENCY_SIGN } from "../utils/api-axios";
import Footer from "../components/Footer";

const currency = CURRENCY_SIGN;

export default function ListingPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [allCategoriesData, setAllCategoriesData] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("All");
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  
  // UI states
  const [sortOption, setSortOption] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  const { cartCount } = useCart();
  const { user } = useAuth();

  // Price range options
  const priceRanges = [
    { id: "under-100", label: `Under ${currency}100`, min: 0, max: 100 },
    { id: "100-500", label: `${currency}100 - ${currency}500`, min: 100, max: 500 },
    { id: "500-1000", label: `${currency}500 - ${currency}1000`, min: 500, max: 1000 },
    { id: "1000-5000", label: `${currency}1000 - ${currency}5000`, min: 1000, max: 5000 },
    { id: "above-5000", label: `Above ${currency}5000`, min: 5000, max: Infinity }
  ];

  // Helper function to get category name from ID
  const getCategoryName = (categoryId) => {
    if (categoryId === "All") return "All Products";
    const category = allCategoriesData.find(cat => cat.id === categoryId || cat._id === categoryId);
    return category ? category.name : "Unknown";
  };

  // Helper function to get subcategory name from ID
  const getSubCategoryName = (subCategoryId) => {
    if (subCategoryId === "All") return "All";
    const subCategory = subCategories.find(sub => sub.id === subCategoryId || sub._id === subCategoryId);
    return subCategory ? subCategory.name : "Unknown";
  };

  // Fetch products from API - SIMPLIFIED AND FIXED
  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      // Build query parameters - ONLY send filters that should be handled by API
      const params = {
        page,
        limit: itemsPerPage,
      };

      // Add category filter if not "All"
      if (selectedCategoryId !== 'All') {
        params.category = selectedCategoryId;
      }

      // Add subcategory filter if not "All"
      if (selectedSubCategoryId !== 'All') {
        params.subcategory = selectedSubCategoryId;
      }

      // Add search query
      if (searchQuery && searchQuery.trim()) {
        params.search = searchQuery.trim();
      }

      // Add price range filter to API call
      if (selectedPriceRange.length > 0) {
        const minPrices = selectedPriceRange.map(rangeId => {
          const range = priceRanges.find(r => r.id === rangeId);
          return range ? range.min : 0;
        });
        const maxPrices = selectedPriceRange.map(rangeId => {
          const range = priceRanges.find(r => r.id === rangeId);
          return range ? (range.max === Infinity ? 999999999 : range.max) : 999999999;
        });

        if (minPrices.length > 0) {
          params.minPrice = Math.min(...minPrices);
          params.maxPrice = Math.max(...maxPrices);
        }
      }

      console.log("API Request Params:", params);

      // Make API call
      const response = await API.get('/products/all', { params });
      console.log("API Response:", response.data);
      
      // Process response - handle different structures
      let productsData = [];
      let paginationData = {};
      
      if (response.data) {
        // Case 1: Nested structure { data: { data: [], pagination: {} } }
        if (response.data.data && Array.isArray(response.data.data)) {
          productsData = response.data.data;
          paginationData = response.data.pagination || response.data;
        } 
        // Case 2: Direct array response
        else if (Array.isArray(response.data)) {
          productsData = response.data;
        }
        // Case 3: Products array in products field
        else if (response.data.products && Array.isArray(response.data.products)) {
          productsData = response.data.products;
          paginationData = response.data.pagination || {};
        }
        // Case 4: Direct object with data array
        else if (Array.isArray(response.data.data)) {
          productsData = response.data.data;
          paginationData = response.data;
        }
      }
      
      console.log("Extracted products:", productsData.length);
      console.log("Pagination data:", paginationData);

      // Transform products to match ProductCard expectations
      const processedProducts = productsData.map((product, index) => {
        // Calculate price details properly
        
        return {
          id: product._id || product.id,
          name: product.name,
          price: (product.price - product.discount).toFixed(2),
          img: product.img || " ",
          discount: product.discount,
          percentage: product.percentage || 0,
          save: product.discount,
          cut: product.price,
          currency,
          category: product.category?.name || product.category || 'Uncategorized',
          subCategory: product.subCategory?.name || product.subCategory || '',
          description: product.description || '',
          stock: product.stock || 0,
          sku: product.sku || '',
          specification: product.specification || {},
          // Keep original category/subcategory IDs for filtering
          categoryId: product.category?._id || product.category?.id || product.category,
          subCategoryId: product.subCategory?._id || product.subCategory?.id || product.subCategory
        };
      });

      console.log("Processed products:", processedProducts);

      // APPLY CLIENT-SIDE FILTERING ONLY IF API DOESN'T SUPPORT THE FILTERS
      let filteredProducts = processedProducts;

      // Client-side category filtering (if API didn't handle it properly)
      if (selectedCategoryId !== 'All') {
        const beforeCount = filteredProducts.length;
        filteredProducts = filteredProducts.filter(product => {
          const productCategoryId = product.categoryId;
          const matchesCategory = productCategoryId === selectedCategoryId;
          
          if (!matchesCategory) {
            console.log(`Product ${product.name} filtered out - category mismatch:`, {
              productCategoryId,
              selectedCategoryId
            });
          }
          return matchesCategory;
        });
        console.log(`Category filtering: ${beforeCount} -> ${filteredProducts.length} products`);
      }

      // Client-side subcategory filtering (if API didn't handle it properly)
      if (selectedSubCategoryId !== 'All') {
        const beforeCount = filteredProducts.length;
        filteredProducts = filteredProducts.filter(product => {
          const productSubCategoryId = product.subCategoryId;
          const matchesSubCategory = productSubCategoryId === selectedSubCategoryId;
          
          if (!matchesSubCategory) {
            console.log(`Product ${product.name} filtered out - subcategory mismatch:`, {
              productSubCategoryId,
              selectedSubCategoryId
            });
          }
          return matchesSubCategory;
        });
        console.log(`Subcategory filtering: ${beforeCount} -> ${filteredProducts.length} products`);
      }

      // Client-side price range filtering (if API didn't handle it properly)
      if (selectedPriceRange.length > 0) {
        const beforeCount = filteredProducts.length;
        filteredProducts = filteredProducts.filter(product => {
          const productPrice = product.price || 0;
          const isInSelectedRange = selectedPriceRange.some(rangeId => {
            const range = priceRanges.find(r => r.id === rangeId);
            if (!range) return false;
            
            const minPrice = range.min;
            const maxPrice = range.max === Infinity ? 999999999 : range.max;
            const isInRange = productPrice >= minPrice && productPrice <= maxPrice;
            
            return isInRange;
          });
          
          if (!isInSelectedRange) {
            console.log(`Product ${product.name} filtered out - price ${productPrice} not in selected ranges`);
          }
          return isInSelectedRange;
        });
        console.log(`Price filtering: ${beforeCount} -> ${filteredProducts.length} products`);
      }

      setProducts(filteredProducts);
      
      // Update pagination
      if (paginationData.totalPages || paginationData.totalItems) {
        // Use API pagination if available
        setTotalPages(paginationData.totalPages || 1);
        setTotalItems(paginationData.totalItems || filteredProducts.length);
        setCurrentPage(paginationData.currentPage || paginationData.page || 1);
      } else {
        // Calculate pagination based on filtered results
        const totalItemsCount = filteredProducts.length;
        const totalPagesCount = Math.ceil(totalItemsCount / itemsPerPage) || 1;
        
        setTotalPages(totalPagesCount);
        setTotalItems(totalItemsCount);
        setCurrentPage(page);
        
        // Adjust current page if it's beyond the new total pages
        if (page > totalPagesCount) {
          setCurrentPage(Math.max(1, totalPagesCount));
        }
      }

      console.log("Final state:", {
        products: filteredProducts.length,
        totalPages: Math.ceil(filteredProducts.length / itemsPerPage),
        totalItems: filteredProducts.length,
        currentPage: page
      });

    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.response?.data?.message || "Failed to load products. Please try again later.");
      setProducts([]);
      setTotalPages(1);
      setTotalItems(0);
      setCurrentPage(1);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await API.get('/categories');
      console.log("Categories response:", response.data);
      const categoriesData = response.data || [];
      const activeCategories = categoriesData.filter(cat => cat.isActive !== false);
      
      // Store full category data with subcategories
      setAllCategoriesData(activeCategories);
      
      // Create category list with ID and name
      const categoryList = activeCategories.map(cat => ({
        id: cat._id || cat.id,
        name: cat.name
      }));

      setCategories([{ id: "All", name: "All" }, ...categoryList]);
      
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories([{ id: "All", name: "All" }]);
    }
  };

  // Fetch subcategories from API
  const fetchSubcategories = async (categoryId) => {
    if (categoryId === "All") {
      setSubCategories([{ id: "All", name: "All" }]);
      return;
    }

    try {
      console.log("Fetching subcategories for category:", categoryId);
      const response = await API.get(`/categories/${categoryId}/subcategories`);
      console.log("Subcategories response:", response.data);
      const subcategoriesData = response.data || [];
      
      // Create subcategory list with ID and name
      const subcategoryList = subcategoriesData
        .filter(subCat => subCat.isActive !== false)
        .map(subCat => ({
          id: subCat._id || subCat.id,
          name: subCat.name
        }));
      
      setSubCategories([{ id: "All", name: "All" }, ...subcategoryList]);
      
    } catch (err) {
      console.error("Error fetching subcategories:", err);
      setSubCategories([{ id: "All", name: "All" }]);
    }
  };

  // Initial data fetch
  useEffect(() => {
    const initializeData = async () => {
      await fetchCategories();
      await fetchProducts(1);
    };
    
    initializeData();
  }, []);

  // Update subcategories when category changes
  useEffect(() => {
    if (selectedCategoryId) {
      fetchSubcategories(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  // Refetch when filters change - FIXED DEPENDENCIES
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      fetchProducts(1);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [selectedCategoryId, selectedSubCategoryId, selectedPriceRange, itemsPerPage]);

  // Refetch when search changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      fetchProducts(1);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Sort products function
  const sortProducts = (productsToSort, sortOption) => {
    if (!productsToSort || productsToSort.length === 0 || sortOption === 'default') {
      return productsToSort;
    }

    const sortedProducts = [...productsToSort];
    
    switch (sortOption) {
      case 'price-low':
        return sortedProducts.sort((a, b) => {
          const priceA = a.price || 0;
          const priceB = b.price || 0;
          return priceA - priceB;
        });
      
      case 'price-high':
        return sortedProducts.sort((a, b) => {
          const priceA = a.price || 0;
          const priceB = b.price || 0;
          return priceB - priceA;
        });
      
      case 'name-asc':
        return sortedProducts.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      
      case 'name-desc':
        return sortedProducts.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
      
      case 'newest':
        return sortedProducts.sort((a, b) => {
          return (b.id || '').toString().localeCompare((a.id || '').toString());
        });
      
      case 'discount':
        return sortedProducts.sort((a, b) => {
          const discountA = a.discount || 0;
          const discountB = b.discount || 0;
          return discountB - discountA;
        });
      
      default:
        return sortedProducts;
    }
  };

  // Create sorted products derived state
  const sortedProducts = useMemo(() => {
    return sortProducts(products, sortOption);
  }, [products, sortOption]);

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    console.log("Category changed to:", categoryId);
    setSelectedCategoryId(categoryId);
    setSelectedSubCategoryId("All");
    setCurrentPage(1);
    setShowFilters(false);
  };

  // Handle subcategory change
  const handleSubCategoryChange = (subCategoryId) => {
    console.log("Subcategory changed to:", subCategoryId);
    setSelectedSubCategoryId(subCategoryId);
    setCurrentPage(1);
  };

  // Handle price range toggle
  const handlePriceRangeToggle = (rangeId) => {
    setSelectedPriceRange(prev => 
      prev.includes(rangeId) 
        ? prev.filter(id => id !== rangeId)
        : [...prev, rangeId]
    );
    setCurrentPage(1);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategoryId("All");
    setSelectedSubCategoryId("All");
    setSelectedPriceRange([]);
    setSearchQuery("");
    setSortOption("default");
    setCurrentPage(1);
  };

  // Pagination functions
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      fetchProducts(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  // Render pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);
    
    if (endPage - startPage < maxButtons - 1) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    if (startPage > 1) {
      buttons.push(
        <button 
          key={1} 
          onClick={() => goToPage(1)} 
          className="w-10 h-10 rounded-md bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(<span key="dots1" className="px-2 text-gray-500">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`w-10 h-10 rounded-md ${
            currentPage === i
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(<span key="dots2" className="px-2 text-gray-500">...</span>);
      }
      buttons.push(
        <button 
          key={totalPages} 
          onClick={() => goToPage(totalPages)} 
          className="w-10 h-10 rounded-md bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  // Calculate active filters count
  const activeFiltersCount = 
    (selectedCategoryId !== "All" ? 1 : 0) +
    (selectedSubCategoryId !== "All" ? 1 : 0) +
    selectedPriceRange.length +
    (searchQuery && searchQuery.trim() ? 1 : 0);

  // Calculate display range
  const startIndex = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  // Debug info
  console.log("Current filter state:", {
    selectedCategoryId,
    selectedSubCategoryId,
    selectedPriceRange,
    searchQuery,
    productsCount: products.length,
    sortedProductsCount: sortedProducts.length
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-700">Loading products...</p>
          </div>
        </div>
      )}
      
      {/* Error Alert */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <button 
            onClick={() => fetchProducts(currentPage)} 
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Retry</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
            </svg>
          </button>
        </div>
      )}

      {/* Rest of the JSX remains exactly the same as before */}
      {/* Top Navbar */}
      <div className="bg-white px-4 sm:px-6 py-3 border-b border-slate-100 sticky top-0 z-20 shadow-sm">
        <div className="max-w-[95%] mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <ListFilter className="w-8 h-6 sm:w-10 sm:h-7 text-blue-500" />
            <div className="text-base sm:text-lg md:text-xl font-extrabold text-blue-600">
              MegaMart
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-2 sm:mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-[#e6eef2] bg-blue-50 px-10 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Search products..."
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition relative"
              aria-label="Toggle filters"
            >
              <SlidersHorizontal className="w-5 h-5 text-gray-600" />
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Sort Dropdown - Hidden on mobile */}
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="hidden sm:block rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="default">Sort By</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="newest">Newest First</option>
              <option value="discount">Highest Discount</option>
            </select>

            {/* Cart Icon */}
            <CartIcon />
          </div>
        </div>

        {/* Mobile Sort Bar */}
        <div className="sm:hidden mt-3 flex items-center gap-2">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="default">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            <option value="newest">Newest First</option>
            <option value="discount">Highest Discount</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex rounded-lg border border-gray-300 overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "bg-white text-gray-600"}`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "bg-white text-gray-600"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[95%] mx-auto px-2 sm:px-6 py-4 sm:py-6">
        {/* Breadcrumb */}
        <div className="mb-4 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">
            {getCategoryName(selectedCategoryId)}
          </span>
          {selectedSubCategoryId !== "All" && (
            <>
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium">{getSubCategoryName(selectedSubCategoryId)}</span>
            </>
          )}
        </div>

        {/* Results Summary */}
        <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
          <p className="text-sm text-gray-600">
            {totalItems > 0 ? (
              <>
                Showing <span className="font-semibold">{startIndex}</span> - <span className="font-semibold">{endIndex}</span> of <span className="font-semibold">{totalItems}</span> products
              </>
            ) : (
              <span>No products found</span>
            )}
          </p>
          {searchQuery && (
            <p className="text-sm text-gray-600">
              Search: <span className="font-semibold">"{searchQuery}"</span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 sm:gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block">
            <div className="bg-white p-4 rounded-lg shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5" />
                  Filters
                </h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3 text-gray-700">Categories</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center text-sm cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input 
                        type="radio" 
                        name="category"
                        className="mr-2 text-blue-600 focus:ring-blue-500"
                        checked={selectedCategoryId === cat.id}
                        onChange={() => handleCategoryChange(cat.id)}
                      />
                      <span className="text-gray-700">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Subcategories */}
              {selectedCategoryId !== "All" && subCategories.length > 1 && (
                <div className="mb-6 pt-4 border-t">
                  <h4 className="text-sm font-semibold mb-3 text-gray-700">Sub-Categories</h4>
                  <div className="space-y-2">
                    {subCategories.map((subCat) => (
                      <label key={subCat.id} className="flex items-center text-sm cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input 
                          type="radio" 
                          name="subcategory"
                          className="mr-2 text-blue-600 focus:ring-blue-500"
                          checked={selectedSubCategoryId === subCat.id}
                          onChange={() => handleSubCategoryChange(subCat.id)}
                        />
                        <span className="text-gray-700">{subCat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range */}
              <div className="mb-6 pt-4 border-t">
                <h4 className="text-sm font-semibold mb-3 text-gray-700">Price Range</h4>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range.id} className="flex items-center text-sm cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input 
                        type="checkbox" 
                        className="mr-2 rounded text-blue-600 focus:ring-blue-500"
                        checked={selectedPriceRange.includes(range.id)}
                        onChange={() => handlePriceRangeToggle(range.id)}
                      />
                      <span className="text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Active Filters Summary */}
              {activeFiltersCount > 0 && (
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-semibold mb-3 text-gray-700">Active Filters</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategoryId !== "All" && (
                      <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                        {getCategoryName(selectedCategoryId)}
                        <X 
                          className="w-3 h-3 cursor-pointer hover:text-blue-900" 
                          onClick={() => setSelectedCategoryId("All")}
                        />
                      </span>
                    )}
                    {selectedSubCategoryId !== "All" && (
                      <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                        {getSubCategoryName(selectedSubCategoryId)}
                        <X 
                          className="w-3 h-3 cursor-pointer hover:text-blue-900" 
                          onClick={() => setSelectedSubCategoryId("All")}
                        />
                      </span>
                    )}
                    {searchQuery && searchQuery.trim() && (
                      <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                        Search: "{searchQuery}"
                        <X 
                          className="w-3 h-3 cursor-pointer hover:text-blue-900" 
                          onClick={() => setSearchQuery("")}
                        />
                      </span>
                    )}
                    {selectedPriceRange.map(rangeId => {
                      const range = priceRanges.find(r => r.id === rangeId);
                      return (
                        <span key={rangeId} className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                          {range.label}
                          <X 
                            className="w-3 h-3 cursor-pointer hover:text-blue-900" 
                            onClick={() => handlePriceRangeToggle(rangeId)}
                          />
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Mobile Filter Modal */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setShowFilters(false)}>
              <div
                className="absolute left-0 top-0 bottom-0 w-80 max-w-[85%] bg-white p-6 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-slate-700">Filters</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold mb-3 text-gray-700">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat.id} className="flex items-center text-sm cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input 
                          type="radio" 
                          name="category-mobile"
                          className="mr-2 text-blue-600 focus:ring-blue-500"
                          checked={selectedCategoryId === cat.id}
                          onChange={() => handleCategoryChange(cat.id)}
                        />
                        <span className="text-gray-700">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Subcategories */}
                {selectedCategoryId !== "All" && subCategories.length > 1 && (
                  <div className="mb-6 pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-3 text-gray-700">Sub-Categories</h4>
                    <div className="space-y-2">
                      {subCategories.map((subCat) => (
                        <label key={subCat.id} className="flex items-center text-sm cursor-pointer hover:bg-gray-50 p-2 rounded">
                          <input 
                            type="radio" 
                            name="subcategory-mobile"
                            className="mr-2 text-blue-600 focus:ring-blue-500"
                            checked={selectedSubCategoryId === subCat.id}
                            onChange={() => handleSubCategoryChange(subCat.id)}
                          />
                          <span className="text-gray-700">{subCat.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price Range */}
                <div className="mb-6 pt-4 border-t">
                  <h4 className="text-sm font-semibold mb-3 text-gray-700">Price Range</h4>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label key={range.id} className="flex items-center text-sm cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input 
                          type="checkbox" 
                          className="mr-2 rounded text-blue-600 focus:ring-blue-500"
                          checked={selectedPriceRange.includes(range.id)}
                          onChange={() => handlePriceRangeToggle(range.id)}
                        />
                        <span className="text-gray-700">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear and Apply Buttons */}
                <div className="space-y-2 pt-4 border-t">
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={() => {
                        clearAllFilters();
                        setShowFilters(false);
                      }}
                      className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                    >
                      Clear All Filters
                    </button>
                  )}
                  <button
                    onClick={() => setShowFilters(false)}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Apply Filters ({totalItems})
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <main>
            {sortedProducts.length === 0 && !loading ? (
              <div className="bg-white rounded-lg p-12 text-center">
                <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery
                    ? `No results for "${searchQuery}"`
                    : "Try adjusting your filters"}
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
                      : "flex flex-col gap-4"
                  }
                >
                  {sortedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} viewMode={viewMode} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-600">
                      Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={goToPrevPage}
                        disabled={currentPage === 1 || loading}
                        className={`px-4 py-2 rounded-md border ${
                          currentPage === 1 || loading
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                        }`}
                      >
                        Previous
                      </button>

                      <div className="hidden sm:flex items-center gap-1">
                        {renderPaginationButtons()}
                      </div>

                      {/* Mobile: Show current page only */}
                      <div className="sm:hidden flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          {currentPage} / {totalPages}
                        </span>
                      </div>

                      <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages || loading}
                        className={`px-4 py-2 rounded-md border ${
                          currentPage === totalPages || loading
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                        }`}
                      >
                        Next
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-600 hidden sm:inline">Show:</span>
                      <select
                        value={itemsPerPage}
                        onChange={(e) => {
                          setItemsPerPage(Number(e.target.value));
                          setCurrentPage(1);
                        }}
                        disabled={loading}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      >
                        <option value={6}>6</option>
                        <option value={12}>12</option>
                        <option value={24}>24</option>
                        <option value={48}>48</option>
                      </select>
                      <span className="text-gray-600 hidden sm:inline">per page</span>
                    </div>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}