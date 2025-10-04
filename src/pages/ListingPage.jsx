import { useState } from "react";
import { Search, ListFilter, ShoppingCart } from "lucide-react";
import { essential, phones } from "../data/data";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard"; // ✅ new reusable component
import CartIcon from "../components/ui/CartIcon";

const categories = ["All", "Phones", "Essentials", "Electronics"];

export default function ListingPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount } = useCart();

  const products = [...essential, ...phones];

  const filteredProducts = products
    .filter((p) =>
      selectedCategory === "All" ? true : p.category === selectedCategory
    )
    .filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const priceA = parseInt(String(a.price).replace(/[^\d]/g, "")) || 0;
      const priceB = parseInt(String(b.price).replace(/[^\d]/g, "")) || 0;

      if (sortOption === "price-low") return priceA - priceB;
      if (sortOption === "price-high") return priceB - priceA;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <div className="bg-white px-4 sm:px-6 py-3 border-b border-slate-100">
        <div className="max-w-[95%] mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <ListFilter className="w-10 h-7 text-blue-500" />
              <div className="text-lg sm:text-xl font-extrabold text-blue-600">
                MegaMart
              </div>
            </Link>
          </div>

          {/* Search */}
          <div className="flex flex-1">
            <div className="relative w-full max-w-[500px] mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-[#e6eef2] bg-blue-50 px-10 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Search essentials, groceries and more..."
              />
            </div>
          </div>

          {/* Sort & Cart */}
          <div className="flex items-center gap-4">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="default">Sort By</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          
            <CartIcon />  {/* ✅ reusable cart icon */}
          </div>
        </div>
      </div>

      {/* Categories + Products */}
      <div className="max-w-[95%] mx-auto px-2 sm:px-6 py-6 grid grid-cols-[80px_1fr] sm:grid-cols-[200px_1fr] gap-3 sm:gap-6">
        {/* Categories */}
        <div className="bg-white p-2 sm:p-4 rounded-lg shadow-sm h-fit">
          <h3 className="hidden sm:block text-lg font-semibold mb-3 text-slate-700">
            Categories
          </h3>
          <ul className="space-y-1 sm:space-y-2">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-2 sm:px-3 py-2 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
                    selectedCategory === cat
                      ? "bg-blue-500 text-white"
                      : "text-slate-600 hover:bg-blue-50"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
