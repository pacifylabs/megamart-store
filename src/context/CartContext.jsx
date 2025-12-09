import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
const CartContext = createContext();
export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const getCartKey = () => {
    return user?.id ? `megamart-cart-${user.id}` : 'megamart-cart-guest';
  };
  useEffect(() => {
    if (user === undefined) return;
    try {
      const cartKey = getCartKey();
      const savedCart = localStorage.getItem(cartKey);
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      setCartItems([]);
    }
  }, [user]);
  useEffect(() => {
    if (user === undefined) return;
    try {
      const cartKey = getCartKey();
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems, user]);
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + (product.quantity || 1) }
            : item
        );
      }
      return [...prev, { ...product, qty: product.quantity || 1 }];
    });
  };
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
  const updateQty = (id, type) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item,
            qty: type === "inc" ? item.qty + 1 : Math.max(1, item.qty - 1),
          }
          : item
      )
    );
  };
  const clearCart = () => {
    setCartItems([]);
    try {
      const cartKey = getCartKey();
      localStorage.removeItem(cartKey);
    } catch (error) {
      console.error('Error clearing cart from localStorage:', error);
    }
  };
  useEffect(() => {
    if (user === null) {
      setCartItems([]);
    }
  }, [user]);
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const cartTotal = cartItems.reduce((acc, item) => {
    const price = typeof item.price === "string"
      ? parseInt(item.price.replace(/[^\d]/g, ""))
      : item.price;
    return acc + (price * item.qty);
  }, 0);
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        cartCount,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  return useContext(CartContext);
}
