import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Store, 
  Star, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Layers
} from 'lucide-react';

export const VendorDirectoryModal: React.FC = () => {
  const {
    vendorDirectoryOpen,
    setVendorDirectoryOpen,
    vendors,
    setSelectedVendorId,
    products,
    setCurrentView
  } = useStore();

  if (!vendorDirectoryOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-stone-200 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Independent Maker Collective</span>
            </div>
            <h2 className="text-xl font-bold text-stone-900 mt-0.5">
              Verified Children’s Workshops & Makers
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Every vendor on Sprout & Wonder must undergo material toxicology testing and pediatric safety verification.
            </p>
          </div>

          <button
            onClick={() => setVendorDirectoryOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200 transition-colors"
            aria-label="Close directory"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Directory List */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vendors.map((vendor) => {
              const vendorProducts = products.filter(p => p.vendorId === vendor.id);
              return (
                <div 
                  key={vendor.id}
                  className="p-5 rounded-xl border border-stone-200 hover:border-amber-400/80 bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                          {vendor.specialty}
                        </span>
                        <h3 className="text-base font-bold text-stone-900 mt-0.5">
                          {vendor.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded text-xs font-bold text-amber-900 shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span className="font-mono-numbers">{vendor.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                      {vendor.story}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-stone-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        {vendor.location}
                      </span>
                      <span>·</span>
                      <span className="font-mono-numbers">{vendorProducts.length} items</span>
                      <span>·</span>
                      <span className="font-mono-numbers">{vendor.totalSales}+ sold</span>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {vendor.badges.map((b, i) => (
                        <span 
                          key={i}
                          className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100"
                        >
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setSelectedVendorId(vendor.id);
                        setVendorDirectoryOpen(false);
                        const el = document.getElementById('catalog-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Explore {vendor.name}'s Workshop</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Join as Vendor Banner */}
          <div className="mt-4 p-5 rounded-xl bg-amber-50/80 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-stone-900">Are you a children's maker or artisan?</h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Apply to sell in our 0–10 verified marketplace. Zero listing fees, automated splits, and instant parent reach.
              </p>
            </div>
            <button
              onClick={() => {
                setVendorDirectoryOpen(false);
                setCurrentView('vendor-portal');
              }}
              className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-bold transition-colors whitespace-nowrap self-start sm:self-auto shadow-xs"
            >
              Open Vendor Portal
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
