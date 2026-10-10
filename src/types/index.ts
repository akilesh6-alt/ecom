export type AgeStage = 'all' | '0-12m' | '1-3y' | '4-6y' | '7-10y';

export type ProductCategory = 
  | 'Wooden & Montessori'
  | 'Organic Apparel'
  | 'STEM & Puzzles'
  | 'Books & Bedtime'
  | 'Art & Crafts'
  | 'Active & Outdoor';

export type SafetyBadge = 
  | 'Non-Toxic Dye'
  | '100% GOTS Organic'
  | 'BPA & Phthalate Free'
  | 'ASTM / CE Certified'
  | 'FSC Certified Beechwood'
  | 'Choke-Hazard Tested';

export interface Vendor {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  location: string;
  rating: number;
  reviewCount: number;
  totalSales: number;
  joinedYear: number;
  story: string;
  specialty: string;
  badges: string[];
  bannerGradient: string;
  avatarBg: string;
}

export interface Review {
  id: string;
  author: string;
  childAge: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  title: string;
  vendorId: string;
  vendorName: string;
  category: ProductCategory;
  ageStage: '0-12m' | '1-3y' | '4-6y' | '7-10y';
  ageLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  features: string[];
  safetyBadges: SafetyBadge[];
  materials: string;
  inStock: boolean;
  stockCount: number;
  reviews: Review[];
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderVendorShipment {
  vendorId: string;
  vendorName: string;
  trackingNumber: string;
  status: 'Processing' | 'Packaged' | 'In Transit' | 'Delivered';
  items: CartItem[];
  subtotal: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  childName?: string;
  childAge?: string;
  shippingAddress: string;
  paymentMethod: 'Credit Card' | 'Apple Pay' | 'Cash on Delivery';
  total: number;
  discount: number;
  status: 'Confirmed' | 'Dispatched' | 'Delivered';
  shipments: OrderVendorShipment[];
}

export interface KidProfile {
  name: string;
  ageStage: AgeStage;
  birthMonth?: string;
  favoriteInterest?: string;
}

export interface VendorInquiry {
  id: string;
  vendorId: string;
  vendorName: string;
  productId?: string;
  productTitle?: string;
  parentName: string;
  email: string;
  message: string;
  date: string;
  status: 'Received' | 'Replied';
}

export interface GiftBundle {
  id: string;
  title: string;
  tagline: string;
  ageStage: AgeStage;
  ageLabel: string;
  price: number;
  originalPrice: number;
  image: string;
  productIds: string[];
  description: string;
  badge: string;
}
