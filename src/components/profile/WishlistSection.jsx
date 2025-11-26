// components/profile/WishlistSection.jsx
import React, { useState, useEffect } from "react";
import { Heart, Eye, Trash2, Loader, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const mockWishlist = [
  { 
    id: 1, 
    productId: "prod_1",
    title: "Wireless Headphones", 
    price: "₹2,999",
    image: "/images/headphones.jpg",
    inStock: true,
    rating: 4.5
  },
  { 
    id: 2, 
    productId: "prod_2",
    title: "Smart Watch", 
    price: "₹6,499",
    image: "/images/smartwatch.jpg",
    inStock: false,
    rating: 4.2
  },
];

// Wishlist Item Component
const WishlistItem = ({ item, onRemove, loading }) => (
  <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
    {/* Product Image */}
    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
      {item.image ? (
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      ) : null}
      <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${item.image ? 'hidden' : 'flex'}`}>
        <ShoppingCart className="w-6 h-6 text-gray-400" />
      </div>
    </div>

    {/* Product Info */}
    <div className="flex-1 min-w-0">
      <h4 className="font-medium text-gray-900 truncate">{item.title}</h4>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-lg font-semibold text-gray-900">{item.price}</span>
        {!item.inStock && (
          <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
            Out of Stock
          </span>
        )}
      </div>
      {item.rating && (
        <div className="flex items-center gap-1 mt-1">
          <div className="flex text-yellow-400">
            {"★".repeat(Math.floor(item.rating))}
            {"☆".repeat(5 - Math.floor(item.rating))}
          </div>
          <span className="text-xs text-gray-500">({item.rating})</span>
        </div>
      )}
    </div>

    {/* Actions */}
    <div className="flex items-center gap-2">
      <Link
        to={`/products/${item.productId}`}
        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        title="View product"
      >
        <Eye className="w-4 h-4" />
      </Link>
      <button
        onClick={() => onRemove(item.productId)}
        disabled={loading}
        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
        title="Remove from wishlist"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  </div>
);

// Empty State
const EmptyWishlist = () => (
  <div className="text-center py-8">
    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
    <p className="text-gray-600 mb-6">Save items you love for later</p>
    <Link
      to="/products"
      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      <ShoppingCart className="w-4 h-4" />
      Start Shopping
    </Link>
  </div>
);

// Loading Skeleton
const WishlistSkeleton = () => (
  <div className="space-y-4">
    {[1, 2].map(i => (
      <div key={i} className="animate-pulse">
        <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
          <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="w-8 h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    ))}
  </div>
);

// Main Component
export default function WishlistSection({ 
  maxDisplay = 2,
  showViewAll = true 
}) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Uncomment when API is ready
      // const result = await wishlistService.getWishlist();
      
      // if (result.success) {
      //   setWishlist(result.data.wishlist || []);
      // } else {
      //   setError(result.error);
      //   // Fallback to mock data
      //   setWishlist(mockWishlist);
      // }
      
      // Using mock data for now
      setTimeout(() => {
        setWishlist(mockWishlist);
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      setError("Failed to load wishlist");
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    if (!window.confirm("Remove this item from your wishlist?")) return;

    try {
      setActionLoading(true);
      
      // TODO: Uncomment when API is ready
      // const result = await wishlistService.removeFromWishlist(productId);
      
      // if (result.success) {
      //   setWishlist(prev => prev.filter(item => item.productId !== productId));
      // } else {
      //   setError(result.error);
      // }
      
      // Mock removal
      setWishlist(prev => prev.filter(item => item.productId !== productId));
      
    } catch (err) {
      setError("Failed to remove item from wishlist");
    } finally {
      setActionLoading(false);
    }
  };

  const displayedWishlist = wishlist.slice(0, maxDisplay);
  const hasWishlistItems = displayedWishlist.length > 0;

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Wishlist</h3>
          <p className="text-gray-600 mt-1">Items you've saved for later</p>
        </div>
        <Heart className="w-6 h-6 text-pink-500" />
      </div>

      {error && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-700 text-sm">{error}</p>
        </div>
      )}

      {loading ? (
        <WishlistSkeleton />
      ) : hasWishlistItems ? (
        <>
          <div className="space-y-4">
            {displayedWishlist.map((item) => (
              <WishlistItem
                key={item.id}
                item={item}
                onRemove={handleRemoveFromWishlist}
                loading={actionLoading}
              />
            ))}
          </div>

          {showViewAll && wishlist.length > maxDisplay && (
            <div className="mt-6 pt-4 border-t border-gray-100">
              <Link
                to="/profile/wishlist"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                View full wishlist ({wishlist.length} items)
                <Eye className="w-4 h-4" />
              </Link>
            </div>
          )}
        </>
      ) : (
        <EmptyWishlist />
      )}
    </div>
  );
}