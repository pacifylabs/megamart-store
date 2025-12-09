import React, { useState, useEffect } from "react";
import avater from "../assets/avater.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  BadgePercent,
  ListFilter,
  LogOut,
  MapPin,
  Menu,
  Search,
  ShoppingBag,
  Truck,
  User,
  UserPlus,
  X,
  SlidersHorizontal,
  Grid3x3,
  List
} from "lucide-react";
import CartIcon from "../components/ui/CartIcon";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { profileMenuItems } from "../common/profileMenuConfig";
export default function Header({ 
  showBanner = true, 
  showSearchBar = true, 
  showCart = true,
  setActiveTab,
  isSidebarOpen = false,
  showSortFilter = false,
  sortOption = "default",
  setSortOption = () => {},
  viewMode = "grid",
  setViewMode = () => {},
  showFilters = false,
  setShowFilters = () => {},
  activeFiltersCount = 0,
  searchQuery = "",
  setSearchQuery = () => {}
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { user, handleLogout, isInitialized } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';
  const currentTab = location.hash.replace('#', '') || 'profile';
  const isListingPage = location.pathname === '/products' || showSortFilter;
  useEffect(() => {
    if (isSidebarOpen && profileDropdownOpen) {
      setProfileDropdownOpen(false);
    }
  }, [isSidebarOpen, location.pathname, location.hash, profileDropdownOpen]);
  const handleSearchChange = (e) => {
    if (showSortFilter && setSearchQuery) {
      setSearchQuery(e.target.value);
    }
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (location.pathname !== '/products') {
        navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      }
    }
  };
  const handleClearSearch = () => {
    if (showSortFilter && setSearchQuery) {
      setSearchQuery("");
      if (location.pathname === '/products') {
        const url = new URL(window.location);
        url.searchParams.delete('search');
        window.history.pushState({}, '', url);
      }
    }
  };
  if (!isInitialized) {
    return (
      <header className="bg-white text-[#6b7280] text-[13px] py-2">
        <div className="bg-white px-4 sm:px-6 py-3 border-b border-slate-100">
          <div className="max-w-[95%] mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <ListFilter className="w-10 h-7 text-blue-500" />
              <div className="text-lg sm:text-xl font-extrabold text-blue-600">MegaMart</div>
            </Link>
            <div className="text-sm text-gray-500">Loading...</div>
          </div>
        </div>
      </header>
    );
  }
  const handleLogoutClick = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      handleLogout();
      setMenuOpen(false);
      setProfileDropdownOpen(false);
      navigate("/");
    }
  };
  const getDisplayName = () => {
    if (!user) return "";
    const fullName = user.fullName || 
                    user.name || 
                    `${user.firstName || ''} ${user.lastName || ''}`.trim();
    if (fullName && fullName !== " ") {
      const names = fullName.split(" ");
      const firstName = names[0] || "";
      const lastName = names[1] || "";
      if (firstName) {
        const formattedFirst = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
        const lastInitial = lastName ? ` ${lastName.charAt(0).toUpperCase()}.` : "";
        return `${formattedFirst}${lastInitial}`;
      }
    }
    if (user.email) {
      return user.email.split('@')[0];
    }
    return "User";
  };
  const getUserAvatar = () => {
    if (!user) return null;
    const profileImage = user.profileImageUrl?.includes("example") ? user.avatar : user.profileImageUrl;
    if (profileImage && profileImage.trim() !== "") {
      return profileImage;
    }
    return avater;
  };
  const hasUserAvatar = () => {
    if (!user) return false;
    const profileImage = user.profileImageUrl || user.avatar;
    return profileImage && profileImage.trim() !== "";
  };
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    const fallback = e.target.nextSibling;
    if (fallback) {
      fallback.style.display = 'flex';
    }
  };
  const handleProfileNavigation = (tabId) => {
    window.history.replaceState(null, '', `#${tabId}`);
    if (typeof setActiveTab === 'function') {
      setActiveTab(tabId);
    } else if (location.pathname !== '/profile') {
      navigate(`/profile#${tabId}`, { 
        state: { activeTab: tabId }
      });
    }
    setProfileDropdownOpen(false);
    setMenuOpen(false);
  };
  return (
    <header className="bg-white text-[#6b7280] text-[13px] py-2">
      {}
      <div
        className={`max-w-[95%] mx-auto px-2 sm:px-4 flex justify-between items-center pr-10 ${
          showBanner ? "block" : "hidden"
        }`}
      >
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
      {}
      <div className="bg-white px-4 sm:px-6 py-3 border-b border-slate-100">
        <div className="max-w-[95%] mx-auto flex items-center justify-between gap-6">
          {}
          <Link to="/" className="flex items-center gap-2">
            <ListFilter className="w-10 h-7 text-blue-500" />
            <div className="text-lg sm:text-xl font-extrabold text-blue-600">MegaMart</div>
          </Link>
          {}
          {showSearchBar && (
            <div className="hidden md:flex flex-1 ml-13">
              <form onSubmit={handleSearchSubmit} className="relative w-full max-w-[500px] mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  value={showSortFilter ? searchQuery || "" : ""}
                  onChange={handleSearchChange}
                  className="w-full rounded-lg border border-[#e6eef2] bg-blue-50 px-10 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder={showSortFilter ? "Search products..." : "Search essentials, groceries and more..."}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-10 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>
            </div>
          )}
          {}
          <div className="hidden md:flex items-center gap-3 text-sm text-slate-600">
            {}
            {showSortFilter && (
              <>
                {}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition relative"
                  aria-label="Toggle filters"
                >
                  <SlidersHorizontal className="w-5 h-5 text-gray-600" />
                  {activeFiltersCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
                {}
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="default">Sort By</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                  <option value="newest">Newest First</option>
                  <option value="discount">Highest Discount</option>
                </select>
              </>
            )}
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
                {}
                <div className="relative">
                  <button
                    type="button"
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                      isProfilePage && isSidebarOpen ? 'cursor-default' : 'hover:bg-blue-50'
                    }`}
                    onClick={() => {
                      if (isProfilePage && isSidebarOpen) return;
                      setProfileDropdownOpen((prev) => !prev);
                    }}
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                      {hasUserAvatar() ? (
                        <img
                          src={getUserAvatar()}
                          alt={getDisplayName()}
                          className="w-8 h-8 rounded-full object-cover"
                          onError={handleImageError}
                        />
                      ) : null}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${hasUserAvatar() ? 'hidden' : 'flex'}`}>
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                    </div>
                    <span className="font-medium">{getDisplayName()}</span>
                  </button>
                  {}
                  {!(isProfilePage && isSidebarOpen) && profileDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-200 z-50">
                      <div className="py-2">
                        {profileMenuItems.map(({ id, label, icon: Icon }) => (
                          <button
                            key={id}
                            onClick={() => handleProfileNavigation(id)}
                            className={`flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-blue-50 transition ${
                              isProfilePage && currentTab === id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                            }`}
                          >
                            <Icon className="w-4 h-4 text-blue-400" />
                            <span>{label}</span>
                          </button>
                        ))}
                        <div className="border-t border-gray-100 my-1"></div>
                        <button
                          onClick={handleLogoutClick}
                          className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-red-50 text-red-600 transition"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {}
            {showCart && (
              <div className="flex items-center gap-3">
                <CartIcon />
                {cartItems && cartItems.length > 0 && (
                  <button
                    type="button"
                    onClick={() => navigate("/checkout")}
                    className="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-full text-blue-600 hover:bg-blue-700 transition"
                    aria-label="Go to checkout"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
          {}
          <div className="flex items-center gap-4 md:hidden">
            {}
            {showSortFilter && (
              <>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition relative"
                  aria-label="Toggle filters"
                >
                  <SlidersHorizontal className="w-5 h-5 text-gray-600" />
                  {activeFiltersCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              </>
            )}
            {}
            {showCart && <CartIcon />}
            <button
              className="p-2 rounded-md border border-slate-200"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {}
        {showSortFilter && (
          <div className="md:hidden mt-3 flex items-center gap-2">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="default">Sort By</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="newest">Newest First</option>
              <option value="discount">Highest Discount</option>
            </select>
          </div>
        )}
        {}
        {menuOpen && (
          <div className="md:hidden mt-3 space-y-2 text-sm border-t pt-3">
            {}
            {showSearchBar && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  {...(showSortFilter 
                    ? {
                        value: searchQuery,
                        onChange: handleSearchChange
                      } 
                    : {
                        defaultValue: ""
                      })}
                  className="w-full rounded-lg border border-[#e6eef2] bg-white px-10 py-2 text-sm"
                  placeholder={showSortFilter ? "Search products..." : "Search..."}
                />
                {showSortFilter && searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
            {}
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-50 w-full"
                  onClick={() => setMenuOpen(false)}
                >
                  <UserPlus className="w-4 h-4" /> Sign In
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-50 w-full"
                  onClick={() => setMenuOpen(false)}
                >
                  <User className="w-4 h-4" /> Sign Up
                </Link>
              </>
            ) : (
              <>
                {}
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Profile Menu
                </div>
                {profileMenuItems.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => handleProfileNavigation(id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-50 w-full text-left ${
                      isProfilePage && currentTab === id ? 'bg-blue-50 text-blue-600' : ''
                    }`}
                  >
                    {id === "profile" ? (
                      <>
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                          {hasUserAvatar() ? (
                            <img
                              src={getUserAvatar()}
                              alt={getDisplayName()}
                              className="w-6 h-6 rounded-full object-cover"
                              onError={handleImageError}
                            />
                          ) : null}
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${hasUserAvatar() ? 'hidden' : 'flex'}`}>
                            <User className="w-3 h-3 text-blue-600" />
                          </div>
                        </div>
                        {getDisplayName()}
                      </>
                    ) : (
                      <>
                        <Icon className="w-4 h-4 text-blue-400" />
                        <span>{label}</span>
                      </>
                    )}
                  </button>
                ))}
                <div className="border-t border-gray-200 my-1"></div>
                {}
                <button
                  onClick={handleLogoutClick}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-50 w-full text-red-600"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}