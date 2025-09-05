"use client";

import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { LazyMotion, domAnimation, m as motion } from "framer-motion";
import Link from "next/link";

const MotionProvider = ({ children }) => (
  <LazyMotion features={domAnimation} strict>
    {children}
  </LazyMotion>
);

const StatItem = memo(({ stat, index, isMobile }) => (
  <motion.div
    className="text-center group cursor-pointer"
    whileHover={!isMobile ? { scale: 1.02 } : {}}
    transition={{ duration: 0.15 }}
  >
    <div className="text-xl md:text-2xl font-bold text-amber-800">
      {stat.number}
    </div>
    <div className="text-sm text-gray-600 group-hover:text-pink-600 transition-colors duration-200">
      {stat.label}
    </div>
  </motion.div>
));

const FeatureCard = memo(({ feature, index, isMobile, itemVariants }) => (
  <motion.div
    className="group bg-white/80 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-200 border border-pink-100 hover:border-pink-200"
    variants={itemVariants}
    whileHover={!isMobile ? { y: -4, scale: 1.01 } : {}}
    transition={{ duration: 0.2 }}
  >
    <motion.div
      className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl md:rounded-3xl flex items-center justify-center mb-4 md:mb-6 shadow-lg`}
      whileHover={!isMobile ? { scale: 1.05 } : {}}
      transition={{ duration: 0.15 }}
    >
      <span className="text-2xl md:text-3xl">{feature.icon}</span>
    </motion.div>

    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4 group-hover:text-pink-700 transition-colors duration-200">
      {feature.title}
    </h3>
    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-200 text-sm md:text-base">
      {feature.desc}
    </p>
  </motion.div>
));

const FooterSection = memo(({ section, isMobile, itemVariants }) => (
  <motion.div variants={itemVariants} className="text-center sm:text-left">
    <h3 className="text-lg font-semibold mb-4 md:mb-6">{section.title}</h3>
    <ul className="space-y-2 md:space-y-3">
      {section.links.map((link, linkIndex) => (
        <li key={linkIndex}>
          <motion.a
            href="#"
            className="text-gray-400 hover:text-pink-400 transition-colors duration-200 text-sm md:text-base"
            whileHover={!isMobile ? { x: 2 } : {}}
            transition={{ duration: 0.15 }}
          >
            {link}
          </motion.a>
        </li>
      ))}
    </ul>
  </motion.div>
));

function HomePageContent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const checkScreenSize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    setIsVisible(true);
    checkScreenSize();

    const resizeHandler = () => requestAnimationFrame(checkScreenSize);
    window.addEventListener("resize", resizeHandler, { passive: true });

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [checkScreenSize]);

  const data = useMemo(() => ({
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
  }), []);

  const variants = useMemo(() => ({
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: isMobile ? 0.05 : 0.1,
          delayChildren: isMobile ? 0.05 : 0.15,
        },
      },
    },
    item: {
      hidden: { y: isMobile ? 10 : 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: isMobile ? 0.3 : 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
  }), [isMobile]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-rose-50 to-pink-100 pt-16 md:pt-20">
      {/* Hero Section */}
      <motion.section
        className="relative pt-4 md:pt-8 pb-16 md:pb-20"
        initial="hidden"
        animate="visible"
        variants={variants.container}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white via-pink-50 to-rose-100 opacity-90"></div>
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 60 60">
            <pattern id="coffee-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="currentColor" className="text-pink-400" />
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
                  className="inline-block px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 rounded-full text-sm font-medium shadow-lg border border-pink-200/50"
                  whileHover={!isMobile ? { scale: 1.02 } : {}}
                  transition={{ duration: 0.15 }}
                >
                  ✨ Premium Coffee Experience
                </motion.span>

                <motion.h1
                  className="text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight"
                  variants={variants.item}
                >
                  <span className="bg-gradient-to-r from-amber-800 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                    Discover Your
                  </span>
                  <br />
                  <span className="text-gray-800">Perfect Brew</span>
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
                    className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-amber-700 to-amber-800 text-white rounded-full font-semibold hover:from-amber-800 hover:to-amber-900 transition-all duration-200 shadow-xl hover:shadow-2xl"
                    whileHover={!isMobile ? { scale: 1.02 } : {}}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                  >
                    <span>Shop Now</span>
                    <span className="inline ml-2">→</span>
                  </motion.button>
                </Link>

                <motion.button
                  className="px-6 md:px-8 py-3 md:py-4 bg-white/90 text-gray-800 rounded-full font-semibold hover:bg-white border-2 border-pink-200 hover:border-pink-300 transition-all duration-200 shadow-lg hover:shadow-xl"
                  whileHover={!isMobile ? { scale: 1.02 } : {}}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
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
                    isMobile={isMobile}
                  />
                ))}
              </motion.div>
            </motion.div>

            <motion.div className="relative mt-8 lg:mt-0" variants={variants.item}>
              <motion.div
                className="relative z-10 bg-white/30 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/40 shadow-2xl"
                whileHover={!isMobile ? { scale: 1.01 } : {}}
                transition={{ duration: 0.2 }}
              >
                <div className="aspect-square bg-gradient-to-br from-pink-100 to-rose-200 rounded-xl md:rounded-2xl flex items-center justify-center">
                  <motion.div
                    className="text-6xl md:text-8xl lg:text-9xl"
                    whileHover={!isMobile ? { scale: 1.05 } : {}}
                    transition={{ duration: 0.2 }}
                  >
                    ☕
                  </motion.div>
                </div>

                <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium shadow-lg">
                  Fresh Roasted
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-16 md:py-20 bg-white/60"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={variants.container}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div className="text-center mb-12 md:mb-16" variants={variants.item}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Café Bliss?
            </h2>
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
                isMobile={isMobile}
                itemVariants={variants.item}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Browse Products Section */}
      <motion.section
        className="py-16 md:py-20 bg-gradient-to-br from-pink-50 to-rose-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={variants.container}
      >
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            variants={variants.item}
          >
            Explore Our Coffee Collection
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-600 mb-8"
            variants={variants.item}
          >
            Discover premium coffee blends from around the world
          </motion.p>

          <motion.div variants={variants.item}>
            <Link href="/products">
              <motion.button
                className="px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-amber-700 to-amber-800 text-white rounded-full font-semibold hover:from-amber-800 hover:to-amber-900 transition-all duration-200 shadow-xl hover:shadow-2xl"
                whileHover={!isMobile ? { scale: 1.02 } : {}}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                Browse All Products →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Newsletter Section */}
      <motion.section
        className="py-16 md:py-20 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={variants.container}
      >
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
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
              className="flex-1 px-4 md:px-6 py-3 md:py-4 rounded-full border-0 focus:ring-4 focus:ring-white/30 focus:outline-none bg-white/90 placeholder-gray-500"
            />
            <motion.button
              className="px-6 md:px-8 py-3 md:py-4 bg-white text-pink-600 rounded-full font-semibold hover:bg-gray-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
              whileHover={!isMobile ? { scale: 1.02 } : {}}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              Subscribe
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 md:py-16">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <pattern id="footer-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor" className="text-pink-400" />
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
            <motion.div variants={variants.item} className="sm:col-span-2 lg:col-span-1">
              <motion.div
                className="flex items-center space-x-2 mb-4 md:mb-6 justify-center sm:justify-start"
                whileHover={!isMobile ? { scale: 1.02 } : {}}
                transition={{ duration: 0.15 }}
              >
                <span className="text-xl md:text-2xl text-pink-400">☕</span>
                <span className="text-xl md:text-2xl font-bold">Café Bliss</span>
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
                isMobile={isMobile}
                itemVariants={variants.item}
              />
            ))}

            <motion.div variants={variants.item} className="text-center sm:text-left">
              <h3 className="text-lg font-semibold mb-4 md:mb-6">Contact Info</h3>
              <ul className="space-y-3 md:space-y-4 text-gray-400">
                {data.contactInfo.map((contact, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center space-x-3 justify-center sm:justify-start"
                    whileHover={!isMobile ? { scale: 1.01 } : {}}
                    transition={{ duration: 0.15 }}
                  >
                    <span className="text-lg">{contact.icon}</span>
                    <span className="text-sm md:text-base">{contact.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm md:text-base">
              &copy; 2024 Café Bliss. All rights reserved. Made with{" "}
              <span className="text-red-400">❤️</span> and lots of coffee.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export default function HomePage() {
  return (
    <MotionProvider>
      <HomePageContent />
    </MotionProvider>
  );
}