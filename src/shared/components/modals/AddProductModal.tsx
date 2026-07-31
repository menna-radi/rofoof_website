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
  const [invPackages, setInvPackages] = useState(10);
  const [invPieces, setInvPieces] = useState(5);
  const [priceRetail, setPriceRetail] = useState(4.50);
  const [priceWholesale, setPriceWholesale] = useState(3.80);
  const [priceCost, setPriceCost] = useState(2.90);
  const [promoEnabled, setPromoEnabled] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(25);

  if (!isOpen) return null;

  const totalPieces = (invPackages * piecesPerPkg) + invPieces;
  const profitPerUnit = (priceRetail - priceCost).toFixed(2);
  const profitMargin = priceRetail > 0 ? (((priceRetail - priceCost) / priceRetail) * 100).toFixed(1) : '0.0';
  const discountedPrice = promoEnabled ? (priceRetail * (1 - promoDiscount / 100)).toFixed(2) : priceRetail.toFixed(2);

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
                <p className="text-[12px] text-[#7A8299]">Select how this product is packaged</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'piece', name: 'Piece', desc: 'Individual item' },
                  { id: 'package', name: 'Package', desc: 'Multi-pack' },
                  { id: 'carton', name: 'Carton', desc: 'Bulk packaging' }
                ].map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => setPkgType(pkg.id)}
                    className={`border-2 rounded-[12px] p-3.5 text-center cursor-pointer transition flex flex-col items-center justify-center gap-1 ${
                      pkgType === pkg.id ? 'border-[#384E85] bg-[#EEF1F8] text-[#384E85] font-bold' : 'border-[#384E85]/15 bg-[#FAFAFA] text-[#7A8299]'
                    }`}
                  >
                    <PkgIcon className="w-7 h-7 mb-1" />
                    <div className="text-[13px] font-bold">{pkg.name}</div>
                    <div className="text-[10px] opacity-80">{pkg.desc}</div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-[#EEF1F8] to-[#E8EDF8] border border-[#384E85]/15 rounded-[14px] p-4 space-y-1.5">
                <div className="text-[11px] font-bold text-[#384E85] uppercase tracking-[0.5px]">Packaging Summary</div>
                <div className="flex justify-between text-[12.5px]"><span>Type</span><span className="font-mono font-bold capitalize text-[#0F1629]">{pkgType}</span></div>
                <div className="flex justify-between text-[12.5px]"><span>Pieces Per Package</span><span className="font-mono font-bold text-[#0F1629]">{piecesPerPkg}</span></div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-[15px] font-bold text-[#0F1629]">Inventory</h3>
                <p className="text-[12px] text-[#7A8299]">Set your current stock levels</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-semibold text-[#0F1629] mb-1">Available Packages</label>
                  <input type="number" value={invPackages} onChange={(e) => setInvPackages(Number(e.target.value))} className="w-full h-[41.5px] px-3 bg-[#F4F5F8] rounded-[12px] outline-none" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#0F1629] mb-1">Available Pieces</label>
                  <input type="number" value={invPieces} onChange={(e) => setInvPieces(Number(e.target.value))} className="w-full h-[41.5px] px-3 bg-[#F4F5F8] rounded-[12px] outline-none" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#EEF1F8] to-[#E8EDF8] border border-[#384E85]/15 rounded-[14px] p-4 space-y-1.5">
                <div className="text-[11px] font-bold text-[#384E85] uppercase tracking-[0.5px]">Inventory Calculation</div>
                <div className="flex justify-between text-[12.5px]"><span>Packages × pieces/pkg</span><span className="font-mono font-bold">{invPackages} × {piecesPerPkg} = {invPackages * piecesPerPkg} pcs</span></div>
                <div className="flex justify-between text-[12.5px]"><span>Individual pieces</span><span className="font-mono font-bold">{invPieces} pcs</span></div>
                <div className="pt-2 border-t border-[#384E85]/15 flex justify-between items-center text-[15px] font-extrabold text-[#384E85]">
                  <span>Total Stock Quantity:</span>
                  <span className="font-mono text-[16px]">{totalPieces} pcs</span>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-[15px] font-bold text-[#0F1629]">Pricing &amp; Offers</h3>
                <p className="text-[12px] text-[#7A8299]">Set pricing and configure promotions</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[12px] font-semibold text-[#0F1629] mb-1">Cost Price ($)</label>
                  <input type="number" value={priceCost} onChange={(e) => setPriceCost(Number(e.target.value))} className="w-full h-[41.5px] px-3 bg-[#F4F5F8] rounded-[12px] outline-none" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#0F1629] mb-1">Retail Price ($)</label>
                  <input type="number" value={priceRetail} onChange={(e) => setPriceRetail(Number(e.target.value))} className="w-full h-[41.5px] px-3 bg-[#F4F5F8] rounded-[12px] outline-none" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#0F1629] mb-1">Wholesale Price ($)</label>
                  <input type="number" value={priceWholesale} onChange={(e) => setPriceWholesale(Number(e.target.value))} className="w-full h-[41.5px] px-3 bg-[#F4F5F8] rounded-[12px] outline-none" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#EEF1F8] to-[#E8EDF8] border border-[#384E85]/15 rounded-[14px] p-4 space-y-1 text-[12.5px]">
                <div className="flex justify-between"><span>Profit per Unit</span><span className="font-mono font-bold text-[#10B981]">${profitPerUnit}</span></div>
                <div className="flex justify-between"><span>Profit Margin</span><span className="font-mono font-bold text-[#10B981]">{profitMargin}%</span></div>
              </div>

              {/* Customer App Card Preview matching modals.html */}
              <div className="p-4 bg-[#FFF8F8] border border-[#EF4444]/20 rounded-[16px] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-bold text-[#EF4444]">Enable Offer / Promotion</span>
                  <input type="checkbox" checked={promoEnabled} onChange={(e) => setPromoEnabled(e.target.checked)} className="w-5 h-5 accent-[#EF4444] cursor-pointer" />
                </div>

                {promoEnabled && (
                  <div className="pt-2 border-t border-[#EF4444]/15">
                    <label className="block text-[11px] font-semibold text-[#0F1629] mb-1">Discount %</label>
                    <input type="number" value={promoDiscount} onChange={(e) => setPromoDiscount(Number(e.target.value))} className="w-full h-9 px-3 bg-white rounded-lg text-xs outline-none border border-rose-200" />
                  </div>
                )}

                <div className="text-[10px] font-bold text-[#7A8299] uppercase">Customer App Card Preview</div>
                <div className="bg-white border border-[#EF4444]/15 rounded-[12px] p-3.5 flex items-center gap-3.5">
                  <div className="w-[52px] h-[52px] rounded-[12px] bg-[#EEF1F8] text-[#384E85] flex items-center justify-center shrink-0">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-[13.5px] text-[#0F1629]">{name || 'Product Name'}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      {promoEnabled && <span className="text-[12.5px] text-[#9CA3AF] line-through">${priceRetail.toFixed(2)}</span>}
                      {promoEnabled && <span className="text-[9.5px] font-bold bg-[#EF4444] text-white px-1.5 py-0.5 rounded">{promoDiscount}% OFF</span>}
                      <span className="text-[15px] font-extrabold text-[#10B981]">${discountedPrice}</span>
                    </div>
                  </div>
                </div>
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
