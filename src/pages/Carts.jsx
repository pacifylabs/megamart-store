import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Carts() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQty } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const deliveryFee = 500;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col">
      {/* Title */}
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate("/")}
          className="mr-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold text-center flex-1">My Cart</h2>
      </div>

      {/* Items */}
      <div className="flex-1 space-y-3">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">No products found</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg p-3 flex items-center justify-between border"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-14 h-14 object-contain rounded"
              />
              <div className="flex-1 px-3">
                <h4 className="text-sm font-semibold line-clamp-1">{item.name}</h4>
                <p className="text-sm font-bold">₹{item.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQty(item.id, "dec")}
                  className="px-2 border rounded"
                >
                  −
                </button>
                <span>{item.qty}</span>
                <button
                  onClick={() => updateQty(item.id, "inc")}
                  className="px-2 border rounded"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-2 text-red-500"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      {cartItems.length > 0 && (
        <>
          <div className="mt-4 bg-white rounded-lg p-4 border text-sm space-y-1">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery:</span>
              <span>₹{deliveryFee}</span>
            </div>
          </div>
          <button className="mt-4 w-full py-3 bg-green-500 text-white font-bold rounded">
            Checkout for ₹{total}
          </button>
        </>
      )}
    </div>
  );
}
