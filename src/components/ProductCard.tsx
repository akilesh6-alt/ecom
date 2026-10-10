import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, Star, ShoppingBag, Eye, Store, Layers, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isWishlisted, 
    setQuickViewProduct,
    setSelectedVendorId,
    vendors,
    compareList,
    toggleCompare,
    kidProfile,
    formatPrice
  } = useStore();

  const [imageError, setImageError] = useState(false);
  const wishlisted = isWishlisted(product.id);
  const isCompared = compareList.includes(product.id);
  const vendor = vendors.find(v => v.id === product.vendorId);
  const matchesKid = kidProfile && kidProfile.ageStage === product.ageStage;

  return (
    <div className={`group flex flex-col bg-white border rounded-xl overflow-hidden hover:shadow-md transition-all duration-200 ${
      matchesKid ? 'ring-1 ring-amber-400/80 border-amber-300' : 'border-stone-200/90'
    }`}>
      
      {/* Visual Slot (65%-75% of card visual balance) */}
      <div className="relative aspect-4/3 bg-stone-100 overflow-hidden cursor-pointer" onClick={() => setQuickViewProduct(product)}>
        {!imageError ? (
          <img
            src={product.image}
            alt={product.title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-amber-50 to-stone-100 text-stone-500">
            <span className="text-3xl mb-2">🧸</span>
            <span className="text-xs font-semibold text-center text-stone-600 line-clamp-1">{product.title}</span>
          </div>
        )}

        {/* Wishlist Heart Affordance */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all ${
            wishlisted
              ? 'bg-rose-50 text-rose-600 shadow-xs'
              : 'bg-white/90 text-stone-500 hover:text-stone-900 shadow-xs hover:bg-white'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Tags Container */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          {product.isFeatured && (
            <div className="bg-stone-900/90 text-white text-[11px] font-semibold px-2 py-0.5 rounded shadow-xs">
              Curator Pick
            </div>
          )}
          {matchesKid && (
            <div className="bg-amber-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
              Fit for {kidProfile.name}
            </div>
          )}
        </div>

        {/* Quick View Hover Strip */}
        <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-stone-900/70 via-stone-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between text-white text-xs">
          <span className="flex items-center gap-1 font-medium pl-1">
            <Eye className="w-3.5 h-3.5" />
            Quick Details
          </span>
          <span className="text-[11px] font-mono-numbers opacity-90">
            {product.stockCount > 0 ? `${product.stockCount} in stock` : 'Made to order'}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        
        {/* Clean Unboxed Metadata with Typographic Separator */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedVendorId(product.vendorId);
              }}
              className="hover:text-amber-800 font-semibold truncate max-w-[130px] flex items-center gap-1"
            >
              <Store className="w-3 h-3 text-stone-400 shrink-0" />
              {product.vendorName}
            </button>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="font-medium text-amber-700 shrink-0">{product.ageLabel}</span>
          </div>

          <h3 
            onClick={() => setQuickViewProduct(product)}
            className="text-sm font-semibold text-stone-900 hover:text-amber-800 transition-colors line-clamp-2 leading-snug cursor-pointer"
          >
            {product.title}
          </h3>
        </div>

        {/* Rating and Certified Tag */}
        <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span className="font-semibold text-stone-800 font-mono-numbers">{product.rating.toFixed(1)}</span>
            <span className="text-stone-400 text-[11px] font-mono-numbers">({product.reviewCount})</span>
          </div>
          
          {/* Quick Compare Check */}
          <button
            onClick={() => toggleCompare(product.id)}
            className={`text-[11px] flex items-center gap-1 px-1.5 py-0.5 rounded transition-colors ${
              isCompared
                ? 'bg-indigo-100 text-indigo-900 font-bold'
                : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
            }`}
            title="Compare side-by-side"
          >
            <Layers className="w-3 h-3" />
            <span>{isCompared ? 'Compared' : 'Compare'}</span>
          </button>
        </div>

        {/* Price & Add to Cart Button */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-stone-900 font-mono-numbers">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through font-mono-numbers">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-800 rounded-lg text-xs font-semibold transition-colors duration-150"
            aria-label={`Add ${product.title} to bag`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>

      </div>

    </div>
  );
};
