import { essential, phones } from "../data/data";
import { PlusCircle, Edit, Trash } from "lucide-react";

export default function Products() {
  const products = [...essential, ...phones];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 border-t border-t-gray-200">
            <tr>
              <th className="p-3">No</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr
                key={p.id}
                className="border-b-gray-200 border-b hover:bg-gray-50"
              >
                <td className="p-4">{i + 1}</td>
                <td className="p-4">{p.name}</td>
                <td className="p-4">{p.price}</td>
                <td className="p-4">{p.stock}</td>
                <td className="p-4 flex justify-end space-x-3">
                  <button className="text-blue-500 hover:text-blue-700">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <Trash className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
