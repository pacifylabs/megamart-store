import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  Menu,
  Search,
  MapPin,
  Truck,
  BadgePercent,
  UserPlus,
  X,
  ListFilter,
  LogOut,
  User,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import CartIcon from "../components/ui/CartIcon";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/");
    }
  };

  const getDisplayName = () => {
    if (!user) return "";
    const names = user.fullName?.split(" ") || user.name?.split(" ") || [];
    const firstName = names[0] || "";
    const lastName = names[1] || "";
    
    if (firstName) {
      const formattedFirst = firstName.charAt(0).toUpperCase() + firstName.slice(1);
      const lastInitial = lastName ? ` ${lastName.charAt(0).toUpperCase()}.` : "";
      return `${formattedFirst}${lastInitial}`;
    }
    return "";
  };

  return (
    <header className="bg-white text-[#6b7280] text-[13px] py-2">
      {/* Top Bar */}
      <div className="max-w-[95%] mx-auto px-2 sm:px-4 flex justify-between items-center pr-10">
        <div>
          Welcome to worldwide Megamart!{" "}
          {user && <span className="text-blue-600 font-medium">{getDisplayName()}</span>}
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <div className="flex items-center gap-2 hover:text-blue-600 cursor-pointer transition">
            <MapPin className="w-4 h-4 text-blue-400" />
            <span>Deliver to 423661</span>
          </div>
          <div className="flex items-center gap-2 hover:text-blue-600 cursor-pointer transition">
            <Truck className="w-4 h-4 text-blue-400" />
            <span>Track your order</span>
          </div>
          <div className="flex items-center gap-2 hover:text-blue-600 cursor-pointer transition">
            <BadgePercent className="w-4 h-4 text-blue-400" />
            <span>All Offers</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white px-4 sm:px-6 py-3 border-b border-slate-100">
        <div className="max-w-[95%] mx-auto flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <ListFilter className="w-10 h-7 text-blue-500" />
            <div className="text-lg sm:text-xl font-extrabold text-blue-600">
              MegaMart
            </div>
          </Link>

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
            {!user ? (
              <Link
                to="/login"
                className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
              >
                <UserPlus className="w-4 h-4 text-blue-400" /> 
                <span className="font-medium">Sign In</span>
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                {/* Profile Link */}
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 transition"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <span className="font-medium">{getDisplayName()}</span>
                </Link>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            )}

            {/* Cart Icon */}
            <CartIcon />
          </div>

          {/* Mobile menu toggle */}
          <button 
            className="md:hidden" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-3 space-y-2 text-sm border-t pt-3">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                className="w-full rounded-lg border border-[#e6eef2] bg-white px-10 py-2 text-sm"
                placeholder="Search..."
              />
            </div>

            {/* Mobile User Section */}
            {!user ? (
              <Link
                to="/login"
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-50 w-full"
                onClick={() => setMenuOpen(false)}
              >
                <UserPlus className="w-4 h-4" /> Sign In
              </Link>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-50 w-full"
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-3 h-3 text-blue-600" />
                  </div>
                  <span>{getDisplayName()}</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-50 w-full text-red-600"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            )}

            {/* Mobile Cart */}
            <div className="border-t pt-2">
              <CartIcon />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
