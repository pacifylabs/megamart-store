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
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (location.state?.product) {
      setProduct(location.state.product);
      setSelectedSize(location.state.product.sizes?.[0] || null);
    } else {
      const allProducts = [...essential, ...phones];
      const foundProduct = allProducts.find((p) => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedSize(foundProduct.sizes?.[0] || null);
      } else {
        navigate("/listing");
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
      size: selectedSize,
      quantity: quantity, // Send the selected quantity
    });
    
    // Optional: Show success message
    alert(`${quantity} item(s) added to cart!`);
  };

  const handleBuyNow = () => {
    // Add to cart first
    addToCart({
      id: product.id,
      name: product.name,
      price:
        typeof product.price === "string"
          ? parseInt(product.price.replace(/[^\d]/g, ""))
          : product.price,
      img: product.image || product.img,
      size: selectedSize,
      quantity: quantity,
    });
    
    // Navigate to checkout
    navigate("/checkout");
  };

  const handleChatSeller = () => {
    const message = `Hi, I'm interested in: ${product.name}\nPrice: ${product.price}\nQuantity: ${quantity}`;
    const whatsappNumber = "2348012345678"; // Replace with actual seller number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
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
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <ListFilter className="w-10 h-7 text-blue-500" />
              <div className="text-lg sm:text-xl font-extrabold text-blue-600">
                MegaMart
              </div>
            </Link>
          </div>
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
            <div className="flex flex-col gap-3">
              <div className="flex items-center border border-gray-300 rounded w-fit">
                <button
                  onClick={handleDecrement}
                  className="px-4 py-2 hover:bg-gray-100 transition text-lg font-semibold"
                >
                  −
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-16 text-center border-x border-gray-300 py-2 font-semibold"
                />
                <button
                  onClick={handleIncrement}
                  className="px-4 py-2 hover:bg-gray-100 transition text-lg font-semibold"
                >
                  +
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={handleBuyNow}
                  className="flex-1 bg-orange-600 text-white px-6 py-3 rounded hover:bg-orange-700 transition font-semibold"
                >
                  Buy Now
                </button>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-white text-orange-600 border-2 border-orange-600 px-6 py-3 rounded hover:bg-orange-50 transition font-semibold"
                >
                  Add to Cart
                </button>
              </div>

              <button
                onClick={handleChatSeller}
                className="w-full bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition font-semibold flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Chat the Seller
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12 bg-white rounded-lg border border-gray-200 p-6">
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
