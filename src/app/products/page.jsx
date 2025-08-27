"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import products from "../../data/products";
import ProductCard from "../../components/ProductCard";

export default function ProductsPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 100],
    roastLevel: [],
    origin: [],
    category: [],
    inStock: false,
  });

  const sortOptions = [
    { value: "featured", label: "Sort by Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name-az", label: "Name: A to Z" },
    { value: "name-za", label: "Name: Z to A" },
    { value: "rating", label: "Highest Rated" },
  ];

  // Get unique values for filter options
  const filterOptions = useMemo(() => {
    const roastLevels = [
      ...new Set(products.map((p) => p.roastLevel).filter(Boolean)),
    ];
    const origins = [...new Set(products.map((p) => p.origin).filter(Boolean))];
    const categories = [
      ...new Set(products.map((p) => p.category).filter(Boolean)),
    ];
    const maxPrice = Math.max(...products.map((p) => p.price));

    return { roastLevels, origins, categories, maxPrice };
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      // Price filter
      if (
        product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1]
      ) {
        return false;
      }

      // Roast level filter
      if (
        filters.roastLevel.length > 0 &&
        !filters.roastLevel.includes(product.roastLevel)
      ) {
        return false;
      }

      // Origin filter
      if (
        filters.origin.length > 0 &&
        !filters.origin.includes(product.origin)
      ) {
        return false;
      }

      // Category filter
      if (
        filters.category.length > 0 &&
        !filters.category.includes(product.category)
      ) {
        return false;
      }

      // Stock filter
      if (filters.inStock && !product.inStock) {
        return false;
      }

      return true;
    });

    return filtered;
  }, [filters]);

  const handleSortChange = (value) => {
    setSortBy(value);
    setShowSortDropdown(false);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleCheckboxFilter = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value],
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      priceRange: [0, filterOptions.maxPrice],
      roastLevel: [],
      origin: [],
      category: [],
      inStock: false,
    });
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (
      filters.priceRange[0] > 0 ||
      filters.priceRange[1] < filterOptions.maxPrice
    )
      count++;
    if (filters.roastLevel.length > 0) count++;
    if (filters.origin.length > 0) count++;
    if (filters.category.length > 0) count++;
    if (filters.inStock) count++;
    return count;
  }, [filters, filterOptions.maxPrice]);

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

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
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

  const filterVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-rose-50 to-pink-100 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div className="mb-12 text-center" variants={itemVariants}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="text-4xl">☕</div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-800 to-pink-600 bg-clip-text text-transparent">
                Our Products
              </h1>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our premium collection of carefully sourced and expertly
              roasted coffee beans from around the world
            </p>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-amber-700 to-pink-500 mx-auto mt-6 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            />
          </motion.div>

          {/* Filter/Sort Section */}
          <motion.div
            className="mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-100"
            variants={itemVariants}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium">
                  {filteredProducts.length} of {products.length} Products
                </span>
                <motion.button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-700 to-amber-800 text-white rounded-lg hover:from-amber-800 hover:to-amber-900 transition-all shadow-lg hover:shadow-xl font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-white">Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="bg-white text-amber-800 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {activeFilterCount}
                    </span>
                  )}
                  <motion.div
                    animate={{ rotate: showFilters ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-white"
                  >
                    ▼
                  </motion.div>
                </motion.button>
              </div>
            </div>

            {/* Expandable Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  variants={filterVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="overflow-hidden"
                >
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 pt-6 border-t border-pink-200">
                    {/* Price Range Filter */}
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">
                        Price Range
                      </h3>
                      <div className="space-y-2">
                        <input
                          type="range"
                          min="0"
                          max={filterOptions.maxPrice}
                          value={filters.priceRange[1]}
                          onChange={(e) =>
                            handleFilterChange("priceRange", [
                              filters.priceRange[0],
                              parseInt(e.target.value),
                            ])
                          }
                          className="w-full accent-amber-600"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>${filters.priceRange[0]}</span>
                          <span>${filters.priceRange[1]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Roast Level Filter */}
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">
                        Roast Level
                      </h3>
                      <div className="space-y-2">
                        {filterOptions.roastLevels.map((roast) => (
                          <label key={roast} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={filters.roastLevel.includes(roast)}
                              onChange={() =>
                                handleCheckboxFilter("roastLevel", roast)
                              }
                              className="mr-2 accent-amber-600"
                            />
                            <span className="text-sm text-gray-700">
                              {roast}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Origin Filter */}
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">
                        Origin
                      </h3>
                      <div className="space-y-2">
                        {filterOptions.origins.map((origin) => (
                          <label key={origin} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={filters.origin.includes(origin)}
                              onChange={() =>
                                handleCheckboxFilter("origin", origin)
                              }
                              className="mr-2 accent-amber-600"
                            />
                            <span className="text-sm text-gray-700">
                              {origin}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Additional Filters */}
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">
                        Availability
                      </h3>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.inStock}
                          onChange={(e) =>
                            handleFilterChange("inStock", e.target.checked)
                          }
                          className="mr-2 accent-amber-600"
                        />
                        <span className="text-sm text-gray-700">
                          In Stock Only
                        </span>
                      </label>

                      {activeFilterCount > 0 && (
                        <motion.button
                          onClick={clearAllFilters}
                          className="mt-4 text-sm text-amber-600 hover:text-amber-800 underline"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Clear All Filters
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Products Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={JSON.stringify(filters)}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {filteredProducts.length === 0 ? (
                <motion.div
                  className="col-span-full text-center py-12"
                  variants={itemVariants}
                >
                  <div className="text-6xl mb-4">☕</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or search criteria
                  </p>
                  <motion.button
                    onClick={clearAllFilters}
                    className="px-6 py-2 bg-gradient-to-r from-amber-600 to-pink-600 text-white rounded-lg hover:from-amber-700 hover:to-pink-700 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Clear Filters
                  </motion.button>
                </motion.div>
              ) : (
                filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                    whileHover={{
                      y: -5,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      },
                    }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>

          {/* Features Section */}
          <motion.div
            className="mt-16 bg-white/50 rounded-2xl p-8 border border-pink-100"
            variants={itemVariants}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-800 to-pink-600 bg-clip-text text-transparent mb-4">
                Why Choose Our Coffee?
              </h2>
            </div>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="text-3xl mb-3">🌱</div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Premium Quality
                </h3>
                <p className="text-sm text-gray-600">
                  Hand-selected beans from the finest coffee regions
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl mb-3">🔥</div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Fresh Roasted
                </h3>
                <p className="text-sm text-gray-600">
                  Roasted to perfection in small batches weekly
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl mb-3">🚚</div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Fast Delivery
                </h3>
                <p className="text-sm text-gray-600">
                  Fresh coffee delivered to your doorstep
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl mb-3">♻️</div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Sustainable
                </h3>
                <p className="text-sm text-gray-600">
                  Ethically sourced and environmentally conscious
                </p>
              </div>
            </div>
          </motion.div>

          {/* Newsletter/CTA Section */}
          <motion.div
            className="mt-12 bg-gradient-to-r from-amber-100 to-pink-100 rounded-2xl p-8 border border-pink-200 text-center"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Stay Updated with New Arrivals
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Be the first to know about new coffee varieties and exclusive
              offers
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-100 focus:border-pink-400 outline-none"
              />
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-amber-700 to-amber-800 text-white rounded-xl font-semibold hover:from-amber-800 hover:to-amber-900 transition-all shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
