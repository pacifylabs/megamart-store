import { Link } from "react-router-dom";
import { categories } from "../data/data";

export default function TopCategories() {
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
        {categories.map((c, i) => (
          <div
            key={i}
            className="flex flex-col items-center min-w-[90px] sm:min-w-[110px]"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center shadow border border-[#eef6fb]">
              <img
                src={c.img}
                alt={c.name}
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
              />
            </div>
            <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-700">
              {c.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
