import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Tag, 
  Package, 
  Download, 
  Check, 
  X, 
  Eye, 
  EyeOff, 
  AlertTriangle,
  Percent
} from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';

interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  sku: string;
  stock: number;
  retailPrice: number;
  wholesalePrice: number;
  status: 'Published' | 'Unpublished' | 'Draft';
  onOffer: boolean;
  discountPct?: number;
  updatedAt: string;
  iconBg: string;
}

export const ProductsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'published' | 'unpublished' | 'draft' | 'on_offer'>('all');
  const [search, setSearch] = useState('');
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  // Editable fields in modal
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editBrand, setEditBrand] = useState('');
  const [editStock, setEditStock] = useState(0);
  const [editRetail, setEditRetail] = useState(0);
  const [editWholesale, setEditWholesale] = useState(0);
  const [editVisibility, setEditVisibility] = useState<'Published' | 'Unpublished' | 'Draft'>('Published');
  const [editOfferEnabled, setEditOfferEnabled] = useState(false);
  const [editDiscountPct, setEditDiscountPct] = useState(0);

  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Organic Whole Milk 2L', category: 'Dairy & Eggs', brand: 'FarmFresh', sku: 'DAI-WM-2L', stock: 480, retailPrice: 32.50, wholesalePrice: 26.00, status: 'Published', onOffer: true, discountPct: 15, updatedAt: '10 min ago', iconBg: 'bg-[#EEF1F8] text-[#384E85]' },
    { id: '2', name: 'Artisan Sourdough Bread 500g', category: 'Bakery', brand: 'BakeHouse', sku: 'BAK-SB-500', stock: 120, retailPrice: 18.00, wholesalePrice: 14.50, status: 'Published', onOffer: false, updatedAt: '1 hour ago', iconBg: 'bg-[#FFFBEB] text-[#D97706]' },
    { id: '3', name: 'Fresh Boneless Chicken Breast 1kg', category: 'Meat & Poultry', brand: 'FreshPoultry', sku: 'MEA-CB-1K', stock: 85, retailPrice: 95.00, wholesalePrice: 78.00, status: 'Published', onOffer: true, discountPct: 10, updatedAt: '3 hours ago', iconBg: 'bg-[#FEF2F2] text-[#EF4444]' },
    { id: '4', name: 'Egyptian Hass Avocados (Net 6)', category: 'Produce', brand: 'NileGreens', sku: 'PRO-AV-6P', stock: 0, retailPrice: 45.00, wholesalePrice: 36.00, status: 'Unpublished', onOffer: false, updatedAt: '5 hours ago', iconBg: 'bg-[#ECFDF5] text-[#10B981]' },
    { id: '5', name: 'Extra Virgin Olive Oil 750ml', category: 'Pantry', brand: 'OliveGold', sku: 'PAN-OO-750', stock: 240, retailPrice: 135.00, wholesalePrice: 110.00, status: 'Published', onOffer: false, updatedAt: 'Yesterday', iconBg: 'bg-[#FFF7ED] text-[#F97316]' },
    { id: '6', name: 'Sparkling Mineral Water 1.5L', category: 'Beverages', brand: 'AquaPure', sku: 'BEV-MW-1.5', stock: 600, retailPrice: 12.00, wholesalePrice: 9.50, status: 'Published', onOffer: true, discountPct: 20, updatedAt: 'Yesterday', iconBg: 'bg-[#ECFEFF] text-[#0891B2]' },
    { id: '7', name: 'Keto Granola Berry Crunch 400g', category: 'Snacks', brand: 'KetoFit', sku: 'SNA-KG-400', stock: 45, retailPrice: 88.00, wholesalePrice: 72.00, status: 'Draft', onOffer: false, updatedAt: '2 days ago', iconBg: 'bg-[#F5F3FF] text-[#7C3AED]' },
    { id: '8', name: 'Greek Style Plain Yogurt 500g', category: 'Dairy & Eggs', brand: 'FarmFresh', sku: 'DAI-GY-500', stock: 310, retailPrice: 24.00, wholesalePrice: 19.00, status: 'Published', onOffer: false, updatedAt: '3 days ago', iconBg: 'bg-[#EEF1F8] text-[#384E85]' },
  ]);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.sku.toLowerCase().includes(search.toLowerCase()) || 
                          p.category.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === 'published') return p.status === 'Published';
    if (filter === 'unpublished') return p.status === 'Unpublished';
    if (filter === 'draft') return p.status === 'Draft';
    if (filter === 'on_offer') return p.onOffer;
    return true;
  });

  const openEditModal = (p: Product) => {
    setEditProduct(p);
    setEditName(p.name);
    setEditCategory(p.category);
    setEditBrand(p.brand);
    setEditStock(p.stock);
    setEditRetail(p.retailPrice);
    setEditWholesale(p.wholesalePrice);
    setEditVisibility(p.status);
    setEditOfferEnabled(p.onOffer);
    setEditDiscountPct(p.discountPct || 0);
  };

  const handleSaveProduct = () => {
    if (!editProduct) return;
    setProducts(prev => prev.map(p => p.id === editProduct.id ? {
      ...p,
      name: editName,
      category: editCategory,
      brand: editBrand,
      stock: editStock,
      retailPrice: editRetail,
      wholesalePrice: editWholesale,
      status: editVisibility,
      onOffer: editOfferEnabled,
      discountPct: editOfferEnabled ? editDiscountPct : undefined,
      updatedAt: 'Just now'
    } : p));
    setEditProduct(null);
  };

  const publishedCount = products.filter(p => p.status === 'Published').length;

  return (
    <div className="space-y-6 select-none pb-10">
      {/* Metrics Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-extrabold text-[#0F1629] tracking-tight">Product Catalog</h1>
          <p className="text-[13px] text-[#7A8299] mt-0.5">{products.length} products total · <span className="font-semibold text-[#10B981]">{publishedCount} published live</span></p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
            Export Data
          </Button>
          <button className="h-[38px] px-4 rounded-[12px] bg-gradient-to-r from-[#384E85] to-[#2A3A65] text-white text-[13px] font-bold flex items-center gap-2 shadow-[0px_4px_14px_rgba(56,78,133,0.3)] hover:opacity-95 transition cursor-pointer border-none">
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Card */}
      <Card className="p-4 bg-white border border-[#384E85]/8 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A8299]" />
            <input
              type="text"
              placeholder="Search by name, SKU, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-8 pr-3 bg-[#F4F5F8] border border-transparent rounded-[10px] text-[12.5px] text-[#0F1629] outline-none"
            />
          </div>

          <div className="bg-[#F4F5F8] p-1 rounded-[12px] flex items-center gap-1 overflow-x-auto">
            {(['all', 'published', 'unpublished', 'draft', 'on_offer'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-[9px] text-[12px] font-semibold capitalize transition cursor-pointer border-none ${
                  filter === tab
                    ? 'bg-[#384E85] text-white shadow-xs'
                    : 'text-[#7A8299] hover:text-[#0F1629]'
                }`}
              >
                {tab.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#FAFAFA] border-b border-[#384E85]/8 text-[#7A8299] font-bold uppercase tracking-[0.5px] text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">SKU</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Retail Price</th>
                <th className="py-3.5 px-4">Wholesale Price</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Updated</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#384E85]/6">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-[#FAFAFA] transition">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-[10px] ${p.iconBg} flex items-center justify-center font-bold shrink-0`}>
                        <Package className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-[#0F1629] flex items-center gap-1.5">
                          {p.name}
                          {p.onOffer && (
                            <span className="px-1.5 py-0.2 rounded text-[9.5px] font-extrabold bg-[#ECFDF5] text-[#10B981] border border-[#10B981]/20">
                              {p.discountPct}% OFF
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#7A8299]">{p.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[#0F1629] font-medium">{p.category}</td>
                  <td className="py-3.5 px-4 font-mono text-[12px] text-[#7A8299]">{p.sku}</td>
                  <td className="py-3.5 px-4">
                    <span className={`font-bold font-mono ${p.stock === 0 ? 'text-[#EF4444]' : p.stock < 50 ? 'text-[#D97706]' : 'text-[#0F1629]'}`}>
                      {p.stock} units
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-[#0F1629]">${p.retailPrice.toFixed(2)}</td>
                  <td className="py-3.5 px-4 font-semibold text-[#384E85]">${p.wholesalePrice.toFixed(2)}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      p.status === 'Published' ? 'bg-[#ECFDF5] text-[#10B981]' :
                      p.status === 'Unpublished' ? 'bg-[#FEF2F2] text-[#EF4444]' : 'bg-[#FFFBEB] text-[#D97706]'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#7A8299] text-[12px]">{p.updatedAt}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => openEditModal(p)}
                      className="w-8 h-8 rounded-[8px] bg-[#EEF1F8] hover:bg-[#E2E7F3] text-[#384E85] flex items-center justify-center cursor-pointer transition border-none ml-auto"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* EDIT PRODUCT MODAL */}
      {editProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[640px] overflow-hidden flex flex-col animate-fadeIn border-none">
            <div className="px-6 py-4 bg-[#EEF1F8] border-b border-[#384E85]/12 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-[10px] bg-[#384E85] text-white flex items-center justify-center">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#0F1629]">Edit Product</h3>
                  <p className="text-[11px] text-[#7A8299] font-mono">{editProduct.sku}</p>
                </div>
              </div>
              <button onClick={() => setEditProduct(null)} className="w-7 h-7 rounded-full hover:bg-[#384E85]/10 text-[#7A8299] flex items-center justify-center border-none cursor-pointer">
                ✕
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5 text-[12.5px]">
              {/* Left Column: Info */}
              <div className="space-y-3">
                <div className="text-[11px] font-bold text-[#7A8299] uppercase tracking-[0.5px]">Product Details</div>
                <div>
                  <label className="block text-[11px] font-bold text-[#0F1629] mb-1">Product Name*</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full h-8.5 px-3 bg-[#F4F5F8] border border-[#384E85]/10 rounded-[8px] outline-none font-semibold text-[#0F1629]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#0F1629] mb-1">Category</label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="w-full h-8.5 px-2 bg-[#F4F5F8] border border-[#384E85]/10 rounded-[8px] outline-none font-semibold text-[#0F1629]"
                    >
                      <option value="Dairy & Eggs">Dairy &amp; Eggs</option>
                      <option value="Bakery">Bakery</option>
                      <option value="Meat & Poultry">Meat &amp; Poultry</option>
                      <option value="Produce">Produce</option>
                      <option value="Beverages">Beverages</option>
                      <option value="Snacks">Snacks</option>
                      <option value="Pantry">Pantry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#0F1629] mb-1">Brand</label>
                    <input
                      type="text"
                      value={editBrand}
                      onChange={(e) => setEditBrand(e.target.value)}
                      className="w-full h-8.5 px-3 bg-[#F4F5F8] border border-[#384E85]/10 rounded-[8px] outline-none font-semibold text-[#0F1629]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#0F1629] mb-1">Stock Units</label>
                    <input
                      type="number"
                      value={editStock}
                      onChange={(e) => setEditStock(Number(e.target.value))}
                      className="w-full h-8.5 px-3 bg-[#F4F5F8] border border-[#384E85]/10 rounded-[8px] outline-none font-semibold text-[#0F1629]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#0F1629] mb-1">Status</label>
                    <select
                      value={editVisibility}
                      onChange={(e) => setEditVisibility(e.target.value as any)}
                      className="w-full h-8.5 px-2 bg-[#F4F5F8] border border-[#384E85]/10 rounded-[8px] outline-none font-semibold text-[#0F1629]"
                    >
                      <option value="Published">Published</option>
                      <option value="Unpublished">Unpublished</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Right Column: Pricing & Offers */}
              <div className="space-y-3">
                <div className="text-[11px] font-bold text-[#7A8299] uppercase tracking-[0.5px]">Pricing &amp; Margins</div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#0F1629] mb-1">Retail ($)*</label>
                    <input
                      type="number"
                      step="0.5"
                      value={editRetail}
                      onChange={(e) => setEditRetail(Number(e.target.value))}
                      className="w-full h-8.5 px-3 bg-[#F4F5F8] border border-[#384E85]/10 rounded-[8px] outline-none font-extrabold text-[#0F1629]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#0F1629] mb-1">Wholesale ($)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={editWholesale}
                      onChange={(e) => setEditWholesale(Number(e.target.value))}
                      className="w-full h-8.5 px-3 bg-[#F4F5F8] border border-[#384E85]/10 rounded-[8px] outline-none font-extrabold text-[#384E85]"
                    />
                  </div>
                </div>

                {/* Margin calculation box */}
                <div className="p-3 bg-[#FAFAFA] border border-[#384E85]/10 rounded-[12px] space-y-1 text-[11.5px]">
                  <div className="flex justify-between text-[#7A8299]">
                    <span>Retail Price</span> <strong className="text-[#0F1629]">${editRetail.toFixed(2)}</strong>
                  </div>
                  <div className="flex justify-between text-[#7A8299]">
                    <span>Wholesale Price</span> <strong className="text-[#384E85]">${editWholesale.toFixed(2)}</strong>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-1">
                    <span className="font-bold text-[#0F1629]">Wholesale Margin</span>
                    <strong className="text-[#10B981]">
                      {editRetail > 0 ? (((editRetail - editWholesale) / editRetail) * 100).toFixed(1) : 0}%
                    </strong>
                  </div>
                </div>

                {/* Offer Toggle */}
                <div className="p-3 bg-[#ECFDF5] border border-[#10B981]/20 rounded-[12px] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-[#10B981]" />
                      <span className="font-bold text-[#065F46]">Enable Discount Offer</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={editOfferEnabled}
                      onChange={(e) => setEditOfferEnabled(e.target.checked)}
                      className="w-4 h-4 accent-[#10B981] cursor-pointer"
                    />
                  </div>

                  {editOfferEnabled && (
                    <div className="pt-2 border-t border-[#10B981]/15 flex items-center gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-[#065F46] mb-1">Discount %</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={editDiscountPct}
                          onChange={(e) => setEditDiscountPct(Number(e.target.value))}
                          className="w-20 h-7 px-2 bg-white border border-[#10B981]/30 rounded text-[12px] font-bold outline-none text-[#065F46]"
                        />
                      </div>
                      <div className="text-[11px] text-[#065F46] pt-3">
                        Customer pays: <strong className="text-[13px] text-[#10B981]">${(editRetail * (1 - editDiscountPct / 100)).toFixed(2)}</strong>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="px-6 py-3.5 bg-[#FAFAFA] border-t border-gray-100 flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => setEditProduct(null)}>Cancel</Button>
              <button
                onClick={handleSaveProduct}
                className="h-9 px-4 rounded-[12px] bg-[#384E85] hover:bg-[#2A3A65] text-white text-[12.5px] font-bold flex items-center gap-1.5 transition cursor-pointer border-none"
              >
                <Check className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
