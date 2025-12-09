import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
export default function CartIcon() {
  const { cartCount } = useCart();
  return (
    <div className="max-w-7">
      <Link to="/carts" className="relative">
        <ShoppingCart className="w-6 h-6 text-blue-500" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            {cartCount}
          </span>
        )}
      </Link>
    </div>
  );
}
