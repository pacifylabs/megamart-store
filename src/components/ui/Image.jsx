import { useState } from "react";
import { Package } from "lucide-react";

export function LazyImage({ src, alt, className, containerClassName }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative ${containerClassName}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse rounded flex items-center justify-center">
          <Package className="w-12 h-12 text-gray-400" />
        </div>
      )}
      
      {error ? (
        <div className="w-full h-full bg-gray-300 rounded flex items-center justify-center">
          <Package className="w-12 h-12 text-gray-500" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`${className} transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
}
