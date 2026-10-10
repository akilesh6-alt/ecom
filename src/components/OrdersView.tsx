import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Package, 
  ArrowLeft, 
  CheckCircle2, 
  Truck, 
  Store, 
  ExternalLink,
  Baby
} from 'lucide-react';

export const OrdersView: React.FC = () => {
  const {
    orders,
    setCurrentView,
    setTrackingOrderModal
  } = useStore();

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentView('shop')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-white border border-stone-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Storefront</span>
          </button>
          <span className="text-xs text-stone-500 font-mono-numbers">
            {orders.length} orders recorded
          </span>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-stone-900">Your Child Milestone Orders</h1>
          <p className="text-xs text-stone-500 mt-1">
            Real-time fulfillment tracking directly from our verified workshop partners.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-stone-200 space-y-3">
            <Package className="w-10 h-10 mx-auto text-stone-300" />
            <h3 className="font-bold text-stone-900 text-sm">No orders placed yet</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Once you checkout with curated toys or baby clothes, your direct maker split parcels and tracking links will appear here.
            </p>
            <button
              onClick={() => setCurrentView('shop')}
              className="mt-2 px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div 
                key={order.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4 hover:border-stone-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 text-base">
                        Order #{order.orderNumber}
                      </span>
                      <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                        {order.status}
                      </span>
                    </div>
                    <div className="text-xs text-stone-400 mt-0.5">
                      Placed on {order.date} • {order.customerName}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold font-mono-numbers text-stone-900">
                      ${order.total.toFixed(2)}
                    </span>
                    <button
                      onClick={() => setTrackingOrderModal(order)}
                      className="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      Track Packages ({order.shipments.length})
                    </button>
                  </div>
                </div>

                {order.childName && (
                  <div className="flex items-center gap-2 text-xs text-amber-900 bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/60">
                    <Baby className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>
                      Complimentary gift certificate prepared for: <strong>{order.childName}</strong> ({order.childAge})
                    </span>
                  </div>
                )}

                {/* Split Parcels */}
                <div className="space-y-2 text-xs">
                  <span className="font-bold text-stone-500 uppercase text-[10px] tracking-wider block">
                    Workshop Dispatches:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {order.shipments.map((s) => (
                      <div key={s.trackingNumber} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-700">
                        <div className="flex items-center justify-between font-semibold">
                          <span className="flex items-center gap-1 text-amber-800">
                            <Store className="w-3 h-3 text-amber-700" />
                            {s.vendorName}
                          </span>
                          <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-stone-200 font-mono-numbers">
                            {s.trackingNumber}
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-500 mt-1">
                          {s.items.map(it => `${it.quantity}x ${it.product.title}`).join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
