import React from "react";
import { User, Mail } from "lucide-react";

export default function Users() {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Customer" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin" },
    {
      id: 3,
      name: "Alice Brown",
      email: "alice@example.com",
      role: "Customer",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm text-left table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-600" />
                    <span>{u.name}</span>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-600" />
                    <span>{u.email}</span>
                  </div>
                </td>
                <td className="p-3">
                  <span>{u.role}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
