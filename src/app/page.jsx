"use client";

import { useState, useEffect, useCallback, useMemo, memo } from "react";
import {
  LazyMotion,
  domAnimation,
  m as motion,
  useReducedMotion,
  useSpring,
  useScroll,
} from "framer-motion";
import Link from "next/link";

// Global LazyMotion wrapper
const MotionProvider = ({ children }) => (
  <LazyMotion features={domAnimation} strict>
    {children}
  </LazyMotion>
);

// Optimized floating element with GPU acceleration
const FloatingElement = memo(({ index, isMobile, isTablet }) => {
  if (isMobile || isTablet) return null;

  return (
    <motion.div
      className="absolute opacity-20"
      style={{
        left: `${20 + index * 20}%`,
        top: `${10 + index * 25}%`,
        willChange: "transform",
      }}
      animate={{
        y: [0, -20, 0],
        x: [0, 5, 0],
      }}
      transition={{
        duration: 6 + index,
        repeat: Infinity,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 1,
      }}
    >
      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full blur-sm" />
    </motion.div>
  );
});

// Memoized components with GPU transforms
const StatItem = memo(({ stat, index, isMobile, setIsHovering }) => (
  <motion.div
    className="text-center group cursor-pointer"
    style={{ willChange: "transform" }}
    whileHover={!isMobile ? { scale: 1.1, y: -5 } : {}}
    transition={{ duration: 0.2 }}
    onHoverStart={() => !isMobile && setIsHovering(true)}
    onHoverEnd={() => !isMobile && setIsHovering(false)}
  >
    <div className="text-xl md:text-2xl font-bold text-amber-800">
      {stat.number}
    </div>
    <div className="text-sm text-gray-600 group-hover:text-pink-600 transition-colors">
      {stat.label}
    </div>
  </motion.div>
));

const FeatureCard = memo(
  ({ feature, index, isMobile, setIsHovering, itemVariants }) => (
    <motion.div
      className="group bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-pink-100 hover:border-pink-200 relative overflow-hidden"
      style={{ willChange: "transform" }}
      variants={itemVariants}
      whileHover={!isMobile ? { y: -8, scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
      onHoverStart={() => !isMobile && setIsHovering(true)}
      onHoverEnd={() => !isMobile && setIsHovering(false)}
    >
      <motion.div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-rose-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <motion.div
        className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl md:rounded-3xl flex items-center justify-center mb-4 md:mb-6 shadow-lg relative z-10`}
        style={{ willChange: "transform" }}
        whileHover={!isMobile ? { scale: 1.1, rotate: 5 } : {}}
        transition={{ duration: 0.2 }}
      >
        <span className="text-2xl md:text-3xl">{feature.icon}</span>
      </motion.div>

      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4 relative z-10 group-hover:text-pink-700 transition-colors">
        {feature.title}
      </h3>
      <p className="text-gray-600 leading-relaxed relative z-10 group-hover:text-gray-700 transition-colors text-sm md:text-base">
        {feature.desc}
      </p>
    </motion.div>
  )
);

const ProductCard = memo(
  ({ product, index, isMobile, setIsHovering, itemVariants }) => (
    <motion.div
      className="group bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 relative"
      style={{ willChange: "transform" }}
      variants={itemVariants}
      whileHover={!isMobile ? { y: -8, scale: 1.01 } : {}}
      transition={{ duration: 0.3 }}
      onHoverStart={() => !isMobile && setIsHovering(true)}
      onHoverEnd={() => !isMobile && setIsHovering(false)}
    >
      <div className="h-48 md:h-56 bg-gradient-to-br from-pink-100 to-rose-200 flex items-center justify-center text-4xl md:text-5xl lg:text-6xl relative overflow-hidden">
        <motion.span
          style={{ willChange: "transform" }}
          whileHover={!isMobile ? { scale: 1.2 } : {}}
          transition={{ duration: 0.3 }}
          className="relative z-10"
        >
          {product.image}
        </motion.span>

        <motion.div
          className={`absolute top-3 md:top-4 left-3 md:left-4 px-2 md:px-3 py-1 rounded-full text-xs font-medium text-white shadow-lg ${
            index === 0
              ? "bg-gradient-to-r from-yellow-500 to-orange-500"
              : index === 1
              ? "bg-gradient-to-r from-blue-500 to-indigo-500"
              : "bg-gradient-to-r from-green-500 to-emerald-500"
          }`}
        >
          {product.badge}
        </motion.div>
      </div>

      <div className="p-4 md:p-6 relative">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg md:text-xl font-bold text-gray-800 group-hover:text-pink-700 transition-colors">
            {product.name}
          </h3>
          <motion.button
            className="p-2 hover:bg-pink-50 rounded-full transition-colors"
            style={{ willChange: "transform" }}
            whileHover={!isMobile ? { scale: 1.2 } : {}}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            <span className="text-lg text-gray-400 hover:text-pink-500 transition-colors">
              ♡
            </span>
          </motion.button>
        </div>

        <p className="text-sm text-gray-500 mb-3 group-hover:text-gray-600 transition-colors">
          {product.description}
        </p>

        <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, j) => (
              <span key={j} className="text-yellow-400 text-sm md:text-base">
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.rating})</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl md:text-2xl font-bold text-amber-800">
            {product.price}
          </span>
          <motion.button
            className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:from-pink-600 hover:to-rose-600 transition-all font-medium shadow-lg hover:shadow-xl text-sm md:text-base"
            style={{ willChange: "transform" }}
            whileHover={!isMobile ? { scale: 1.05 } : {}}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onHoverStart={() => !isMobile && setIsHovering(true)}
            onHoverEnd={() => !isMobile && setIsHovering(false)}
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
);

const FooterSection = memo(
  ({ section, sectionIndex, isMobile, setIsHovering, itemVariants }) => (
    <motion.div variants={itemVariants} className="text-center sm:text-left">
      <h3 className="text-lg font-semibold mb-4 md:mb-6">{section.title}</h3>
      <ul className="space-y-2 md:space-y-3">
        {section.links.map((link, linkIndex) => (
          <li key={linkIndex}>
            <motion.a
              href="#"
              className="text-gray-400 hover:text-pink-400 transition-colors relative text-sm md:text-base"
              style={{ willChange: "transform" }}
              whileHover={
                !isMobile ? { x: 4, color: "#f472b6" } : { color: "#f472b6" }
              }
              transition={{ duration: 0.2 }}
              onHoverStart={() => !isMobile && setIsHovering(true)}
              onHoverEnd={() => !isMobile && setIsHovering(false)}
            >
              {link}
            </motion.a>
          </li>
        ))}
      </ul>
    </motion.div>
  )
);

function HomePageContent() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
  });

  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Optimized screen size calculation
  const checkScreenSize = useCallback(() => {
    const width = window.innerWidth;
    setScreenSize({
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
    });
  }, []);

  // Throttled mouse move handler
  const handleMouseMove = useCallback(
    (e) => {
      if (screenSize.isMobile || prefersReducedMotion) return;

      requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: (e.clientY / window.innerHeight) * 2 - 1,
        });
      });
    },
    [screenSize.isMobile, prefersReducedMotion]
  );

  useEffect(() => {
    setIsMounted(true);
    setIsVisible(true);
    checkScreenSize();

    const resizeHandler = () => requestAnimationFrame(checkScreenSize);
    window.addEventListener("resize", resizeHandler, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeHandler);
    };
  }, [handleMouseMove, checkScreenSize]);

  // Memoized data
  const data = useMemo(
    () => ({
      featuredProducts: [
        {
          name: "Ethiopian Single Origin",
          price: "$24.99",
          rating: 4.9,
          image: "☕",
          badge: "Best Seller",
          description: "Rich, floral notes with citrus undertones",
        },
        {
          name: "Colombian Dark Roast",
          price: "$22.99",
          rating: 4.8,
          image: "🫘",
          badge: "Staff Pick",
          description: "Bold, smoky flavor with chocolate hints",
        },
        {
          name: "French Vanilla Blend",
          price: "$19.99",
          rating: 4.7,
          image: "☕",
          badge: "Customer Favorite",
          description: "Smooth vanilla sweetness, perfectly balanced",
        },
      ],
      features: [
        {
          icon: "🏆",
          title: "Premium Quality",
          desc: "Sourced from the world's finest coffee regions",
          gradient: "from-yellow-100 to-amber-100",
        },
        {
          icon: "⏰",
          title: "Fresh Roasted",
          desc: "Roasted daily in small batches for optimal freshness",
          gradient: "from-blue-100 to-indigo-100",
        },
        {
          icon: "👥",
          title: "Expert Curated",
          desc: "Hand-selected by our master roasters",
          gradient: "from-green-100 to-emerald-100",
        },
      ],
      stats: [
        { number: "1000+", label: "Happy Customers" },
        { number: "4.9★", label: "Average Rating" },
        { number: "50+", label: "Coffee Varieties" },
      ],
      footerSections: [
        {
          title: "Quick Links",
          links: ["Home", "Products", "About Us", "Contact"],
        },
        {
          title: "Categories",
          links: ["Single Origin", "Blends", "Decaf", "Accessories"],
        },
      ],
      contactInfo: [
        { icon: "📧", text: "hello@cafebliss.com" },
        { icon: "📞", text: "(555) 123-4567" },
        { icon: "📍", text: "123 Coffee Street, Bean City" },
      ],
    }),
    []
  );

  // Optimized animation variants
  const variants = useMemo(
    () => ({
      container: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: screenSize.isMobile
              ? 0.05
              : prefersReducedMotion
              ? 0.1
              : 0.15,
            delayChildren: screenSize.isMobile
              ? 0.05
              : prefersReducedMotion
              ? 0.1
              : 0.2,
          },
        },
      },
      item: {
        hidden: {
          y: prefersReducedMotion ? 0 : screenSize.isMobile ? 15 : 30,
          opacity: 0,
        },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            duration: prefersReducedMotion
              ? 0.2
              : screenSize.isMobile
              ? 0.4
              : 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      },
      floating:
        !screenSize.isMobile && !screenSize.isTablet && !prefersReducedMotion
          ? {
              animate: {
                y: [0, -10, 0],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              },
            }
          : {},
    }),
    [screenSize.isMobile, screenSize.isTablet, prefersReducedMotion]
  );

  // Smooth spring animations for mouse follower
  const mouseX = useSpring(mousePosition.x * (screenSize.isTablet ? 10 : 20), {
    stiffness: 150,
    damping: 20,
  });
  const mouseY = useSpring(mousePosition.y * (screenSize.isTablet ? 10 : 20), {
    stiffness: 150,
    damping: 20,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-rose-50 to-pink-100 pt-16 md:pt-20 overflow-hidden">
      {/* Floating Background Elements - Desktop Only */}
      {isMounted && !screenSize.isMobile && !screenSize.isTablet && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{ willChange: "transform" }}
        >
          {[...Array(4)].map((_, i) => (
            <FloatingElement
              key={i}
              index={i}
              isMobile={screenSize.isMobile}
              isTablet={screenSize.isTablet}
            />
          ))}
        </div>
      )}

      {/* Interactive Mouse Follower - Desktop Only */}
      {isMounted && !screenSize.isMobile && !prefersReducedMotion && (
        <motion.div
          className="fixed top-0 left-0 w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full pointer-events-none z-50 mix-blend-difference"
          style={{ x: mouseX, y: mouseY, willChange: "transform" }}
          animate={{ scale: isHovering ? (screenSize.isTablet ? 1.5 : 2) : 1 }}
          transition={{
            scale: { duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
          }}
        />
      )}

      {/* Hero Section */}
      <motion.section
        className="relative pt-4 md:pt-8 pb-16 md:pb-20 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={variants.container}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white via-pink-50 to-rose-100 opacity-90"></div>
        <div className="absolute inset-0">
          <svg
            className="absolute inset-0 w-full h-full opacity-5"
            viewBox="0 0 60 60"
          >
            <pattern
              id="coffee-pattern"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="30"
                cy="30"
                r="2"
                fill="currentColor"
                className="text-pink-400"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#coffee-pattern)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              className="space-y-6 md:space-y-8 text-center lg:text-left"
              variants={variants.item}
            >
              <div className="space-y-4">
                <motion.span
                  className="inline-block px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm border border-pink-200/50"
                  style={{ willChange: "transform" }}
                  whileHover={
                    !screenSize.isMobile && !prefersReducedMotion
                      ? { scale: 1.05 }
                      : {}
                  }
                  transition={{ duration: 0.2 }}
                  onHoverStart={() =>
                    !screenSize.isMobile && setIsHovering(true)
                  }
                  onHoverEnd={() =>
                    !screenSize.isMobile && setIsHovering(false)
                  }
                >
                  ✨ Premium Coffee Experience
                </motion.span>

                <motion.h1
                  className="text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight"
                  variants={variants.item}
                >
                  <motion.span
                    className="bg-gradient-to-r from-amber-800 via-pink-600 to-rose-600 bg-clip-text text-transparent"
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    Discover Your
                  </motion.span>
                  <br />
                  <motion.span className="text-gray-800 relative">
                    Perfect Brew
                    {!screenSize.isMobile && !prefersReducedMotion && (
                      <motion.div
                        className="absolute -inset-2 bg-gradient-to-r from-pink-200/30 to-rose-200/30 blur-xl -z-10"
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.3, 0.4, 0.3],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                      />
                    )}
                  </motion.span>
                </motion.h1>

                <motion.p
                  className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0"
                  variants={variants.item}
                >
                  From bean to cup, experience the finest artisan coffee crafted
                  with passion and precision. Each sip tells a story of quality
                  and excellence.
                </motion.p>
              </div>
                    
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                variants={variants.item}
              >
                <Link href="/products">
                  <motion.button
                    className="group px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-amber-700 to-amber-800 text-white rounded-full font-semibold hover:from-amber-800 hover:to-amber-900 transition-all shadow-xl hover:shadow-2xl relative overflow-hidden"
                    style={{ willChange: "transform" }}
                    whileHover={
                      !screenSize.isMobile && !prefersReducedMotion
                        ? { scale: 1.05 }
                        : {}
                    }
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    onHoverStart={() =>
                      !screenSize.isMobile && setIsHovering(true)
                    }
                    onHoverEnd={() =>
                      !screenSize.isMobile && setIsHovering(false)
                    }
                  >
                    <span className="relative z-10">Shop Now</span>
                    <span className="inline ml-2 relative z-10">→</span>
                  </motion.button>
                </Link>

                <motion.button
                  className="px-6 md:px-8 py-3 md:py-4 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full font-semibold hover:bg-white border-2 border-pink-200 hover:border-pink-300 transition-all shadow-lg hover:shadow-xl"
                  style={{ willChange: "transform" }}
                  whileHover={
                    !screenSize.isMobile && !prefersReducedMotion
                      ? { scale: 1.05 }
                      : {}
                  }
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onHoverStart={() =>
                    !screenSize.isMobile && setIsHovering(true)
                  }
                  onHoverEnd={() =>
                    !screenSize.isMobile && setIsHovering(false)
                  }
                >
                  Learn More
                </motion.button>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6 md:space-x-8 pt-4"
                variants={variants.item}
              >
                {data.stats.map((stat, index) => (
                  <StatItem
                    key={index}
                    stat={stat}
                    index={index}
                    isMobile={screenSize.isMobile}
                    setIsHovering={setIsHovering}
                  />
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="relative mt-8 lg:mt-0"
              variants={variants.item}
              animate={variants.floating.animate}
            >
              <motion.div
                className="relative z-10 bg-white/30 backdrop-blur-lg rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/40 shadow-2xl"
                style={{ willChange: "transform" }}
                whileHover={
                  !screenSize.isMobile && !prefersReducedMotion
                    ? { scale: 1.02, rotateY: 2 }
                    : {}
                }
                transition={{ duration: 0.3 }}
                onHoverStart={() => !screenSize.isMobile && setIsHovering(true)}
                onHoverEnd={() => !screenSize.isMobile && setIsHovering(false)}
              >
                <div className="aspect-square bg-gradient-to-br from-pink-100 to-rose-200 rounded-xl md:rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <motion.div
                    className="text-6xl md:text-8xl lg:text-9xl relative z-10"
                    style={{ willChange: "transform" }}
                    whileHover={
                      !screenSize.isMobile && !prefersReducedMotion
                        ? { scale: 1.1 }
                        : {}
                    }
                    transition={{ duration: 0.3 }}
                  >
                    ☕
                  </motion.div>
                </div>

                <motion.div className="absolute top-3 md:top-4 right-3 md:right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium shadow-lg">
                  Fresh Roasted
                </motion.div>
              </motion.div>

              {/* Floating decorations - Desktop only */}
              {!screenSize.isMobile &&
                !screenSize.isTablet &&
                !prefersReducedMotion &&
                [
                  {
                    size: "w-16 h-16 lg:w-20 lg:h-20",
                    pos: "-top-4 -left-4 lg:-top-6 lg:-left-6",
                    color: "from-amber-200 to-pink-200",
                  },
                  {
                    size: "w-24 h-24 lg:w-32 lg:h-32",
                    pos: "-bottom-4 -right-4 lg:-bottom-6 lg:-right-6",
                    color: "from-rose-200 to-pink-300",
                  },
                ].map((deco, index) => (
                  <motion.div
                    key={index}
                    className={`absolute ${deco.pos} ${deco.size} bg-gradient-to-br ${deco.color} rounded-full opacity-40 blur-sm`}
                    style={{ willChange: "transform" }}
                    animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.5, 0.4] }}
                    transition={{
                      duration: 3 + index,
                      repeat: Infinity,
                      delay: index,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  />
                ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-16 md:py-20 bg-white/60 backdrop-blur-sm relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={variants.container}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-12 md:mb-16"
            variants={variants.item}
          >
            <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 relative">
              Why Choose Café Bliss?
            </motion.h2>
            <p className="text-lg md:text-xl text-gray-600">
              Experience the difference quality makes
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {data.features.map((feature, i) => (
              <FeatureCard
                key={i}
                feature={feature}
                index={i}
                isMobile={screenSize.isMobile}
                setIsHovering={setIsHovering}
                itemVariants={variants.item}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Products */}
      <motion.section
        className="py-16 md:py-20 bg-gradient-to-br from-pink-50 to-rose-50 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={variants.container}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="text-center mb-12 md:mb-16"
            variants={variants.item}
          >
            <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 relative">
              Featured Products
            </motion.h2>
            <p className="text-lg md:text-xl text-gray-600">
              Our most loved coffee selections
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {data.featuredProducts.map((product, i) => (
              <ProductCard
                key={i}
                product={product}
                index={i}
                isMobile={screenSize.isMobile}
                setIsHovering={setIsHovering}
                itemVariants={variants.item}
              />
            ))}
          </div>

          <motion.div
            className="text-center mt-12 md:mt-16"
            variants={variants.item}
          >
            <Link href="/products">
              <motion.button
                className="px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-amber-700 to-amber-800 text-white rounded-full font-semibold hover:from-amber-800 hover:to-amber-900 transition-all shadow-xl hover:shadow-2xl"
                style={{ willChange: "transform" }}
                whileHover={
                  !screenSize.isMobile && !prefersReducedMotion
                    ? { scale: 1.05 }
                    : {}
                }
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onHoverStart={() => !screenSize.isMobile && setIsHovering(true)}
                onHoverEnd={() => !screenSize.isMobile && setIsHovering(false)}
              >
                View All Products →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Newsletter Section */}
      <motion.section
        className="py-16 md:py-20 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={variants.container}
      >
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 relative"
            variants={variants.item}
          >
            Stay Caffeinated
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-pink-100 mb-6 md:mb-8"
            variants={variants.item}
          >
            Get exclusive offers and new product updates delivered to your inbox
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            variants={variants.item}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 md:px-6 py-3 md:py-4 rounded-full border-0 focus:ring-4 focus:ring-white/30 focus:outline-none backdrop-blur-sm bg-white/90 placeholder-gray-500"
            />
            <motion.button
              className="px-6 md:px-8 py-3 md:py-4 bg-white text-pink-600 rounded-full font-semibold hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl"
              style={{ willChange: "transform" }}
              whileHover={
                !screenSize.isMobile && !prefersReducedMotion
                  ? { scale: 1.05 }
                  : {}
              }
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onHoverStart={() => !screenSize.isMobile && setIsHovering(true)}
              onHoverEnd={() => !screenSize.isMobile && setIsHovering(false)}
            >
              Subscribe
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <pattern
              id="footer-pattern"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="10"
                cy="10"
                r="1"
                fill="currentColor"
                className="text-pink-400"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#footer-pattern)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants.container}
          >
            <motion.div
              variants={variants.item}
              className="sm:col-span-2 lg:col-span-1"
            >
              <motion.div
                className="flex items-center space-x-2 mb-4 md:mb-6 justify-center sm:justify-start"
                style={{ willChange: "transform" }}
                whileHover={
                  !screenSize.isMobile && !prefersReducedMotion
                    ? { scale: 1.05 }
                    : {}
                }
                transition={{ duration: 0.2 }}
                onHoverStart={() => !screenSize.isMobile && setIsHovering(true)}
                onHoverEnd={() => !screenSize.isMobile && setIsHovering(false)}
              >
                <span className="text-xl md:text-2xl text-pink-400">☕</span>
                <span className="text-xl md:text-2xl font-bold">
                  Café Bliss
                </span>
              </motion.div>
              <p className="text-gray-400 leading-relaxed text-center sm:text-left text-sm md:text-base">
                Crafting exceptional coffee experiences since 2020. From bean to
                cup, we're passionate about quality.
              </p>
            </motion.div>

            {data.footerSections.map((section, sectionIndex) => (
              <FooterSection
                key={sectionIndex}
                section={section}
                sectionIndex={sectionIndex}
                isMobile={screenSize.isMobile}
                setIsHovering={setIsHovering}
                itemVariants={variants.item}
              />
            ))}

            <motion.div
              variants={variants.item}
              className="text-center sm:text-left"
            >
              <h3 className="text-lg font-semibold mb-4 md:mb-6">
                Contact Info
              </h3>
              <ul className="space-y-3 md:space-y-4 text-gray-400">
                {data.contactInfo.map((contact, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center space-x-3 justify-center sm:justify-start"
                    style={{ willChange: "transform" }}
                    whileHover={
                      !screenSize.isMobile && !prefersReducedMotion
                        ? { scale: 1.02, color: "#f472b6" }
                        : { color: "#f472b6" }
                    }
                    transition={{ duration: 0.2 }}
                    onHoverStart={() =>
                      !screenSize.isMobile && setIsHovering(true)
                    }
                    onHoverEnd={() =>
                      !screenSize.isMobile && setIsHovering(false)
                    }
                  >
                    <span className="text-lg">{contact.icon}</span>
                    <span className="text-sm md:text-base">{contact.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-gray-400 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm md:text-base">
              &copy; 2024 Café Bliss. All rights reserved. Made with{" "}
              <motion.span
                className="text-red-400"
                animate={
                  !screenSize.isMobile && !prefersReducedMotion
                    ? { scale: [1, 1.1, 1] }
                    : {}
                }
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                ❤️
              </motion.span>{" "}
              and lots of coffee.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

// Wrap with MotionProvider for global LazyMotion
export default function HomePage() {
  return (
    <MotionProvider>
      <HomePageContent />
    </MotionProvider>
  );
}
