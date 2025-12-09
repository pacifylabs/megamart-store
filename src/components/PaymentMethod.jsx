// src/components/profile/PaymentMethods.jsx
import React from "react";
const mockPayments = [
  { id: 1, type: "Visa", last4: "4242", expiry: "08/26" },
  { id: 2, type: "Mastercard", last4: "8899", expiry: "03/27" },
];
export default function PaymentMethods() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-gray-200 dark:border-slate-700 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Payment Methods</h3>
        <button className="text-sm text-blue-600 hover:underline">Manage</button>
      </div>
      <ul className="space-y-3">
        {mockPayments.map((p) => (
          <li key={p.id} className="flex items-center justify-between">
            <div className="text-sm text-gray-800 dark:text-slate-200">
              {p.type} •••• {p.last4}
              <div className="text-xs text-gray-500 dark:text-slate-400">Exp: {p.expiry}</div>
            </div>
            <div className="flex gap-2 items-center">
              <button className="text-xs px-3 py-1 border rounded text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700">Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
