import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CheckoutPage from "./components/CheckoutPage";
import ProductDetailsPage from "./components/ProductDetails";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Carts from "./pages/Carts";
import HeroPage from "./pages/HeroPage";
import ListingPage from "./pages/ListingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HeroPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/carts" element={<Carts />} />
            <Route path="/listing" element={<ListingPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
