import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Star, Minus, Plus } from "lucide-react";
import { products } from "../data/data";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === parseInt(id));

  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  if (!product) return <div className="p-6">Product not found</div>;

  const handleAddToCart = () => {
    addToCart({
      ...product,
      variant: selectedVariant,
      quantity,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-10">
      {/* Product Image */}
      <div>
        <img
          src={product.images[0]}
          alt={product.name}
          className="rounded-lg shadow-md w-full object-contain"
        />
      </div>

      {/* Product Info */}
      <div>
        <h2 className="text-lg font-semibold text-gray-600">
          Brand: {product.brand}
        </h2>
        <h2 className="text-sm text-gray-500 mb-2">
          Model: {product.model}
        </h2>
        <p className="text-red-500 mb-4">
          Availability:{" "}
          {product.stock > 0 ? `Only ${product.stock} left` : "Out of Stock"}
        </p>

        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < product.rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Features */}
        {product.features?.length > 0 && (
          <ul className="list-disc ml-5 mb-4 text-gray-700">
            {product.features.map((f, idx) => (
              <li key={idx}>{f}</li>
            ))}
          </ul>
        )}

        {/* Variants */}
        {product.variants?.length > 0 && (
          <div className="flex gap-2 mb-4">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariant(v)}
                className={`px-4 py-2 border rounded ${
                  selectedVariant?.id === v.id
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-2xl font-bold text-gray-800">
            ${product.price.toFixed(2)}
          </span>
          {product.oldPrice && (
            <span className="line-through text-gray-400">
              ${product.oldPrice}
            </span>
          )}
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="border px-2 py-1 rounded"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="border px-2 py-1 rounded"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-6">
          <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
            Buy Now
          </button>
          <button
            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>

        {/* Tabs */}
        <div className="border-t mt-8">
          <div className="flex gap-6 mt-4 border-b">
            {["description", "specification", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 capitalize ${
                  activeTab === tab
                    ? "border-b-2 border-red-500 font-semibold"
                    : "text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="py-4 text-gray-700">
            {activeTab === "description" && <p>{product.description}</p>}
            {activeTab === "specification" && (
              <pre className="whitespace-pre-line">
                {product.specifications}
              </pre>
            )}
            {activeTab === "reviews" && (
              <div>
                {product.reviews.map((r, idx) => (
                  <div key={idx} className="mb-4 border-b pb-2">
                    <p className="font-semibold">{r.user}</p>
                    <p>{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
