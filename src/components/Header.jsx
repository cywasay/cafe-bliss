"use client";
import { useState, useEffect } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const { scrollY } = useScroll();
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setIsClient(true);
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    if (windowWidth >= 1024) {
      setIsMobileMenuOpen(false);
    }
  }, [windowWidth]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    // Check if we're at the top of the page
    if (latest <= 10) {
      setIsAtTop(true);
      setIsScrollingDown(false);
    } else {
      setIsAtTop(false);
      // Only hide/show header when scrolling and not at top
      if (latest > previous && latest > 100) {
        setIsScrollingDown(true);
      } else if (latest < previous) {
        setIsScrollingDown(false);
      }
    }
  });

  const headerVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        y: {
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8,
        },
        opacity: { duration: 0.2 },
      },
    },
    hidden: {
      y: -100,
      opacity: 0.8,
      transition: {
        y: {
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8,
        },
        opacity: { duration: 0.2 },
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "beforeChildren",
      },
    },
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      variants={headerVariants}
      animate={isAtTop || !isScrollingDown ? "visible" : "hidden"}
      className="bg-white/60 backdrop-blur-xl shadow-sm border-b border-rose-200/50 fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Premium Logo/Brand - Mobile Hamburger Function */}
          <motion.div
            className="flex items-center space-x-3 group cursor-pointer lg:cursor-default"
            onClick={() => {
              if (isClient && windowWidth < 1024) {
                toggleMobileMenu();
              }
            }}
            whileHover={{
              scale: isClient && windowWidth >= 1024 ? 1.02 : 1.05,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link
              href="/"
              className="flex items-center space-x-3 group"
              onClick={(e) => {
                if (isClient && windowWidth < 1024) {
                  e.preventDefault();
                }
              }}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="text-2xl sm:text-3xl filter drop-shadow-sm">
                  ☕
                </div>
                <motion.div
                  className="absolute -inset-1 bg-rose-300 rounded-full opacity-20 blur-sm"
                  whileHover={{ opacity: 0.4 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Mobile Menu Indicator */}
                <AnimatePresence>
                  {isClient && windowWidth < 1024 && (
                    <motion.div
                      className="lg:hidden absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: isMobileMenuOpen ? 45 : 0,
                      }}
                      exit={{ scale: 0 }}
                      transition={{
                        scale: {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                        rotate: {
                          duration: 0.3,
                        },
                      }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent tracking-tight">
                  Café Bliss
                </span>
                <span className="text-xs text-rose-600 font-medium tracking-widest uppercase hidden sm:block">
                  Premium Coffee
                </span>
              </div>
            </Link>

            {/* Mobile Tap Hint */}
            <div className="lg:hidden">
              <motion.span
                className="text-xs text-rose-500 font-medium tracking-wide opacity-60"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                tap
              </motion.span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/products"
                className="relative text-rose-700 hover:text-rose-600 font-semibold transition-all duration-300 group"
              >
                Products
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-rose-400"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/cart"
                className="flex items-center gap-2 relative text-rose-700 hover:text-rose-600 font-semibold transition-all duration-300 group"
              >
                <div className="relative">
                  <div className="text-lg">🛒</div>
                  {isClient && cart.length > 0 && (
                    <motion.div
                      className="absolute -top-2 -right-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 15,
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {cart.length}
                    </motion.div>
                  )}
                </div>
                Cart
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-rose-400"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </Link>
            </motion.div>

            {isClient && user?.role === "admin" && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/admin"
                  className="relative text-rose-700 hover:text-rose-600 font-semibold transition-all duration-300 group"
                >
                  <span className="flex items-center gap-1">
                    <motion.span
                      className="text-sm"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    >
                      👑
                    </motion.span>
                    Admin
                  </span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-rose-400"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </Link>
              </motion.div>
            )}
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden lg:flex items-center gap-4">
            {isClient && user ? (
              <div className="flex items-center gap-4">
                <motion.div
                  className="flex items-center gap-3 px-4 py-2 bg-rose-50/80 backdrop-blur-sm rounded-xl border border-rose-200/50"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className="w-8 h-8 bg-gradient-to-br from-orange-400 to-rose-400 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    {isClient &&
                      (user.name || user.email).charAt(0).toUpperCase()}
                  </motion.div>
                  <div className="flex flex-col">
                    <span className="text-rose-700 font-semibold text-sm">
                      {isClient && (user.name || user.email.split("@")[0])}
                    </span>
                    <span className="text-rose-600 text-xs capitalize">
                      {isClient && (user.role || "Member")}
                    </span>
                  </div>
                </motion.div>
                <motion.button
                  onClick={logout}
                  className="px-6 py-2.5 bg-rose-600 text-white rounded-xl font-semibold hover:bg-rose-700 transition-all duration-300 text-sm border border-rose-500 shadow-lg transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  Logout
                </motion.button>
              </div>
            ) : isClient ? (
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link
                    href="/login"
                    className="px-6 py-2.5 text-rose-700 border-2 border-rose-200 rounded-xl font-semibold hover:border-rose-300 hover:bg-rose-50/80 transition-all duration-300 text-sm backdrop-blur-sm"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link
                    href="/signup"
                    className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-300 text-sm relative overflow-hidden group shadow-lg transform hover:scale-105"
                  >
                    <span className="relative z-10">Sign Up</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ originX: 0 }}
                    />
                  </Link>
                </motion.div>
              </div>
            ) : null}
          </div>

          {/* Mobile Cart Badge */}
          <div className="lg:hidden flex items-center">
            {isClient && cart.length > 0 && (
              <motion.div
                className="relative"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 15,
                }}
              >
                <motion.div
                  className="bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {cart.length}
                </motion.div>
                <motion.div
                  className="absolute -inset-1 bg-rose-400 rounded-full opacity-30 blur-sm"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-rose-200/50"
          >
            <div className="px-4 py-6 space-y-6">
              {/* Mobile Navigation Links */}
              <div className="space-y-4">
                {/* Home Button */}
                <motion.div
                  variants={menuItemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 p-3 rounded-xl bg-rose-50/80 backdrop-blur-sm border border-rose-200/50 text-rose-700 hover:text-rose-600 font-semibold transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-rose-400 rounded-full flex items-center justify-center text-white text-sm shadow-lg">
                      🏠
                    </div>
                    Home
                    <div className="ml-auto text-rose-400 group-hover:text-rose-600 transition-colors duration-300">
                      →
                    </div>
                  </Link>
                </motion.div>

                <motion.div
                  variants={menuItemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/products"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 p-3 rounded-xl bg-rose-50/80 backdrop-blur-sm border border-rose-200/50 text-rose-700 hover:text-rose-600 font-semibold transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-rose-400 rounded-full flex items-center justify-center text-white text-sm shadow-lg">
                      🛍️
                    </div>
                    Products
                    <div className="ml-auto text-rose-400 group-hover:text-rose-600 transition-colors duration-300">
                      →
                    </div>
                  </Link>
                </motion.div>

                <motion.div
                  variants={menuItemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/cart"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 p-3 rounded-xl bg-rose-50/80 backdrop-blur-sm border border-rose-200/50 text-rose-700 hover:text-rose-600 font-semibold transition-all duration-300 group"
                  >
                    <div className="relative w-8 h-8 bg-gradient-to-br from-orange-400 to-rose-400 rounded-full flex items-center justify-center text-white text-sm shadow-lg">
                      🛒
                      {isClient && cart.length > 0 && (
                        <motion.div
                          className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold shadow-lg"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 15,
                          }}
                        >
                          {cart.length}
                        </motion.div>
                      )}
                    </div>
                    Cart
                    <div className="ml-auto text-rose-400 group-hover:text-rose-600 transition-colors duration-300">
                      →
                    </div>
                  </Link>
                </motion.div>

                {isClient && user?.role === "admin" && (
                  <motion.div
                    variants={menuItemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href="/admin"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 p-3 rounded-xl bg-rose-50/80 backdrop-blur-sm border border-rose-200/50 text-rose-700 hover:text-rose-600 font-semibold transition-all duration-300 group"
                    >
                      <motion.div
                        className="w-8 h-8 bg-gradient-to-br from-orange-400 to-rose-400 rounded-full flex items-center justify-center text-white text-sm shadow-lg"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                      >
                        👑
                      </motion.div>
                      Admin Panel
                      <div className="ml-auto text-rose-400 group-hover:text-rose-600 transition-colors duration-300">
                        →
                      </div>
                    </Link>
                  </motion.div>
                )}
              </div>

              {/* Mobile Auth Section */}
              <motion.div
                variants={menuItemVariants}
                className="pt-4 border-t border-rose-200/50 space-y-4"
              >
                {isClient && user ? (
                  <div className="space-y-4">
                    <motion.div
                      className="flex items-center gap-3 p-4 bg-gradient-to-r from-rose-50/80 to-pink-50/80 backdrop-blur-sm rounded-xl border border-rose-200/50"
                      whileHover={{ scale: 1.02 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <motion.div
                        className="w-10 h-10 bg-gradient-to-br from-orange-400 to-rose-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      >
                        {isClient &&
                          (user.name || user.email).charAt(0).toUpperCase()}
                      </motion.div>
                      <div className="flex flex-col flex-1">
                        <span className="text-rose-700 font-semibold">
                          {isClient && (user.name || user.email.split("@")[0])}
                        </span>
                        <span className="text-rose-600 text-sm capitalize">
                          {isClient && (user.role || "Member")}
                        </span>
                      </div>
                    </motion.div>

                    <motion.button
                      onClick={() => {
                        logout();
                        closeMobileMenu();
                      }}
                      className="w-full px-6 py-3 bg-rose-600 text-white rounded-xl font-semibold hover:bg-rose-700 transition-all duration-300 border border-rose-500 shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      Logout
                    </motion.button>
                  </div>
                ) : isClient ? (
                  <div className="space-y-3">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <Link
                        href="/login"
                        onClick={closeMobileMenu}
                        className="block w-full px-6 py-3 text-rose-700 border-2 border-rose-200 rounded-xl font-semibold hover:border-rose-300 hover:bg-rose-50/80 transition-all duration-300 text-center backdrop-blur-sm"
                      >
                        Login
                      </Link>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <Link
                        href="/signup"
                        onClick={closeMobileMenu}
                        className="block w-full px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-300 text-center relative overflow-hidden group shadow-lg"
                      >
                        <span className="relative z-10">Sign Up</span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          style={{ originX: 0 }}
                        />
                      </Link>
                    </motion.div>
                  </div>
                ) : null}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Border Effect */}
      <motion.div
        className="h-1 bg-rose-400"
        initial={{ opacity: 0.6 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.header>
  );
}
