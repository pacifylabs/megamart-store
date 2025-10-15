// src/components/profile/ProfileHeader.jsx
import { Menu } from "lucide-react";

export default function ProfileHeader({ activeTab, setSidebarOpen }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        <h1 className="text-xl font-bold text-gray-900">My Account</h1>

        {/* Desktop Action */}
        <button className="hidden lg:block px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Support
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Mobile Active Tab Display */}
      <div className="lg:hidden border-t px-4 py-3 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900 capitalize">{activeTab}</h2>
      </div>
    </header>
  );
}
