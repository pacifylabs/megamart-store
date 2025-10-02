import React from "react";

export default function TopNav() {
  const categories = [
    "Premium Fruits",
    "Home & Kitchen",
    "Fashion",
    "Electronics",
    "Beauty",
    "Home Improvement",
    "Sports, Toys&Luggage",
  ];

  return (
    <div className="bg-white px-3 sm:px- pt-2 pb-3 overflow-x-auto sm:overflow-x-hidden hide-scrollbar">
      <div className="max-w-[95%] mx-auto flex items-center gap-3 sm:gap-4 text-sm">
        <button className="rounded-full bg-blue-50 text-blue-600 px-4 py-2 font-semibold hover:bg-blue-400 hover:text-white active:bg-blue-400 active:text-white flex-shrink-0">
          Groceries ▾
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className="px-3 py-1 rounded-full hover:bg-blue-400 hover:text-white active:bg-blue-400 active:text-white flex-shrink-0"
          >
            {cat} ▾
          </button>
        ))}
      </div>
    </div>
  );
}
