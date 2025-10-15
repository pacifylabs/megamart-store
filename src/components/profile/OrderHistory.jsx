// src/components/profile/OrderHistory.jsx
import React from "react";
import { ShoppingCart } from "lucide-react";

/**
 * OrderHistory: shows a small preview of last 3 orders (mock data)
 * Replace mockOrders with API data when available.
 */
const mockOrders = [
  { id: "ORD-1001", date: "2025-09-12", status: "Delivered", total: "₹3,499" },
  { id: "ORD-1002", date: "2025-09-28", status: "Shipped", total: "₹7,999" },
  { id: "ORD-1003", date: "2025-10-02", status: "Processing", total: "₹1,299" },
];

export default function OrderHistory() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-gray-200 dark:border-slate-700 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Recent Orders</h3>
        <ShoppingCart className="w-5 h-5 text-gray-400 dark:text-slate-300" />
      </div>

      <ul className="space-y-3">
        {mockOrders.map((o) => (
          <li key={o.id} className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-800 dark:text-slate-200">{o.id}</div>
              <div className="text-xs text-gray-500 dark:text-slate-400">{o.date} • {o.status}</div>
            </div>
            <div className="text-sm font-semibold text-gray-900 dark:text-slate-100">{o.total}</div>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <Link
          to="/profile/orders"
          className="text-sm inline-flex items-center gap-2 text-blue-600 hover:underline"
        >
          View all orders →
        </Link>
      </div>
    </div>
  );
}
