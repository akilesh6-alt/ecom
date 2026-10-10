import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Banknote, 
  CheckCircle2, 
  Store, 
  Baby, 
  Truck,
  Sparkles
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    checkoutOpen,
    setCheckoutOpen,
    cart,
    cartTotal,
    createOrder
  } = useStore();

  const [customerName, setCustomerName] = useState('Sarah Jenkins');
  const [customerEmail, setCustomerEmail] = useState('sarah.jenkins@example.com');
  const [customerPhone, setCustomerPhone] = useState('+1 (555) 234-8901');
  const [childName, setChildName] = useState('Maya');
  const [childAge, setChildAge] = useState('2 Years');
  const [shippingAddress, setShippingAddress] = useState('742 Evergreen Terrace, Springfield, OR 97477');
  const [paymentMethod, setPaymentMethod] = useState<'Credit Card' | 'Apple Pay' | 'Cash on Delivery'>('Credit Card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!checkoutOpen) return null;

  // Group items by vendor
  const vendorGroups: { [key: string]: typeof cart } = {};
  cart.forEach(item => {
    const vName = item.product.vendorName;
    if (!vendorGroups[vName]) vendorGroups[vName] = [];
    vendorGroups[vName].push(item);
  });

  const isFreeShipping = cartTotal >= 60;
  const shippingFee = isFreeShipping ? 0 : 4.95;
  const finalTotal = cartTotal + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      createOrder({
        customerName,
        customerEmail,
        customerPhone,
        childName,
        childAge,
        shippingAddress,
        paymentMethod,
        discount: 0
      });
      setIsSubmitting(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-stone-200 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Multi-Vendor Direct Fulfillment</span>
            </div>
            <h2 className="text-lg font-bold text-stone-900 mt-0.5">Secure Checkout</h2>
          </div>

          <button
            onClick={() => setCheckoutOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 max-h-[75vh] overflow-y-auto">
            
            {/* Left Column: Parent & Shipping Details */}
            <div className="md:col-span-7 space-y-4">
              
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                  1. Parent & Delivery Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Parent / Guardian Name</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Email (For Tracking)</label>
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Delivery Address & Postal Code</label>
                    <textarea
                      required
                      rows={2}
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Child Milestones Personalization */}
              <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200/80 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                  <Baby className="w-4 h-4 text-amber-700" />
                  <span>Complimentary Child Gift Note & Safety Calibration</span>
                </div>
                <p className="text-[11px] text-amber-800">
                  Our workshops include hand-signed safety certificates and milestone stickers customized for your child:
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">Child's First Name</label>
                    <input
                      type="text"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      placeholder="e.g. Leo"
                      className="w-full text-xs bg-white border border-stone-300 rounded-md px-2.5 py-1.5 text-stone-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">Child's Age (0-10)</label>
                    <input
                      type="text"
                      value={childAge}
                      onChange={(e) => setChildAge(e.target.value)}
                      placeholder="e.g. 18 Months"
                      className="w-full text-xs bg-white border border-stone-300 rounded-md px-2.5 py-1.5 text-stone-800"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  2. Payment Method
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Credit Card')}
                    className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all ${
                      paymentMethod === 'Credit Card'
                        ? 'bg-amber-50/80 border-amber-600 ring-1 ring-amber-600 text-stone-900'
                        : 'border-stone-200 hover:border-stone-300 text-stone-600 bg-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-stone-700 mb-1" />
                    <span className="text-xs font-semibold">Credit Card</span>
                    <span className="text-[10px] text-stone-400">Instant</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Apple Pay')}
                    className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all ${
                      paymentMethod === 'Apple Pay'
                        ? 'bg-amber-50/80 border-amber-600 ring-1 ring-amber-600 text-stone-900'
                        : 'border-stone-200 hover:border-stone-300 text-stone-600 bg-white'
                    }`}
                  >
                    <span className="text-xs font-bold mb-1"> Pay</span>
                    <span className="text-xs font-semibold">Apple Pay</span>
                    <span className="text-[10px] text-stone-400">1-Touch</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Cash on Delivery')}
                    className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all ${
                      paymentMethod === 'Cash on Delivery'
                        ? 'bg-amber-50/80 border-amber-600 ring-1 ring-amber-600 text-stone-900'
                        : 'border-stone-200 hover:border-stone-300 text-stone-600 bg-white'
                    }`}
                  >
                    <Banknote className="w-4 h-4 text-emerald-700 mb-1" />
                    <span className="text-xs font-semibold">Cash on Delivery</span>
                    <span className="text-[10px] text-stone-400">Verified</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Multi-Vendor Shipments & Total Summary */}
            <div className="md:col-span-5 bg-stone-50 p-4 sm:p-5 rounded-xl border border-stone-200/90 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-3 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-stone-500" />
                  Split Shipments ({Object.keys(vendorGroups).length} Packages)
                </h3>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {Object.entries(vendorGroups).map(([vendorName, items], index) => {
                    const sub = items.reduce((a, b) => a + b.product.price * b.quantity, 0);
                    return (
                      <div key={vendorName} className="p-3 bg-white rounded-lg border border-stone-200/80 text-xs space-y-2">
                        <div className="flex items-center justify-between font-bold text-stone-900">
                          <span className="flex items-center gap-1 text-[11px] text-amber-800 truncate max-w-[150px]">
                            <Store className="w-3 h-3 text-amber-700 shrink-0" />
                            {vendorName}
                          </span>
                          <span className="font-mono-numbers">${sub.toFixed(2)}</span>
                        </div>
                        <div className="text-[11px] text-stone-500 space-y-1">
                          {items.map(it => (
                            <div key={it.product.id} className="flex justify-between">
                              <span className="truncate max-w-[150px]">{it.quantity}x {it.product.title}</span>
                              <span className="font-mono-numbers">${(it.product.price * it.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Price Breakdown */}
                <div className="pt-4 mt-3 border-t border-stone-200 space-y-1.5 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Products Subtotal</span>
                    <span className="font-mono-numbers text-stone-900">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maker Combined Shipping</span>
                    <span className="font-mono-numbers text-stone-900">
                      {isFreeShipping ? 'FREE' : '$4.95'}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
                    <span>Total Amount</span>
                    <span className="font-mono-numbers">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Safety & Submit */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-[11px] text-emerald-800 bg-emerald-50/90 p-2.5 rounded-lg border border-emerald-200/70">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>256-Bit Encrypted • Verified Child Safety Standards Protected</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || cart.length === 0}
                  className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-bold transition-colors shadow-xs disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Splitting Shipments to Workshops...</span>
                  ) : (
                    <span>Confirm Order • ${(finalTotal).toFixed(2)}</span>
                  )}
                </button>
              </div>

            </div>

          </div>
        </form>
      </div>
    </div>
  );
};
