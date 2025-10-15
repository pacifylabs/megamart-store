import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  Menu,
  X,
  User,
} from "lucide-react";

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`fixed z-30 inset-y-0 left-0 w-64 bg-white shadow-md transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out md:relative md:translate-x-0`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <h1 className="text-xl font-bold text-blue-500">MegaMart Admin</h1>
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <nav className="mt-6">
          <Link
            to="/admin"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-green-100 transition"
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>

          <Link
            to="/admin/products"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-green-100 transition"
          >
            <Package className="w-5 h-5 mr-3" />
            Products
          </Link>

          <Link
            to="/admin/orders"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-green-100 transition"
          >
            <ShoppingCart className="w-5 h-5 mr-3" />
            Orders
          </Link>

          <Link
            to="/admin/users"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-green-100 transition"
          >
            <Users className="w-5 h-5 mr-3" />
            Users
          </Link>

          <button className="flex items-center w-full px-6 py-3 mt-4 text-gray-700 hover:bg-red-100 transition">
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </nav>
      </div>
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between bg-white shadow p-4">
          <div className="flex items-center space-x-2">
            <button
              className="md:hidden text-gray-600"
              onClick={() => setIsOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-semibold text-gray-700">
              Admin Dashboard
            </h2>
          </div>
          <Link to="/adminlogin">
            <User className="flex items-center space-x-3"></User>
          </Link>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
