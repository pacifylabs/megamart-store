import { useState } from "react";
import { Search, ListFilter, ShoppingCart } from "lucide-react";
import { essential, phones } from "../data/data";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const categories = ["All", "Phones", "Essentials", "Electronics"];

export default function ListingPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart, cartCount } = useCart();
  const navigate = useNavigate();

  const products = [...essential, ...phones];

  const filteredProducts = products
    .filter((p) =>
      selectedCategory === "All" ? true : p.category === selectedCategory
    )
    .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      const priceA = parseInt(String(a.price).replace(/[^\d]/g, "")) || 0;
      const priceB = parseInt(String(b.price).replace(/[^\d]/g, "")) || 0;
      if (sortOption === "price-low") return priceA - priceB;
      if (sortOption === "price-high") return priceB - priceA;
      return 0;
    });
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-4 sm:px-6 py-3 border-b border-slate-100">
        <div className="max-w-[95%] mx-auto flex items-center justify-between gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <ListFilter className="w-10 h-7 text-blue-500" />
              <div className="text-lg sm:text-xl font-extrabold text-blue-600">
                MegaMart
              </div>
            </Link>
          </div>
          <div className="flex flex-1">
            <div className="relative w-full max-w-[500px] mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-[#e6eef2] bg-blue-50 px-10 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Search products"
              />
            </div>
          </div>
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

            <Link to="/carts" className="relative">
              <ShoppingCart className="w-6 h-6 text-blue-500" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Layout */}
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
          {filteredProducts.map((p, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-[#e6eef2] p-3 sm:p-4 relative flex-shrink-0 w-[160px] sm:w-auto cursor-pointer"
              onClick={() => navigate(`/product/${p.id || i}`)}
            >
              {p.discount && (
                <div className="absolute top-1 right-1 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  <span>50%</span> <br />
                  <span>OFF</span>
                </div>
              )}
              <div className="flex justify-center">
                <img
                  src={p.image || p.img}
                  alt={p.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
                />
              </div>
              <h4 className="mt-2 sm:mt-3 text-[11px] sm:text-sm font-semibold line-clamp-2">
                {p.name}
              </h4>
              <div className="mt-1 text-[11px] sm:text-sm">
                <span className="font-semibold">{p.price}</span>{" "}
                {p.cut && (
                  <span className="line-through text-slate-400">{p.cut}</span>
                )}
              </div>
              <div
                className="mt-1 sm:mt-2 flex items-center justify-between"
                onClick={(e) => e.stopPropagation()} // prevent triggering navigate
              >
                {p.save && (
                  <span className="text-[10px] sm:text-[13px] text-emerald-600">
                    {p.save}
                  </span>
                )}
                <button
                  onClick={() =>
                    addToCart({
                      id: p.id || i,
                      name: p.name,
                      price:
                        typeof p.price === "string"
                          ? parseInt(p.price.replace(/[^\d]/g, ""))
                          : p.price,
                      img: p.image || p.img,
                    })
                  }
                  className="ml-2 px-2 py-1 bg-blue-500 text-white text-[10px] sm:text-xs rounded hover:bg-blue-600 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
