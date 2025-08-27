"use client";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import CartItem from "../../components/CartItem";
import Link from "next/link";

export default function CartPage() {
  const { cart, getTotalPrice, clearCart } = useCart();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-pink-100 pt-20"
      style={{
        background:
          "linear-gradient(135deg, #fffbeb 0%, #fef7f7 25%, #fff1f2 50%, #fce7f3 75%, #fdf2f8 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div className="mb-8" variants={itemVariants}>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl bg-gradient-to-br from-amber-400 to-rose-400 w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg">
                🛒
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-800 via-rose-600 to-pink-600 bg-clip-text text-transparent">
                  Your Cart
                </h1>
                <div className="h-1 w-full bg-gradient-to-r from-amber-400 to-pink-400 rounded-full mt-2"></div>
              </div>
            </div>
            <p className="text-gray-700 text-lg font-medium">
              {cart.length === 0
                ? "Your cart is empty"
                : `${cart.length} item${
                    cart.length > 1 ? "s" : ""
                  } in your cart`}
            </p>
          </motion.div>

          {cart.length === 0 ? (
            /* Empty Cart State */
            <motion.div className="text-center py-16" variants={itemVariants}>
              <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-12 border border-white/50 max-w-md mx-auto shadow-2xl relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-4 left-4 w-3 h-3 bg-amber-300/30 rounded-full"></div>
                  <div className="absolute top-8 right-6 w-2 h-2 bg-pink-300/30 rounded-full"></div>
                  <div className="absolute bottom-6 left-8 w-4 h-4 bg-rose-300/30 rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-2 h-2 bg-amber-400/30 rounded-full"></div>
                </div>

                <div className="relative z-10">
                  <div className="text-8xl mb-6 opacity-60 filter drop-shadow-lg">
                    ☕
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Your cart is empty
                  </h2>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Discover our premium collection of artisanal coffee blends
                    waiting for you.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Link
                      href="/products"
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-600 via-amber-700 to-rose-600 text-white rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      <span className="relative z-10">Browse Products</span>
                      <span className="ml-2 relative z-10 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Cart Content */
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <motion.div
                className="lg:col-span-2 space-y-4"
                variants={itemVariants}
              >
                <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-xl relative overflow-hidden">
                  {/* Subtle background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-4 left-4 w-8 h-8 bg-amber-400 rounded-full"></div>
                    <div className="absolute top-12 right-8 w-6 h-6 bg-pink-400 rounded-full"></div>
                    <div className="absolute bottom-8 left-12 w-4 h-4 bg-rose-400 rounded-full"></div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-rose-400 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-bold">📦</span>
                      </div>
                      <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent">
                        Cart Items
                      </h2>
                    </div>
                    <div className="space-y-4">
                      {cart.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white/60 rounded-xl p-4 border border-white/30 backdrop-blur-sm"
                        >
                          <CartItem item={item} />
                        </motion.div>
                      ))}
                    </div>

                    <motion.button
                      onClick={clearCart}
                      className="mt-6 px-4 py-2 text-red-600 hover:text-red-700 bg-red-50/50 hover:bg-red-100/50 border border-red-200/50 hover:border-red-300 rounded-lg transition-all text-sm backdrop-blur-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Clear Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Order Summary */}
              <motion.div className="lg:col-span-1" variants={itemVariants}>
                <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-xl sticky top-24 overflow-hidden">
                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 via-transparent to-pink-100/20 pointer-events-none"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-bold">💰</span>
                      </div>
                      <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent">
                        Order Summary
                      </h2>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-semibold text-gray-800">
                          ${getTotalPrice?.() || "0.00"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-semibold text-green-600">
                          Free
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Tax</span>
                        <span className="font-semibold text-gray-800">
                          $0.00
                        </span>
                      </div>
                      <div className="border-t border-gradient-to-r from-pink-200/50 to-amber-200/50 pt-4">
                        <div className="flex justify-between items-center bg-gradient-to-r from-amber-50/50 to-pink-50/50 rounded-lg p-3 backdrop-blur-sm">
                          <span className="text-lg font-bold text-gray-800">
                            Total
                          </span>
                          <span className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-rose-600 bg-clip-text text-transparent">
                            ${getTotalPrice?.() || "0.00"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <motion.button
                        className="w-full py-3 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-pink-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        <span className="relative z-10">
                          Proceed to Checkout
                        </span>
                      </motion.button>

                      <motion.div
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          href="/products"
                          className="block w-full py-3 text-center text-gray-700 bg-white/50 backdrop-blur-sm border border-pink-200/50 hover:border-pink-300 rounded-xl font-semibold hover:bg-pink-50/50 transition-all shadow-sm hover:shadow-md"
                        >
                          Continue Shopping
                        </Link>
                      </motion.div>
                    </div>

                    {/* Promo Code */}
                    <div className="mt-6 pt-6 border-t border-pink-200/50">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-md flex items-center justify-center">
                          <span className="text-white text-xs">🎫</span>
                        </div>
                        <h3 className="text-sm font-semibold text-gray-800">
                          Promo Code
                        </h3>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter code"
                          className="flex-1 px-3 py-2 bg-white/60 backdrop-blur-sm border border-pink-200/50 rounded-lg focus:ring-2 focus:ring-pink-200/50 focus:border-pink-400/50 outline-none text-sm shadow-sm"
                        />
                        <motion.button
                          className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all text-sm relative overflow-hidden group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                          <span className="relative z-10">Apply</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Trust Badges */}
          <motion.div
            className="mt-12 bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-lg relative overflow-hidden"
            variants={itemVariants}
          >
            {/* Subtle background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-green-50/30 to-purple-50/30 opacity-50"></div>

            <div className="relative z-10">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center group">
                  <div className="text-2xl mb-2 w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-shadow">
                    🔒
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Secure Checkout
                  </h3>
                  <p className="text-sm text-gray-600">
                    256-bit SSL encryption
                  </p>
                </div>
                <div className="flex flex-col items-center group">
                  <div className="text-2xl mb-2 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-shadow">
                    🚚
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Free Shipping
                  </h3>
                  <p className="text-sm text-gray-600">On orders over $50</p>
                </div>
                <div className="flex flex-col items-center group">
                  <div className="text-2xl mb-2 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-shadow">
                    ↩️
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Easy Returns
                  </h3>
                  <p className="text-sm text-gray-600">30-day return policy</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
