import { User, ShoppingBag, Heart, MapPin, Settings, LogOut } from "lucide-react";

export default function ProfileSidebar({ activeTab, setActiveTab, showProfileInfo }) {
  const menuItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {showProfileInfo && (
        <div className="text-center mb-6">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <User className="w-12 h-12 text-blue-600" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">John Doe</h3>
          <p className="text-sm text-gray-600">john.doe@email.com</p>
        </div>
      )}

      <nav className="space-y-2">
        {menuItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
              activeTab === id
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Icon className="w-5 h-5" />
            {label}
          </button>
        ))}

        <button
          onClick={() => alert("Logging out...")}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium mt-4"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </nav>
    </aside>
  );
}
