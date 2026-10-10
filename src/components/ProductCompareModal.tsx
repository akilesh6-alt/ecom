import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Layers, 
  Trash2, 
  ShoppingBag, 
  ShieldCheck, 
  Star, 
  Store, 
  Baby, 
  Check 
} from 'lucide-react';

export const ProductCompareModal: React.FC = () => {
  const {
    compareModalOpen,
    setCompareModalOpen,
    compareList,
    toggleCompare,
    clearCompare,
    products,
    addToCart,
    formatPrice
  } = useStore();

  if (!compareModalOpen) return null;

  const comparedProducts = products.filter(p => compareList.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-stone-200 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-700" />
            <div>
              <h2 className="text-lg font-bold text-stone-900">Side-by-Side Product Comparison</h2>
              <p className="text-xs text-stone-500">
                Compare developmental suitability, non-toxic materials, and maker certifications.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {comparedProducts.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs text-stone-500 hover:text-rose-600 underline"
              >
                Clear all
              </button>
            )}
            <button
              onClick={() => setCompareModalOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200 transition-colors"
              aria-label="Close comparison"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Content */}
        <div className="p-6 overflow-x-auto max-h-[75vh]">
          {comparedProducts.length === 0 ? (
            <div className="text-center py-12 text-stone-500 space-y-2">
              <Layers className="w-8 h-8 mx-auto text-stone-300" />
              <p className="font-bold text-stone-800 text-sm">No items in your comparison list</p>
              <p className="text-xs">Click "Compare" on any 2 or 3 items to evaluate them side by side.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {comparedProducts.map((p) => (
                <div 
                  key={p.id}
                  className="bg-stone-50/60 rounded-xl p-4 border border-stone-200 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-white border border-stone-200">
                      <img 
                        src={p.image} 
                        alt={p.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => toggleCompare(p.id)}
                        className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white text-stone-500 hover:text-rose-600 rounded-full shadow-xs"
                        title="Remove from comparison"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                        {p.category}
                      </span>
                      <h4 className="text-xs font-bold text-stone-900 line-clamp-2 mt-0.5">
                        {p.title}
                      </h4>
                    </div>

                    <div className="text-base font-bold font-mono-numbers text-stone-900">
                      {formatPrice(p.price)}
                    </div>

                    {/* Specifications List */}
                    <div className="space-y-2 text-xs pt-2 border-t border-stone-200/80">
                      <div>
                        <span className="text-[10px] font-bold text-stone-400 block uppercase">Age Suitability</span>
                        <span className="font-semibold text-amber-900 bg-amber-100/60 px-1.5 py-0.5 rounded text-[11px]">
                          {p.ageLabel}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-stone-400 block uppercase">Maker & Location</span>
                        <span className="text-stone-800 font-medium">{p.vendorName}</span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-stone-400 block uppercase">Rating</span>
                        <div className="flex items-center gap-1 text-stone-800 font-semibold font-mono-numbers">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                          <span>{p.rating.toFixed(1)} ({p.reviewCount} reviews)</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-stone-400 block uppercase">Child Safety Badges</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {p.safetyBadges.map((badge, idx) => (
                            <span 
                              key={idx}
                              className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.2 rounded"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-stone-400 block uppercase">Tested Materials</span>
                        <p className="text-[11px] text-stone-600 line-clamp-2">{p.materials}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(p, 1);
                      setCompareModalOpen(false);
                    }}
                    className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
