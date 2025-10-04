import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { essential, phones } from "../data/data";
import { ListFilter, ArrowLeft } from "lucide-react";
import CartIcon from "../components/ui/CartIcon";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeTab, setActiveTab] = useState("description");

  // Get product from location state or find it in data
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (location.state?.product) {
      setProduct(location.state.product);
      setSelectedSize(location.state.product.sizes?.[0] || null);
    } else {
      // Fallback: search in data if state is not available
      const allProducts = [...essential, ...phones];
      const foundProduct = allProducts.find((p) => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedSize(foundProduct.sizes?.[0] || null);
      } else {
        navigate("/listing"); // Redirect if product not found
      }
    }
  }, [id, location.state, navigate]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price:
        typeof product.price === "string"
          ? parseInt(product.price.replace(/[^\d]/g, ""))
          : product.price,
      img: product.image || product.img,
      quantity: quantity,
      size: selectedSize,
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <div className="bg-white px-4 sm:px-6 py-3 border-b border-slate-100">
        <div className="max-w-[95%] mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <ListFilter className="w-10 h-7 text-blue-500" />
              <div className="text-lg sm:text-xl font-extrabold text-blue-600">
                MegaMart
              </div>
            </Link>
          </div>

          {/* Cart Icon */}
          <CartIcon />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[95%] mx-auto px-4 py-6 sm:py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 flex items-center justify-center">
            <img
              src={product.image || product.img}
              alt={product.name}
              className="max-w-full h-auto object-contain max-h-96"
            />
          </div>

          {/* Product Information Section */}
          <div className="flex flex-col gap-4">
            {/* Brand and Model */}
            <div className="text-sm text-gray-600">
              <p>
                <span className="font-semibold">Brand:</span>{" "}
                {product.brand || "Generic"}
              </p>
              <p>
                <span className="font-semibold">Model:</span>{" "}
                {product.model || product.id}
              </p>
              <p className="text-green-600 font-medium">
                Availability: {product.availability || "In Stock"}
              </p>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex text-orange-400">
                {"★★★★☆".split("").map((star, i) => (
                  <span key={i} className="text-lg">{star}</span>
                ))}
              </div>
              <span className="text-sm text-gray-600">(4.0)</span>
            </div>

            {/* Features */}
            {product.features && Array.isArray(product.features) && (
              <ul className="space-y-2 bg-blue-50 p-4 rounded-lg">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Size Options */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-semibold">Select Size:</p>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded text-sm transition ${
                        selectedSize === size
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price Section */}
            <div className="border-t border-b py-4">
              <p className="text-sm text-gray-600 mb-1">USD (Incl. of all taxes):</p>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  {product.price}
                </span>
                {product.cut && (
                  <span className="text-xl text-gray-400 line-through">
                    {product.cut}
                  </span>
                )}
              </div>
              {product.save && (
                <p className="text-sm text-green-600 mt-1 font-medium">
                  Save - {product.save}
                </p>
              )}
            </div>

            {/* Quantity Selector and Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center border border-gray-300 rounded w-fit">
                <button
                  onClick={handleDecrement}
                  className="px-4 py-2 hover:bg-gray-100 transition"
                >
                  −
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-12 text-center border-x border-gray-300 py-2"
                />
                <button
                  onClick={handleIncrement}
                  className="px-4 py-2 hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>

              <button className="flex-1 bg-orange-600 text-white px-6 py-3 rounded hover:bg-orange-700 transition font-semibold">
                Buy Now
              </button>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-white text-orange-600 border-2 border-orange-600 px-6 py-3 rounded hover:bg-orange-50 transition font-semibold"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12 bg-white rounded-lg border border-gray-200 p-6">
          {/* Tab Headers */}
          <div className="border-b border-gray-300">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab("description")}
                className={`pb-3 text-sm font-semibold transition ${
                  activeTab === "description"
                    ? "border-b-2 border-orange-600 text-orange-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("specification")}
                className={`pb-3 text-sm font-semibold transition ${
                  activeTab === "specification"
                    ? "border-b-2 border-orange-600 text-orange-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Specification
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-3 text-sm font-semibold transition ${
                  activeTab === "reviews"
                    ? "border-b-2 border-orange-600 text-orange-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Reviews
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="py-6">
            {activeTab === "description" && (
              <div className="text-gray-700 space-y-4">
                <p>
                  {product.description ||
                    `This ${product.name} is one of the best products in its category. It offers exceptional quality and value for money.`}
                </p>
                {product.additionalInfo && (
                  <p className="text-sm text-gray-600">{product.additionalInfo}</p>
                )}
              </div>
            )}
            {activeTab === "specification" && (
              <div className="text-gray-700">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 font-semibold w-1/3">Brand</td>
                      <td className="py-3">{product.brand || "Generic"}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 font-semibold">Model</td>
                      <td className="py-3">{product.model || product.id}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 font-semibold">Category</td>
                      <td className="py-3">{product.category || "N/A"}</td>
                    </tr>
                    {product.screenSize && (
                      <tr className="border-b">
                        <td className="py-3 font-semibold">Screen Size</td>
                        <td className="py-3">{product.screenSize}</td>
                      </tr>
                    )}
                    {product.resolution && (
                      <tr className="border-b">
                        <td className="py-3 font-semibold">Resolution</td>
                        <td className="py-3">{product.resolution}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="text-gray-700 text-center py-8">
                <p className="text-gray-500">
                  No reviews yet. Be the first to review this product!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
