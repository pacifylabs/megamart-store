// src/components/profile/OrderHistory.jsx
import React from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * OrderHistory: shows a small preview of recent orders
 * Replace mockOrders with API data when available.
 */

// Mock data - can be moved to a separate file or replaced with API call
const mockOrders = [
  { 
    id: "ORD-1001", 
    date: "2025-09-12", 
    status: "Delivered", 
    total: "₹3,499",
    items: 2
  },
  { 
    id: "ORD-1002", 
    date: "2025-09-28", 
    status: "Shipped", 
    total: "₹7,999",
    items: 1
  },
  { 
    id: "ORD-1003", 
    date: "2025-10-02", 
    status: "Processing", 
    total: "₹1,299",
    items: 3
  },
];

// Status color mapping for better visual hierarchy
const statusColors = {
  Delivered: "text-green-600 dark:text-green-400",
  Shipped: "text-blue-600 dark:text-blue-400",
  Processing: "text-yellow-600 dark:text-yellow-400",
  Cancelled: "text-red-600 dark:text-red-400",
};

// Order item component for better reusability
const OrderItem = ({ order }) => (
  <li className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-1">
        <div className="text-sm font-medium text-gray-800 dark:text-slate-200 truncate">
          {order.id}
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[order.status] || "text-gray-600"}`}>
          {order.status}
        </span>
      </div>
      <div className="text-xs text-gray-500 dark:text-slate-400">
        {order.date} • {order.items} item{order.items !== 1 ? 's' : ''}
      </div>
    </div>
    <div className="text-sm font-semibold text-gray-900 dark:text-slate-100 ml-4">
      {order.total}
    </div>
  </li>
);

// Empty state component
const EmptyOrders = () => (
  <div className="text-center py-8">
    <ShoppingCart className="w-12 h-12 text-gray-300 dark:text-slate-600 mx-auto mb-3" />
    <p className="text-gray-500 dark:text-slate-400 text-sm">No orders yet</p>
    <Link
      to="/products"
      className="text-sm inline-flex items-center gap-1 text-blue-600 hover:underline mt-2"
    >
      Start shopping →
    </Link>
  </div>
);

// Main component
export default function OrderHistory({ 
  orders = mockOrders, 
  maxDisplay = 3,
  showViewAll = true 
}) {
  const displayedOrders = orders.slice(0, maxDisplay);
  const hasOrders = displayedOrders.length > 0;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-gray-200 dark:border-slate-700 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
          Recent Orders
        </h3>
        <ShoppingCart className="w-5 h-5 text-gray-400 dark:text-slate-300" />
      </div>

      {hasOrders ? (
        <>
          <ul className="space-y-2">
            {displayedOrders.map((order) => (
              <OrderItem key={order.id} order={order} />
            ))}
          </ul>

          {showViewAll && orders.length > maxDisplay && (
            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-slate-700">
              <Link
                to="/profile/orders"
                className="text-sm inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                View all orders ({orders.length}) →
              </Link>
            </div>
          )}
        </>
      ) : (
        <EmptyOrders />
      )}
    </div>
  );
}