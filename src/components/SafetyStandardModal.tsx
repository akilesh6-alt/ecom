import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  ShieldCheck, 
  Baby, 
  CheckCircle2, 
  Leaf, 
  Lock, 
  Sparkles 
} from 'lucide-react';

export const SafetyStandardModal: React.FC = () => {
  const { safetyModalOpen, setSafetyModalOpen } = useStore();

  if (!safetyModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-emerald-900 text-white flex items-center justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-800/80 px-2.5 py-0.5 rounded text-emerald-100">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Pediatric Safety Standard (0–10 Years)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">
              The Sprout & Wonder Safety Pledge
            </h2>
          </div>

          <button
            onClick={() => setSafetyModalOpen(false)}
            className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-800 transition-colors"
            aria-label="Close safety modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto text-xs text-stone-600 leading-relaxed">
          <p className="text-stone-800 font-medium">
            Because our catalog is designed exclusively for young hands, mouth testing, and boundless play from birth to age 10, every seller must meet 5 mandatory safety invariants before a single listing is approved:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/50 space-y-2">
              <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>Zero Toxic Residues</span>
              </div>
              <p>
                Finishes must be purely organic food-grade beeswax, flaxseed oil, or water-borne botanical pigments. Zero phthalates, formaldehyde, or heavy-metal pigments.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/50 space-y-2">
              <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
                <Baby className="w-4 h-4 text-emerald-600" />
                <span>Choke-Hazard Sizing</span>
              </div>
              <p>
                All toys designated for 0–36 months are calibrated with the 1.25-inch choke cylinder test. Loose small parts are strictly barred for infants and toddlers.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/50 space-y-2">
              <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span>Encapsulated Magnets</span>
              </div>
              <p>
                STEM magnetic tiles and engineering kits must feature ultrasonic welded seams and stainless rivets to prevent rare-earth magnet detachment.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/50 space-y-2">
              <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>GOTS & OEKO-TEX Apparel</span>
              </div>
              <p>
                Baby onesies, rompers, and knitwear are certified 100% organic cotton or merino wool with nickel-free snaps to protect sensitive or eczema-prone infant skin.
              </p>
            </div>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <span className="font-bold text-stone-900 text-xs block">Independent Workshop Audits</span>
            <p className="text-stone-500 text-[11px]">
              Vendors provide certified testing lab results (ASTM F963 in the United States and EN71 in the European Union). Any customer reporting a material inconsistency receives an immediate refund and triggers a comprehensive batch review.
            </p>
          </div>
        </div>

        <div className="p-4 border-t border-stone-200 bg-stone-50 flex justify-end">
          <button
            onClick={() => setSafetyModalOpen(false)}
            className="px-5 py-2 bg-stone-900 text-white rounded-lg font-semibold hover:bg-stone-800 transition-colors text-xs"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
};
