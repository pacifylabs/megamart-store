// src/components/profile/SettingsPanel.jsx
import React from "react";

/**
 * Settings panel: Links to security, privacy, and preference flows.
 */
export default function SettingsPanel() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Settings</h3>
      <p className="text-sm text-gray-500 dark:text-slate-300 mt-2">
        Manage account security, notifications and privacy.
      </p>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <a href="/profile/settings/password" className="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg hover:scale-[1.01] transition">
          <div className="text-sm font-medium text-gray-900 dark:text-slate-100">Change password</div>
          <div className="text-xs text-gray-500 dark:text-slate-300 mt-1">Secure your account</div>
        </a>

        <a href="/profile/settings/notifications" className="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg hover:scale-[1.01] transition">
          <div className="text-sm font-medium text-gray-900 dark:text-slate-100">Notification prefs</div>
          <div className="text-xs text-gray-500 dark:text-slate-300 mt-1">Email & push</div>
        </a>

        <a href="/profile/settings/privacy" className="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg hover:scale-[1.01] transition">
          <div className="text-sm font-medium text-gray-900 dark:text-slate-100">Privacy</div>
          <div className="text-xs text-gray-500 dark:text-slate-300 mt-1">Data & permissions</div>
        </a>
      </div>
    </div>
  );
}
