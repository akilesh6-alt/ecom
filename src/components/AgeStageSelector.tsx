import React from 'react';
import { useStore } from '../context/StoreContext';
import { AgeStage } from '../types';
import { Sparkles } from 'lucide-react';

interface StageOption {
  id: AgeStage;
  label: string;
  sub: string;
  icon: string;
  badge: string;
}

const AGE_STAGES: StageOption[] = [
  { id: 'all', label: 'All Ages', sub: 'Every stage 0–10', icon: '🌟', badge: 'All Kids' },
  { id: '0-12m', label: '0–12 Months', sub: 'Sensory & Teething', icon: '🍼', badge: 'Infant' },
  { id: '1-3y', label: '1–3 Years', sub: 'Gross Motor & Stacking', icon: '🧸', badge: 'Toddler' },
  { id: '4-6y', label: '4–6 Years', sub: 'Pre-STEM & Creativity', icon: '🎨', badge: 'Preschool' },
  { id: '7-10y', label: '7–10 Years', sub: 'Robotics & Advanced Play', icon: '🚀', badge: 'Explorer' }
];

export const AgeStageSelector: React.FC = () => {
  const { selectedAgeStage, setSelectedAgeStage } = useStore();

  return (
    <div className="bg-[#FAF9F6] py-8 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Developmental Stage Navigation</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mt-1">
              Select your child's age group
            </h2>
          </div>
          <p className="text-xs text-stone-500 max-w-sm">
            Curated according to motor development, grip calibration, and pediatric safety regulations.
          </p>
        </div>

        {/* Stage Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {AGE_STAGES.map((stage) => {
            const isSelected = selectedAgeStage === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedAgeStage(stage.id)}
                className={`text-left p-3.5 rounded-xl border transition-all relative ${
                  isSelected
                    ? 'bg-amber-50/80 border-amber-600 shadow-xs ring-1 ring-amber-600'
                    : 'bg-white border-stone-200/90 hover:border-stone-300 hover:bg-stone-50/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl" role="img" aria-label={stage.label}>
                    {stage.icon}
                  </span>
                  <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-amber-200/80 text-amber-900' : 'text-stone-400 bg-stone-100'
                  }`}>
                    {stage.badge}
                  </span>
                </div>
                <div className="font-bold text-sm text-stone-900 leading-tight">
                  {stage.label}
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5 truncate">
                  {stage.sub}
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
