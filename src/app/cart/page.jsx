"use client";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import CartItem from "../../components/CartItem";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { cart, getTotalPrice, clearCart, checkout, isCheckingOut } = useCart();
  const [isMobile, setIsMobile] = useState(false);

  // Set page title
  useEffect(() => {
    document.title = "Shopping Cart - Café Bliss";
  }, []);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const containerVariants = isMobile
    ? {}
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
          },
        },
      };

  const itemVariants = isMobile
    ? {}
    : {
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

  const MotionDiv = isMobile ? "div" : motion.div;
  const MotionButton = isMobile ? "button" : motion.button;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-pink-100 pt-20"
      style={{
        background:
          "linear-gradient(135deg, #fffbeb 0%, #fef7f7 25%, #fff1f2 50%, #fce7f3 75%, #fdf2f8 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <MotionDiv
          {...(!isMobile && {
            initial: "hidden",
            animate: "visible",
            variants: containerVariants,
          })}
        >
          {/* Header */}
          <MotionDiv
            className="mb-6 sm:mb-8"
            {...(!isMobile && { variants: itemVariants })}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl sm:text-3xl bg-gradient-to-br from-amber-400 to-rose-400 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg">
                🛒
              </div>
              <div className="flex-1">
                <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-amber-800 via-rose-600 to-pink-600 bg-clip-text text-transparent">
                  Your Cart
                </h1>
                <div className="h-1 w-full bg-gradient-to-r from-amber-400 to-pink-400 rounded-full mt-2"></div>
              </div>
            </div>
            <p className="text-gray-700 text-base sm:text-lg font-medium">
              {cart.length === 0
                ? "Your cart is empty"
                : `${cart.length} item${
                    cart.length > 1 ? "s" : ""
                  } in your cart`}
            </p>
          </MotionDiv>

          {cart.length === 0 ? (
            /* Empty Cart State */
            <MotionDiv
              className="text-center py-12 sm:py-16"
              {...(!isMobile && { variants: itemVariants })}
            >
              <div className="bg-white/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-white/50 max-w-md mx-auto shadow-2xl relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-4 left-4 w-3 h-3 bg-amber-300/30 rounded-full"></div>
                  <div className="absolute top-8 right-6 w-2 h-2 bg-pink-300/30 rounded-full"></div>
                  <div className="absolute bottom-6 left-8 w-4 h-4 bg-rose-300/30 rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-2 h-2 bg-amber-400/30 rounded-full"></div>
                </div>

                <div className="relative z-10">
                  <div className="text-6xl sm:text-8xl mb-4 sm:mb-6 opacity-60 filter drop-shadow-lg">
                    ☕
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                    Your cart is empty
                  </h2>
                  <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                    Discover our premium collection of artisanal coffee blends
                    waiting for you.
                  </p>
                  <MotionDiv
                    {...(!isMobile && {
                      whileHover: { scale: 1.05, y: -2 },
                      whileTap: { scale: 0.95 },
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      },
                    })}
                  >
                    <Link
                      href="/products"
                      className={`inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-600 via-amber-700 to-rose-600 text-white rounded-full font-semibold shadow-xl transition-all relative overflow-hidden group text-sm sm:text-base ${
                        !isMobile ? "hover:shadow-2xl" : ""
                      }`}
                    >
                      <span
                        className={`absolute inset-0 bg-gradient-to-r from-amber-500 to-rose-500 opacity-0 transition-opacity ${
                          !isMobile ? "group-hover:opacity-100" : ""
                        }`}
                      ></span>
                      <span className="relative z-10">Browse Products</span>
                      <span
                        className={`ml-2 relative z-10 transition-transform ${
                          !isMobile ? "group-hover:translate-x-1" : ""
                        }`}
                      >
                        →
                      </span>
                    </Link>
                  </MotionDiv>
                </div>
              </div>
            </MotionDiv>
          ) : (
            /* Cart Content */
            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Cart Items */}
              <MotionDiv
                className="lg:col-span-2 space-y-4"
                {...(!isMobile && { variants: itemVariants })}
              >
                <div className="bg-white/70 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/50 shadow-xl relative overflow-hidden">
                  {/* Subtle background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-4 left-4 w-8 h-8 bg-amber-400 rounded-full"></div>
                    <div className="absolute top-12 right-8 w-6 h-6 bg-pink-400 rounded-full"></div>
                    <div className="absolute bottom-8 left-12 w-4 h-4 bg-rose-400 rounded-full"></div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-amber-400 to-rose-400 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs sm:text-sm font-bold">
                          📦
                        </span>
                      </div>
                      <h2 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent">
                        Cart Items
                      </h2>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      {cart.map((item, index) => (
                        <MotionDiv
                          key={item.id}
                          {...(!isMobile && {
                            initial: { opacity: 0, x: -20 },
                            animate: { opacity: 1, x: 0 },
                            exit: { opacity: 0, x: 20 },
                            transition: { delay: index * 0.1 },
                          })}
                          className="bg-white/60 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/30 backdrop-blur-sm"
                        >
                          <CartItem item={item} />
                        </MotionDiv>
                      ))}
                    </div>

                    <MotionButton
                      onClick={clearCart}
                      className={`mt-4 sm:mt-6 px-3 sm:px-4 py-2 
    text-red-700 
    bg-red-100/50 
    border border-red-300 
    rounded-lg transition-all text-sm backdrop-blur-sm 
    ${
      !isMobile
        ? "hover:text-red-700 hover:bg-red-100/50 hover:border-red-300"
        : ""
    }
  `}
                      {...(!isMobile && {
                        whileHover: { scale: 1.02 },
                        whileTap: { scale: 0.98 },
                      })}
                    >
                      Clear Cart
                    </MotionButton>
                  </div>
                </div>
              </MotionDiv>

              {/* Order Summary */}
              <MotionDiv
                className="lg:col-span-1"
                {...(!isMobile && { variants: itemVariants })}
              >
                <div className="bg-white/70 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/50 shadow-xl sticky top-24 overflow-hidden">
                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 via-transparent to-pink-100/20 pointer-events-none"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs sm:text-sm font-bold">
                          💰
                        </span>
                      </div>
                      <h2 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent">
                        Order Summary
                      </h2>
                    </div>

                    <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 text-sm sm:text-base">
                          Subtotal
                        </span>
                        <span className="font-semibold text-gray-800 text-sm sm:text-base">
                          ${getTotalPrice?.() || "0.00"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 text-sm sm:text-base">
                          Shipping
                        </span>
                        <span className="font-semibold text-green-600 text-sm sm:text-base">
                          Free
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 text-sm sm:text-base">
                          Tax
                        </span>
                        <span className="font-semibold text-gray-800 text-sm sm:text-base">
                          $0.00
                        </span>
                      </div>
                      <div className="border-t border-gradient-to-r from-pink-200/50 to-amber-200/50 pt-4">
                        <div className="flex justify-between items-center bg-gradient-to-r from-amber-50/50 to-pink-50/50 rounded-lg p-3 backdrop-blur-sm">
                          <span className="text-base sm:text-lg font-bold text-gray-800">
                            Total
                          </span>
                          <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-700 to-rose-600 bg-clip-text text-transparent">
                            ${getTotalPrice?.() || "0.00"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <MotionButton
                        onClick={async () => {
                          const res = await checkout();
                          if (res?.id) {
                            alert(`Order placed! ID: ${res.id}`);
                          }
                        }}
                        disabled={cart.length === 0 || isCheckingOut}
                        className={`w-full py-3 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white rounded-xl font-semibold shadow-lg transition-all relative overflow-hidden group text-sm sm:text-base ${
                          !isMobile ? "hover:shadow-xl" : ""
                        }`}
                        {...(!isMobile && {
                          whileHover: { scale: 1.02, y: -1 },
                          whileTap: { scale: 0.98 },
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          },
                        })}
                      >
                        <span
                          className={`absolute inset-0 bg-gradient-to-r from-pink-400 to-amber-400 opacity-0 transition-opacity ${
                            !isMobile ? "group-hover:opacity-100" : ""
                          }`}
                        ></span>
                        <span className="relative z-10">
                          {isCheckingOut ? "Placing order…" : "Proceed to Checkout"}
                        </span>
                      </MotionButton>

                      <MotionDiv
                        {...(!isMobile && {
                          whileHover: { scale: 1.02, y: -1 },
                          whileTap: { scale: 0.98 },
                        })}
                      >
                        <Link
                          href="/products"
                          className={`block w-full py-3 text-center text-gray-700 bg-white/50 backdrop-blur-sm border border-pink-200/50 rounded-xl font-semibold transition-all shadow-sm text-sm sm:text-base ${
                            !isMobile
                              ? "hover:border-pink-300 hover:bg-pink-50/50 hover:shadow-md"
                              : ""
                          }`}
                        >
                          Continue Shopping
                        </Link>
                      </MotionDiv>
                    </div>

                    {/* Promo Code */}
                    <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-pink-200/50">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-md flex items-center justify-center">
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
                        <MotionButton
                          className={`px-3 sm:px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg font-medium shadow-md transition-all text-sm relative overflow-hidden group ${
                            !isMobile ? "hover:shadow-lg" : ""
                          }`}
                          {...(!isMobile && {
                            whileHover: { scale: 1.05 },
                            whileTap: { scale: 0.95 },
                          })}
                        >
                          <span
                            className={`absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 opacity-0 transition-opacity ${
                              !isMobile ? "group-hover:opacity-100" : ""
                            }`}
                          ></span>
                          <span className="relative z-10">Apply</span>
                        </MotionButton>
                      </div>
                    </div>
                  </div>
                </div>
              </MotionDiv>
            </div>
          )}

          {/* Trust Badges */}
          <MotionDiv
            className="mt-8 sm:mt-12 bg-white/60 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/50 shadow-lg relative overflow-hidden"
            {...(!isMobile && { variants: itemVariants })}
          >
            {/* Subtle background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-green-50/30 to-purple-50/30 opacity-50"></div>

            <div className="relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
                <div className="flex flex-col items-center group">
                  <div
                    className={`text-xl sm:text-2xl mb-2 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center text-white shadow-md transition-shadow ${
                      !isMobile ? "group-hover:shadow-lg" : ""
                    }`}
                  >
                    🔒
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">
                    Secure Checkout
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    256-bit SSL encryption
                  </p>
                </div>
                <div className="flex flex-col items-center group">
                  <div
                    className={`text-xl sm:text-2xl mb-2 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-white shadow-md transition-shadow ${
                      !isMobile ? "group-hover:shadow-lg" : ""
                    }`}
                  >
                    🚚
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">
                    Free Shipping
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    On orders over $50
                  </p>
                </div>
                <div className="flex flex-col items-center group">
                  <div
                    className={`text-xl sm:text-2xl mb-2 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-md transition-shadow ${
                      !isMobile ? "group-hover:shadow-lg" : ""
                    }`}
                  >
                    ↩️
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">
                    Easy Returns
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    30-day return policy
                  </p>
                </div>
              </div>
            </div>
          </MotionDiv>
        </MotionDiv>
      </div>
    </div>
  );
}