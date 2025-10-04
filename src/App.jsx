import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroPage from "./pages/HeroPage";
import ListingPage from "./pages/ListingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Carts from "./pages/Carts";
import { CartProvider } from "./context/CartContext";
import ProductDetailsPage from "./components/ProductDetails";

export default function App() {
  return (
    <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/listing" element={<ListingPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/carts" element={<Carts />} />
      </Routes>
    </Router>
    </CartProvider>
  );
}
