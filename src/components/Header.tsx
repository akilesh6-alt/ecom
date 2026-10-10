import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  ShieldCheck, 
  Store, 
  Package, 
  X, 
  Sparkles, 
  SlidersHorizontal, 
  Layers, 
  Compass, 
  Baby,
  ArrowRight,
  Check
} from 'lucide-react';
import { ProductCategory } from '../types';

const POPULAR_SEARCHES = [
  'Wooden Stacker',
  'Magnetic Tiles',
  'Merino Cardigan',
  'Balance Board',
  'Bedtime Story',
  'Solar Rover'
];

export const Header: React.FC = () => {
  const {
    products,
    cartItemCount,
    setCartOpen,
    wishlist,
    setWishlistOpen,
    currentView,
    setCurrentView,
    setVendorDirectoryOpen,
    setSafetyModalOpen,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    setQuickViewProduct,
    resetFilters,
    orders,
    compareList,
    setCompareModalOpen,
    setGiftQuizOpen,
    kidProfile,
    setKidProfile,
    currency,
    setCurrency,
    formatPrice
  } = useStore();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showKidProfileModal, setShowKidProfileModal] = useState(false);
  const [tempKidName, setTempKidName] = useState(kidProfile?.name || '');
  const [tempKidStage, setTempKidStage] = useState(kidProfile?.ageStage || '1-3y');
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut '/' or 'Cmd+K' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key === 'k')) && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchFocused(true);
      } else if (e.key === 'Escape') {
        setIsSearchFocused(false);
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Real-time matched products based on name OR category
  const trimmed = searchQuery.trim().toLowerCase();
  
  const matchedCategories = Array.from(new Set(products.map(p => p.category))).filter(cat =>
    trimmed.length > 0 && cat.toLowerCase().includes(trimmed)
  );

  const matchedProducts = products.filter(product => {
    if (!trimmed) return false;
    const matchName = product.title.toLowerCase().includes(trimmed);
    const matchCat = product.category.toLowerCase().includes(trimmed);
    const matchAge = product.ageLabel.toLowerCase().includes(trimmed);
    const matchVendor = product.vendorName.toLowerCase().includes(trimmed);
    return matchName || matchCat || matchAge || matchVendor;
  }).slice(0, 6);

  const handleSelectProduct = (product: typeof products[0]) => {
    setQuickViewProduct(product);
    setIsSearchFocused(false);
  };

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setSearchQuery('');
    setIsSearchFocused(false);
    if (currentView !== 'shop') setCurrentView('shop');
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFilterGridDirectly = () => {
    setIsSearchFocused(false);
    if (currentView !== 'shop') setCurrentView('shop');
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSaveKidProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempKidName.trim()) {
      setKidProfile({
        name: tempKidName.trim(),
        ageStage: tempKidStage as any
      });
    } else {
      setKidProfile(null);
    }
    setShowKidProfileModal(false);
  };

  return (
    <>
      {/* Top Promotional & Coupon Bar with 1-Click Code Copy */}
      <div className="bg-amber-900 text-amber-100 px-4 py-1.5 text-xs font-medium flex items-center justify-between border-b border-amber-950">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="bg-amber-800 text-amber-200 text-[10px] uppercase font-bold px-1.5 py-0.2 rounded">
              Welcome Gift
            </span>
            <span className="hidden sm:inline">Use code <strong>KIDDO10</strong> for 10% off your first artisan parcel.</span>
            <span className="sm:hidden">Code <strong>KIDDO10</strong> for 10% off!</span>
            <span className="text-amber-300/60 hidden md:inline">·</span>
            <span className="text-amber-200 hidden md:inline">Free direct workshop delivery on orders $60+</span>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-[11px]">
            {/* Currency Selector */}
            <div className="flex items-center gap-1 text-amber-200">
              <span className="text-[10px] text-amber-400">Currency:</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="bg-amber-800 text-white rounded px-1.5 py-0.5 text-[11px] focus:outline-none cursor-pointer"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>

            {/* Quick Toy Finder Button */}
            <button
              onClick={() => setGiftQuizOpen(true)}
              className="text-amber-200 hover:text-white font-semibold flex items-center gap-1 underline underline-offset-2 ml-2"
            >
              <Compass className="w-3 h-3" />
              <span>Milestone Toy Quiz</span>
            </button>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-stone-200/90 shadow-xs transition-all">
        {/* Main 3-Zone Navigation Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 md:gap-6">
          
          {/* Zone 1: Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => {
                setCurrentView('shop');
                resetFilters();
              }}
              className="text-left group focus:outline-none"
            >
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors whitespace-nowrap">
                Sprout <span className="text-amber-600">&</span> Wonder
              </span>
              <span className="block text-[10px] text-stone-400 font-semibold tracking-wide uppercase -mt-1">
                Ages 0–10 Kids Marketplace
              </span>
            </button>
          </div>

          {/* Central Real-Time Search Bar */}
          <div ref={searchContainerRef} className="flex-1 max-w-md relative mx-2">
            <div className={`relative flex items-center bg-white border rounded-xl px-3 py-2 transition-all shadow-xs ${
              isSearchFocused
                ? 'border-amber-600 ring-2 ring-amber-500/20 shadow-md'
                : 'border-stone-300 hover:border-stone-400'
            }`}>
              <Search className="w-4 h-4 text-stone-400 shrink-0 mr-2.5" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentView !== 'shop') setCurrentView('shop');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleFilterGridDirectly();
                  }
                }}
                placeholder="Real-time search by name, category, or age..."
                className="w-full text-xs text-stone-900 placeholder-stone-400 bg-transparent focus:outline-none"
              />

              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-stone-400 hover:text-stone-600 rounded-full hover:bg-stone-100"
                  aria-label="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="hidden sm:inline-block text-[10px] text-stone-400 bg-stone-100 border border-stone-200 px-1.5 py-0.5 rounded font-mono">
                  /
                </span>
              )}
            </div>

            {/* Real-Time Dropdown Suggestions Overlay */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-stone-200/90 overflow-hidden z-50 animate-fade-in max-h-[460px] overflow-y-auto">
                
                {/* When Search Query is Present */}
                {trimmed ? (
                  <div className="p-3 space-y-3">
                    
                    {/* Matched Categories Suggestions */}
                    {matchedCategories.length > 0 && (
                      <div className="border-b border-stone-100 pb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-2 block mb-1">
                          Matching Categories
                        </span>
                        <div className="space-y-1">
                          {matchedCategories.map(cat => (
                            <button
                              key={cat}
                              onClick={() => handleSelectCategory(cat)}
                              className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold text-stone-800 hover:bg-amber-50 hover:text-amber-900 flex items-center justify-between transition-colors"
                            >
                              <span className="flex items-center gap-1.5">
                                <span className="text-amber-600 font-bold">Category:</span> {cat}
                              </span>
                              <span className="text-[10px] text-stone-400 font-normal">
                                Filter Grid →
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Matched Products List */}
                    <div>
                      <div className="flex items-center justify-between px-2 mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                          Matching Products ({matchedProducts.length})
                        </span>
                        <button
                          onClick={handleFilterGridDirectly}
                          className="text-[11px] font-bold text-amber-700 hover:text-amber-900"
                        >
                          Show in Grid →
                        </button>
                      </div>

                      {matchedProducts.length > 0 ? (
                        <div className="space-y-1">
                          {matchedProducts.map(product => (
                            <div
                              key={product.id}
                              onClick={() => handleSelectProduct(product)}
                              className="p-2 rounded-xl hover:bg-stone-50 cursor-pointer transition-colors flex items-center gap-3 border border-transparent hover:border-stone-200"
                            >
                              <img
                                src={product.image}
                                alt={product.title}
                                referrerPolicy="no-referrer"
                                className="w-11 h-11 rounded-lg object-cover bg-stone-100 border border-stone-200 shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-xs font-bold text-stone-900 truncate">
                                  {product.title}
                                </h4>
                                <div className="flex items-center gap-2 text-[10px] text-stone-500 mt-0.5">
                                  <span className="text-amber-800 font-semibold">{product.ageLabel}</span>
                                  <span>·</span>
                                  <span>{product.category}</span>
                                  <span>·</span>
                                  <span>{product.vendorName}</span>
                                </div>
                              </div>
                              <span className="text-xs font-bold font-mono-numbers text-stone-900 shrink-0">
                                {formatPrice(product.price)}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-xs text-stone-500">
                          No exact products match "{searchQuery}". Press Enter to view all results.
                        </div>
                      )}
                    </div>

                    {/* Action button to filter entire product grid */}
                    <div className="pt-2 border-t border-stone-100">
                      <button
                        onClick={handleFilterGridDirectly}
                        className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span>Filter Entire Grid for "{searchQuery}"</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                ) : (
                  /* When Search Query is Empty (Trending & Categories Launchers) */
                  <div className="p-4 space-y-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-2">
                        Popular Searches for Kids 0–10
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {POPULAR_SEARCHES.map(term => (
                          <button
                            key={term}
                            onClick={() => {
                              setSearchQuery(term);
                              handleFilterGridDirectly();
                            }}
                            className="text-xs font-medium bg-stone-100 hover:bg-amber-100 hover:text-amber-900 text-stone-700 px-2.5 py-1 rounded-md transition-colors"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-stone-100 pt-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-2">
                        Quick Category Filters
                      </span>
                      <div className="grid grid-cols-2 gap-1.5 text-xs">
                        {[
                          'Wooden & Montessori',
                          'Organic Apparel',
                          'STEM & Puzzles',
                          'Books & Bedtime'
                        ].map(c => (
                          <button
                            key={c}
                            onClick={() => handleSelectCategory(c)}
                            className="text-left p-2 rounded-lg bg-stone-50 hover:bg-stone-100 text-stone-800 font-medium truncate"
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>

          {/* Zone 3: Navigation Links & Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Child Profile Switcher */}
            <button
              onClick={() => setShowKidProfileModal(true)}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                kidProfile
                  ? 'bg-amber-50 text-amber-900 border-amber-300'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 border-transparent sm:border-stone-200'
              }`}
              title="Set your child's age profile for tailored recommendations"
            >
              <Baby className="w-4 h-4 text-amber-700" />
              <span className="hidden xl:inline">
                {kidProfile ? `${kidProfile.name} (${kidProfile.ageStage.toUpperCase()})` : 'Child Profile'}
              </span>
            </button>

            {/* Comparison Matrix Button */}
            {compareList.length > 0 && (
              <button
                onClick={() => setCompareModalOpen(true)}
                className="p-2 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded-lg text-xs font-bold flex items-center gap-1 transition-all"
                title="Compare toys side-by-side"
              >
                <Layers className="w-4 h-4 text-indigo-700" />
                <span className="hidden sm:inline font-mono-numbers">Compare ({compareList.length})</span>
              </button>
            )}

            {/* Saved Wishlist */}
            <button 
              onClick={() => setWishlistOpen(true)}
              className="relative p-2.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
              title="Saved items wishlist"
              aria-label="Saved items wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center font-mono-numbers">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button 
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2.5 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors text-xs font-bold whitespace-nowrap shadow-xs"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden md:inline">Bag</span>
              <span className="bg-amber-500 text-stone-950 text-[11px] font-extrabold px-1.5 py-0.2 rounded-full font-mono-numbers">
                {cartItemCount}
              </span>
            </button>

            {/* Vendor Portal Switch */}
            <button 
              onClick={() => setCurrentView(currentView === 'vendor-portal' ? 'shop' : 'vendor-portal')}
              className={`hidden lg:inline-flex items-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg border transition-colors ${
                currentView === 'vendor-portal'
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'text-stone-700 hover:bg-stone-100 border-stone-300'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>{currentView === 'vendor-portal' ? 'Storefront' : 'Vendor Hub'}</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Strip with Stage & Safety Links */}
        <div className="border-t border-stone-200/80 px-4 sm:px-6 lg:px-8 py-2 bg-white flex items-center justify-between text-xs font-medium text-stone-600 overflow-x-auto gap-4">
          <div className="flex items-center gap-6 whitespace-nowrap">
            <button 
              onClick={() => {
                setCurrentView('shop');
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-stone-950 transition-colors"
            >
              All Stages 0–10Y
            </button>
            <button 
              onClick={() => setVendorDirectoryOpen(true)}
              className="hover:text-stone-950 transition-colors flex items-center gap-1"
            >
              <Store className="w-3.5 h-3.5 text-stone-400" />
              5 Verified Workshops
            </button>
            <button 
              onClick={() => setSafetyModalOpen(true)}
              className="hover:text-stone-950 transition-colors flex items-center gap-1 text-emerald-800"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Safety Standard & Lab Audits
            </button>
            <button 
              onClick={() => setGiftQuizOpen(true)}
              className="hover:text-stone-950 transition-colors flex items-center gap-1 text-amber-800"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Interactive Gift Finder
            </button>
          </div>

          <div className="flex items-center gap-4 whitespace-nowrap">
            {orders.length > 0 && (
              <button 
                onClick={() => setCurrentView('orders')}
                className="hover:text-stone-950 transition-colors flex items-center gap-1 font-semibold text-amber-800"
              >
                <Package className="w-3.5 h-3.5" />
                My Orders ({orders.length})
              </button>
            )}
            <button 
              onClick={() => setCurrentView('vendor-portal')}
              className="lg:hidden text-amber-700 font-bold"
            >
              Vendor Portal
            </button>
          </div>
        </div>
      </header>

      {/* Child Profile Modal */}
      {showKidProfileModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Baby className="w-5 h-5 text-amber-700" />
                <h3 className="text-base font-bold text-stone-900">Personalize Store for Your Child</h3>
              </div>
              <button onClick={() => setShowKidProfileModal(false)} className="text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Tell us your child's name and age so we can automatically calibrate developmental milestones, choke hazard warnings, and customized gift certificates.
            </p>

            <form onSubmit={handleSaveKidProfile} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Child's First Name</label>
                <input
                  type="text"
                  placeholder="e.g. Leo or Emma"
                  value={tempKidName}
                  onChange={(e) => setTempKidName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Developmental Age Group</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: '0-12m', label: '0–12 Months', sub: 'Sensory Infant' },
                    { id: '1-3y', label: '1–3 Years', sub: 'Active Toddler' },
                    { id: '4-6y', label: '4–6 Years', sub: 'Preschool & STEM' },
                    { id: '7-10y', label: '7–10 Years', sub: 'Young Explorer' }
                  ].map(stage => (
                    <button
                      type="button"
                      key={stage.id}
                      onClick={() => setTempKidStage(stage.id as any)}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        tempKidStage === stage.id
                          ? 'bg-amber-50 border-amber-600 ring-1 ring-amber-600 font-bold text-stone-900'
                          : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <div className="text-xs">{stage.label}</div>
                      <div className="text-[10px] text-stone-400 font-normal">{stage.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                {kidProfile && (
                  <button
                    type="button"
                    onClick={() => {
                      setKidProfile(null);
                      setShowKidProfileModal(false);
                    }}
                    className="text-stone-500 hover:text-rose-600 text-xs underline"
                  >
                    Clear Child Profile
                  </button>
                )}
                <div className="flex gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={() => setShowKidProfileModal(false)}
                    className="px-3 py-1.5 text-stone-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-900 text-white font-bold rounded-lg"
                  >
                    Save & Personalize Store
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
