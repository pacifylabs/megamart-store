// components/profile/OrderHistory.jsx
import React, { useState, useEffect } from "react";
import { ShoppingCart, Loader, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { orderService } from "../../services/api/userService";
const statusConfig = {
  delivered: {
    color: "text-green-600 bg-green-50 border-green-200",
    label: "Delivered"
  },
  shipped: {
    color: "text-blue-600 bg-blue-50 border-blue-200",
    label: "Shipped"
  },
  processing: {
    color: "text-yellow-600 bg-yellow-50 border-yellow-200",
    label: "Processing"
  },
  pending: {
    color: "text-gray-600 bg-gray-50 border-gray-200",
    label: "Pending"
  },
  cancelled: {
    color: "text-red-600 bg-red-50 border-red-200",
    label: "Cancelled"
  }
};
const OrderItem = ({ order }) => {
  const status = statusConfig[order.status.toLowerCase()] || statusConfig.pending;
  return (
    <li className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-sm font-semibold text-gray-900 truncate">
            #{order.id}
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded-full border ${status.color}`}>
            {status.label}
          </span>
        </div>
        <div className="text-sm text-gray-600 space-y-1">
          <div>{new Date(order.date).toLocaleDateString()}</div>
          <div>{order.items} item{order.items !== 1 ? 's' : ''} • {order.total}</div>
        </div>
      </div>
      <Link
        to={`/orders/${order.id}`}
        className="ml-4 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        title="View order details"
      >
        <ExternalLink className="w-4 h-4" />
      </Link>
    </li>
  );
};
const EmptyOrders = () => (
  <div className="text-center py-8">
    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
    <p className="text-gray-600 mb-4">Start shopping to see your orders here</p>
    <Link
      to="/products"
      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      <ShoppingCart className="w-4 h-4" />
      Start Shopping
    </Link>
  </div>
);
const OrdersSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map(i => (
      <div key={i} className="animate-pulse">
        <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="w-8 h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    ))}
  </div>
);
export default function OrderHistory({ 
  maxDisplay = 3,
  showViewAll = true 
}) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    loadOrders();
  }, []);
  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const mockOrders = [
        { 
          id: "ORD-1001", 
          date: "2025-09-12", 
          status: "delivered", 
          total: "₹3,499",
          items: 2
        },
        { 
          id: "ORD-1002", 
          date: "2025-09-28", 
          status: "shipped", 
          total: "₹7,999",
          items: 1
        },
        { 
          id: "ORD-1003", 
          date: "2025-10-02", 
          status: "processing", 
          total: "₹1,299",
          items: 3
        },
      ];
      setTimeout(() => {
        setOrders(mockOrders);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError("Failed to load orders");
      setLoading(false);
    }
  };
  const displayedOrders = orders.slice(0, maxDisplay);
  const hasOrders = displayedOrders.length > 0;
  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Recent Orders</h3>
          <p className="text-gray-600 mt-1">Your latest purchases</p>
        </div>
        <ShoppingCart className="w-6 h-6 text-gray-400" />
      </div>
      {error && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-700 text-sm">{error}</p>
        </div>
      )}
      {loading ? (
        <OrdersSkeleton />
      ) : hasOrders ? (
        <>
          <ul className="space-y-3">
            {displayedOrders.map((order) => (
              <OrderItem key={order.id} order={order} />
            ))}
          </ul>
          {showViewAll && orders.length > maxDisplay && (
            <div className="mt-6 pt-4 border-t border-gray-100">
              <Link
                to="/profile/orders"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                View all orders ({orders.length})
                <ExternalLink className="w-4 h-4" />
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