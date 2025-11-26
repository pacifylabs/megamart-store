// components/profile/ProfileSidebar.jsx
import { User, ShoppingBag, Heart, MapPin, Settings, CreditCard, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { profileMenuItems } from "../../common/profileMenuConfig";

export default function ProfileSidebar({ activeTab, setActiveTab, showProfileInfo, onClose }) {
  const { user, logout } = useAuth();

  const menuItems = profileMenuItems.map(({ id, label, icon }) => ({ id, label, icon }));

  const handleTabClick = (tabId) => {
    if (tabId !== activeTab) {
      // Update the active tab
      if (setActiveTab) {
        setActiveTab(tabId);
      }
      // Update URL without causing a full page reload
      window.history.replaceState(null, '', `#${tabId}`);
      
      // Close sidebar on mobile after navigation
      if (onClose && window.innerWidth < 1024) {
        onClose();
      }
    }
  };

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      await logout();
    }
  };

  const getDisplayName = () => {
    if (!user) return "User";
    const fullName = user.fullName || user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim();
    
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
    
    return user.email?.split('@')[0] || "User";
  };

  return (
    <aside className="bg-white rounded-xl border border-gray-200 p-6 h-fit sticky top-8">
      {showProfileInfo && user && (
        <div className="text-center mb-6 pb-6 border-b border-gray-200">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
            {user.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt={getDisplayName()}
                className="w-20 h-20 rounded-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div className={`w-20 h-20 rounded-full flex items-center justify-center ${user.profileImageUrl ? 'hidden' : 'flex'}`}>
              <User className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 truncate">{getDisplayName()}</h3>
          <p className="text-sm text-gray-600 truncate">{user.email}</p>
        </div>
      )}

      <nav className="space-y-1">
        {menuItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => handleTabClick(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
              activeTab === id
                ? "bg-blue-50 text-blue-600 border border-blue-200"
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="text-left">{label}</span>
          </button>
        ))}

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium mt-4 transition-all"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span className="text-left">Logout</span>
        </button>
      </nav>

      {/* Close button for mobile */}
      {onClose && (
        <button
          onClick={onClose}
          className="lg:hidden w-full mt-6 py-2 text-sm text-gray-500 hover:text-gray-700 border-t border-gray-200 pt-4"
        >
          Close Menu
        </button>
      )}
    </aside>
  );
}