// src/components/profile/AddressesSection.jsx
import React from "react";

/**
 * Delivery addresses. Keep address data local or fetched via API.
 */
const mockAddresses = [
  { id: 1, label: "Home", line: "23, Park Lane, Lagos", phone: "+2348123456789" },
  { id: 2, label: "Office", line: "Block B, Business Park", phone: "+2348098765432" },
];

export default function AddressesSection() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-gray-200 dark:border-slate-700 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Delivery Addresses</h3>
        <a className="text-sm text-blue-600 hover:underline" href="/profile/addresses">Manage</a>
      </div>

      <ul className="space-y-3">
        {mockAddresses.map((a) => (
          <li key={a.id} className="flex items-start justify-between">
            <div>
              <div className="text-sm font-medium text-gray-800 dark:text-slate-200">{a.label}</div>
              <div className="text-xs text-gray-500 dark:text-slate-400">{a.line}</div>
              <div className="text-xs text-gray-500 dark:text-slate-400">{a.phone}</div>
            </div>
            <div className="flex flex-col gap-2">
              <button className="text-xs px-3 py-1 border rounded text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700">Edit</button>
              <button className="text-xs px-3 py-1 border rounded text-red-600 hover:bg-red-50">Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
