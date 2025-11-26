// ProductCard.jsx - With LazyImage Component
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Plus, Minus } from "lucide-react";
import { LazyImage } from "./ui/Image"; // Adjust path as needed

export default function ProductCard({ product }) {
  const { addToCart, cartItems, updateQty, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Check if product is in cart and get its quantity
  const cartItem = cartItems.find(item => item.id === product.id);
  const inCart = !!cartItem;
  const quantity = cartItem?.qty || 0;

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

  const handleIncrement = (e) => {
    e.stopPropagation();
    updateQty(product.id, "inc");
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    if (quantity === 1) {
      removeFromCart(product.id);
    } else {
      updateQty(product.id, "dec");
    }
  };

  return (
    <div 
      onClick={handleProductClick}
      className="bg-white rounded-lg border border-[#e6eef2] relative flex-shrink-0 w-[160px] sm:w-auto overflow-hidden cursor-pointer hover:shadow-lg transition-shadow h-[290px] sm:h-[340px] flex flex-col"
    >
      {/* Image Section - Fixed Height with LazyImage */}
      <div className="bg-gray-200 border-b border-slate-300 flex-shrink-0 relative h-32 sm:h-40 flex items-center justify-center p-2">
        {product.discount > 0 && product.percentage > 0 && (
          <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs px-2 py-1.5 rounded z-10 text-center">
            <span className="font-semibold">{product.percentage}%</span><br />
            <span className="text-[10px]">OFF</span>
          </div>
        )}
        
        <div className="relative w-24 h-24 sm:w-32 sm:h-32">
          <LazyImage
            src={product.image || product.img}
            alt={product.name}
            className="w-full h-full object-contain"
            containerClassName="w-full h-full absolute inset-0 flex items-center justify-center"
          />
        </div>
      </div>

      {/* Content Section - Flexible with flex-1 */}
      <div className="flex-1 py-3 px-4 flex flex-col">
        {/* Product Name - Fixed Height with line-clamp */}
        <h4 className="text-[11px] sm:text-sm font-semibold line-clamp-2 mb-2 min-h-[15 px] sm:min-h-[25px]">
          {product.name}
        </h4>

        {/* Price Section */}
        <div className="py-2 text-[11px] sm:text-sm border-b border-slate-300 mb-2">
          <span className="font-semibold">{product.currency}{product.price}</span>{" "}
          {product.currency && product.cut && (
            <span className="line-through text-slate-400">{product.currency}{product.cut}</span>
          )}
        </div>

        {/* Spacer - Takes up remaining space */}
        <div className="flex-1"></div>

        {/* Save and Cart Controls - Stacked Layout */}
        <div className="flex flex-col gap-1">
          {/* Save Text - Always shown with fallback */}
          <div className="text-center">
            {product.currency && product.save ? (
              <span className="text-[10px] sm:text-[13px] text-emerald-600 font-medium">
                Save - {product.currency}{product.save}
              </span>
            ) : (
              <span className="text-[10px] sm:text-[13px] text-gray-500">
                {product.inStock !== false ? 'In Stock' : 'Check Availability'}
              </span>
            )}
          </div>

          {/* Cart Button */}
          {!inCart ? (
            <button
              onClick={handleAddToCart}
              className="w-full xl:w-auto px-3 sm:px-4 py-2 bg-blue-500 text-white text-[10px] sm:text-xs rounded hover:bg-sky-200 hover:text-blue-800 hover:shadow-gray-300 hover:shadow-lg transition outline-0"
            >
              Add to Cart
            </button>
          ) : (
            <div className="grid grid-cols-3 w-full gap-0.5">
              <button
                onClick={handleDecrement}
                className="p-2 text-white hover:bg-red-600 bg-red-500 transition outline-0 flex items-center justify-center rounded-l"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              <div className="bg-white text-blue-600 font-semibold text-[12px] sm:text-sm flex items-center justify-center">
                {quantity}
              </div>
              <button
                onClick={handleIncrement}
                className="p-2 bg-blue-500 text-white hover:bg-blue-600 transition outline-0 flex items-center justify-center rounded-r"
                aria-label="Increase quantity"
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
