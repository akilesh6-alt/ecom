import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Heart, Store } from 'lucide-react';

export const Footer: React.FC = () => {
  const { 
    setSelectedAgeStage, 
    setVendorDirectoryOpen, 
    setSafetyModalOpen,
    setCurrentView,
    resetFilters
  } = useStore();

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-stone-800">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <span className="text-xl font-bold tracking-tight text-white">
              Sprout <span className="text-amber-400">&</span> Wonder
            </span>
            <p className="text-stone-400 leading-relaxed max-w-sm text-xs">
              A curated multi-vendor marketplace dedicated exclusively to children aged 0 through 10. Connecting parents with verified, safety-tested independent toy artisans and organic textile makers.
            </p>
            <div className="flex items-center gap-2 text-stone-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Certified compliance with ASTM F963 & EN71 European toy safety standards.</span>
            </div>
          </div>

          {/* Age Stages */}
          <div className="md:col-span-2 space-y-3">
            <span className="font-bold text-white uppercase tracking-wider text-[11px] block">
              Age Calibration
            </span>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => {
                    setCurrentView('shop');
                    setSelectedAgeStage('0-12m');
                    window.scrollTo({ top: 480, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  0–12m Infant
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setCurrentView('shop');
                    setSelectedAgeStage('1-3y');
                    window.scrollTo({ top: 480, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  1–3y Toddler
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setCurrentView('shop');
                    setSelectedAgeStage('4-6y');
                    window.scrollTo({ top: 480, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  4–6y Preschool
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setCurrentView('shop');
                    setSelectedAgeStage('7-10y');
                    window.scrollTo({ top: 480, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  7–10y Explorer
                </button>
              </li>
            </ul>
          </div>

          {/* Collective Makers */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-bold text-white uppercase tracking-wider text-[11px] block">
              Marketplace Collective
            </span>
            <ul className="space-y-2 text-stone-400">
              <li>Little Oak Montessori (Portland, OR)</li>
              <li>Cloudlet Organics (Copenhagen, DK)</li>
              <li>WonderLab STEM & Robotics (Austin, TX)</li>
              <li>Moonbeam Sleep & Tales (Bristol, UK)</li>
              <li>SunSprout Active Kids (Boulder, CO)</li>
            </ul>
          </div>

          {/* Maker Actions */}
          <div className="md:col-span-2 space-y-3">
            <span className="font-bold text-white uppercase tracking-wider text-[11px] block">
              Vendor Partners
            </span>
            <div className="space-y-2">
              <button
                onClick={() => setVendorDirectoryOpen(true)}
                className="block hover:text-white transition-colors"
              >
                Meet All Makers
              </button>
              <button
                onClick={() => setSafetyModalOpen(true)}
                className="block hover:text-white transition-colors"
              >
                Safety & Audit Pledge
              </button>
              <button
                onClick={() => setCurrentView('vendor-portal')}
                className="inline-block mt-1 px-3 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-lg hover:bg-amber-500/30 transition-colors font-semibold"
              >
                Vendor Hub Portal
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} Sprout & Wonder Marketplace Inc. Designed for early childhood development.
          </div>
          <div className="flex items-center gap-4">
            <span>Direct Maker Shipments</span>
            <span>·</span>
            <span>Organic Materials Guarantee</span>
            <span>·</span>
            <span>Zero Plastic Packing Peanuts</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
