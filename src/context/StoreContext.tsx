import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  Vendor, 
  CartItem, 
  Order, 
  AgeStage, 
  ProductCategory, 
  SafetyBadge,
  OrderVendorShipment,
  KidProfile,
  GiftBundle,
  VendorInquiry
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_VENDORS, INITIAL_BUNDLES } from '../data/initialData';

interface StoreContextType {
  products: Product[];
  vendors: Vendor[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  bundles: GiftBundle[];
  
  // Navigation & Modals
  currentView: 'shop' | 'vendor-portal' | 'orders';
  setCurrentView: (view: 'shop' | 'vendor-portal' | 'orders') => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  wishlistOpen: boolean;
  setWishlistOpen: (open: boolean) => void;
  checkoutOpen: boolean;
  setCheckoutOpen: (open: boolean) => void;
  safetyModalOpen: boolean;
  setSafetyModalOpen: (open: boolean) => void;
  vendorDirectoryOpen: boolean;
  setVendorDirectoryOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  activeVendorProfile: Vendor | null;
  setActiveVendorProfile: (vendor: Vendor | null) => void;
  trackingOrderModal: Order | null;
  setTrackingOrderModal: (order: Order | null) => void;
  lastOrder: Order | null;
  compareModalOpen: boolean;
  setCompareModalOpen: (open: boolean) => void;
  giftQuizOpen: boolean;
  setGiftQuizOpen: (open: boolean) => void;
  inquireVendor: { vendor: Vendor; product?: Product } | null;
  setInquireVendor: (data: { vendor: Vendor; product?: Product } | null) => void;

  // Real-time Child Profile
  kidProfile: KidProfile | null;
  setKidProfile: (profile: KidProfile | null) => void;

  // Comparison Matrix
  compareList: string[];
  toggleCompare: (productId: string) => void;
  clearCompare: () => void;

  // Filter States
  selectedAgeStage: AgeStage;
  setSelectedAgeStage: (stage: AgeStage) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedVendorId: string;
  setSelectedVendorId: (id: string) => void;
  selectedSafetyBadge: string;
  setSelectedSafetyBadge: (badge: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'rating') => void;

  // Multi-Currency Converter
  currency: 'USD' | 'EUR' | 'GBP';
  setCurrency: (c: 'USD' | 'EUR' | 'GBP') => void;
  formatPrice: (amount: number) => string;

  // Vendor Portal State
  activeVendorIdForPortal: string;
  setActiveVendorIdForPortal: (id: string) => void;
  inquiries: VendorInquiry[];
  submitInquiry: (inquiry: Omit<VendorInquiry, 'id' | 'date' | 'status'>) => void;

  // Actions
  addToCart: (product: Product, quantity?: number) => void;
  addBundleToCart: (bundle: GiftBundle) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  createOrder: (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    childName?: string;
    childAge?: string;
    shippingAddress: string;
    paymentMethod: 'Credit Card' | 'Apple Pay' | 'Cash on Delivery';
    discount: number;
  }) => Order;
  addNewProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'reviews'>) => Product;
  updateProductStock: (productId: string, inStock: boolean, stockCount: number) => void;
  addNewVendor: (vendor: Omit<Vendor, 'id' | 'rating' | 'reviewCount' | 'totalSales' | 'joinedYear'>) => Vendor;
  addProductReview: (productId: string, review: { author: string; childAge: string; rating: number; comment: string }) => void;

  // Recently Viewed
  recentlyViewedIds: string[];
  addRecentlyViewed: (id: string) => void;

  // Feedback Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Helper Stats
  cartTotal: number;
  cartItemCount: number;
  resetFilters: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'sprout_wonder_products_v2',
  VENDORS: 'sprout_wonder_vendors_v2',
  CART: 'sprout_wonder_cart_v2',
  WISHLIST: 'sprout_wonder_wishlist_v2',
  ORDERS: 'sprout_wonder_orders_v2',
  KID_PROFILE: 'sprout_wonder_kid_profile_v2',
  COMPARE: 'sprout_wonder_compare_v2',
  INQUIRIES: 'sprout_wonder_inquiries_v2',
  RECENTLY_VIEWED: 'sprout_wonder_recently_viewed_v2'
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [vendors, setVendors] = useState<Vendor[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VENDORS);
      return saved ? JSON.parse(saved) : INITIAL_VENDORS;
    } catch {
      return INITIAL_VENDORS;
    }
  });

  const [bundles] = useState<GiftBundle[]>(INITIAL_BUNDLES);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [kidProfile, setKidProfileState] = useState<KidProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.KID_PROFILE);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [compareList, setCompareList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPARE);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [inquiries, setInquiries] = useState<VendorInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RECENTLY_VIEWED);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state
  const [currentView, setCurrentView] = useState<'shop' | 'vendor-portal' | 'orders'>('shop');
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [safetyModalOpen, setSafetyModalOpen] = useState(false);
  const [vendorDirectoryOpen, setVendorDirectoryOpen] = useState(false);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [giftQuizOpen, setGiftQuizOpen] = useState(false);
  const [inquireVendor, setInquireVendor] = useState<{ vendor: Vendor; product?: Product } | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeVendorProfile, setActiveVendorProfile] = useState<Vendor | null>(null);
  const [trackingOrderModal, setTrackingOrderModal] = useState<Order | null>(null);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Currency
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');

  // Filters
  const [selectedAgeStage, setSelectedAgeStage] = useState<AgeStage>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedVendorId, setSelectedVendorId] = useState<string>('all');
  const [selectedSafetyBadge, setSelectedSafetyBadge] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Vendor Portal
  const [activeVendorIdForPortal, setActiveVendorIdForPortal] = useState<string>('v_little_oak');

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.VENDORS, JSON.stringify(vendors));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [vendors]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPARE, JSON.stringify(compareList));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [compareList]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RECENTLY_VIEWED, JSON.stringify(recentlyViewedIds));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [recentlyViewedIds]);

  const setKidProfile = (profile: KidProfile | null) => {
    setKidProfileState(profile);
    if (profile) {
      try {
        localStorage.setItem(STORAGE_KEYS.KID_PROFILE, JSON.stringify(profile));
      } catch (e) {
        console.warn('Storage error', e);
      }
      setSelectedAgeStage(profile.ageStage);
      showToast(`Personalized for ${profile.name} (${profile.ageStage.toUpperCase()})`);
    } else {
      localStorage.removeItem(STORAGE_KEYS.KID_PROFILE);
      showToast('Switched to browsing all ages');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 2800);
  };

  const formatPrice = (amount: number): string => {
    if (currency === 'EUR') {
      return `€${(amount * 0.92).toFixed(2)}`;
    }
    if (currency === 'GBP') {
      return `£${(amount * 0.79).toFixed(2)}`;
    }
    return `$${amount.toFixed(2)}`;
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.title.slice(0, 26)}..." to your bag`);
  };

  const addBundleToCart = (bundle: GiftBundle) => {
    const bundleProducts = products.filter(p => bundle.productIds.includes(p.id));
    if (bundleProducts.length === 0) return;
    
    // Add each bundle product to cart
    setCart(prev => {
      let updated = [...prev];
      bundleProducts.forEach(prod => {
        const existingIdx = updated.findIndex(it => it.product.id === prod.id);
        if (existingIdx >= 0) {
          updated[existingIdx] = {
            ...updated[existingIdx],
            quantity: updated[existingIdx].quantity + 1
          };
        } else {
          updated.push({ product: prod, quantity: 1 });
        }
      });
      return updated;
    });
    setCartOpen(true);
    showToast(`Added ${bundle.title} (${bundleProducts.length} items) to your bag!`);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from saved wishlist');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to your child wishlist');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const toggleCompare = (productId: string) => {
    setCompareList(prev => {
      if (prev.includes(productId)) {
        showToast('Removed from comparison');
        return prev.filter(id => id !== productId);
      }
      if (prev.length >= 3) {
        showToast('Maximum 3 products can be compared at once');
        return prev;
      }
      showToast('Added to comparison matrix');
      return [...prev, productId];
    });
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const addRecentlyViewed = (id: string) => {
    setRecentlyViewedIds(prev => {
      const filtered = prev.filter(item => item !== id);
      return [id, ...filtered].slice(0, 8);
    });
  };

  const addProductReview = (
    productId: string, 
    reviewData: { author: string; childAge: string; rating: number; comment: string }
  ) => {
    const newRev = {
      id: `rev_${Date.now()}`,
      author: reviewData.author.trim() || 'Caring Parent',
      childAge: reviewData.childAge.trim() || 'Age 0–10',
      rating: reviewData.rating,
      date: 'Just now',
      comment: reviewData.comment.trim(),
      verifiedPurchase: true
    };

    setProducts(prev =>
      prev.map(p => {
        if (p.id !== productId) return p;
        const updatedReviews = [newRev, ...p.reviews];
        const newAvg = updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
        return {
          ...p,
          reviews: updatedReviews,
          rating: Number(newAvg.toFixed(2)),
          reviewCount: updatedReviews.length
        };
      })
    );
    showToast('Your verified parent review has been published!');
  };

  const submitInquiry = (inquiryData: Omit<VendorInquiry, 'id' | 'date' | 'status'>) => {
    const newInquiry: VendorInquiry = {
      ...inquiryData,
      id: `inq_${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Received'
    };
    setInquiries(prev => [newInquiry, ...prev]);
    showToast(`Inquiry sent directly to ${inquiryData.vendorName}!`);
  };

  const resetFilters = () => {
    setSelectedAgeStage('all');
    setSelectedCategory('all');
    setSelectedVendorId('all');
    setSelectedSafetyBadge('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  const createOrder = (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    childName?: string;
    childAge?: string;
    shippingAddress: string;
    paymentMethod: 'Credit Card' | 'Apple Pay' | 'Cash on Delivery';
    discount: number;
  }): Order => {
    const vendorMap: { [key: string]: CartItem[] } = {};
    cart.forEach(item => {
      const vId = item.product.vendorId;
      if (!vendorMap[vId]) vendorMap[vId] = [];
      vendorMap[vId].push(item);
    });

    const shipments: OrderVendorShipment[] = Object.keys(vendorMap).map(vId => {
      const vItems = vendorMap[vId];
      const vendor = vendors.find(v => v.id === vId);
      const subtotal = vItems.reduce((acc, it) => acc + it.product.price * it.quantity, 0);
      const randomTrackId = Math.floor(1000 + Math.random() * 9000);
      const prefix = vendor ? vendor.name.slice(0, 3).toUpperCase() : 'SW';

      return {
        vendorId: vId,
        vendorName: vendor ? vendor.name : 'Verified Kid Maker',
        trackingNumber: `${prefix}-${randomTrackId}`,
        status: 'Packaged',
        items: vItems,
        subtotal
      };
    });

    const grossTotal = cart.reduce((acc, it) => acc + it.product.price * it.quantity, 0);
    const finalTotal = Math.max(0, grossTotal - orderData.discount);
    const orderNumber = `SW-${Date.now().toString().slice(-6)}`;

    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      childName: orderData.childName,
      childAge: orderData.childAge,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      total: finalTotal,
      discount: orderData.discount,
      status: 'Confirmed',
      shipments
    };

    setOrders(prev => [newOrder, ...prev]);
    setLastOrder(newOrder);
    setTrackingOrderModal(newOrder);

    setVendors(prev =>
      prev.map(v => {
        const vendorShipment = shipments.find(s => s.vendorId === v.id);
        if (vendorShipment) {
          return {
            ...v,
            totalSales: v.totalSales + vendorShipment.items.reduce((c, i) => c + i.quantity, 0)
          };
        }
        return v;
      })
    );

    clearCart();
    setCheckoutOpen(false);
    showToast(`Order #${orderNumber} placed successfully!`);
    return newOrder;
  };

  const addNewProduct = (productData: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'reviews'>): Product => {
    const newProduct: Product = {
      ...productData,
      id: `prod_${Date.now()}`,
      rating: 5.0,
      reviewCount: 1,
      reviews: [
        {
          id: `rev_init_${Date.now()}`,
          author: 'Certified Safety Lead',
          childAge: productData.ageLabel,
          rating: 5,
          date: 'Just now',
          comment: 'Verified workshop audit passed. Meets all non-toxic and age safety thresholds.',
          verifiedPurchase: true
        }
      ]
    };

    setProducts(prev => [newProduct, ...prev]);
    showToast(`"${newProduct.title.slice(0, 24)}" published to marketplace!`);
    return newProduct;
  };

  const updateProductStock = (productId: string, inStock: boolean, stockCount: number) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === productId ? { ...p, inStock, stockCount } : p
      )
    );
    showToast('Inventory updated');
  };

  const addNewVendor = (vendorData: Omit<Vendor, 'id' | 'rating' | 'reviewCount' | 'totalSales' | 'joinedYear'>): Vendor => {
    const newVendor: Vendor = {
      ...vendorData,
      id: `v_${Date.now()}`,
      rating: 5.0,
      reviewCount: 0,
      totalSales: 0,
      joinedYear: new Date().getFullYear()
    };
    setVendors(prev => [...prev, newVendor]);
    setActiveVendorIdForPortal(newVendor.id);
    showToast(`Welcome ${newVendor.name}! Storefront is active.`);
    return newVendor;
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        products,
        vendors,
        cart,
        wishlist,
        orders,
        bundles,
        currentView,
        setCurrentView,
        cartOpen,
        setCartOpen,
        wishlistOpen,
        setWishlistOpen,
        checkoutOpen,
        setCheckoutOpen,
        safetyModalOpen,
        setSafetyModalOpen,
        vendorDirectoryOpen,
        setVendorDirectoryOpen,
        compareModalOpen,
        setCompareModalOpen,
        giftQuizOpen,
        setGiftQuizOpen,
        inquireVendor,
        setInquireVendor,
        quickViewProduct,
        setQuickViewProduct,
        activeVendorProfile,
        setActiveVendorProfile,
        trackingOrderModal,
        setTrackingOrderModal,
        lastOrder,
        kidProfile,
        setKidProfile,
        compareList,
        toggleCompare,
        clearCompare,
        selectedAgeStage,
        setSelectedAgeStage,
        selectedCategory,
        setSelectedCategory,
        selectedVendorId,
        setSelectedVendorId,
        selectedSafetyBadge,
        setSelectedSafetyBadge,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        currency,
        setCurrency,
        formatPrice,
        activeVendorIdForPortal,
        setActiveVendorIdForPortal,
        inquiries,
        submitInquiry,
        addToCart,
        addBundleToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isWishlisted,
        createOrder,
        addNewProduct,
        updateProductStock,
        addNewVendor,
        addProductReview,
        recentlyViewedIds,
        addRecentlyViewed,
        toastMessage,
        showToast,
        cartTotal,
        cartItemCount,
        resetFilters
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
