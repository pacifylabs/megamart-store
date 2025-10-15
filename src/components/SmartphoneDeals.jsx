import ProductCard from "../components/ProductCard"; // adjust path
import { phones } from "../data/data";
import { Link } from "react-router-dom";

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

      <div className="flex overflow-x-auto space-x-4 sm:space-x-6 px-2 hide-scrollbar snap-x snap-mandatory scroll-smooth">
        {phones.map((p) => (
          <div
            key={p.id}
            className="flex-none w-[180px] sm:w-[200px] snap-start"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>

    </div>
  );
}
