import React from "react";
import { CheckCircle, Clock } from "lucide-react";

export default function Orders() {
  {
    /*creating a dummy order data*/
  }
  const orders = [
    { id: 101, customer: "John Doe", total: "$200", status: "Delivered" },
    { id: 102, customer: "Jane Smith", total: "$120", status: "Pending" },
    { id: 103, customer: "Alex Johnson", total: "$85", status: "Delivered" },
  ];
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{o.id}</td>
                <td className="p-3">{o.customer}</td>
                <td className="p-3">{o.total}</td>
                <td className="p-3">
                  <span
                    className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                      o.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {o.status === "Delivered" ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <Clock className="w-3 h-3 mr-1" />
                    )}
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
