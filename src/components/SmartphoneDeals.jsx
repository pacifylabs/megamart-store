import { Link } from "react-router-dom";
import { phones } from "../data/data";

export default function SmartphoneDeals() {
  return (
    <div className="max-w-[95%] mx-auto px-4 sm:px-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-semibold">
          Grab the best deal on{" "}
          <span className="text-blue-600">Smartphones</span>
          <div className="w-66 sm:w-72 h-1 bg-blue-400 rounded mt-1"></div>
        </h3>
        <Link
          to="/listing"
          className="text-blue-600 text-sm hover:underline hover:text-blue-800 transition"
        >
          View All →
        </Link>
      </div>
      <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 overflow-x-auto px-1 -mx-1 hide-scrollbar">
        {phones.map((p, i) => (
          <div
            key={i}
            className="bg-white rounded-lg border border-[#e6eef2] p-3 sm:p-4 relative flex-shrink-0 w-[160px] sm:w-auto"
          >
            <div className="absolute top-1 right-1 bg-blue-600 text-white text-xs px-2 py-1 rounded">
               <span> 50% </span> <br />
                <span> OFF </span>
            </div>
            <div className="flex justify-center">
              <img
                src={p.img}
                className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
              />
            </div>
            <h4 className="mt-2 sm:mt-3 text-xs sm:text-sm font-semibold">
              {p.name}
            </h4>
            <div className="mt-1 text-xs sm:text-sm">
              <span className="font-semibold">{p.price}</span>{" "}
              <span className="line-through text-slate-400">{p.cut}</span>
            </div>
            <div className="mt-1 sm:mt-2 flex items-center justify-between">
              <span className="text-[10px] sm:text-[13px] text-emerald-600">
               {p.save}
                </span>
                 <button className="ml-2 px-2 py-1 bg-blue-500 text-white text-[10px] sm:text-xs rounded hover:bg-blue-600 transition">
                  Add to Cart
                  </button>
               </div>
                  </div>
                  ))}
      </div>
    </div>
  );
}
