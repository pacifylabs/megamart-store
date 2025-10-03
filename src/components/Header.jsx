import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  Menu,
  Search,
  ShoppingCart,
  MapPin,
  Truck,
  BadgePercent,
  UserPlus,
  X,
  ListFilter,
  LogOut
} from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoggedIn(!!token);
  }, []);
  
  

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="bg-white text-[#6b7280] text-[13px] py-2">
      <div className="max-w-[95%] mx-auto px-2 sm:px-4 flex justify-between items-center pr-10">
        <div>
          Welcome to worldwide Megamart!{" "}
          {user
            ? `${user.fullName.split(" ")[0]
                .charAt(0)
                .toUpperCase()}${user.fullName.split(" ")[0].slice(1)} ${
                user.fullName.split(" ")[1]?.charAt(0).toUpperCase() || ""
              }...`
            : ""}
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-400" />
            <span>Deliver to 423661</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-blue-400" />
            <span>Track your order</span>
          </div>
          <div className="flex items-center gap-2">
            <BadgePercent className="w-4 h-4 text-blue-400" />
            <span>All Offers</span>
          </div>
        </div>
      </div>

      <div className="bg-white px-4 sm:px-6 py-3 border-b border-slate-100">
        <div className="max-w-[95%] mx-auto flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <ListFilter className="w-10 h-7 text-blue-500" />
            <div className="text-lg sm:text-xl font-extrabold text-blue-600">
              MegaMart
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 ml-13">
            <div className="relative w-full max-w-[500px] mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                className="w-full rounded-lg border border-[#e6eef2] bg-blue-50 px-10 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Search essentials, groceries and more..."
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-3 text-sm text-slate-600">
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-slate-50"
              >
                <UserPlus className="w-4 h-4 text-blue-400" /> Sign Up / Sign In
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-slate-50"
              >
                <LogOut className="w-4 h-4 text-red-500" /> Logout
              </button>
            )}
            <Link
              to="/carts"
              className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-slate-50"
            >
              <ShoppingCart className="w-4 h-4 text-blue-400" /> Cart
            </Link>
          </div>

          {/* Mobile menu */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-3 space-y-2 text-sm">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                className="w-full rounded-lg border border-[#e6eef2] bg-white px-10 py-2 text-sm"
                placeholder="Search..."
              />
            </div>

            {!isLoggedIn ? (
              <Link
                to="/login"
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-50 w-full"
              >
                <UserPlus className="w-4 h-4" /> Sign Up / Sign In
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-50 w-full"
              >
                <LogOut className="w-4 h-4 text-red-500" /> Logout
              </button>
            )}

            <Link
              to="/carts"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-50 w-full"
            >
              <ShoppingCart className="w-4 h-4" /> Cart
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
