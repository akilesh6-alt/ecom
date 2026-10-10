import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  Truck, 
  Store, 
  CheckCircle2, 
  Plus, 
  Minus,
  Sparkles,
  MessageSquare,
  Layers,
  Send,
  PenLine
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    toggleWishlist, 
    isWishlisted,
    setCheckoutOpen,
    setSelectedVendorId,
    vendors,
    formatPrice,
    compareList,
    toggleCompare,
    setInquireVendor,
    addProductReview,
    addRecentlyViewed
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');

  // Review Form State
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewChildAge, setReviewChildAge] = useState('2 Years');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  useEffect(() => {
    if (quickViewProduct) {
      addRecentlyViewed(quickViewProduct.id);
      setQuantity(1);
      setShowReviewForm(false);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const wishlisted = isWishlisted(product.id);
  const isCompared = compareList.includes(product.id);
  const vendor = vendors.find(v => v.id === product.vendorId);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setQuickViewProduct(null);
    setCheckoutOpen(true);
  };

  const handleOpenInquiry = () => {
    if (vendor) {
      setInquireVendor({ vendor, product });
      setQuickViewProduct(null);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    addProductReview(product.id, {
      author: reviewAuthor.trim() || 'Caring Parent',
      childAge: reviewChildAge.trim(),
      rating: reviewRating,
      comment: reviewComment.trim()
    });

    setReviewComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-stone-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 text-stone-400 hover:text-stone-700 bg-white/80 hover:bg-white rounded-full transition-colors shadow-xs"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          
          {/* Left Column: Image Showcase */}
          <div className="md:col-span-6 bg-stone-100 flex flex-col justify-between p-6 sm:p-8 border-b md:border-b-0 md:border-r border-stone-200">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-white shadow-xs">
              <img
                src={product.image}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-stone-900 text-xs font-semibold px-2.5 py-1 rounded shadow-xs">
                {product.ageLabel}
              </div>
            </div>

            {/* Safety & Maker Strip */}
            <div className="mt-6 pt-5 border-t border-stone-200/80 space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-600">
                <button
                  onClick={() => {
                    setSelectedVendorId(product.vendorId);
                    setQuickViewProduct(null);
                  }}
                  className="flex items-center gap-1.5 font-semibold text-stone-900 hover:text-amber-800 transition-colors"
                >
                  <Store className="w-4 h-4 text-amber-700" />
                  <span>Workshop: {product.vendorName}</span>
                </button>
                <span className="text-stone-400">·</span>
                <span>{vendor?.location || 'Verified Workshop'}</span>
              </div>

              {/* Verified Child Safety Badges */}
              <div className="flex flex-wrap gap-1.5">
                {product.safetyBadges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded"
                  >
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    {badge}
                  </span>
                ))}
              </div>

              {/* Ask Maker Button */}
              <div className="pt-1 flex items-center justify-between">
                <button
                  onClick={handleOpenInquiry}
                  className="text-xs text-amber-900 font-semibold hover:text-amber-950 flex items-center gap-1.5 underline"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Ask {product.vendorName} a Question</span>
                </button>

                <button
                  onClick={() => toggleCompare(product.id)}
                  className={`text-xs flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                    isCompared
                      ? 'bg-indigo-100 text-indigo-900 font-bold'
                      : 'text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{isCompared ? 'In Compare List' : 'Compare Product'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="font-semibold uppercase tracking-wider text-amber-800">
                  {product.category}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span className="font-bold text-stone-900 font-mono-numbers">{product.rating.toFixed(2)}</span>
                  <span className="font-mono-numbers">({product.reviewCount} parent reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
                {product.title}
              </h2>

              {/* Price & Stock */}
              <div className="flex items-baseline gap-3 pb-2 border-b border-stone-100">
                <span className="text-2xl font-bold text-stone-900 font-mono-numbers">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through font-mono-numbers">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {product.stockCount > 0 ? `In Stock (${product.stockCount} available)` : 'In Stock'}
                </span>
              </div>

              {/* Tabs: Details vs Reviews */}
              <div className="flex items-center justify-between border-b border-stone-200">
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-2.5 transition-colors border-b-2 ${
                      activeTab === 'details'
                        ? 'border-amber-700 text-stone-900'
                        : 'border-transparent text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    Features & Safe Materials
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-2.5 transition-colors border-b-2 ${
                      activeTab === 'reviews'
                        ? 'border-amber-700 text-stone-900'
                        : 'border-transparent text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    Parent Reviews ({product.reviews.length})
                  </button>
                </div>

                {activeTab === 'reviews' && (
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="text-[11px] font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 pb-2"
                  >
                    <PenLine className="w-3 h-3" />
                    <span>{showReviewForm ? 'Cancel' : 'Write Review'}</span>
                  </button>
                )}
              </div>

              {/* Tab Content */}
              {activeTab === 'details' ? (
                <div className="space-y-3 text-xs text-stone-600 max-h-48 overflow-y-auto pr-2">
                  <p className="leading-relaxed text-stone-700">
                    {product.description}
                  </p>
                  
                  <div className="space-y-1.5 pt-1">
                    <p className="font-semibold text-stone-900">Key Developmental Highlights:</p>
                    {product.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 text-[11px] text-stone-500 bg-stone-50 p-2.5 rounded-lg border border-stone-200/80">
                    <span className="font-semibold text-stone-800">Materials: </span>
                    {product.materials}
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-xs max-h-48 overflow-y-auto pr-2">
                  {/* Write Review Form */}
                  {showReviewForm && (
                    <form onSubmit={handleReviewSubmit} className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-2 mb-3">
                      <div className="font-bold text-amber-950 text-xs">Share Your Child's Experience</div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <input
                            type="text"
                            required
                            placeholder="Your Name (e.g. Jessica M.)"
                            value={reviewAuthor}
                            onChange={(e) => setReviewAuthor(e.target.value)}
                            className="w-full text-xs bg-white border border-stone-300 rounded p-1.5"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            required
                            placeholder="Child's Age (e.g. 18 Months)"
                            value={reviewChildAge}
                            onChange={(e) => setReviewChildAge(e.target.value)}
                            className="w-full text-xs bg-white border border-stone-300 rounded p-1.5"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-stone-600 font-medium">Rating:</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setReviewRating(star)}
                              className="text-amber-500"
                            >
                              <Star className={`w-4 h-4 ${star <= reviewRating ? 'fill-amber-400' : 'text-stone-300'}`} />
                            </button>
                          ))}
                        </div>
                      </div>

                      <textarea
                        rows={2}
                        required
                        placeholder="How did your child interact with the toy? Quality, texture, safe edges?"
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        className="w-full text-xs bg-white border border-stone-300 rounded p-1.5"
                      />

                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setShowReviewForm(false)}
                          className="px-2.5 py-1 text-[11px] text-stone-600"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-3 py-1 bg-amber-800 text-white font-bold rounded text-[11px]"
                        >
                          Submit Review
                        </button>
                      </div>
                    </form>
                  )}

                  {product.reviews.map((rev) => (
                    <div key={rev.id} className="p-3 bg-stone-50 rounded-lg border border-stone-200/70 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-stone-900">{rev.author}</span>
                          <span className="text-[10px] text-stone-400">·</span>
                          <span className="text-[10px] text-amber-800 font-medium">{rev.childAge}</span>
                        </div>
                        <div className="flex items-center text-amber-500">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-stone-600 leading-normal">{rev.comment}</p>
                      <div className="text-[10px] text-stone-400 flex items-center justify-between pt-1">
                        <span>{rev.date}</span>
                        {rev.verifiedPurchase && (
                          <span className="text-emerald-700 font-medium">Verified Purchaser</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* Contiguous Purchase Action Block */}
            <div className="mt-6 pt-5 border-t border-stone-200 space-y-3">
              
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50 px-2 py-1">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-1 text-stone-500 hover:text-stone-900 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold font-mono-numbers text-stone-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-1 text-stone-500 hover:text-stone-900 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add {quantity} to Bag • {formatPrice(product.price * quantity)}
                </button>

                {/* Wishlist Heart */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2.5 border rounded-lg transition-colors ${
                    wishlisted
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'border-stone-300 text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                  aria-label="Save to wishlist"
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              {/* Direct Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-2.5 text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-xs"
              >
                Instant Checkout with Maker Split
              </button>

              {/* Maker Shipping Guarantee */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 pt-1">
                <Truck className="w-3.5 h-3.5 text-stone-400" />
                <span>Packed directly by {product.vendorName} • Free returns within 30 days</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
