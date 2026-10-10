import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, ShieldCheck, Sparkles, HeartHandshake, Baby } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setSelectedAgeStage, setVendorDirectoryOpen } = useStore();

  return (
    <section className="relative overflow-hidden bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-900 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Multi-Vendor Collective Dedicated Exclusively to Kids 0–10</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-[1.15]" style={{ textWrap: 'balance' }}>
              Gentle essentials and tactile play, handcrafted for the first ten years.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
              Connect directly with verified independent makers of beechwood Montessori toys, GOTS organic apparel, and screen-free STEM discoveries. Every workshop rigorously tested for infant and child safety.
            </p>

            {/* Quick Age Stage Launchers */}
            <div className="pt-2 flex flex-wrap gap-2 sm:gap-3">
              <button 
                onClick={() => {
                  setSelectedAgeStage('0-12m');
                  const el = document.getElementById('catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3.5 py-2 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-md transition-colors"
              >
                0–12m Infant
              </button>
              <button 
                onClick={() => {
                  setSelectedAgeStage('1-3y');
                  const el = document.getElementById('catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3.5 py-2 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-md transition-colors"
              >
                1–3y Toddler
              </button>
              <button 
                onClick={() => {
                  setSelectedAgeStage('4-6y');
                  const el = document.getElementById('catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3.5 py-2 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-md transition-colors"
              >
                4–6y Preschool
              </button>
              <button 
                onClick={() => {
                  setSelectedAgeStage('7-10y');
                  const el = document.getElementById('catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3.5 py-2 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-md transition-colors"
              >
                7–10y Explorer
              </button>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#catalog-section"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-lg shadow-xs transition-colors"
              >
                Shop Full Catalog
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setVendorDirectoryOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-stone-700 bg-white border border-stone-300 hover:bg-stone-50 rounded-lg transition-colors"
              >
                Meet 5 Verified Makers
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200/90 shadow-md aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 bg-stone-100">
              <img 
                src="/src/assets/images/hero_kids_wonderland_1791611873157.jpg" 
                alt="Children Montessori playroom and handcrafted boutique store"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent flex items-end p-5">
                <div className="text-white space-y-0.5">
                  <p className="text-xs uppercase tracking-wider text-amber-200 font-semibold">Boutique Spotlight</p>
                  <p className="text-sm font-bold">Little Oak Montessori & Cloudlet Organics</p>
                  <p className="text-xs text-stone-200">Sustainably crafted in small artisan batches</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column Trust Strip */}
        <div className="mt-12 pt-8 border-t border-stone-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-stone-700">
          <div className="flex items-start gap-3">
            <Baby className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Age-Calibrated 0–10</h2>
              <p className="text-xs text-stone-500 mt-0.5">Milestone matched by early childhood educators.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Zero Harmful Chemicals</h2>
              <p className="text-xs text-stone-500 mt-0.5">Tested for BPA, lead, phthalates, and food-safe oils.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <HeartHandshake className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Direct Maker Shipments</h2>
              <p className="text-xs text-stone-500 mt-0.5">Transparent provenance with vendor split tracking.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xs font-bold text-stone-900 uppercase tracking-wider">100-Day Play Guarantee</h2>
              <p className="text-xs text-stone-500 mt-0.5">Hassle-free exchange policy across all store partners.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
