function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div>
      {/* Tab Headers */}
      <div className="border-b border-gray-300">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab("description")}
            className={`pb-3 text-sm font-semibold ${
              activeTab === "description"
                ? "border-b-2 border-orange-600 text-orange-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("specification")}
            className={`pb-3 text-sm font-semibold ${
              activeTab === "specification"
                ? "border-b-2 border-orange-600 text-orange-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Specification
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 text-sm font-semibold ${
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
            <p>{product.description || "The LG C2 42 (106cm) 4K Smart OLED evo TV is the best all-around OLED TV we've tested. Although all OLEDs deliver similar fantastic picture quality, this one stands out for its value because it has many gaming-oriented features that are great for gamers."}</p>
            <p className="text-sm">
              {product.additionalInfo || "*Only 65G2 is shown in the image for example purposes. All 2022 LG OLED models feature eco-friendly packaging."}
            </p>
          </div>
        )}
        {activeTab === "specification" && (
          <div className="text-gray-700">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Brand</td>
                  <td className="py-3">{product.brand || "LG"}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Model</td>
                  <td className="py-3">{product.model || product.id}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Screen Size</td>
                  <td className="py-3">{product.screenSize || "42 inches"}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Resolution</td>
                  <td className="py-3">{product.resolution || "4K UHD"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "reviews" && (
          <div className="text-gray-700">
            <p>No reviews yet. Be the first to review this product!</p>
          </div>
        )}
      </div>
    </div>
  );
}