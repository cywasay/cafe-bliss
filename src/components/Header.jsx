"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const headerVariants = {
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30, mass: 0.8 } },
  hidden: { y: -100, opacity: 0.8, transition: { type: "spring", stiffness: 300, damping: 30, mass: 0.8 } }
};

const mobileMenuVariants = {
  closed: { opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  open: { opacity: 1, height: "auto", transition: { duration: 0.3, ease: "easeInOut" } }
};

const menuItemVariants = {
  closed: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  open: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } }
};

export default function Header() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const { scrollY } = useScroll();
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const isDesktop = useMemo(() => windowWidth >= 1024, [windowWidth]);
  const cartCount = useMemo(() => cart.length, [cart.length]);

  useEffect(() => {
    setIsClient(true);
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isDesktop) setIsMobileMenuOpen(false);
  }, [isDesktop]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest <= 10) {
      setIsAtTop(true);
      setIsScrollingDown(false);
    } else {
      setIsAtTop(false);
      if (latest > previous && latest > 100) {
        setIsScrollingDown(true);
      } else if (latest < previous) {
        setIsScrollingDown(false);
      }
    }
  });

  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen(!isMobileMenuOpen), [isMobileMenuOpen]);
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  const handleLogoClick = useCallback((e) => {
    if (isClient && !isDesktop) {
      e.preventDefault();
      toggleMobileMenu();
    }
  }, [isClient, isDesktop, toggleMobileMenu]);

  const handleLogout = useCallback(() => {
    logout();
    closeMobileMenu();
  }, [logout, closeMobileMenu]);

  return (
    <motion.header
      variants={headerVariants}
      animate={isAtTop || !isScrollingDown ? "visible" : "hidden"}
      className="bg-white/60 shadow-sm border-b border-rose-200/50 fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          
          {/* Logo/Brand */}
          <div
            className="flex items-center space-x-3 group cursor-pointer lg:cursor-default"
            onClick={handleLogoClick}
          >
            <Link href="/" className="flex items-center space-x-3 group" onClick={handleLogoClick}>
              <div className="relative">
                <div className="text-2xl sm:text-3xl filter drop-shadow-sm">☕</div>
                {/* Mobile Menu Indicator */}
                <AnimatePresence>
                  {isClient && !isDesktop && (
                    <motion.div
                      className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: isMobileMenuOpen ? 45 : 0 }}
                      exit={{ scale: 0 }}
                      transition={{ rotate: { duration: 0.3 } }}
                    />
                  )}
                </AnimatePresence>
              </div>
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
              <span className="text-xs text-rose-500 font-medium tracking-wide opacity-60">
                tap
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <div>
              <Link
                href="/products"
                className="relative text-rose-700 hover:text-rose-600 font-semibold transition-all duration-300 group"
              >
                Products
                <span className="absolute -bottom-1 left-0 h-0.5 bg-rose-400 w-0 group-hover:w-full transition-all duration-300 ease-in-out" />
              </Link>
            </div>

            <div>
              <Link
                href="/cart"
                className="flex items-center gap-2 relative text-rose-700 hover:text-rose-600 font-semibold transition-all duration-300 group"
              >
                <div className="relative">
                  <div className="text-lg">🛒</div>
                  {isClient && cartCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg">
                      {cartCount}
                    </div>
                  )}
                </div>
                Cart
                <span className="absolute -bottom-1 left-0 h-0.5 bg-rose-400 w-0 group-hover:w-full transition-all duration-300 ease-in-out" />
              </Link>
            </div>

            {isClient && user?.role === "admin" && (
              <div>
                <Link
                  href="/admin"
                  className="relative text-rose-700 hover:text-rose-600 font-semibold transition-all duration-300 group"
                >
                  <span className="flex items-center gap-1">
                    <span className="text-sm">👑</span>
                    Admin
                  </span>
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-rose-400 w-0 group-hover:w-full transition-all duration-300 ease-in-out" />
                </Link>
              </div>
            )}
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden lg:flex items-center gap-4">
            {isClient && user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 px-4 py-2 bg-rose-50/80 rounded-xl border border-rose-200/50">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-rose-400 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {(user.name || user.email).charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-rose-700 font-semibold text-sm">
                      {user.name || user.email.split("@")[0]}
                    </span>
                    <span className="text-rose-600 text-xs capitalize">
                      {user.role || "Member"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="px-6 py-2.5 bg-rose-600 text-white rounded-xl font-semibold hover:bg-rose-700 transition-all duration-300 text-sm border border-rose-500 shadow-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div>
                  <Link
                    href="/login"
                    className="px-6 py-2.5 text-rose-700 border-2 border-rose-200 rounded-xl font-semibold hover:border-rose-300 hover:bg-rose-50/80 transition-all duration-300 text-sm"
                  >
                    Login
                  </Link>
                </div>
                <div>
                  <Link
                    href="/signup"
                    className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-300 text-sm shadow-lg"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Cart Badge */}
          <div className="lg:hidden flex items-center">
            {isClient && cartCount > 0 && (
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg">
                {cartCount}
              </div>
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
            className="lg:hidden overflow-hidden bg-white/95 border-t border-rose-200/50"
          >
            <div className="px-4 py-6 space-y-6">
              
              {/* Mobile Navigation Links */}
              <div className="space-y-4">
                <motion.div variants={menuItemVariants}>
                  <Link
                    href="/"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 p-3 rounded-xl bg-rose-50/80 border border-rose-200/50 text-rose-700 hover:text-rose-600 font-semibold transition-all duration-300 group"
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

                <motion.div variants={menuItemVariants}>
                  <Link
                    href="/products"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 p-3 rounded-xl bg-rose-50/80 border border-rose-200/50 text-rose-700 hover:text-rose-600 font-semibold transition-all duration-300 group"
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

                <motion.div variants={menuItemVariants}>
                  <Link
                    href="/cart"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 p-3 rounded-xl bg-rose-50/80 border border-rose-200/50 text-rose-700 hover:text-rose-600 font-semibold transition-all duration-300 group"
                  >
                    <div className="relative w-8 h-8 bg-gradient-to-br from-orange-400 to-rose-400 rounded-full flex items-center justify-center text-white text-sm shadow-lg">
                      🛒
                      {isClient && cartCount > 0 && (
                        <div className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold shadow-lg">
                          {cartCount}
                        </div>
                      )}
                    </div>
                    Cart
                    <div className="ml-auto text-rose-400 group-hover:text-rose-600 transition-colors duration-300">
                      →
                    </div>
                  </Link>
                </motion.div>

                {isClient && user?.role === "admin" && (
                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/admin"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 p-3 rounded-xl bg-rose-50/80 border border-rose-200/50 text-rose-700 hover:text-rose-600 font-semibold transition-all duration-300 group"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-rose-400 rounded-full flex items-center justify-center text-white text-sm shadow-lg">
                        👑
                      </div>
                      Admin Panel
                      <div className="ml-auto text-rose-400 group-hover:text-rose-600 transition-colors duration-300">
                        →
                      </div>
                    </Link>
                  </motion.div>
                )}
              </div>

              {/* Mobile Auth Section */}
              <motion.div variants={menuItemVariants} className="pt-4 border-t border-rose-200/50 space-y-4">
                {isClient && user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-rose-50/80 to-pink-50/80 rounded-xl border border-rose-200/50">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-rose-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        {(user.name || user.email).charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col flex-1">
                        <span className="text-rose-700 font-semibold">
                          {user.name || user.email.split("@")[0]}
                        </span>
                        <span className="text-rose-600 text-sm capitalize">
                          {user.role || "Member"}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full px-6 py-3 bg-rose-600 text-white rounded-xl font-semibold hover:bg-rose-700 transition-all duration-300 border border-rose-500 shadow-lg"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <Link
                        href="/login"
                        onClick={closeMobileMenu}
                        className="block w-full px-6 py-3 text-rose-700 border-2 border-rose-200 rounded-xl font-semibold hover:border-rose-300 hover:bg-rose-50/80 transition-all duration-300 text-center"
                      >
                        Login
                      </Link>
                    </div>

                    <div>
                      <Link
                        href="/signup"
                        onClick={closeMobileMenu}
                        className="block w-full px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-300 text-center shadow-lg"
                      >
                        Sign Up
                      </Link>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Border */}
      <div className="h-1 bg-rose-400 opacity-60" />
    </motion.header>
  );
}