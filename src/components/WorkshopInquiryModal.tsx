import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Store, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const WorkshopInquiryModal: React.FC = () => {
  const {
    inquireVendor,
    setInquireVendor,
    submitInquiry
  } = useStore();

  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!inquireVendor) return null;

  const { vendor, product } = inquireVendor;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !parentName.trim() || !email.trim()) return;

    submitInquiry({
      vendorId: vendor.id,
      vendorName: vendor.name,
      productId: product?.id,
      productTitle: product?.title,
      parentName: parentName.trim(),
      email: email.trim(),
      message: message.trim()
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setInquireVendor(null);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-amber-700" />
            <div>
              <h2 className="text-base font-bold text-stone-900">Message {vendor.name}</h2>
              <p className="text-[11px] text-stone-500">{vendor.location} • Verified Maker</p>
            </div>
          </div>

          <button
            onClick={() => setInquireVendor(null)}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200 transition-colors"
            aria-label="Close message"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold text-stone-900">Inquiry Sent to Workshop!</h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                {vendor.name} typically replies within 2–4 hours directly to your email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {product && (
                <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200/80 flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-9 h-9 rounded object-cover border border-stone-200 shrink-0"
                  />
                  <div className="truncate">
                    <span className="text-[10px] text-amber-800 font-bold block uppercase">Product Inquired:</span>
                    <span className="font-semibold text-stone-900 truncate block">{product.title}</span>
                  </div>
                </div>
              )}

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rachel Miller"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Your Question or Custom Request</label>
                <textarea
                  rows={4}
                  required
                  placeholder="e.g. Can you engrave my daughter's name 'Maya' on the base of the beechwood stacker? Or what size is recommended for a 14-month old?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Direct artisan communication</span>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setInquireVendor(null)}
                    className="px-3 py-1.5 text-stone-600 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Send className="w-3 h-3" />
                    <span>Send to Maker</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
