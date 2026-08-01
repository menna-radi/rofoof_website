import React, { useState } from 'react';
import { X, Upload, Package as PkgIcon, Check, ArrowRight, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('Organic Whole Milk 2L');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('Dairy');
  const [brand, setBrand] = useState('FarmFresh');
  const [visible, setVisible] = useState(true);
  const [pkgType, setPkgType] = useState('piece');
  const [piecesPerPkg, setPiecesPerPkg] = useState(12);
  const [pkgsPerCarton, setPkgsPerCarton] = useState(6);
  const [invCartons, setInvCartons] = useState(0);
  const [invPackages, setInvPackages] = useState(0);
  const [invPieces, setInvPieces] = useState(0);
  const [priceRetail, setPriceRetail] = useState(45.00);
  const [priceWholesale, setPriceWholesale] = useState(38.00);
  const [priceCost, setPriceCost] = useState(29.00);
  const [promoEnabled, setPromoEnabled] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(25);
  const [promoStartDate, setPromoStartDate] = useState('2026-08-01');
  const [promoEndDate, setPromoEndDate] = useState('2026-08-31');

  if (!isOpen) return null;

  const pcsPerCarton = piecesPerPkg * pkgsPerCarton;
  const totalPieces = pkgType === 'carton'
    ? (invCartons * pcsPerCarton) + (invPackages * piecesPerPkg) + invPieces
    : pkgType === 'package'
    ? (invPackages * piecesPerPkg) + invPieces
    : invPieces;
  const profitPerUnit = (priceRetail - priceCost).toFixed(2);
  const profitMargin = priceRetail > 0 ? (((priceRetail - priceCost) / priceRetail) * 100).toFixed(1) : '0.0';
  const discountedPrice = promoEnabled ? (priceRetail * (1 - promoDiscount / 100)).toFixed(2) : priceRetail.toFixed(2);
  const inventoryValue = (totalPieces * priceCost).toFixed(2);
  const savings = (priceRetail * (promoDiscount / 100)).toFixed(2);

  const getStepTitle = (s: number) => {
    switch (s) {
      case 1: return 'Product Info';
      case 2: return 'Images';
      case 3: return 'Packaging';
      case 4: return 'Inventory';
      case 5: return 'Pricing';
      default: return 'Product Info';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[640px] overflow-hidden flex flex-col max-h-[92vh] animate-fadeIn">
        {/* Modal Header */}
        <div className="px-7 py-5 bg-[#384E85] text-white flex items-center justify-between">
          <div>
            <h2 className="text-[17px] font-bold tracking-tight">Add New Product</h2>
            <div className="text-[12px] text-white/80">Step {step} of 5 · {getStepTitle(step)}</div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition border-none">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Stepper Header */}
        <div className="px-6 py-3.5 bg-[#FAFAFA] border-b border-[#384E85]/8 flex items-center justify-between">
          {[
            { s: 1, label: 'Product Info' },
            { s: 2, label: 'Images' },
            { s: 3, label: 'Packaging' },
            { s: 4, label: 'Inventory' },
            { s: 5, label: 'Pricing' }
          ].map((item, idx) => (
            <React.Fragment key={item.s}>
              <div
                onClick={() => setStep(item.s)}
                className={`flex items-center gap-2 cursor-pointer ${step >= item.s ? 'text-[#384E85]' : 'text-[#7A8299]'}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] transition ${
                  step === item.s ? 'bg-[#384E85] text-white' : step > item.s ? 'bg-[#10B981] text-white' : 'bg-[#EEF1F8] text-[#7A8299]'
                }`}>
                  {step > item.s ? <Check className="w-3.5 h-3.5" /> : item.s}
                </div>
                <span className={`text-[12px] font-semibold hidden sm:inline ${step === item.s ? 'text-[#384E85] font-bold' : ''}`}>
                  {item.label}
                </span>
              </div>
              {idx < 4 && <div className={`flex-1 h-[2px] mx-2 ${step > idx + 1 ? 'bg-[#10B981]' : 'bg-[#EEF1F8]'}`} />}
            </React.Fragment>
          ))}
        </div>

        {/* Modal Body Step Content */}
        <div className="p-7 overflow-y-auto space-y-4 flex-1 text-[13px]">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-[15px] font-bold text-[#0F1629]">Product Information</h3>
                <p className="text-[12px] text-[#7A8299]">Enter the basic details of your product</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[12px] font-semibold text-[#0F1629] mb-1">Product Name <span className="text-[#EF4444]">*</span></label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-[41.5px] px-3 bg-[#F4F5F8] rounded-[12px] text-[13px] outline-none font-sans" />
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#0F1629] mb-1">Product Description</label>
                  <textarea rows={3} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Describe the product..." className="w-full p-3 bg-[#F4F5F8] rounded-[12px] text-[13px] outline-none font-sans resize-y" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#0F1629] mb-1">Category <span className="text-[#EF4444]">*</span></label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-[41.5px] px-3 bg-[#F4F5F8] rounded-[12px] text-[13px] outline-none font-sans">
                      <option value="Dairy">Dairy &amp; Eggs</option>
                      <option value="Produce">Fresh Produce</option>
                      <option value="Meat">Meat &amp; Poultry</option>
                      <option value="Bakery">Bakery</option>
                      <option value="Beverages">Beverages</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-[#0F1629] mb-1">Brand</label>
                    <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full h-[41.5px] px-3 bg-[#F4F5F8] rounded-[12px] text-[13px] outline-none font-sans" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-[#F4F5F8] rounded-[14px]">
                  <div>
                    <div className="text-[12px] font-semibold text-[#0F1629]">Product Visibility</div>
                    <div className="text-[11px] text-[#7A8299]">This product will be visible to customers</div>
                  </div>
                  <input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} className="w-5 h-5 accent-[#10B981] cursor-pointer" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-[15px] font-bold text-[#0F1629]">Product Images</h3>
                <p className="text-[12px] text-[#7A8299]">Upload high-quality images of your product</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { title: 'Add Main Image', hint: 'Recommended 800x800px' },
                  { title: 'Add Image 2', hint: 'Additional angle' },
                  { title: 'Add Image 3', hint: 'Packaging view' }
                ].map((box, idx) => (
                  <div key={idx} className="border-2 border-dashed border-[#384E85]/20 rounded-[16px] p-6 text-center bg-[#FAFAFA] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#384E85] hover:bg-[#384E85]/3 transition aspect-square">
                    <div className="w-[44px] h-[44px] rounded-[12px] bg-[#EEF1F8] text-[#384E85] flex items-center justify-center">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div className="text-[12px] font-semibold text-[#384E85]">{box.title}</div>
                    <div className="text-[10px] text-[#7A8299]">{box.hint}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-[15px] font-bold text-[#0F1629]">Packaging Type</h3>
                <p className="text-[12px] text-[#7A8299]">Select how this product is packaged and unit breakdown</p>
              </div>

              {/* 3 Packaging Type Selection Cards */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'piece', name: 'Piece', desc: 'Individual item' },
                  { id: 'package', name: 'Package', desc: 'Multi-pack' },
                  { id: 'carton', name: 'Carton', desc: 'Bulk packaging' }
                ].map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => setPkgType(pkg.id)}
                    className={`border-2 rounded-[14px] p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5 ${
                      pkgType === pkg.id 
                        ? 'border-[#384E85] bg-[#EEF1F8] text-[#384E85] font-bold shadow-xs' 
                        : 'border-[#384E85]/12 bg-[#FAFAFA] text-[#7A8299] hover:border-[#384E85]/30'
                    }`}
                  >
                    <PkgIcon className="w-6 h-6 mb-0.5" />
                    <div className="text-[13.5px] font-bold">{pkg.name}</div>
                    <div className="text-[10px] opacity-75">{pkg.desc}</div>
                  </div>
                ))}
              </div>

              {/* Dynamic Inputs based on Packaging Selection */}
              {pkgType === 'package' && (
                <div className="space-y-1.5 animate-fadeIn">
                  <label className="block text-[12px] font-bold text-[#0F1629]">Pieces Per Package</label>
                  <input
                    type="number"
                    min={1}
                    value={piecesPerPkg}
                    onChange={(e) => setPiecesPerPkg(Math.max(1, Number(e.target.value)))}
                    className="w-full h-[41.5px] px-3.5 bg-[#F4F5F8] border border-[#384E85]/10 rounded-[12px] text-[13px] font-semibold text-[#0F1629] outline-none focus:border-[#384E85] transition"
                  />
                </div>
              )}

              {pkgType === 'carton' && (
                <div className="grid grid-cols-2 gap-3 animate-fadeIn">
                  <div className="space-y-1.5">
                    <label className="block text-[12px] font-bold text-[#0F1629]">Pieces Per Package</label>
                    <input
                      type="number"
                      min={1}
                      value={piecesPerPkg}
                      onChange={(e) => setPiecesPerPkg(Math.max(1, Number(e.target.value)))}
                      className="w-full h-[41.5px] px-3.5 bg-[#F4F5F8] border border-[#384E85]/10 rounded-[12px] text-[13px] font-semibold text-[#0F1629] outline-none focus:border-[#384E85] transition"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[12px] font-bold text-[#0F1629]">Packages Per Carton</label>
                    <input
                      type="number"
                      min={1}
                      value={pkgsPerCarton}
                      onChange={(e) => setPkgsPerCarton(Math.max(1, Number(e.target.value)))}
                      className="w-full h-[41.5px] px-3.5 bg-[#F4F5F8] border border-[#384E85]/10 rounded-[12px] text-[13px] font-semibold text-[#0F1629] outline-none focus:border-[#384E85] transition"
                    />
                  </div>
                </div>
              )}

              {/* Live Packaging Summary matching Figma design nodes 1:17031, 1:17157, 1:17293 */}
              <div className="space-y-2 pt-1">
                <h4 className="text-[13px] font-bold text-[#0F1629]">Live Packaging Summary</h4>
                <div className="bg-gradient-to-br from-[#EEF1F8]/80 to-[#E8EDF8]/60 border border-[#384E85]/15 rounded-[16px] p-4 space-y-2.5 text-[12.5px]">
                  <div className="flex justify-between items-center">
                    <span className="text-[#7A8299] font-medium">Packaging Type</span>
                    <span className="font-bold text-[#0F1629] capitalize">{pkgType}</span>
                  </div>

                  {(pkgType === 'package' || pkgType === 'carton') && (
                    <div className="flex justify-between items-center">
                      <span className="text-[#7A8299] font-medium">Pieces per Package</span>
                      <span className="font-bold text-[#0F1629] font-mono">{piecesPerPkg} pcs</span>
                    </div>
                  )}

                  {pkgType === 'carton' && (
                    <div className="flex justify-between items-center">
                      <span className="text-[#7A8299] font-medium">Packages per Carton</span>
                      <span className="font-bold text-[#0F1629] font-mono">{pkgsPerCarton} pkgs</span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-[#384E85]/12 flex justify-between items-center">
                    <span className="text-[#384E85] font-bold">Total Pieces per Carton</span>
                    <span className="font-mono font-extrabold text-[15px] text-[#384E85]">
                      {pkgType === 'piece' 
                        ? '1 pc' 
                        : pkgType === 'package' 
                        ? `${piecesPerPkg} pcs` 
                        : `${piecesPerPkg * pkgsPerCarton} pcs`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-[15px] font-bold text-[#0F1629]">Inventory</h3>
                <p className="text-[12px] text-[#7A8299]">Set your current stock levels and view live breakdown calculation</p>
              </div>

              {/* Inputs Grid matching Packaging Type */}
              <div className={`grid gap-3 ${
                pkgType === 'carton' ? 'grid-cols-3' : pkgType === 'package' ? 'grid-cols-2' : 'grid-cols-1'
              }`}>
                {pkgType === 'carton' && (
                  <div className="space-y-1.5 animate-fadeIn">
                    <label className="block text-[12px] font-bold text-[#0F1629]">Available Cartons</label>
                    <input
                      type="number"
                      min={0}
                      value={invCartons}
                      onChange={(e) => setInvCartons(Math.max(0, Number(e.target.value)))}
                      className="w-full h-[41.5px] px-3.5 bg-[#F4F5F8] border border-[#384E85]/10 rounded-[12px] text-[13px] font-semibold text-[#0F1629] outline-none focus:border-[#384E85] transition"
                    />
                  </div>
                )}

                {(pkgType === 'carton' || pkgType === 'package') && (
                  <div className="space-y-1.5 animate-fadeIn">
                    <label className="block text-[12px] font-bold text-[#0F1629]">Available Packages</label>
                    <input
                      type="number"
                      min={0}
                      value={invPackages}
                      onChange={(e) => setInvPackages(Math.max(0, Number(e.target.value)))}
                      className="w-full h-[41.5px] px-3.5 bg-[#F4F5F8] border border-[#384E85]/10 rounded-[12px] text-[13px] font-semibold text-[#0F1629] outline-none focus:border-[#384E85] transition"
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="block text-[12px] font-bold text-[#0F1629]">Available Pieces</label>
                  <input
                    type="number"
                    min={0}
                    value={invPieces}
                    onChange={(e) => setInvPieces(Math.max(0, Number(e.target.value)))}
                    className="w-full h-[41.5px] px-3.5 bg-[#F4F5F8] border border-[#384E85]/10 rounded-[12px] text-[13px] font-semibold text-[#0F1629] outline-none focus:border-[#384E85] transition"
                  />
                </div>
              </div>

              {/* Inventory Calculation Box matching Figma node 1:43088 */}
              <div className="space-y-2 pt-1">
                <h4 className="text-[13px] font-bold text-[#0F1629]">Inventory Calculation</h4>
                <div className="bg-gradient-to-br from-[#EEF1F8]/80 to-[#E8EDF8]/60 border border-[#384E85]/15 rounded-[16px] p-4 space-y-2.5 text-[12.5px]">
                  {pkgType === 'carton' && (
                    <div className="flex justify-between items-center">
                      <span className="text-[#7A8299] font-medium">Cartons × pieces/carton</span>
                      <span className="font-mono font-bold text-[#0F1629]">
                        {invCartons} × {pcsPerCarton} = {invCartons * pcsPerCarton} pcs
                      </span>
                    </div>
                  )}

                  {(pkgType === 'carton' || pkgType === 'package') && (
                    <div className="flex justify-between items-center">
                      <span className="text-[#7A8299] font-medium">Packages × pieces/pkg</span>
                      <span className="font-mono font-bold text-[#0F1629]">
                        {invPackages} × {piecesPerPkg} = {invPackages * piecesPerPkg} pcs
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-[#7A8299] font-medium">Individual pieces</span>
                    <span className="font-mono font-bold text-[#0F1629]">{invPieces} pcs</span>
                  </div>

                  <div className="pt-2 border-t border-[#384E85]/12 flex justify-between items-center">
                    <span className="text-[#384E85] font-bold">Total Stock Quantity</span>
                    <span className="font-mono font-extrabold text-[16px] text-[#384E85]">{totalPieces} pcs</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-[15px] font-bold text-[#0F1629]">Pricing &amp; Offers</h3>
                <p className="text-[12px] text-[#7A8299]">Set pricing, view live profitability analytics, and configure promotions</p>
              </div>

              {/* 3 Price Inputs Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-[12px] font-bold text-[#0F1629]">Cost Price (EGP)</label>
                  <input
                    type="number"
                    min={0}
                    step="0.5"
                    value={priceCost}
                    onChange={(e) => setPriceCost(Math.max(0, Number(e.target.value)))}
                    className="w-full h-[41.5px] px-3.5 bg-[#F4F5F8] border border-[#384E85]/10 rounded-[12px] text-[13px] font-semibold text-[#0F1629] outline-none focus:border-[#384E85] transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[12px] font-bold text-[#0F1629]">Retail Price (EGP)</label>
                  <input
                    type="number"
                    min={0}
                    step="0.5"
                    value={priceRetail}
                    onChange={(e) => setPriceRetail(Math.max(0, Number(e.target.value)))}
                    className="w-full h-[41.5px] px-3.5 bg-[#F4F5F8] border border-[#384E85]/10 rounded-[12px] text-[13px] font-semibold text-[#0F1629] outline-none focus:border-[#384E85] transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[12px] font-bold text-[#0F1629]">Wholesale Price (EGP)</label>
                  <input
                    type="number"
                    min={0}
                    step="0.5"
                    value={priceWholesale}
                    onChange={(e) => setPriceWholesale(Math.max(0, Number(e.target.value)))}
                    className="w-full h-[41.5px] px-3.5 bg-[#F4F5F8] border border-[#384E85]/10 rounded-[12px] text-[13px] font-semibold text-[#0F1629] outline-none focus:border-[#384E85] transition"
                  />
                </div>
              </div>

              {/* Live Profitability Summary Box matching Figma node 1:17439 */}
              <div className="space-y-2 pt-1">
                <h4 className="text-[13px] font-bold text-[#0F1629]">Live Profitability Summary</h4>
                <div className="bg-gradient-to-br from-[#EEF1F8]/80 to-[#E8EDF8]/60 border border-[#384E85]/15 rounded-[16px] p-4 space-y-2 text-[12.5px]">
                  <div className="flex justify-between items-center">
                    <span className="text-[#7A8299] font-medium">Cost Price</span>
                    <span className="font-mono font-semibold text-[#0F1629]">{priceCost.toFixed(2)} EGP</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#7A8299] font-medium">Retail Price</span>
                    <span className="font-mono font-semibold text-[#0F1629]">{priceRetail.toFixed(2)} EGP</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#7A8299] font-medium">Profit per Unit</span>
                    <span className="font-mono font-bold text-[#10B981]">{profitPerUnit} EGP</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#7A8299] font-medium">Profit Margin</span>
                    <span className="font-mono font-bold text-[#10B981]">{profitMargin}%</span>
                  </div>
                  <div className="pt-2 border-t border-[#384E85]/12 flex justify-between items-center">
                    <span className="text-[#384E85] font-bold">Inventory Value</span>
                    <span className="font-mono font-extrabold text-[15px] text-[#384E85]">{inventoryValue} EGP</span>
                  </div>
                </div>
              </div>

              {/* Enable Offer / Promotion Box matching Figma node 1:17439 */}
              <div className="p-4.5 bg-white border border-[#384E85]/12 rounded-[18px] space-y-3.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[13px] font-bold text-[#0F1629]">Enable Offer / Promotion</div>
                    <div className="text-[11px] text-[#7A8299]">Set a discounted price for this product</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={promoEnabled}
                    onChange={(e) => setPromoEnabled(e.target.checked)}
                    className="w-5 h-5 accent-[#384E85] cursor-pointer"
                  />
                </div>

                {promoEnabled && (
                  <div className="space-y-3 pt-3 border-t border-[#384E85]/10 animate-fadeIn">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-[#0F1629]">Discount %</label>
                        <input
                          type="number"
                          min={1}
                          max={99}
                          value={promoDiscount}
                          onChange={(e) => setPromoDiscount(Math.min(99, Math.max(1, Number(e.target.value))))}
                          placeholder="e.g. 25"
                          className="w-full h-9 px-3 bg-[#F4F5F8] border border-[#384E85]/10 rounded-lg text-xs font-semibold outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-[#0F1629]">Start Date</label>
                        <input
                          type="date"
                          value={promoStartDate}
                          onChange={(e) => setPromoStartDate(e.target.value)}
                          className="w-full h-9 px-3 bg-[#F4F5F8] border border-[#384E85]/10 rounded-lg text-xs font-semibold outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-[#0F1629]">End Date</label>
                        <input
                          type="date"
                          value={promoEndDate}
                          onChange={(e) => setPromoEndDate(e.target.value)}
                          className="w-full h-9 px-3 bg-[#F4F5F8] border border-[#384E85]/10 rounded-lg text-xs font-semibold outline-none"
                        />
                      </div>
                    </div>

                    {/* Customer App Preview Box */}
                    <div className="bg-[#FAFAFA] border border-[#384E85]/10 rounded-[14px] p-3.5 space-y-2">
                      <div className="text-[11px] font-bold text-[#7A8299] uppercase tracking-wider">Customer App Preview</div>
                      <div className="flex items-center gap-3.5 bg-white p-3 rounded-xl border border-[#384E85]/8">
                        <div className="w-[48px] h-[48px] rounded-xl bg-[#EEF1F8] text-[#384E85] flex items-center justify-center text-xl shrink-0 font-bold">
                          🛒
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-[13px] text-[#0F1629] truncate">{name || 'Product Name'}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[12px] text-[#9CA3AF] line-through font-mono">{priceRetail.toFixed(2)} EGP</span>
                            <span className="text-[9.5px] font-bold bg-[#EF4444] text-white px-1.5 py-0.5 rounded">{promoDiscount}% OFF</span>
                            <span className="text-[14px] font-extrabold text-[#10B981] font-mono">{discountedPrice} EGP</span>
                          </div>
                          <div className="text-[10px] text-[#7A8299] mt-0.5 font-medium">
                            You save: <strong className="text-[#10B981] font-mono">{savings} EGP</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-7 py-3.5 bg-[#FAFAFA] border-t border-[#384E85]/8 flex items-center justify-between h-[69px] shrink-0">
          <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>

          <div className="flex items-center gap-3">
            {step > 1 && (
              <Button variant="ghost" size="sm" onClick={() => setStep(step - 1)}>Back</Button>
            )}

            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className={`w-2 h-2 rounded-full transition ${step === s ? 'bg-[#384E85]' : step > s ? 'bg-[#10B981]' : 'bg-[#EEF1F8]'}`} />
              ))}
            </div>

            {step < 5 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="h-9 px-5 rounded-[12px] bg-[#384E85] hover:bg-[#2A3A65] text-white text-[13px] font-bold flex items-center gap-1.5 transition cursor-pointer border-none"
              >
                <span>Next</span>
              </button>
            ) : (
              <button
                onClick={onClose}
                className="h-9 px-5 rounded-[12px] bg-gradient-to-r from-[#384E85] to-[#2A3A65] text-white text-[13px] font-bold shadow-[0px_4px_14px_rgba(56,78,133,0.3)] hover:shadow-[0px_6px_20px_rgba(56,78,133,0.4)] transition cursor-pointer border-none"
              >
                Publish Product
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
