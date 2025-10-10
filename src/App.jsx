import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroPage from "./pages/HeroPage";
import ListingPage from "./pages/ListingPage";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Carts from "./pages/Carts";
import { CartProvider } from "./context/CartContext";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import Users from "./admin/Users";
import Products from "./admin/Products";
import Orders from "./admin/Orders";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/listing" element={<ListingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/carts" element={<Carts />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminregister" element={<AdminRegister />} />
          {/* Admin link */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}
