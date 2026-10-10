import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCategory, SafetyBadge, AgeStage } from '../types';
import { 
  Store, 
  Plus, 
  Package, 
  DollarSign, 
  TrendingUp, 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowLeft,
  Boxes,
  Truck,
  Check,
  Sparkles
} from 'lucide-react';

export const VendorDashboard: React.FC = () => {
  const {
    vendors,
    products,
    orders,
    activeVendorIdForPortal,
    setActiveVendorIdForPortal,
    addNewProduct,
    updateProductStock,
    addNewVendor,
    setCurrentView,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'products' | 'add' | 'orders' | 'profile'>('products');
  const [showNewVendorModal, setShowNewVendorModal] = useState(false);

  // New Vendor Form
  const [newVendorName, setNewVendorName] = useState('');
  const [newVendorLocation, setNewVendorLocation] = useState('');
  const [newVendorTagline, setNewVendorTagline] = useState('');
  const [newVendorStory, setNewVendorStory] = useState('');
  const [newVendorSpecialty, setNewVendorSpecialty] = useState('Organic Toys & Sensory Play');

  // New Product Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Wooden & Montessori');
  const [ageStage, setAgeStage] = useState<'0-12m' | '1-3y' | '4-6y' | '7-10y'>('1-3y');
  const [price, setPrice] = useState('32.00');
  const [stockCount, setStockCount] = useState('25');
  const [description, setDescription] = useState('');
  const [materials, setMaterials] = useState('Natural non-toxic beechwood and food-grade beeswax');
  const [features, setFeatures] = useState('Develops hand-eye coordination\n100% splinter-free rounded finish\nMeets ASTM F963 safety standard');
  const [selectedBadges, setSelectedBadges] = useState<SafetyBadge[]>(['FSC Certified Beechwood', 'Non-Toxic Dye']);
  const [imageOption, setImageOption] = useState<string>('/src/assets/images/baby_wooden_toys_1791611885583.jpg');

  const currentVendor = vendors.find(v => v.id === activeVendorIdForPortal) || vendors[0];
  const vendorProducts = products.filter(p => p.vendorId === currentVendor.id);

  // Vendor Sales & Order metrics
  const vendorOrders = orders.filter(order =>
    order.shipments.some(s => s.vendorId === currentVendor.id)
  );
  const vendorRevenue = vendorOrders.reduce((sum, order) => {
    const shipment = order.shipments.find(s => s.vendorId === currentVendor.id);
    return sum + (shipment ? shipment.subtotal : 0);
  }, 0) + (currentVendor.totalSales * 38); // Baseline seeded sales calculation

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please provide a product title');
      return;
    }

    const ageLabelMap = {
      '0-12m': '0 - 12 Months',
      '1-3y': '1 - 3 Years',
      '4-6y': '4 - 6 Years',
      '7-10y': '7 - 10 Years'
    };

    addNewProduct({
      title: title.trim(),
      vendorId: currentVendor.id,
      vendorName: currentVendor.name,
      category,
      ageStage,
      ageLabel: ageLabelMap[ageStage],
      price: parseFloat(price) || 29.99,
      image: imageOption,
      description: description.trim() || 'Thoughtfully crafted for healthy early childhood sensory development.',
      features: features.split('\n').filter(f => f.trim().length > 0),
      safetyBadges: selectedBadges,
      materials: materials.trim() || 'Safe tested eco-materials.',
      inStock: true,
      stockCount: parseInt(stockCount, 10) || 20,
      isFeatured: false
    });

    // Reset form & go to product list
    setTitle('');
    setDescription('');
    setActiveTab('products');
  };

  const handleCreateVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVendorName.trim()) return;

    addNewVendor({
      name: newVendorName.trim(),
      slug: newVendorName.toLowerCase().replace(/\s+/g, '-'),
      tagline: newVendorTagline.trim() || 'Handmade artisan goods for children',
      location: newVendorLocation.trim() || 'Seattle, WA',
      story: newVendorStory.trim() || 'Dedicated to sustainable craftsmanship for children.',
      specialty: newVendorSpecialty,
      badges: ['ASTM / CE Certified', 'Non-Toxic'],
      bannerGradient: 'from-amber-50 to-orange-50',
      avatarBg: 'bg-amber-700'
    });

    setShowNewVendorModal(false);
    setNewVendorName('');
    setNewVendorTagline('');
    setNewVendorStory('');
  };

  const toggleBadge = (badge: SafetyBadge) => {
    setSelectedBadges(prev =>
      prev.includes(badge) ? prev.filter(b => b !== badge) : [...prev, badge]
    );
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-16">
      
      {/* Top Navigation Bar for Vendor Portal */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentView('shop')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Shopper Storefront</span>
            </button>
            <div className="h-4 w-px bg-stone-200 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Store className="w-5 h-5 text-amber-700" />
              <h1 className="text-base font-bold text-stone-900">Maker Hub & Seller Portal</h1>
            </div>
          </div>

          {/* Switch Active Vendor Profile Dropdown */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs text-stone-500 font-medium">Managing Store:</span>
            <select
              value={activeVendorIdForPortal}
              onChange={(e) => setActiveVendorIdForPortal(e.target.value)}
              className="bg-stone-50 border border-stone-300 rounded-lg px-3 py-1.5 text-xs font-bold text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              {vendors.map(v => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.location})
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowNewVendorModal(true)}
              className="p-1.5 text-xs bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold rounded-lg transition-colors flex items-center gap-1"
              title="Register new workshop"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden md:inline">New Maker</span>
            </button>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Vendor Header Card */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                {currentVendor.specialty}
              </span>
              <span className="text-stone-300">·</span>
              <span className="text-xs text-stone-500">{currentVendor.location}</span>
            </div>
            <h2 className="text-2xl font-bold text-stone-900">{currentVendor.name}</h2>
            <p className="text-xs text-stone-600 max-w-2xl">{currentVendor.tagline}</p>
          </div>

          {/* KPI Strip */}
          <div className="grid grid-cols-3 gap-3 shrink-0">
            <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/80 text-center">
              <span className="text-[10px] font-bold text-stone-500 uppercase block">Total Volume</span>
              <span className="text-lg font-bold font-mono-numbers text-stone-900">
                ${vendorRevenue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/80 text-center">
              <span className="text-[10px] font-bold text-stone-500 uppercase block">Units Sold</span>
              <span className="text-lg font-bold font-mono-numbers text-stone-900">
                {currentVendor.totalSales + vendorOrders.length}
              </span>
            </div>
            <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/80 text-center">
              <span className="text-[10px] font-bold text-stone-500 uppercase block">Shop Rating</span>
              <div className="flex items-center justify-center gap-1 text-lg font-bold font-mono-numbers text-amber-800">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                <span>{currentVendor.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'products'
                ? 'bg-stone-900 text-white'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Boxes className="w-4 h-4" />
            <span>Store Catalog ({vendorProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('add')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'add'
                ? 'bg-amber-700 text-white'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Publish New Kid Product</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-stone-900 text-white'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Fulfillment Orders ({vendorOrders.length})</span>
          </button>
        </div>

        {/* Tab 1: Products Inventory Table */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="p-5 border-b border-stone-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-stone-900 text-sm">Product Inventory & Stock Status</h3>
                <p className="text-xs text-stone-500">Live listings visible to parents across the marketplace.</p>
              </div>
              <button
                onClick={() => setActiveTab('add')}
                className="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Item
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-700">
                <thead className="bg-stone-50 border-b border-stone-200 uppercase font-semibold text-[10px] text-stone-500">
                  <tr>
                    <th className="px-5 py-3.5">Product</th>
                    <th className="px-4 py-3.5">Age Stage</th>
                    <th className="px-4 py-3.5">Category</th>
                    <th className="px-4 py-3.5">Price</th>
                    <th className="px-4 py-3.5">Stock</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {vendorProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.title}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-lg object-cover bg-stone-100 border border-stone-200 shrink-0"
                          />
                          <div>
                            <div className="font-bold text-stone-900 line-clamp-1 max-w-xs">{p.title}</div>
                            <div className="text-[10px] text-stone-400 mt-0.5">{p.materials.slice(0, 35)}...</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                          {p.ageLabel}
                        </span>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap text-stone-600">
                        {p.category}
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap font-bold font-mono-numbers text-stone-900">
                        ${p.price.toFixed(2)}
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap font-mono-numbers">
                        {p.stockCount} units
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.inStock ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                        }`}>
                          {p.inStock ? 'Active' : 'Out of Stock'}
                        </span>
                      </td>

                      <td className="px-5 py-4 whitespace-nowrap text-right space-x-2">
                        <button
                          onClick={() => updateProductStock(p.id, !p.inStock, p.inStock ? 0 : 20)}
                          className="text-[11px] font-semibold text-stone-600 hover:text-stone-900 underline"
                        >
                          {p.inStock ? 'Mark Sold Out' : 'Restock (20)'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Add New Kid Product Form */}
        {activeTab === 'add' && (
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs max-w-3xl mx-auto space-y-6">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Publish to Sprout & Wonder Marketplace</span>
              </div>
              <h3 className="text-xl font-bold text-stone-900 mt-0.5">
                New Product Specification for Kids 0–10
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Ensure compliance with our non-toxic materials charter and age milestone safety requirements.
              </p>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tactile Sensory Wooden Abacus & Counting Beads"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg px-3 py-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Target Age Group (0-10)</label>
                  <select
                    value={ageStage}
                    onChange={(e) => setAgeStage(e.target.value as any)}
                    className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg px-3 py-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="0-12m">0–12 Months (Sensory Infant)</option>
                    <option value="1-3y">1–3 Years (Toddler Play)</option>
                    <option value="4-6y">4–6 Years (Preschool / Early STEM)</option>
                    <option value="7-10y">7–10 Years (School & Explorers)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Product Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg px-3 py-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="Wooden & Montessori">Wooden & Montessori</option>
                    <option value="Organic Apparel">Organic Apparel</option>
                    <option value="STEM & Puzzles">STEM & Puzzles</option>
                    <option value="Books & Bedtime">Books & Bedtime</option>
                    <option value="Art & Crafts">Art & Crafts</option>
                    <option value="Active & Outdoor">Active & Outdoor</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Price (USD)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 font-mono-numbers"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Initial Stock Quantity</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={stockCount}
                    onChange={(e) => setStockCount(e.target.value)}
                    className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 font-mono-numbers"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Select High-Resolution Showcase Photo</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Artisan Baby Toys', url: '/src/assets/images/baby_wooden_toys_1791611885583.jpg' },
                    { label: 'Creative STEM Discovery', url: '/src/assets/images/stem_creative_blocks_1791611897026.jpg' },
                    { label: 'Nursery & Apparel Set', url: '/src/assets/images/hero_kids_wonderland_1791611873157.jpg' }
                  ].map((img, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setImageOption(img.url)}
                      className={`relative aspect-4/3 rounded-xl overflow-hidden border text-left transition-all ${
                        imageOption === img.url
                          ? 'border-amber-600 ring-2 ring-amber-600'
                          : 'border-stone-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                      <div className="absolute inset-x-0 bottom-0 bg-stone-900/70 p-1.5 text-[10px] text-white font-medium truncate">
                        {img.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Verified Child Safety Badges Checkbox Group */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Child Safety & Materials Certifications (Select all that apply)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(
                    [
                      'Non-Toxic Dye',
                      '100% GOTS Organic',
                      'BPA & Phthalate Free',
                      'ASTM / CE Certified',
                      'FSC Certified Beechwood',
                      'Choke-Hazard Tested'
                    ] as SafetyBadge[]
                  ).map((badge) => {
                    const isChecked = selectedBadges.includes(badge);
                    return (
                      <button
                        type="button"
                        key={badge}
                        onClick={() => toggleBadge(badge)}
                        className={`p-2 rounded-lg border text-xs text-left flex items-center gap-1.5 transition-all ${
                          isChecked
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold'
                            : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                        }`}
                      >
                        <ShieldCheck className={`w-3.5 h-3.5 ${isChecked ? 'text-emerald-600' : 'text-stone-400'}`} />
                        <span className="text-[11px] truncate">{badge}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Materials Specification</label>
                <input
                  type="text"
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Product Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain developmental benefits, tactile feeling, and care instructions..."
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('products')}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                >
                  Publish to Marketplace
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 3: Vendor Fulfillment Orders */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="p-5 border-b border-stone-200">
              <h3 className="font-bold text-stone-900 text-sm">Customer Orders Assigned to {currentVendor.name}</h3>
              <p className="text-xs text-stone-500">Direct courier dispatches and packing slips.</p>
            </div>

            {vendorOrders.length === 0 ? (
              <div className="p-12 text-center text-stone-500 space-y-2">
                <Package className="w-8 h-8 mx-auto text-stone-300" />
                <p className="font-semibold text-stone-800 text-sm">No new orders waiting for dispatch</p>
                <p className="text-xs">When shoppers checkout with your items, your dispatch list will appear here.</p>
              </div>
            ) : (
              <div className="divide-y divide-stone-100">
                {vendorOrders.map((order) => {
                  const shipment = order.shipments.find(s => s.vendorId === currentVendor.id);
                  if (!shipment) return null;
                  return (
                    <div key={order.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-900 text-sm">Order #{order.orderNumber}</span>
                          <span className="text-xs text-stone-400">·</span>
                          <span className="text-xs text-stone-500">{order.date}</span>
                          <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded">
                            {shipment.status}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600">
                          Parent: <strong>{order.customerName}</strong> ({order.customerPhone})
                          {order.childName && ` • Child: ${order.childName} (${order.childAge || 'Age 0-10'})`}
                        </p>
                        <p className="text-xs text-stone-500">Destination: {order.shippingAddress}</p>
                        <div className="text-xs text-stone-700 font-medium pt-1">
                          Items to pack: {shipment.items.map(i => `${i.quantity}x ${i.product.title}`).join(', ')}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-base font-bold font-mono-numbers text-stone-900 block">
                          Payout: ${shipment.subtotal.toFixed(2)}
                        </span>
                        <span className="text-xs text-stone-400 font-mono-numbers">
                          Track: {shipment.trackingNumber}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Register New Maker Modal */}
      {showNewVendorModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <h3 className="text-base font-bold text-stone-900">Register New Children's Workshop</h3>
            <form onSubmit={handleCreateVendor} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Workshop / Brand Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Whispering Willow Toys"
                  value={newVendorName}
                  onChange={(e) => setNewVendorName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-900"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">City & Region</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Oslo, Norway"
                  value={newVendorLocation}
                  onChange={(e) => setNewVendorLocation(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-900"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Specialty</label>
                <input
                  type="text"
                  value={newVendorSpecialty}
                  onChange={(e) => setNewVendorSpecialty(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-900"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Short Mission & Craft Story</label>
                <textarea
                  rows={3}
                  value={newVendorStory}
                  onChange={(e) => setNewVendorStory(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-900"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewVendorModal(false)}
                  className="px-3 py-1.5 text-stone-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 text-white font-bold rounded-lg"
                >
                  Create Workshop Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
