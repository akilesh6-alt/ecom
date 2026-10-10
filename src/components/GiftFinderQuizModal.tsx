import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Sparkles, Compass, CheckCircle2, ArrowRight, ShoppingBag, RotateCcw } from 'lucide-react';
import { AgeStage } from '../types';

export const GiftFinderQuizModal: React.FC = () => {
  const {
    giftQuizOpen,
    setGiftQuizOpen,
    products,
    addToCart,
    setQuickViewProduct,
    formatPrice
  } = useStore();

  const [step, setStep] = useState(1);
  const [selectedAge, setSelectedAge] = useState<AgeStage>('1-3y');
  const [selectedInterest, setSelectedInterest] = useState<string>('Sensory & Motor');
  const [selectedBudget, setSelectedBudget] = useState<'any' | 'under40' | 'under70'>('any');

  if (!giftQuizOpen) return null;

  // Filter recommendations based on quiz answers
  const recommendations = products.filter(p => {
    // Age match
    if (p.ageStage !== selectedAge) return false;
    
    // Budget match
    if (selectedBudget === 'under40' && p.price > 40) return false;
    if (selectedBudget === 'under70' && p.price > 70) return false;

    return true;
  }).slice(0, 3);

  const resetQuiz = () => {
    setStep(1);
    setSelectedAge('1-3y');
    setSelectedInterest('Sensory & Motor');
    setSelectedBudget('any');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-amber-900 text-white flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold bg-amber-800 px-2 py-0.5 rounded text-amber-200">
              <Compass className="w-3.5 h-3.5 text-amber-300" />
              <span>Interactive Child Milestone Gift Finder</span>
            </div>
            <h2 className="text-xl font-bold mt-1">
              Find the Perfect Toy in 3 Quick Questions
            </h2>
          </div>

          <button
            onClick={() => setGiftQuizOpen(false)}
            className="p-1.5 text-amber-200 hover:text-white rounded-lg hover:bg-amber-800 transition-colors"
            aria-label="Close quiz"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quiz Steps */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Question 1 of 3</span>
                <span className="text-xs text-stone-400">Step 1/3</span>
              </div>
              <h3 className="text-base font-bold text-stone-900">How old is the lucky child?</h3>
              
              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { id: '0-12m', label: '0–12 Months', sub: 'Sensory teething, high contrast, gentle rattles', icon: '🍼' },
                  { id: '1-3y', label: '1–3 Years', sub: 'Montessori stackers, balance boards, prep tools', icon: '🧸' },
                  { id: '4-6y', label: '4–6 Years', sub: 'Magnetic architectural blocks, bedtime stories', icon: '🎨' },
                  { id: '7-10y', label: '7–10 Years', sub: 'Solar robotics, botany labs, advanced STEM', icon: '🚀' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSelectedAge(opt.id as any);
                      setStep(2);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedAge === opt.id
                        ? 'border-amber-600 bg-amber-50 ring-1 ring-amber-600'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <span className="text-2xl block mb-1">{opt.icon}</span>
                    <div className="font-bold text-xs text-stone-900">{opt.label}</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">{opt.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Question 2 of 3</span>
                <span className="text-xs text-stone-400">Step 2/3</span>
              </div>
              <h3 className="text-base font-bold text-stone-900">What developmental area do you want to nurture?</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { label: 'Tactile Sensory & Fine Motor', desc: 'Handcrafted smooth wood, stacking, counting' },
                  { label: 'STEM & Spatial Engineering', desc: 'Magnetic geometry, gears, fluid mechanics' },
                  { label: 'Restful Sleep & Calm Stories', desc: 'Low blue light, bedtime poems, plush companions' },
                  { label: 'Active Balance & Movement', desc: 'Gross-motor coordination, indoor balance bridges' }
                ].map(area => (
                  <button
                    key={area.label}
                    onClick={() => {
                      setSelectedInterest(area.label);
                      setStep(3);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      selectedInterest === area.label
                        ? 'border-amber-600 bg-amber-50 ring-1 ring-amber-600'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="font-bold text-xs text-stone-900">{area.label}</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">{area.desc}</div>
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setStep(1)}
                className="text-xs text-stone-500 hover:text-stone-800 underline mt-2"
              >
                ← Back to Age
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Question 3 of 3</span>
                <span className="text-xs text-stone-400">Step 3/3</span>
              </div>
              <h3 className="text-base font-bold text-stone-900">What is your ideal gift budget?</h3>
              
              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                  { id: 'under40', label: 'Under $40', sub: 'Thoughtful token' },
                  { id: 'under70', label: 'Under $70', sub: 'Standard gift set' },
                  { id: 'any', label: 'Any Budget', sub: 'Show best picks' }
                ].map(b => (
                  <button
                    key={b.id}
                    onClick={() => {
                      setSelectedBudget(b.id as any);
                      setStep(4);
                    }}
                    className={`p-4 rounded-xl border text-center transition-all ${
                      selectedBudget === b.id
                        ? 'border-amber-600 bg-amber-50 ring-1 ring-amber-600'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="font-bold text-xs text-stone-900">{b.label}</div>
                    <div className="text-[10px] text-stone-400 mt-0.5">{b.sub}</div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                className="text-xs text-stone-500 hover:text-stone-800 underline mt-2"
              >
                ← Back to Interest
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-bold text-stone-900">
                    Curated Results for Stage ({selectedAge.toUpperCase()})
                  </span>
                </div>
                <button
                  onClick={resetQuiz}
                  className="text-xs text-amber-700 hover:text-amber-900 font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Start Over
                </button>
              </div>

              <div className="space-y-3">
                {recommendations.map(p => (
                  <div 
                    key={p.id}
                    className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between gap-3"
                  >
                    <img 
                      src={p.image} 
                      alt={p.title} 
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-lg object-cover bg-white border border-stone-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-amber-800 font-bold uppercase">{p.category}</div>
                      <h4 className="text-xs font-bold text-stone-900 truncate">{p.title}</h4>
                      <p className="text-[11px] text-stone-500 truncate">{p.features[0]}</p>
                    </div>
                    <div className="text-right shrink-0 space-y-1">
                      <span className="text-xs font-bold font-mono-numbers block text-stone-900">
                        {formatPrice(p.price)}
                      </span>
                      <button
                        onClick={() => {
                          addToCart(p, 1);
                          setGiftQuizOpen(false);
                        }}
                        className="px-2.5 py-1 bg-stone-900 text-white rounded text-[11px] font-bold hover:bg-stone-800 flex items-center gap-1"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={() => setGiftQuizOpen(false)}
                  className="text-xs text-stone-500 hover:text-stone-800 underline"
                >
                  Browse all catalog items
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
