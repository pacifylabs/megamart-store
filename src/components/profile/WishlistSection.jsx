// src/components/profile/WishlistSection.jsx
import React from "react";
import { Heart } from "lucide-react";

/**
 * Wishlist preview — shows small cards of wishlist items (mock).
 * Replace with real data or global store where needed.
 */
const mockWishlist = [
  { id: 1, title: "Wireless Headphones", price: "₹2,999" },
  { id: 2, title: "Smart Watch", price: "₹6,499" },
];

export default function WishlistSection() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-gray-200 dark:border-slate-700 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Wishlist</h3>
        <Heart className="w-5 h-5 text-pink-500" />
      </div>

      <div className="grid grid-cols-1 gap-3">
        {mockWishlist.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-800 dark:text-slate-200">{item.title}</div>
              <div className="text-xs text-gray-500 dark:text-slate-400">{item.price}</div>
            </div>
            <button className="text-xs text-blue-600 hover:underline">View</button>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <a href="/profile/wishlist" className="text-sm text-blue-600 hover:underline">
          View full wishlist →
        </a>
      </div>
    </div>
  );
}
