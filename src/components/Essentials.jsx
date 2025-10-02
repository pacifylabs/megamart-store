import { Link } from "react-router-dom";
import { essentials } from "../data/data";

export default function Essentials() {
  return (
    <section className="max-w-[95%] mx-auto px-4 sm:px-6 mt-8 mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold mb-6">
          Daily <span className="text-blue-600">Essentials</span>
          <div className="w-35 h-1 bg-blue-400 rounded mt-1"></div>
        </h2>
        <Link
          to="/listing"
          className="text-blue-600 text-sm hover:underline hover:text-blue-800 transition"
        >
          View All →
        </Link>
      </div>

      <div className="flex sm:grid sm:grid-cols-6 gap-4 overflow-x-auto px-1 -mx-1 hide-scrollbar">
        {essentials.map((essential, idx) => (
          <div
            key={essential.name}
            className="flex flex-col items-center min-w-[110px] cursor-pointer"
          >
            <div
              className={`p-4 rounded-lg ${
                idx === 0
                  ? "border border-blue-500 shadow-lg"
                  : "hover:shadow-md"
              }`}
            >
              <img
                src={essential.img}
                alt={essential.alt}
                className="w-20 h-20 object-contain"
              />
            </div>
            <p className="mt-2 text-sm font-semibold text-center">
              {essential.name}
            </p>
            <p className="text-xs font-bold">UP to 50% OFF</p>
          </div>
        ))}
      </div>
    </section>
  );
}
