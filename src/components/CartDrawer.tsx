import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Store, 
  Tag, 
  Check, 
  Truck 
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cartOpen,
    setCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    setCheckoutOpen,
    formatPrice
  } = useStore();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  if (!cartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'KIDDO10' || code === 'SPROUT10') {
      setDiscountPercent(10);
      setPromoApplied(true);
    } else if (code === 'WELCOME') {
      setDiscountPercent(15);
      setPromoApplied(true);
    } else {
      setPromoError('Invalid code. Try "KIDDO10" for 10% off.');
    }
  };

  const discountAmount = (cartTotal * discountPercent) / 100;
  const freeShippingThreshold = 60.0;
  const isFreeShipping = cartTotal >= freeShippingThreshold;
  const progressToFreeShip = Math.min(100, (cartTotal / freeShippingThreshold) * 100);
  const finalTotal = Math.max(0, cartTotal - discountAmount);

  // Group cart items by vendor
  const vendorGroups: { [key: string]: typeof cart } = {};
  cart.forEach(item => {
    const vName = item.product.vendorName;
    if (!vendorGroups[vName]) vendorGroups[vName] = [];
    vendorGroups[vName].push(item);
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-stone-200 animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-stone-900" />
            <h2 className="text-base font-bold text-stone-900">Your Shopping Bag</h2>
            <span className="text-xs font-semibold bg-stone-100 text-stone-700 px-2 py-0.5 rounded-full font-mono-numbers">
              {cart.reduce((c, i) => c + i.quantity, 0)} items
            </span>
          </div>

          <button
            onClick={() => setCartOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Milestone Meter */}
        <div className="bg-amber-50/70 px-5 py-3 border-b border-amber-100 text-xs">
          <div className="flex items-center justify-between text-stone-700 font-medium mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-amber-700" />
              {isFreeShipping ? (
                <span className="text-emerald-700 font-bold">You unlocked free shipping!</span>
              ) : (
                <span>
                  Add <strong className="font-mono-numbers">${(freeShippingThreshold - cartTotal).toFixed(2)}</strong> more for Free Direct Shipping
                </span>
              )}
            </span>
            <span className="font-mono-numbers text-[11px] font-bold text-stone-500">
              {Math.round(progressToFreeShip)}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-amber-200/60 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-600 transition-all duration-300"
              style={{ width: `${progressToFreeShip}%` }}
            />
          </div>
        </div>

        {/* Cart Item List (Grouped by Vendor) */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500 space-y-3">
              <span className="text-4xl">🧺</span>
              <p className="font-semibold text-stone-800 text-sm">Your shopping bag is empty</p>
              <p className="text-xs max-w-xs text-stone-500">
                Explore handpicked toys, safe developmental tools, and soft organic cotton essentials.
              </p>
              <button
                onClick={() => setCartOpen(false)}
                className="mt-3 px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors"
              >
                Start Exploring
              </button>
            </div>
          ) : (
            Object.entries(vendorGroups).map(([vendorName, items]) => (
              <div key={vendorName} className="space-y-3">
                {/* Vendor Group Header */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200/80">
                  <Store className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span className="truncate">Direct Package from: {vendorName}</span>
                </div>

                {/* Items in this vendor shipment */}
                <div className="space-y-3 pl-1">
                  {items.map(({ product, quantity }) => (
                    <div 
                      key={product.id}
                      className="flex gap-3 pb-3 border-b border-stone-100 last:border-b-0"
                    >
                      <div className="w-16 h-16 rounded-lg bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs font-semibold text-stone-900 line-clamp-1 leading-snug">
                              {product.title}
                            </h4>
                            <button
                              onClick={() => removeFromCart(product.id)}
                              className="text-stone-400 hover:text-rose-600 p-0.5 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-[11px] text-amber-800 font-medium">{product.ageLabel}</span>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          {/* Quantity selector */}
                          <div className="flex items-center border border-stone-200 rounded bg-stone-50">
                            <button
                              onClick={() => updateCartQuantity(product.id, quantity - 1)}
                              className="px-2 py-0.5 text-stone-600 hover:text-stone-900"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold font-mono-numbers text-stone-800">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(product.id, quantity + 1)}
                              className="px-2 py-0.5 text-stone-600 hover:text-stone-900"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Item total */}
                          <span className="text-xs font-bold font-mono-numbers text-stone-900">
                            {formatPrice(product.price * quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Module */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-stone-50/50 space-y-3">
            
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code (e.g. KIDDO10)"
                  className="w-full bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-500 uppercase"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
              >
                Apply
              </button>
            </form>

            {promoApplied && (
              <div className="text-[11px] text-emerald-700 flex items-center gap-1 font-semibold">
                <Check className="w-3.5 h-3.5" />
                Promo code applied: {discountPercent}% discount
              </div>
            )}
            {promoError && (
              <div className="text-[11px] text-rose-600 font-medium">
                {promoError}
              </div>
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 pt-2 text-xs text-stone-600 border-t border-stone-200/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono-numbers text-stone-900">{formatPrice(cartTotal)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Discount ({discountPercent}%)</span>
                  <span className="font-mono-numbers">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Direct Artisan Shipping</span>
                <span className="font-mono-numbers text-stone-900">
                  {isFreeShipping ? 'FREE' : formatPrice(4.95)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Total</span>
                <span className="font-mono-numbers">{formatPrice(finalTotal + (isFreeShipping ? 0 : 4.95))}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => {
                setCartOpen(false);
                setCheckoutOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
            >
              <span>Proceed to Multi-Vendor Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={clearCart}
              className="w-full text-center text-[11px] text-stone-400 hover:text-stone-600 transition-colors pt-1"
            >
              Clear shopping bag
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
