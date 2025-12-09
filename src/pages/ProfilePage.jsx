// src/pages/ProfilePage.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileInfo from "../components/profile/ProfileInfo";
import OrderHistory from "../components/profile/OrderHistory";
import AddressesSection from "../components/profile/AddressesSection";
import SettingsPanel from "../components/profile/SettingsPanel";
import Header from "../components/Header";
export default function ProfilePage() {
  const { user } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('profile');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    const tabFromState = location.state?.activeTab;
    if (tabFromState) {
      setActiveTab(tabFromState);
      window.history.replaceState({}, '');
    } else if (hash) {
      setActiveTab(hash);
      setActiveTab('profile');
    }
  }, [location.hash, location.state]);
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please login to access your account.</p>
          <a
            href="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {}
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarOpen={sidebarOpen}
      />
      {}
      <div className="max-w-[95%] mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
        {}
        <div className="hidden lg:block">
          <ProfileSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            showProfileInfo={activeTab}
            onClose={() => setSidebarOpen(false)}
          />
        </div>
        {}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 flex lg:hidden">
            {}
            <div
              className="fixed inset-0 bg-black/40"
              onClick={() => setSidebarOpen(false)}
            />
            {}
            <div className="relative bg-white w-72 h-full shadow-xl p-6 overflow-y-auto z-50">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>
              </div>
              <ProfileSidebar
                activeTab={activeTab}
                setActiveTab={(tab) => {
                  setActiveTab(tab);
                  setSidebarOpen(false);
                }}
                showProfileInfo={activeTab === "profile"}
              />
            </div>
          </div>
        )}
        {}
        <div className="lg:col-span-3 transition-opacity duration-300" key={activeTab}>
          {activeTab === "profile" && <ProfileInfo />}
          {activeTab === "orders" && <OrderHistory />}
          {activeTab === "addresses" && <AddressesSection />}
          {activeTab === "settings" && <SettingsPanel />}
        </div>
      </div>
    </div>
  );
}
