import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import API from "../utils/api-axios";

const currency = "₹";

export default function SmartphoneDeals() {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await API.get(`/products`);
        const products = response.data.data || [];
        
        const phoneProducts = products.filter(product => {
          if (!product || !product.category) return false;
          
          const category = typeof product.category === 'object' 
            ? product.category.name || ''
            : String(product.category);
            
          return category.toLowerCase().includes('phone') || category.toLowerCase().includes('electronics');
        });
        
        
        const filteredProducts = phoneProducts.map(product => ({
          id: product._id || product.id,
          name: product.name,
          price: (parseFloat(product.price) - parseFloat(product.discount)).toFixed(2),
          img: product.img || " ",
          discount: parseFloat(product.discount),
          percentage: product.percentage,
          save: parseFloat(product.discount),
          cut: parseFloat(product.price),
          currency,
          description: product.description || '',
          ...product  
        }));
        setPhones(filteredProducts);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();
  }, []);

  if (loading) {
    return (
      <div className="max-w-[95%] mx-auto px-4 sm:px-6 py-8 text-center">
        <div className="animate-pulse">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[95%] mx-auto px-4 sm:px-6 py-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-[95%] mx-auto px-4 sm:px-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-semibold">
          Grab the best deal on{" "}
          <span className="text-blue-600">Smartphones</span>
          <div className="w-66 sm:w-72 h-1 bg-blue-400 rounded mt-1"></div>
        </h3>
        <Link
          to="/listing"
          className="text-blue-600 text-sm hover:underline hover:text-blue-800 transition"
        >
          View All →
        </Link>
      </div>

      {phones.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No smartphone deals available at the moment.
        </div>
      ) : (
        <div className="flex overflow-x-auto space-x-4 sm:space-x-6 px-2 hide-scrollbar snap-x snap-mandatory scroll-smooth">
          {phones.map((product) => (
            <div
              key={product._id || product.id}
              className="flex-none w-[180px] sm:w-[200px] snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
