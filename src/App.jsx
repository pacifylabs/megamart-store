import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Carts from "./pages/Carts";
import HeroPage from "./pages/HeroPage";
import ListingPage from "./pages/ListingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfilePage from "./pages/ProfilePage";
import OrderManagementPage from "./pages/OrderPage";
import ResetPasswordPage from "./pages/ForgotPasswordPage";
import RequestResetLinkPage from "./pages/RequestResetLinkPage";
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
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/forgot-password" element={<RequestResetLinkPage />} />
            <Route path="/profile/*" element={<ProfilePage />} />
            <Route path="/orders" element={<OrderManagementPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
