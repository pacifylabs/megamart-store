import { User, Mail, CheckCircle, Clock } from "lucide-react";

export default function Users() {
  const users = [
    {
      id: 1,
      name: "Emmanuel Smith",
      email: "emmanuel@gmail.com",
      orders: 10,
      status: "Active",
    },
    {
      id: 2,
      name: "Goriola Agbaje",
      email: "goriolaagbaje@gmail.com",
      orders: 15,
      status: "Active",
    },
    {
      id: 3,
      name: "Abdulrazaq Abdulsalam",
      email: "abdulsalam10@gmail.com",
      orders: 25,
      status: "Inactive",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Users</h1>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow">
        <table className="w-full text-sm text-left table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">No of Orders</th>
              <th className="p-3">Status</th>
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
                <td className="p-3">{u.orders}</td>
                <td className="p-3">
                  <span
                    className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                      u.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-red-700"
                    }`}
                  >
                    {u.status === "Active" ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <Clock className="w-3 h-3 mr-1" />
                    )}
                    {u.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Responsiveness */}
      <div className="md:hidden space-y-4">
        {users.map((u) => (
          <div
            key={u.id}
            className="bg-blue-500 rounded-xl shadow p-4 space-y-2 text-white"
          >
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-white" />
              <span className="font-medium">{u.name}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-white" />
              <span>{u.email}</span>
            </div>

            <div>
              <span className="text-white text-sm">Orders:</span>{" "}
              <span className="font-medium">{u.orders}</span>
            </div>

            <div>
              <span>Status:</span>
              <span
                className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                  u.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-red-700"
                }`}
              >
                {u.status === "Active" ? (
                  <CheckCircle className="w-3 h-3 mr-1" />
                ) : (
                  <Clock className="w-3 h-3 mr-1" />
                )}
                <span> {u.status} </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
