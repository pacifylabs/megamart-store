import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";

export default function Dashboard() {
  {/*Using dummy stats data*/}
  const stats = [
    {
      icon: <Package className="w-5 h-5 text-blue-500" />,
      label: "Products",
      value: "120",
    },
    {
      icon: <ShoppingCart className="w-5 h-5 text-blue-500" />,
      label: "Orders",
      value: "320",
    },
    {
      icon: <Users className="w-5 h-5 text-blue-500" />,
      label: "Customers",
      value: "250",
    },
    {
      icon: <DollarSign className="w-5 h-5 text-blue-500" />,
      label: "Revenue",
      value: "$10,100",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow p-4 flex items-center justify-between"
          >
            <div className="text-green-600 bg-green-100 p-2 rounded-lg">
              {s.icon}
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
