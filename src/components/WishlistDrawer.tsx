import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlistOpen,
    setWishlistOpen,
    wishlist,
    products,
    toggleWishlist,
    addToCart,
    setCartOpen
  } = useStore();

  if (!wishlistOpen) return null;

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-stone-200 animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h2 className="text-base font-bold text-stone-900">Saved Wishlist</h2>
            <span className="text-xs font-semibold bg-stone-100 text-stone-700 px-2 py-0.5 rounded-full font-mono-numbers">
              {wishlistedProducts.length}
            </span>
          </div>

          <button
            onClick={() => setWishlistOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistedProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500 space-y-3">
              <span className="text-4xl">❤️</span>
              <p className="font-semibold text-stone-800 text-sm">No items saved yet</p>
              <p className="text-xs max-w-xs text-stone-500">
                Click the heart on any toy or clothing set to bookmark items for your child's milestones or gift lists.
              </p>
              <button
                onClick={() => setWishlistOpen(false)}
                className="mt-3 px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors"
              >
                Browse Marketplace
              </button>
            </div>
          ) : (
            wishlistedProducts.map(product => (
              <div 
                key={product.id}
                className="flex gap-3 p-3 rounded-xl border border-stone-200/90 hover:border-stone-300 bg-stone-50/50 transition-all"
              >
                <div className="w-20 h-20 rounded-lg bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">
                        {product.title}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="text-stone-400 hover:text-rose-600 p-0.5"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-[11px] text-amber-800 font-medium">{product.ageLabel}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-bold font-mono-numbers text-stone-900">
                      ${product.price.toFixed(2)}
                    </span>

                    <button
                      onClick={() => {
                        addToCart(product, 1);
                        setWishlistOpen(false);
                        setCartOpen(true);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1 bg-stone-900 hover:bg-stone-800 text-white rounded-md text-xs font-semibold transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      Move to Bag
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {wishlistedProducts.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-stone-50">
            <button
              onClick={() => {
                wishlistedProducts.forEach(p => addToCart(p, 1));
                setWishlistOpen(false);
                setCartOpen(true);
              }}
              className="w-full py-2.5 bg-stone-900 text-white rounded-lg text-xs font-bold hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
            >
              Move All to Bag
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
