import { useParams, useNavigate } from "react-router-dom";
import { essential, phones } from "../data/data";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product =
    essential.find((item) => String(item.id) === id) ||
    phones.find((item) => String(item.id) === id);
  const { addToCart, cartCount } = useCart();
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-lg font-bold mb-4">Product not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate(-1)}
          className="mr-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold flex-1 text-center">
          Product Details
        </h2>
      </div>
      <Link to="/carts" className="relative">
        <ShoppingCart className="w-6 h-6 text-blue-500" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            {cartCount}
          </span>
        )}
      </Link>
      <div className="bg-white p-4 rounded-lg shadow">
        <img
          src={product.image || product.img}
          alt={product.name}
          className="w-full h-64 object-contain rounded mb-4"
        />
        <h3 className="text-xl font-bold">{product.name}</h3>
        <p className="text-lg font-semibold text-green-600 mb-2">
          ₹
          {typeof product.price === "string"
            ? product.price.replace(/[^\d]/g, "")
            : product.price}
        </p>
        <p className="text-gray-600 mb-4">
          {product.description || "No description available for this product."}
        </p>
        <button
          onClick={() =>
            addToCart({
              id: product.id,
              name: product.name,
              price:
                typeof product.price === "string"
                  ? parseInt(product.price.replace(/[^\d]/g, ""))
                  : product.price,
              img: product.image || product.img,
            })
          }
          className="ml-2 px-2 py-1 bg-blue-500 text-white text-[10px] sm:text-xs rounded hover:bg-blue-600 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
