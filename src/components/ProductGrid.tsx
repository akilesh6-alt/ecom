import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { ProductCategory, GiftBundle } from '../types';
import { Filter, SlidersHorizontal, RotateCcw, X, Sparkles, Gift, ArrowRight, Baby } from 'lucide-react';

const CATEGORIES: ('all' | ProductCategory)[] = [
  'all',
  'Wooden & Montessori',
  'Organic Apparel',
  'STEM & Puzzles',
  'Books & Bedtime',
  'Art & Crafts',
  'Active & Outdoor'
];

export const ProductGrid: React.FC = () => {
  const {
    products,
    bundles,
    addBundleToCart,
    selectedAgeStage,
    setSelectedAgeStage,
    selectedCategory,
    setSelectedCategory,
    selectedVendorId,
    setSelectedVendorId,
    selectedSafetyBadge,
    setSelectedSafetyBadge,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    vendors,
    resetFilters,
    kidProfile,
    formatPrice
  } = useStore();

  const [priceRange, setPriceRange] = useState<'all' | 'under35' | '35to60' | 'above60'>('all');
  const [showBundles, setShowBundles] = useState(true);

  // Filter logic
  const filteredProducts = products.filter(product => {
    // Age stage
    if (selectedAgeStage !== 'all' && product.ageStage !== selectedAgeStage) {
      return false;
    }
    // Category
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    // Vendor
    if (selectedVendorId !== 'all' && product.vendorId !== selectedVendorId) {
      return false;
    }
    // Safety badge
    if (selectedSafetyBadge !== 'all' && !product.safetyBadges.some(b => b === selectedSafetyBadge)) {
      return false;
    }
    // Price range
    if (priceRange === 'under35' && product.price >= 35) return false;
    if (priceRange === '35to60' && (product.price < 35 || product.price > 60)) return false;
    if (priceRange === 'above60' && product.price <= 60) return false;

    // Search query: Real-time search by name, category, vendor, description, or age label
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = product.title.toLowerCase().includes(q);
      const matchVendor = product.vendorName.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchCategory = product.category.toLowerCase().includes(q);
      const matchAge = product.ageLabel.toLowerCase().includes(q);
      if (!matchTitle && !matchVendor && !matchDesc && !matchCategory && !matchAge) {
        return false;
      }
    }
    return true;
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  const hasActiveFilters = 
    selectedAgeStage !== 'all' || 
    selectedCategory !== 'all' || 
    selectedVendorId !== 'all' || 
    selectedSafetyBadge !== 'all' || 
    priceRange !== 'all' ||
    searchQuery.trim().length > 0;

  const currentVendorObj = vendors.find(v => v.id === selectedVendorId);

  return (
    <section id="catalog-section" className="py-10 bg-[#FAF9F6] min-h-[600px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Active Child Profile Recommendation Alert */}
        {kidProfile && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-200/80 flex items-center justify-center text-lg shrink-0">
                👶
              </div>
              <div>
                <p className="text-xs font-bold text-amber-950">
                  Custom Curated for {kidProfile.name} ({kidProfile.ageStage.toUpperCase()} Stage)
                </p>
                <p className="text-[11px] text-amber-800">
                  Showing toys, developmental tools, and garments safety-certified for your child's age bracket.
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedAgeStage('all')}
              className="text-xs font-semibold text-amber-900 bg-white border border-amber-300 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition-colors self-start sm:self-auto"
            >
              Show All Ages
            </button>
          </div>
        )}

        {/* Real-Time Search Alert Banner (When Header Search is Active) */}
        {searchQuery.trim() && (
          <div className="mb-6 p-3.5 rounded-xl bg-white border border-amber-300 shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-stone-800">
              <span className="font-bold text-amber-800">Real-Time Search:</span>
              <span>Showing results matching <strong>"{searchQuery}"</strong></span>
              <span className="text-stone-400">·</span>
              <span className="font-mono-numbers font-semibold text-stone-700">{sortedProducts.length} items found</span>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-stone-500 hover:text-stone-900 bg-stone-100 px-2.5 py-1 rounded-md transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear search</span>
            </button>
          </div>
        )}

        {/* Curated Age Starter Bundles (Collapsible or Shown) */}
        {showBundles && !searchQuery && selectedAgeStage === 'all' && selectedCategory === 'all' && (
          <div className="mb-12 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider">
                  <Gift className="w-3.5 h-3.5" />
                  <span>Curated Milestone Starter Crates</span>
                </div>
                <h3 className="text-xl font-bold text-stone-900 mt-0.5">
                  Complete Birthday & Milestone Gift Sets
                </h3>
              </div>
              <button 
                onClick={() => setShowBundles(false)}
                className="text-xs text-stone-400 hover:text-stone-600 font-medium"
              >
                Hide bundles
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bundles.map((bundle) => (
                <div 
                  key={bundle.id}
                  className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-16/10 bg-stone-100 overflow-hidden">
                    <img 
                      src={bundle.image} 
                      alt={bundle.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-stone-900/90 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                      {bundle.badge}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-stone-900 text-xs font-semibold px-2 py-0.5 rounded">
                      {bundle.ageLabel}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm leading-snug">
                        {bundle.title}
                      </h4>
                      <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                        {bundle.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base font-bold font-mono-numbers text-stone-900">
                          {formatPrice(bundle.price)}
                        </span>
                        <span className="text-xs text-stone-400 line-through font-mono-numbers">
                          {formatPrice(bundle.originalPrice)}
                        </span>
                      </div>

                      <button
                        onClick={() => addBundleToCart(bundle)}
                        className="px-3.5 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                      >
                        Add Crate to Bag
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Horizontal Filter Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-600 border border-stone-200/90 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                {cat === 'all' ? 'All Collections' : cat}
              </button>
            );
          })}
        </div>

        {/* Filter Controls & Result Counts Strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-200/90 gap-4">
          
          <div className="flex items-center flex-wrap gap-2 text-xs text-stone-600">
            <span className="font-semibold text-stone-900 font-mono-numbers">
              {sortedProducts.length} items
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            
            {/* Vendor Filter Dropdown */}
            <div className="relative inline-flex items-center">
              <select
                value={selectedVendorId}
                onChange={(e) => setSelectedVendorId(e.target.value)}
                className="bg-white border border-stone-200/90 rounded-md px-2.5 py-1 text-xs font-medium text-stone-700 hover:border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                <option value="all">All Makers ({vendors.length})</option>
                {vendors.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Safety Filter Dropdown */}
            <div className="relative inline-flex items-center">
              <select
                value={selectedSafetyBadge}
                onChange={(e) => setSelectedSafetyBadge(e.target.value)}
                className="bg-white border border-stone-200/90 rounded-md px-2.5 py-1 text-xs font-medium text-stone-700 hover:border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                <option value="all">All Certifications</option>
                <option value="Non-Toxic Dye">Non-Toxic Dye</option>
                <option value="100% GOTS Organic">100% GOTS Organic</option>
                <option value="BPA & Phthalate Free">BPA & Phthalate Free</option>
                <option value="FSC Certified Beechwood">FSC Beechwood</option>
                <option value="ASTM / CE Certified">ASTM / CE Certified</option>
                <option value="Choke-Hazard Tested">Choke-Hazard Tested</option>
              </select>
            </div>

            {/* Price Filter Segment */}
            <div className="relative inline-flex items-center">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value as any)}
                className="bg-white border border-stone-200/90 rounded-md px-2.5 py-1 text-xs font-medium text-stone-700 hover:border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                <option value="all">All Prices</option>
                <option value="under35">Under $35</option>
                <option value="35to60">$35 to $60</option>
                <option value="above60">$60 and above</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={() => {
                  resetFilters();
                  setPriceRange('all');
                }}
                className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 hover:text-amber-900 bg-amber-50 px-2 py-0.5 rounded transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Reset filters
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 self-end md:self-auto text-xs">
            <span className="text-stone-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-stone-200/90 rounded-md px-2.5 py-1 text-xs font-medium text-stone-800 hover:border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
            >
              <option value="featured">Curator Picks</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Selected Vendor Spotlight Header if filtering by single vendor */}
        {currentVendorObj && selectedVendorId !== 'all' && (
          <div className="mt-4 p-4 rounded-xl bg-white border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Direct Workshop</span>
                <span className="text-xs text-stone-400">·</span>
                <span className="text-xs text-stone-600">{currentVendorObj.location}</span>
              </div>
              <h3 className="text-base font-bold text-stone-900">{currentVendorObj.name}</h3>
              <p className="text-xs text-stone-500 mt-0.5">{currentVendorObj.tagline}</p>
            </div>
            <button 
              onClick={() => setSelectedVendorId('all')}
              className="text-xs text-stone-500 hover:text-stone-900 font-medium underline self-start sm:self-auto"
            >
              Show all makers
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        {sortedProducts.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {sortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center py-12 px-4 max-w-md mx-auto bg-white rounded-2xl border border-stone-200">
            <span className="text-4xl">🧸</span>
            <h3 className="mt-4 text-base font-bold text-stone-900">No items match your filter criteria</h3>
            <p className="mt-1 text-xs text-stone-500">
              Try choosing a broader age stage or clearing your search term "{searchQuery}".
            </p>
            <button
              onClick={() => {
                resetFilters();
                setPriceRange('all');
              }}
              className="mt-5 px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors"
            >
              Reset all filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
