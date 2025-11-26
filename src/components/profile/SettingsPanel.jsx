// components/profile/SettingsPanel.jsx
import React from "react";
import { Shield, Bell, Lock, Palette, Download, Globe } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Settings Panel - Links to various settings sections
 * Each section will have its own dedicated page/component
 */

const settingsSections = [
  {
    id: "security",
    title: "Security",
    description: "Password, 2FA, and login security",
    icon: Shield,
    href: "/profile/settings/security",
    features: ["Change password", "Two-factor auth", "Login alerts"]
  }
];

const SettingsCard = ({ section }) => {
  const Icon = section.icon;
  
  return (
    <Link
      to={section.href}
      className="block p-6 bg-gray-50 hover:bg-white border border-gray-200 rounded-xl hover:border-blue-200 hover:shadow-sm transition-all duration-200 group"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {section.title}
          </h3>
          <p className="text-gray-600 mt-1 text-sm">
            {section.description}
          </p>
          
          <div className="mt-3 flex flex-wrap gap-1">
            {section.features.map((feature, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 bg-white text-xs text-gray-600 rounded border border-gray-200 group-hover:border-blue-200 transition-colors"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
        
        <div className="text-gray-400 group-hover:text-blue-600 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default function SettingsPanel() {
  return (
    <div className="bg-white rounded-xl p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
        <p className="text-gray-600 mt-2">
          Manage your account preferences, security, and privacy settings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsSections.map((section) => (
          <SettingsCard key={section.id} section={section} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/profile/settings/security/password"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Lock className="w-4 h-4" />
            Change Password
          </Link>
          <Link
            to="/help"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Shield className="w-4 h-4" />
            Get Help
          </Link>
        </div>
      </div>
    </div>
  );
}