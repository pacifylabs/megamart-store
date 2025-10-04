import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg border border-[#e6eef2] relative flex-shrink-0 w-[160px] sm:w-auto overflow-clip">
      <div className="bg-gray-200 p-2 sm:p-2 border-b border-slate-300">
        {product.discount && (
          <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs px-2 py-2 rounded">
            <span>{product.percentage || "50"}%</span><br />
            <span>OFF</span>
          </div>
        )}

        <div className="flex justify-center">
          <img
            src={product.image || product.img}
            alt={product.name}
            className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
          />
        </div>
      </div>

      <div className="py-4 px-4 flex flex-col gap-1 sm:gap-1">
        <h4 className="text-[11px] sm:text-sm font-semibold line-clamp-2">
          {product.name}
        </h4>

        <div className="py-2 text-[11px] sm:text-sm border-b border-slate-300">
          <span className="font-semibold">{product.price}</span>{" "}
          {product.cut && (
            <span className="line-through text-slate-400">{product.cut}</span>
          )}
        </div>

        <div className="sm:pt-2 flex items-center justify-end gap-2">
          {product.save && (
            <span className="text-[10px] sm:text-[13px] text-emerald-600 mr-auto">
              Save - {product.save}
            </span>
          )}
          <button
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                price:
                  typeof product.price === "string"
                    ? parseInt(product.price.replace(/[^\d]/g, ""))
                    : product.price,
                img: product.image || product.img,
              })
            }
            className="px-4 py-2 bg-blue-500 text-white text-[10px] sm:text-xs rounded hover:bg-sky-200 hover:text-blue-800 hover:border-none hover:shadow-gray-300 hover:shadow-lg transition hover:cursor-pointer outline-0"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
