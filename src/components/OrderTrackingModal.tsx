import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  CheckCircle2, 
  Package, 
  Truck, 
  Store, 
  Copy, 
  ExternalLink,
  ShieldCheck,
  Calendar,
  Baby
} from 'lucide-react';

export const OrderTrackingModal: React.FC = () => {
  const {
    trackingOrderModal,
    setTrackingOrderModal,
    showToast
  } = useStore();

  if (!trackingOrderModal) return null;

  const order = trackingOrderModal;

  const copyTracking = (code: string) => {
    navigator.clipboard?.writeText(code);
    showToast(`Copied tracking #${code} to clipboard`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-stone-200 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-emerald-900 text-white flex items-center justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-800/80 px-2.5 py-0.5 rounded text-emerald-100">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>Order #{order.orderNumber} Confirmed</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">
              Preparing Shipments Across Workshops
            </h2>
            <p className="text-xs text-emerald-200">
              Receipt sent to {order.customerEmail} • Placed on {order.date}
            </p>
          </div>

          <button
            onClick={() => setTrackingOrderModal(null)}
            className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-800 transition-colors"
            aria-label="Close tracking view"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Child Gift Note Highlight */}
          {order.childName && (
            <div className="flex items-center gap-3 p-3.5 bg-amber-50 rounded-xl border border-amber-200/90 text-xs">
              <Baby className="w-5 h-5 text-amber-700 shrink-0" />
              <div>
                <p className="font-bold text-amber-950">
                  Custom Gift Certificate for {order.childName} ({order.childAge || 'Age 0–10'})
                </p>
                <p className="text-amber-800 mt-0.5">
                  Each maker is tucking a hand-signed provenance card and developmental milestone playguide into their parcel.
                </p>
              </div>
            </div>
          )}

          {/* Fulfillment Tracking Steps for each Vendor */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-2">
              <Package className="w-4 h-4 text-stone-400" />
              Vendor Shipments & Live Dispatch Status
            </h3>

            {order.shipments.map((shipment) => (
              <div 
                key={shipment.trackingNumber}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/80 pb-3">
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-amber-700" />
                    <span className="font-bold text-stone-900 text-sm">{shipment.vendorName}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-500">Tracking:</span>
                    <button
                      onClick={() => copyTracking(shipment.trackingNumber)}
                      className="inline-flex items-center gap-1 font-mono-numbers text-xs font-semibold bg-white border border-stone-300 px-2 py-0.5 rounded text-stone-800 hover:bg-stone-100"
                    >
                      {shipment.trackingNumber}
                      <Copy className="w-3 h-3 text-stone-400" />
                    </button>
                  </div>
                </div>

                {/* Progress bar timeline */}
                <div className="grid grid-cols-4 gap-2 pt-1 text-center">
                  <div className="space-y-1">
                    <div className="h-1.5 rounded-full bg-emerald-600" />
                    <span className="text-[10px] font-semibold text-emerald-800">Order Placed</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1.5 rounded-full bg-emerald-600" />
                    <span className="text-[10px] font-semibold text-emerald-800">Crafting / Inspection</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1.5 rounded-full bg-amber-500" />
                    <span className="text-[10px] font-semibold text-amber-900">Courier Handover</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1.5 rounded-full bg-stone-200" />
                    <span className="text-[10px] text-stone-400">Doorstep Delivery</span>
                  </div>
                </div>

                {/* Itemized contents */}
                <div className="pt-2 text-xs text-stone-600 space-y-1">
                  {shipment.items.map(it => (
                    <div key={it.product.id} className="flex justify-between">
                      <span className="truncate max-w-[280px]">
                        {it.quantity}x {it.product.title}
                      </span>
                      <span className="font-mono-numbers font-medium text-stone-900">
                        ${(it.product.price * it.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Delivery & Payment Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-stone-600">
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
              <span className="font-bold text-stone-800 block mb-1">Destination Address</span>
              <p className="text-stone-600 leading-relaxed">{order.shippingAddress}</p>
              <p className="text-stone-500 mt-1">Recipient: {order.customerName} ({order.customerPhone})</p>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
              <span className="font-bold text-stone-800 block mb-1">Payment Method & Total</span>
              <p className="text-stone-600">Method: {order.paymentMethod}</p>
              <p className="text-stone-900 font-bold text-sm mt-1 font-mono-numbers">
                Paid: ${order.total.toFixed(2)}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-emerald-700 mt-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified Artisan Payout Scheduled</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs">
          <span className="text-stone-500">
            Estimated Delivery: 2–4 business days
          </span>
          <button
            onClick={() => setTrackingOrderModal(null)}
            className="px-4 py-2 bg-stone-900 text-white rounded-lg font-semibold hover:bg-stone-800 transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
