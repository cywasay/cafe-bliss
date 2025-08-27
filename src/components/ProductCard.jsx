"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await addToCart(product);

    // Small delay for better UX feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  const renderStars = (rating) => {
    if (!rating) return null;

    return (
      <div className="flex items-center gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.div
            key={star}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: star * 0.1 }}
          >
            <svg
              className={`w-4 h-4 ${
                star <= rating ? "text-amber-400" : "text-gray-200"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </motion.div>
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <motion.div
      className="group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-pink-100 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
      whileHover={{
        y: -8,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Stock Badge */}
      {product.inStock === false && (
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          Out of Stock
        </div>
      )}

      {/* New/Featured Badge */}
      {product.featured && (
        <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-amber-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          Featured
        </div>
      )}

      {/* Image Container */}
      <div className="relative overflow-hidden">
        <motion.img
          src={`/images/${product.image}`}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick View Button */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1 }}
        >
          <button className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full font-semibold shadow-lg hover:bg-white transition-all">
            Quick View
          </button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Rating */}
        {renderStars(product.rating)}

        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-amber-700 transition-colors duration-200">
          {product.name}
        </h3>

        {/* Product Details */}
        <div className="space-y-1 mb-4 text-sm text-gray-600">
          {product.roastLevel && (
            <div className="flex items-center gap-2">
              <span className="text-amber-600">🔥</span>
              <span>{product.roastLevel} Roast</span>
            </div>
          )}
          {product.origin && (
            <div className="flex items-center gap-2">
              <span className="text-green-600">🌍</span>
              <span>{product.origin}</span>
            </div>
          )}
          {product.size && (
            <div className="flex items-center gap-2">
              <span className="text-blue-600">📦</span>
              <span>{product.size}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {product.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-pink-600 bg-clip-text text-transparent">
              ${product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          onClick={handleAddToCart}
          disabled={product.inStock === false || isAdding}
          className={`w-full mt-4 px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 ${
            product.inStock === false
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : isAdding
              ? "bg-gradient-to-r from-green-600 to-green-700 text-white"
              : "bg-gradient-to-r from-amber-700 to-amber-800 text-white hover:from-amber-800 hover:to-amber-900 hover:shadow-xl"
          }`}
          whileHover={
            product.inStock !== false && !isAdding ? { scale: 1.02 } : {}
          }
          whileTap={
            product.inStock !== false && !isAdding ? { scale: 0.98 } : {}
          }
          animate={isAdding ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.2 }}
        >
          {isAdding ? (
            <div className="flex items-center justify-center gap-2">
              <motion.div
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span>Adding...</span>
            </div>
          ) : product.inStock === false ? (
            "Out of Stock"
          ) : (
            <div className="flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"
                />
              </svg>
              <span>Add to Cart</span>
            </div>
          )}
        </motion.button>

        {/* Wishlist Button */}
        <motion.button
          className="w-full mt-2 px-4 py-2 border border-pink-200 text-gray-600 rounded-xl hover:bg-gradient-to-r hover:from-amber-50 hover:to-pink-50 hover:border-amber-300 transition-all font-medium"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center justify-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>Add to Wishlist</span>
          </div>
        </motion.button>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}
