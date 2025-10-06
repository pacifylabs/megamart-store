import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price:
        typeof product.price === "string"
          ? parseInt(product.price.replace(/[^\d]/g, ""))
          : product.price,
      img: product.image || product.img,
      quantity: 1,
    });
  };

  return (
    <div 
      onClick={handleProductClick}
      className="bg-white rounded-lg border border-[#e6eef2] relative flex-shrink-0 w-[160px] sm:w-auto overflow-hidden cursor-pointer hover:shadow-lg transition-shadow h-[280px] sm:h-[320px] flex flex-col"
    >
      {/* Image Section - Fixed Height */}
      <div className="bg-gray-200 p-2 sm:p-3 border-b border-slate-300 flex-shrink-0">
        {product.discount && (
          <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs px-2 py-2 rounded z-10">
            <span>{product.percentage || "50"}%</span><br />
            <span>OFF</span>
          </div>
        )}
        <div className="flex justify-center h-24 sm:h-32">
          <img
            src={product.image || product.img}
            alt={product.name}
            className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
          />
        </div>
      </div>

      {/* Content Section - Flexible with flex-1 */}
      <div className="flex-1 py-3 px-4 flex flex-col">
        {/* Product Name - Fixed Height with line-clamp */}
        <h4 className="text-[11px] sm:text-sm font-semibold line-clamp-2 mb-2 min-h-[22px] sm:min-h-[40px]">
          {product.name}
        </h4>

        {/* Price Section */}
        <div className="py-2 text-[11px] sm:text-sm border-b border-slate-300 mb-2">
          <span className="font-semibold">{product.price}</span>{" "}
          {product.cut && (
            <span className="line-through text-slate-400">{product.cut}</span>
          )}
        </div>

        {/* Spacer - Takes up remaining space */}
        <div className="flex-1"></div>

        {/* Save Text and Button - Always at bottom */}
        <div className="flex items-center justify-end gap-2">
          {product.save && (
            <span className="text-[10px] sm:text-[13px] text-emerald-600 mr-auto truncate">
              Save - <br/>{product.save}
            </span>
          )}
          <button
            onClick={handleAddToCart}
            className="px-3 sm:px-4 py-2 bg-blue-500 text-white text-[10px] sm:text-xs rounded hover:bg-sky-200 hover:text-blue-800 hover:border-none hover:shadow-gray-300 hover:shadow-lg transition hover:cursor-pointer outline-0 flex-shrink-0"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}