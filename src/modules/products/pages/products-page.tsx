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
  Trash2,
  Copy,
  AlertTriangle,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { AddProductModal } from '@/shared/components/modals/AddProductModal';

interface Product {
  id: string;
  name: string;
  category: string;
  categoryBg: string;
  brand: string;
  sku: string;
  stock: number;
  lowStockAlert?: boolean;
  outOfStockAlert?: boolean;
  retailPrice: number;
  wholesalePrice: number;
  status: 'Live' | 'Hidden' | 'Draft';
  onOffer: boolean;
  discountPct?: number;
  updatedAt: string;
  avatarLetter: string;
  avatarBg: string;
}

export const ProductsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'published' | 'unpublished' | 'draft' | 'on_offer'>('all');
  const [search, setSearch] = useState('');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);

  // Editable fields in modal
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editBrand, setEditBrand] = useState('');
  const [editStock, setEditStock] = useState(0);
  const [editRetail, setEditRetail] = useState(0);
  const [editWholesale, setEditWholesale] = useState(0);
  const [editVisibility, setEditVisibility] = useState<'Live' | 'Hidden' | 'Draft'>('Live');
  const [editOfferEnabled, setEditOfferEnabled] = useState(false);
  const [editDiscountPct, setEditDiscountPct] = useState(0);

  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Organic Whole Milk 2L', category: 'Dairy & Eggs', categoryBg: 'bg-[#EEF1F8] text-[#384E85]', brand: 'FarmFresh', sku: 'DAI-WM-2L', stock: 480, retailPrice: 32.50, wholesalePrice: 26.00, status: 'Live', onOffer: true, discountPct: 15, updatedAt: '2026-06-12', avatarLetter: 'O', avatarBg: 'bg-[#EEF1F8] text-[#384E85]' },
    { id: '2', name: 'Free-Range Eggs 12pk', category: 'Dairy & Eggs', categoryBg: 'bg-[#EEF1F8] text-[#384E85]', brand: 'NatureCoop', sku: 'DAI-EG-12', stock: 320, retailPrice: 45.00, wholesalePrice: 36.00, status: 'Live', onOffer: false, updatedAt: '2026-06-12', avatarLetter: 'F', avatarBg: 'bg-[#EEF1F8] text-[#384E85]' },
    { id: '3', name: 'Sourdough Bread 500g', category: 'Bakery', categoryBg: 'bg-[#FFFBEB] text-[#D97706]', brand: 'ArtisanBake', sku: 'BAK-SD-500', stock: 95, retailPrice: 28.00, wholesalePrice: 22.00, status: 'Live', onOffer: false, updatedAt: '2026-06-11', avatarLetter: 'S', avatarBg: 'bg-[#FFFBEB] text-[#D97706]' },
    { id: '4', name: 'Chicken Breast 1kg', category: 'Meat & Poultry', categoryBg: 'bg-[#FEF2F2] text-[#EF4444]', brand: 'FreshFarm', sku: 'MEA-CB-1K', stock: 210, retailPrice: 89.00, wholesalePrice: 72.00, status: 'Live', onOffer: true, discountPct: 20, updatedAt: '2026-06-11', avatarLetter: 'C', avatarBg: 'bg-[#FEF2F2] text-[#EF4444]' },
    { id: '5', name: 'Organic Bananas 1kg', category: 'Fresh Produce', categoryBg: 'bg-[#ECFDF5] text-[#10B981]', brand: 'TropicFresh', sku: 'FRU-BA-1K', stock: 8, lowStockAlert: true, retailPrice: 12.00, wholesalePrice: 9.50, status: 'Live', onOffer: false, updatedAt: '2026-06-10', avatarLetter: 'O', avatarBg: 'bg-[#ECFDF5] text-[#10B981]' },
    { id: '6', name: 'Greek Yogurt 500g', category: 'Dairy & Eggs', categoryBg: 'bg-[#EEF1F8] text-[#384E85]', brand: 'MediterraFarm', sku: 'DAI-GY-500', stock: 165, retailPrice: 38.00, wholesalePrice: 30.00, status: 'Live', onOffer: false, updatedAt: '2026-06-10', avatarLetter: 'G', avatarBg: 'bg-[#EEF1F8] text-[#384E85]' },
    { id: '7', name: 'Coca-Cola 2L', category: 'Beverages', categoryBg: 'bg-[#ECFEFF] text-[#0891B2]', brand: 'Coca-Cola', sku: 'BEV-CC-2L', stock: 540, retailPrice: 18.50, wholesalePrice: 14.00, status: 'Live', onOffer: true, discountPct: 10, updatedAt: '2026-06-09', avatarLetter: 'C', avatarBg: 'bg-[#ECFEFF] text-[#0891B2]' },
    { id: '8', name: 'Keto Granola 400g', category: 'Snacks', categoryBg: 'bg-[#F5F3FF] text-[#7C3AED]', brand: 'KetoLife', sku: 'SNK-KG-400', stock: 0, outOfStockAlert: true, retailPrice: 65.00, wholesalePrice: 52.00, status: 'Hidden', onOffer: false, updatedAt: '2026-06-08', avatarLetter: 'K', avatarBg: 'bg-[#F5F3FF] text-[#7C3AED]' }
  ]);

  const toggleStatus = (id: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id !== id) return p;
      return { ...p, status: p.status === 'Live' ? 'Hidden' : 'Live' };
    }));
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.sku.toLowerCase().includes(search.toLowerCase()) || 
                          p.category.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === 'published') return p.status === 'Live';
    if (filter === 'unpublished') return p.status === 'Hidden';
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
      updatedAt: '2026-06-12'
    } : p));
    setEditProduct(null);
  };

  const handleDeleteConfirm = () => {
    if (!deleteProduct) return;
    setProducts(prev => prev.filter(p => p.id !== deleteProduct.id));
    setDeleteProduct(null);
  };

  const liveCount = products.filter(p => p.status === 'Live').length;

  return (
    <div className="space-y-5 select-none pb-10">
      
      {/* Header (Matching User Screenshot) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-extrabold text-[#0F1629] tracking-tight">Product List</h1>
          <p className="text-[13px] text-[#7A8299] mt-0.5">{products.length} products · <span className="font-semibold text-[#10B981]">{liveCount} live</span></p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-[38px] px-3.5 rounded-[12px] border border-[#384E85]/20 bg-white text-[#4A5568] text-[12.5px] font-semibold flex items-center gap-2 hover:bg-gray-50 transition cursor-pointer">
            <Download className="w-3.5 h-3.5 text-[#7A8299]" />
            <span>Export Data</span>
          </button>
          <button 
            onClick={() => setIsAddProductOpen(true)}
            className="h-[38px] px-4 rounded-[12px] bg-gradient-to-r from-[#384E85] to-[#2A3A65] text-white text-[12.5px] font-bold flex items-center gap-2 shadow-[0px_4px_14px_rgba(56,78,133,0.3)] hover:opacity-95 transition cursor-pointer border-none"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Card (Exact User Screenshot Design) */}
      <Card className="p-4 bg-white border border-[rgba(56,78,133,0.07)] rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)] space-y-4">
        
        {/* Top Control Bar: Left Search + Right Plain Text Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Input (Left side) */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A8299]" />
            <input
              type="text"
              placeholder="Search by name, SKU, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-[38px] pl-10 pr-3 bg-[#F4F5F8] border border-transparent rounded-[12px] text-[13px] text-[#0F1629] placeholder-[#9CA3AF] outline-none"
            />
          </div>

          {/* Plain Text Filter Tabs (Right side - Matching Screenshot Exactly) */}
          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: 'All' },
              { id: 'published', label: 'Published' },
              { id: 'unpublished', label: 'Unpublished' },
              { id: 'draft', label: 'Draft' },
              { id: 'on_offer', label: 'On Offer' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3 py-1.5 text-[12.5px] font-semibold transition cursor-pointer border-none rounded-[8px] ${
                  filter === tab.id
                    ? 'bg-[#384E85] text-white shadow-xs'
                    : 'text-[#7A8299] hover:text-[#0F1629] bg-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Table (Matching User Screenshot Layout) */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#FAFAFA] border-b border-[rgba(56,78,133,0.07)] text-[#7A8299] font-bold uppercase tracking-[0.5px] text-[11px]">
              <tr>
                <th className="py-3.5 px-4">PRODUCT</th>
                <th className="py-3.5 px-4">CATEGORY</th>
                <th className="py-3.5 px-4">SKU</th>
                <th className="py-3.5 px-4">STOCK</th>
                <th className="py-3.5 px-4">RETAIL</th>
                <th className="py-3.5 px-4">WHOLESALE</th>
                <th className="py-3.5 px-4">STATUS</th>
                <th className="py-3.5 px-4">UPDATED</th>
                <th className="py-3.5 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(56,78,133,0.06)]">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-[#FAFAFA] transition">
                  
                  {/* Product Cell with Avatar Letter, Title, Brand & Discount Badge */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-[40px] h-[40px] rounded-[12px] ${p.avatarBg} flex items-center justify-center font-bold text-[15px] shrink-0`}>
                        {p.avatarLetter}
                      </div>
                      <div>
                        <div className="font-bold text-[#0F1629] text-[13.5px]">{p.name}</div>
                        <div className="text-[11.5px] text-[#7A8299]">{p.brand}</div>
                        {p.onOffer && (
                          <div className="mt-1">
                            <span className="px-1.5 py-0.5 rounded-[4px] text-[9.5px] font-extrabold bg-[#FEF2F2] text-[#EF4444] border border-[#EF4444]/15 inline-flex items-center gap-1">
                              <Tag className="w-2.5 h-2.5" />
                              {p.discountPct}% OFF
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Category Pill Badge */}
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-[8px] text-[11px] font-semibold ${p.categoryBg}`}>
                      {p.category}
                    </span>
                  </td>

                  {/* SKU */}
                  <td className="py-4 px-4 font-mono text-[12px] text-[#7A8299]">{p.sku}</td>

                  {/* Stock Column with Low Stock / Out of Stock Badges */}
                  <td className="py-4 px-4">
                    <div>
                      <div className={`font-extrabold text-[13.5px] ${
                        p.outOfStockAlert ? 'text-[#EF4444]' : p.lowStockAlert ? 'text-[#D97706]' : 'text-[#0F1629]'
                      }`}>
                        {p.stock}
                      </div>
                      {p.lowStockAlert && (
                        <div className="text-[9.5px] font-bold text-[#D97706] uppercase tracking-[0.3px]">LOW STOCK</div>
                      )}
                      {p.outOfStockAlert && (
                        <div className="text-[9.5px] font-bold text-[#EF4444] uppercase tracking-[0.3px]">OUT OF STOCK</div>
                      )}
                    </div>
                  </td>

                  {/* Retail Price with EGP */}
                  <td className="py-4 px-4 font-extrabold text-[#0F1629]">
                    {p.retailPrice.toFixed(2)} <span className="text-[10.5px] text-[#7A8299] font-normal">EGP</span>
                  </td>

                  {/* Wholesale Price with EGP */}
                  <td className="py-4 px-4 font-bold text-[#384E85]">
                    {p.wholesalePrice.toFixed(2)} <span className="text-[10.5px] text-[#7A8299] font-normal">EGP</span>
                  </td>

                  {/* Status Cell with Live/Hidden text and inline Switch Toggle (Screenshot Match) */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-[12px] font-bold ${
                        p.status === 'Live' ? 'text-[#10B981]' : p.status === 'Hidden' ? 'text-[#7A8299]' : 'text-[#D97706]'
                      }`}>
                        {p.status}
                      </span>
                      <button
                        onClick={() => toggleStatus(p.id)}
                        className={`w-9 h-5 rounded-full p-0.5 transition duration-200 cursor-pointer border-none ${
                          p.status === 'Live' ? 'bg-[#10B981]' : 'bg-[#CBD5E0]'
                        }`}
                        title="Toggle Status"
                      >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          p.status === 'Live' ? 'translate-x-4' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>
                  </td>

                  {/* Updated Date */}
                  <td className="py-4 px-4 text-[#7A8299] text-[12px] font-mono">{p.updatedAt}</td>

                  {/* Actions Column (View, Edit, Duplicate, Delete) */}
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setViewProduct(p)}
                        className="w-7 h-7 rounded-[7px] bg-[#EEF1F8] hover:bg-[#E2E7F3] text-[#384E85] flex items-center justify-center cursor-pointer transition border-none"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => openEditModal(p)}
                        className="w-7 h-7 rounded-[7px] bg-[#EEF1F8] hover:bg-[#E2E7F3] text-[#384E85] flex items-center justify-center cursor-pointer transition border-none"
                        title="Edit Product"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          const dup: Product = { ...p, id: String(Date.now()), name: `${p.name} (Copy)`, sku: `${p.sku}-COPY` };
                          setProducts(prev => [...prev, dup]);
                        }}
                        className="w-7 h-7 rounded-[7px] bg-[#EEF1F8] hover:bg-[#E2E7F3] text-[#384E85] flex items-center justify-center cursor-pointer transition border-none"
                        title="Duplicate Product"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteProduct(p)}
                        className="w-7 h-7 rounded-[7px] bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#EF4444] flex items-center justify-center cursor-pointer transition border-none"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar (Matching Screenshot Footer) */}
        <div className="pt-3 border-t border-[#384E85]/8 flex items-center justify-between text-[12.5px] text-[#7A8299]">
          <div>Showing 1–8 of {products.length}</div>
          <div className="flex items-center gap-1.5">
            <button className="w-7 h-7 rounded-[8px] border border-[#384E85]/15 bg-white text-[#7A8299] flex items-center justify-center cursor-pointer hover:bg-gray-50">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="w-7 h-7 rounded-[8px] bg-[#384E85] text-white flex items-center justify-center font-bold text-[12px]">
              1
            </button>
            <button className="w-7 h-7 rounded-[8px] border border-[#384E85]/15 bg-white text-[#7A8299] flex items-center justify-center font-semibold text-[12px] hover:bg-gray-50">
              2
            </button>
            <button className="w-7 h-7 rounded-[8px] border border-[#384E85]/15 bg-white text-[#7A8299] flex items-center justify-center cursor-pointer hover:bg-gray-50">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </Card>

      {/* VIEW PRODUCT DETAILS MODAL */}
      {viewProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[520px] overflow-hidden flex flex-col animate-fadeIn border-none select-none">
            <div className="px-6 py-4 bg-gradient-to-r from-[#384E85] to-[#2A3A65] text-white flex items-center justify-between">
              <div>
                <h3 className="text-[16px] font-bold">{viewProduct.name}</h3>
                <p className="text-[11px] text-white/70 font-mono">{viewProduct.sku} · {viewProduct.brand}</p>
              </div>
              <button onClick={() => setViewProduct(null)} className="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center border-none cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-[13px]">
              <div className="grid grid-cols-2 gap-4 bg-[#FAFAFA] p-4 rounded-[16px] border border-gray-200">
                <div>
                  <div className="text-[11px] text-[#7A8299]">Category</div>
                  <div className="font-bold text-[#0F1629] mt-0.5">{viewProduct.category}</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#7A8299]">Status</div>
                  <div className="font-bold text-[#10B981] mt-0.5">{viewProduct.status}</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#7A8299]">Retail Price</div>
                  <div className="font-extrabold text-[#0F1629] mt-0.5">{viewProduct.retailPrice.toFixed(2)} EGP</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#7A8299]">Wholesale Price</div>
                  <div className="font-extrabold text-[#384E85] mt-0.5">{viewProduct.wholesalePrice.toFixed(2)} EGP</div>
                </div>
              </div>

              <div className="p-4 bg-[#EEF1F8]/50 border border-[#384E85]/10 rounded-[14px] flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-[#7A8299]">Current Stock</div>
                  <div className="text-[20px] font-extrabold text-[#384E85]">{viewProduct.stock} units</div>
                </div>
                {viewProduct.onOffer && (
                  <span className="px-3 py-1 rounded-full bg-[#ECFDF5] text-[#10B981] text-[12px] font-bold border border-[#10B981]/20">
                    🔥 {viewProduct.discountPct}% OFF Promo
                  </span>
                )}
              </div>
            </div>

            <div className="px-6 py-3.5 bg-[#FAFAFA] border-t border-gray-100 flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => setViewProduct(null)}>Close</Button>
              <button
                onClick={() => { setViewProduct(null); openEditModal(viewProduct); }}
                className="h-9 px-4 rounded-[12px] bg-gradient-to-r from-[#384E85] to-[#2A3A65] text-white text-[12.5px] font-bold flex items-center gap-1.5 transition cursor-pointer border-none"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT PRODUCT MODAL (Figma Node 1:43822) */}
      {editProduct && (
        <div className="fixed inset-0 z-50 bg-[#0F1629]/50 backdrop-blur-xs flex items-center justify-center p-4 select-none">
          <div className="bg-white rounded-[22px] shadow-[0px_40px_80px_rgba(0,0,0,0.2)] w-full max-w-[740px] max-h-[90vh] overflow-hidden flex flex-col animate-fadeIn border-none">
            
            {/* Header (Figma 1:43822) */}
            <div className="px-[24px] py-[18px] bg-gradient-to-r from-[#384E85] to-[#2A3A65] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-[12px]">
                <div className="w-[36px] h-[36px] rounded-[11px] bg-white/15 text-white flex items-center justify-center shrink-0">
                  <Edit3 className="w-[17px] h-[17px]" />
                </div>
                <div>
                  <h3 className="text-[15px] font-extrabold text-white leading-[22.5px]">Edit Product</h3>
                  <p className="text-[11px] text-white/70 font-mono leading-[16.5px]">{editProduct.sku}</p>
                </div>
              </div>
              <button 
                onClick={() => setEditProduct(null)} 
                className="w-[32px] h-[32px] rounded-[10px] bg-white/15 hover:bg-white/25 text-white flex items-center justify-center border-none cursor-pointer transition"
              >
                <X className="w-[16px] h-[16px]" />
              </button>
            </div>

            {/* Modal Body: 2 Columns (Figma 1:43822) */}
            <div className="p-[24px] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-[24px] text-[12.5px] flex-1">
              
              {/* Left Column: Product Info & Visibility */}
              <div className="space-y-[14px]">
                <div className="text-[11px] font-bold text-[#384E85] tracking-[0.5px] uppercase">Product Info</div>
                
                {/* Product Name */}
                <div>
                  <label className="block text-[12px] font-semibold text-[#4A5568] mb-[6px]">
                    Product Name <span className="text-[#EF4444]">*</span>
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full h-[41.5px] px-[13px] bg-[#F4F5F8] border border-transparent rounded-[12px] text-[13px] text-[#0F1629] outline-none focus:border-[#384E85]/30 transition"
                  />
                </div>

                {/* Category & Brand */}
                <div className="grid grid-cols-2 gap-[12px]">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#4A5568] mb-[6px]">
                      Category <span className="text-[#EF4444]">*</span>
                    </label>
                    <input
                      type="text"
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="w-full h-[41.5px] px-[13px] bg-[#F4F5F8] border border-transparent rounded-[12px] text-[13px] text-[#0F1629] outline-none focus:border-[#384E85]/30 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-[#4A5568] mb-[6px]">Brand</label>
                    <input
                      type="text"
                      value={editBrand}
                      onChange={(e) => setEditBrand(e.target.value)}
                      className="w-full h-[41.5px] px-[13px] bg-[#F4F5F8] border border-transparent rounded-[12px] text-[13px] text-[#0F1629] outline-none focus:border-[#384E85]/30 transition"
                    />
                  </div>
                </div>

                {/* SKU & Stock */}
                <div className="grid grid-cols-2 gap-[12px]">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#4A5568] mb-[6px]">SKU</label>
                    <input
                      type="text"
                      value={editProduct.sku}
                      disabled
                      className="w-full h-[41.5px] px-[13px] bg-[#F4F5F8] border border-transparent rounded-[12px] text-[13px] text-[#0F1629] font-mono outline-none opacity-80 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-[#4A5568] mb-[6px]">Stock Quantity</label>
                    <input
                      type="number"
                      value={editStock}
                      onChange={(e) => setEditStock(Number(e.target.value))}
                      className="w-full h-[41.5px] px-[13px] bg-[#F4F5F8] border border-transparent rounded-[12px] text-[13px] text-[#0F1629] font-mono outline-none focus:border-[#384E85]/30 transition"
                    />
                  </div>
                </div>

                {/* Visibility Section Header & 3 Pills (Figma 1:43822) */}
                <div className="pt-[6px]">
                  <div className="text-[11px] font-bold text-[#384E85] tracking-[0.5px] uppercase mb-[8px]">Visibility</div>
                  <div className="flex gap-[8px] items-center">
                    <button
                      type="button"
                      onClick={() => setEditVisibility('Live')}
                      className={`flex-1 py-[10px] rounded-[12px] text-[12px] font-bold transition cursor-pointer border-2 ${
                        editVisibility === 'Live'
                          ? 'bg-[#ECFDF5] border-[#10B981] text-[#10B981]'
                          : 'bg-[#FAFAFA] border-[#384E85]/12 text-[#7A8299] hover:bg-gray-100'
                      }`}
                    >
                      Live
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditVisibility('Hidden')}
                      className={`flex-1 py-[10px] rounded-[12px] text-[12px] font-bold transition cursor-pointer border-2 ${
                        editVisibility === 'Hidden'
                          ? 'bg-[#FEF2F2] border-[#EF4444] text-[#EF4444]'
                          : 'bg-[#FAFAFA] border-[#384E85]/12 text-[#7A8299] hover:bg-gray-100'
                      }`}
                    >
                      Hidden
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditVisibility('Draft')}
                      className={`flex-1 py-[10px] rounded-[12px] text-[12px] font-bold transition cursor-pointer border-2 ${
                        editVisibility === 'Draft'
                          ? 'bg-[#FFFBEB] border-[#D97706] text-[#D97706]'
                          : 'bg-[#FAFAFA] border-[#384E85]/12 text-[#7A8299] hover:bg-gray-100'
                      }`}
                    >
                      Draft
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Pricing & Offer (Figma 1:43822) */}
              <div className="space-y-[14px]">
                <div className="text-[11px] font-bold text-[#384E85] tracking-[0.5px] uppercase">Pricing</div>
                
                {/* Retail & Wholesale Prices */}
                <div className="grid grid-cols-2 gap-[12px]">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#4A5568] mb-[6px]">
                      Retail Price (EGP) <span className="text-[#EF4444]">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={editRetail}
                      onChange={(e) => setEditRetail(Number(e.target.value))}
                      className="w-full h-[41.5px] px-[13px] bg-[#F4F5F8] border border-transparent rounded-[12px] text-[13px] text-[#0F1629] font-mono outline-none focus:border-[#384E85]/30 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-[#4A5568] mb-[6px]">Wholesale Price (EGP)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={editWholesale}
                      onChange={(e) => setEditWholesale(Number(e.target.value))}
                      className="w-full h-[41.5px] px-[13px] bg-[#F4F5F8] border border-transparent rounded-[12px] text-[13px] text-[#0F1629] font-mono outline-none focus:border-[#384E85]/30 transition"
                    />
                  </div>
                </div>

                {/* Wholesale Margin Summary Card (Figma 1:43822) */}
                <div className="bg-gradient-to-br from-[#EEF1F8] to-[#E8EDF8] border border-[#384E85]/12 rounded-[14px] px-[15px] py-[13px] space-y-[4px]">
                  <div className="flex items-center justify-between py-[4px] border-b border-[#384E85]/8">
                    <span className="text-[12px] text-[#7A8299]">Retail Price</span>
                    <span className="text-[12px] font-bold font-mono text-[#384E85]">{editRetail.toFixed(2)} EGP</span>
                  </div>
                  <div className="flex items-center justify-between py-[4px] border-b border-[#384E85]/8">
                    <span className="text-[12px] text-[#7A8299]">Wholesale Price</span>
                    <span className="text-[12px] font-bold font-mono text-[#384E85]">{editWholesale.toFixed(2)} EGP</span>
                  </div>
                  <div className="flex items-center justify-between py-[4px]">
                    <span className="text-[12px] text-[#7A8299]">Wholesale Margin</span>
                    <span className="text-[12px] font-bold font-mono text-[#384E85]">
                      {editRetail > 0 ? (((editRetail - editWholesale) / editRetail) * 100).toFixed(1) : '0.0'}%
                    </span>
                  </div>
                </div>

                {/* Offer / Promotion Header (Figma 1:43822) */}
                <div className="pt-[4px]">
                  <div className="text-[11px] font-bold text-[#384E85] tracking-[0.5px] uppercase mb-[8px]">Offer / Promotion</div>
                  
                  {/* Promotion Card (Figma 1:43822) */}
                  <div className="bg-[#FFF8F8] border border-[#EF4444]/18 rounded-[14px] p-[15px] space-y-[12px]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-[8px]">
                        <div className="w-[26px] h-[26px] rounded-[7px] bg-[#FEF2F2] flex items-center justify-center text-[#EF4444]">
                          <Tag className="w-[13px] h-[13px]" />
                        </div>
                        <div>
                          <div className="text-[13px] font-semibold text-[#0F1629]">Enable Offer</div>
                          <div className="text-[10px] text-[#7A8299]">Set a discounted price</div>
                        </div>
                      </div>

                      {/* Switch Toggle Button */}
                      <button
                        type="button"
                        onClick={() => setEditOfferEnabled(!editOfferEnabled)}
                        className={`w-[40px] h-[22px] rounded-[11px] p-[3px] transition duration-200 cursor-pointer border-none ${
                          editOfferEnabled ? 'bg-[#EF4444]' : 'bg-[#CBD5E0]'
                        }`}
                      >
                        <div className={`w-[16px] h-[16px] rounded-full bg-white transition-transform ${
                          editOfferEnabled ? 'translate-x-[17px]' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>

                    {editOfferEnabled && (
                      <>
                        <div>
                          <label className="block text-[12px] font-semibold text-[#4A5568] mb-[6px]">Discount %</label>
                          <input
                            type="number"
                            value={editDiscountPct}
                            onChange={(e) => setEditDiscountPct(Number(e.target.value))}
                            className="w-full h-[41.5px] px-[13px] bg-[#F4F5F8] border border-transparent rounded-[12px] text-[13px] text-[#0F1629] font-mono outline-none focus:border-[#EF4444]/30 transition"
                          />
                        </div>

                        {/* Customer Sees Preview Box (Figma 1:43822) */}
                        <div className="bg-white border border-[#EF4444]/15 rounded-[10px] px-[13px] py-[11px] space-y-[4px]">
                          <div className="text-[10px] font-bold text-[#7A8299] uppercase">Customer sees</div>
                          <div className="flex items-center gap-[8px]">
                            <span className="text-[12px] text-[#7A8299] line-through font-mono">
                              {Math.round(editRetail)} EGP
                            </span>
                            <span className="bg-[#EF4444] text-white text-[10px] font-extrabold px-[6px] py-[2px] rounded-[5px]">
                              {editDiscountPct}% OFF
                            </span>
                            <span className="text-[16px] font-extrabold text-[#10B981] font-mono">
                              {(editRetail * (1 - editDiscountPct / 100)).toFixed(0)} EGP
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

              </div>

            </div>

            {/* Footer (Figma 1:43822) */}
            <div className="px-[24px] py-[15px] bg-[#FAFAFA] border-t border-[#384E85]/8 flex items-center justify-end gap-[10px] shrink-0">
              <button
                type="button"
                onClick={() => setEditProduct(null)}
                className="px-[19px] py-[10px] rounded-[12px] border border-[#384E85]/18 text-[#4A5568] text-[13px] font-semibold hover:bg-gray-100 transition cursor-pointer bg-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveProduct}
                className="px-[22px] py-[9px] rounded-[12px] bg-gradient-to-r from-[#384E85] to-[#2A3A65] text-white text-[13px] font-bold shadow-[0px_4px_7px_rgba(56,78,133,0.28)] flex items-center gap-[6px] hover:opacity-95 transition cursor-pointer border-none"
              >
                <Check className="w-[14px] h-[14px]" /> Save Changes
              </button>
            </div>

          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 select-none">
          <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[440px] overflow-hidden flex flex-col border-none">
            <div className="px-6 py-4 bg-[#FEF2F2] border-b border-[#EF4444]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#EF4444] text-white flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#991B1B]">Delete Product</h3>
                  <p className="text-[11px] text-[#991B1B]/80">{deleteProduct.name}</p>
                </div>
              </div>
              <button onClick={() => setDeleteProduct(null)} className="w-7 h-7 rounded-full bg-white/50 text-[#991B1B] flex items-center justify-center border-none cursor-pointer">
                ✕
              </button>
            </div>

            <div className="p-6 space-y-2 text-[13px]">
              <p className="text-[#4A5568]">Are you sure you want to delete <strong>{deleteProduct.name}</strong> ({deleteProduct.sku})? This action cannot be undone.</p>
            </div>

            <div className="px-6 py-3.5 bg-[#FAFAFA] border-t border-gray-100 flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => setDeleteProduct(null)}>Cancel</Button>
              <button
                onClick={handleDeleteConfirm}
                className="h-9 px-4 rounded-[12px] bg-[#EF4444] hover:bg-[#DC2626] text-white text-[12.5px] font-bold flex items-center gap-1.5 transition cursor-pointer border-none"
              >
                <Trash2 className="w-4 h-4" /> Delete Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      <AddProductModal 
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
      />
    </div>
  );
};
