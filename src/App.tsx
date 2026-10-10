import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AgeStageSelector } from './components/AgeStageSelector';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { VendorDirectoryModal } from './components/VendorDirectoryModal';
import { VendorDashboard } from './components/VendorDashboard';
import { SafetyStandardModal } from './components/SafetyStandardModal';
import { ProductCompareModal } from './components/ProductCompareModal';
import { GiftFinderQuizModal } from './components/GiftFinderQuizModal';
import { WorkshopInquiryModal } from './components/WorkshopInquiryModal';
import { OrdersView } from './components/OrdersView';
import { Footer } from './components/Footer';
import { CheckCircle2, Layers, X, Eye, ArrowRight } from 'lucide-react';

const RecentlyViewedStrip: React.FC = () => {
  const { recentlyViewedIds, products, setQuickViewProduct, formatPrice } = useStore();

  const viewed = products.filter(p => recentlyViewedIds.includes(p.id)).slice(0, 4);

  if (viewed.length === 0) return null;

  return (
    <section className="bg-white py-10 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-4 h-4 text-stone-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-600">
            Recently Viewed by You
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {viewed.map(item => (
            <div
              key={item.id}
              onClick={() => setQuickViewProduct(item)}
              className="group p-3 rounded-xl border border-stone-200 hover:border-amber-400 bg-stone-50/50 hover:bg-white cursor-pointer transition-all flex items-center gap-3"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-lg object-cover bg-white border border-stone-200 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] text-amber-800 font-semibold block">{item.ageLabel}</span>
                <h4 className="text-xs font-bold text-stone-900 truncate group-hover:text-amber-800 transition-colors">
                  {item.title}
                </h4>
                <span className="text-xs font-mono-numbers font-bold text-stone-700">
                  {formatPrice(item.price)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MainLayout: React.FC = () => {
  const { 
    currentView, 
    toastMessage, 
    compareList, 
    setCompareModalOpen, 
    clearCompare 
  } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl border border-stone-700 flex items-center gap-2.5 animate-bounce-short">
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Product Comparison Dock */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-stone-900 text-white px-4 py-2.5 rounded-full shadow-2xl border border-stone-700 flex items-center gap-3 text-xs animate-slide-up">
          <div className="flex items-center gap-1.5 font-bold">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span className="font-mono-numbers">{compareList.length}</span>
            <span>items to compare</span>
          </div>
          
          <button
            onClick={() => setCompareModalOpen(true)}
            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full transition-colors flex items-center gap-1"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          <button
            onClick={clearCompare}
            className="p-1 text-stone-400 hover:text-white rounded-full hover:bg-stone-800"
            title="Clear compare dock"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Bar with Real-Time Search */}
      <Header />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentView === 'shop' && (
          <>
            <Hero />
            <AgeStageSelector />
            <ProductGrid />
            <RecentlyViewedStrip />
          </>
        )}

        {currentView === 'vendor-portal' && (
          <VendorDashboard />
        )}

        {currentView === 'orders' && (
          <OrdersView />
        )}
      </main>

      {/* Drawers and Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <ProductDetailModal />
      <CheckoutModal />
      <OrderTrackingModal />
      <VendorDirectoryModal />
      <SafetyStandardModal />
      <ProductCompareModal />
      <GiftFinderQuizModal />
      <WorkshopInquiryModal />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
