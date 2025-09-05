"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart();
  const [isRemoving, setIsRemoving] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity || 1);

  const handleRemove = async () => {
    setIsRemoving(true);
    setTimeout(() => removeFromCart(item.id), 300);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      handleRemove();
      return;
    }
    setQuantity(newQuantity);
    if (updateQuantity) updateQuantity(item.id, newQuantity);
  };

  const totalPrice = (item.price * quantity).toFixed(2);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        layout
        initial={{ opacity: 1, height: "auto" }}
        animate={{
          opacity: isRemoving ? 0 : 1,
          height: isRemoving ? 0 : "auto",
          scale: isRemoving ? 0.95 : 1,
        }}
        exit={{ opacity: 0, height: 0, scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={`group relative bg-white rounded-2xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden ${
          isRemoving ? "pointer-events-none" : ""
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-white/10 to-pink-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
        <div className="absolute top-4 right-4 w-2 h-2 bg-amber-300/20 rounded-full"></div>
        <div className="absolute bottom-4 left-4 w-3 h-3 bg-pink-300/20 rounded-full"></div>

        <div className="relative flex items-center gap-6">
          {item.image && (
            <div className="flex-shrink-0 relative">
              <div className="bg-white p-2 rounded-xl shadow-md">
                <img
                  src={`/images/${item.image}`}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              </div>
            </div>
          )}

          <div className="flex-grow min-w-0">
            <div className="flex items-start gap-2 mb-2">
              <h3 className="font-bold text-gray-800 text-lg truncate">
                {item.name}
              </h3>
              <div className="flex-shrink-0 bg-gradient-to-r from-amber-100 to-pink-100 px-2 py-1 rounded-full">
                <span className="text-xs font-medium bg-gradient-to-r from-amber-700 to-pink-600 bg-clip-text text-transparent">
                  Premium
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm mb-3">
              {item.roastLevel && (
                <div className="flex items-center gap-2 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  <div className="w-4 h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">🔥</span>
                  </div>
                  <span className="text-amber-700 font-medium">
                    {item.roastLevel}
                  </span>
                </div>
              )}
              {item.size && (
                <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">📦</span>
                  </div>
                  <span className="text-blue-700 font-medium">{item.size}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="bg-gradient-to-r from-amber-700 to-pink-600 bg-clip-text text-transparent font-bold text-base">
                ${item.price}
              </span>
              <span className="text-gray-600">per unit</span>
              <div className="flex-1 h-px bg-gradient-to-r from-amber-200/50 to-pink-200/50"></div>
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="text-center mb-4">
              <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                Quantity
              </span>
            </div>

            <div className="flex items-center bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="px-4 py-3 text-amber-700 hover:bg-amber-50 transition-colors duration-150 font-bold text-lg"
              >
                −
              </button>

              <div className="px-4 py-3 bg-gradient-to-r from-amber-50/50 to-pink-50/50 border-x border-gray-200">
                <span className="font-bold text-gray-800 text-lg min-w-[2rem] block text-center">
                  {quantity}
                </span>
              </div>

              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="px-4 py-3 text-amber-700 hover:bg-amber-50 transition-colors duration-150 font-bold text-lg"
              >
                +
              </button>
            </div>

            <div className="text-center mt-4">
              <div className="bg-gradient-to-r from-amber-100 to-pink-100 rounded-xl p-3 border border-gray-200">
                <div className="text-xs text-gray-600 mb-1">Total</div>
                <div className="text-xl font-bold bg-gradient-to-r from-amber-700 to-pink-600 bg-clip-text text-transparent">
                  ${totalPrice}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-amber-700 transition-colors duration-150 bg-white hover:bg-amber-50 px-3 py-2 rounded-lg border border-gray-200">
            <div className="w-4 h-4 bg-gradient-to-r from-pink-400 to-rose-400 rounded-sm flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span>Save for Later</span>
          </button>

          <button
            onClick={handleRemove}
            disabled={isRemoving}
            className={`flex items-center gap-3 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-150 ${
              isRemoving
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-red-500 via-red-600 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 shadow-lg hover:shadow-xl"
            }`}
          >
            {isRemoving ? (
              <>
                <motion.div
                  className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>Removing...</span>
              </>
            ) : (
              <>
                <div className="w-4 h-4 bg-white/20 rounded-sm flex items-center justify-center">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span>Remove</span>
              </>
            )}
          </button>
        </div>

        {isRemoving && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-white/70 rounded-2xl flex items-center justify-center border border-gray-200"
          >
            <div className="text-center bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
              <motion.div
                className="w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full mx-auto mb-3"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-sm text-gray-700 font-medium">
                Removing item...
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}