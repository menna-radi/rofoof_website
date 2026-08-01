import React, { useState } from 'react';
import { X, Tag, Zap, Rocket } from 'lucide-react';

interface CreateOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOfferCreated?: (newOffer: any) => void;
}

export const CreateOfferModal: React.FC<CreateOfferModalProps> = ({ isOpen, onClose, onOfferCreated }) => {
  const [selectedOfferType, setSelectedOfferType] = useState<string>('Flash Deal');
  const [newTitle, setNewTitle] = useState('');
  const [newProduct, setNewProduct] = useState('All Products & Categories');
  const [newOriginalPrice, setNewOriginalPrice] = useState<string>('');
  const [newDiscountPercent, setNewDiscountPercent] = useState<string>('');
  const [newStartDate, setNewStartDate] = useState<string>('');
  const [newEndDate, setNewEndDate] = useState<string>('');

  if (!isOpen) return null;

  const handleLaunchOffer = () => {
    if (onOfferCreated) {
      const offerTitle = newTitle || `${selectedOfferType} Deal`;
      const discountVal = parseFloat(newDiscountPercent) || 25;
      const origPriceVal = parseFloat(newOriginalPrice) || 100;
      const generatedCode = `${selectedOfferType.replace(/\s+/g, '').toUpperCase()}${discountVal}`;

      onOfferCreated({
        id: Date.now().toString(),
        code: generatedCode,
        title: offerTitle,
        discountType: 'percentage',
        discountValue: discountVal,
        minOrderValue: Math.round(origPriceVal * 0.75),
        usageLimit: 500,
        usedCount: 0,
        status: 'active',
        startDate: newStartDate || new Date().toISOString().split('T')[0],
        endDate: newEndDate || '2026-09-01',
        category: newProduct,
        iconBg: selectedOfferType === 'Flash Deal' ? 'bg-[#FEF2F2] text-[#EF4444]' : 'bg-[#EEF1F8] text-[#384E85]'
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#0F1629]/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200 select-none">
      <div className="bg-white rounded-[24px] shadow-[0px_40px_80px_0px_rgba(0,0,0,0.2)] w-full max-w-[580px] overflow-hidden relative flex flex-col">
        
        {/* Header with Red Gradient */}
        <div className="bg-gradient-to-r from-[#EF4444] to-[#B91C1C] px-6 py-5 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[10px] bg-white/15 flex items-center justify-center shrink-0">
              <Tag className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-[15px] leading-[22.5px] text-white tracking-tight">Create New Offer</h3>
              <p className="text-[11px] leading-[16.5px] text-white/75">Set up a promotion or flash deal</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-[10px] bg-white/15 hover:bg-white/25 flex items-center justify-center transition cursor-pointer text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(85vh-130px)]">
          {/* Offer Type Selection Pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            {[
              { id: 'Flash Deal', label: 'Flash Deal', hasIcon: true },
              { id: 'Seasonal Sale', label: 'Seasonal Sale' },
              { id: 'Loyalty Reward', label: 'Loyalty Reward' },
              { id: 'Bulk Discount', label: 'Bulk Discount' },
              { id: 'Bundle Offer', label: 'Bundle Offer' }
            ].map((pill) => {
              const isSelected = selectedOfferType === pill.id;
              return (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setSelectedOfferType(pill.id)}
                  className={`px-3.5 py-1.5 rounded-[20px] text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                    isSelected 
                      ? 'bg-[#FEF2F2] border-[#EF4444] text-[#EF4444] shadow-xs' 
                      : 'bg-white border-[#384E85]/15 text-[#7A8299] hover:border-[#384E85]/30 hover:text-[#0F1629]'
                  }`}
                >
                  {pill.hasIcon && (
                    <Zap className={`w-3 h-3 ${isSelected ? 'text-[#EF4444]' : 'text-[#7A8299]'}`} />
                  )}
                  <span>{pill.label}</span>
                </button>
              );
            })}
          </div>

          {/* Offer Name Input */}
          <div className="space-y-1.5">
            <label className="text-[12px] font-semibold text-[#4A5568] flex items-center gap-0.5">
              Offer Name <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder='e.g. "Weekend Mega Deal"'
              className="w-full h-[41.5px] px-3.5 bg-[#F4F5F8] border border-transparent focus:border-[#EF4444] focus:bg-white rounded-[12px] text-[13px] text-[#0F1629] placeholder-[rgba(15,22,41,0.5)] outline-none transition"
            />
          </div>

          {/* Apply to Product Input */}
          <div className="space-y-1.5">
            <label className="text-[12px] font-semibold text-[#4A5568] flex items-center gap-0.5">
              Apply to Product <span className="text-[#EF4444]">*</span>
            </label>
            <select
              value={newProduct}
              onChange={(e) => setNewProduct(e.target.value)}
              className="w-full h-[40px] px-3.5 bg-[#F4F5F8] border border-transparent focus:border-[#EF4444] focus:bg-white rounded-[12px] text-[13px] text-[#0F1629] outline-none transition cursor-pointer"
            >
              <option value="All Products & Categories">All Products & Categories</option>
              <option value="Fresh Organic Produce">Fresh Organic Produce</option>
              <option value="Dairy & Milk">Dairy & Milk</option>
              <option value="Beverages & Juices">Beverages & Juices</option>
              <option value="Snacks & Bakery">Snacks & Bakery</option>
              <option value="Meat & Poultry">Meat & Poultry</option>
            </select>
          </div>

          {/* Original Price & Discount % (2 Columns) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-[#4A5568] flex items-center gap-0.5">
                Original Price (EGP) <span className="text-[#EF4444]">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                value={newOriginalPrice}
                onChange={(e) => setNewOriginalPrice(e.target.value)}
                placeholder="0.00"
                className="w-full h-[41.5px] px-3.5 bg-[#F4F5F8] border border-transparent focus:border-[#EF4444] focus:bg-white rounded-[12px] text-[13px] text-[#0F1629] placeholder-[rgba(15,22,41,0.5)] outline-none transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-[#4A5568] flex items-center gap-0.5">
                Discount % <span className="text-[#EF4444]">*</span>
              </label>
              <input
                type="number"
                value={newDiscountPercent}
                onChange={(e) => setNewDiscountPercent(e.target.value)}
                placeholder="e.g. 25"
                className="w-full h-[41.5px] px-3.5 bg-[#F4F5F8] border border-transparent focus:border-[#EF4444] focus:bg-white rounded-[12px] text-[13px] text-[#0F1629] placeholder-[rgba(15,22,41,0.5)] outline-none transition"
              />
            </div>
          </div>

          {/* Start Date & End Date (2 Columns) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-[#4A5568]">
                Start Date
              </label>
              <input
                type="date"
                value={newStartDate}
                onChange={(e) => setNewStartDate(e.target.value)}
                className="w-full h-[41.5px] px-3.5 bg-[#F4F5F8] border border-transparent focus:border-[#EF4444] focus:bg-white rounded-[12px] text-[13px] text-[#0F1629] outline-none transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-[#4A5568]">
                End Date
              </label>
              <input
                type="date"
                value={newEndDate}
                onChange={(e) => setNewEndDate(e.target.value)}
                className="w-full h-[41.5px] px-3.5 bg-[#F4F5F8] border border-transparent focus:border-[#EF4444] focus:bg-white rounded-[12px] text-[13px] text-[#0F1629] outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#FAFAFA] border-t border-[rgba(56,78,133,0.08)] px-6 py-3.5 flex items-center justify-end gap-2.5 rounded-b-[24px] shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-[19px] py-[10px] rounded-[12px] border border-[rgba(56,78,133,0.18)] text-[#4A5568] text-[13px] font-semibold hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleLaunchOffer}
            className="px-[22px] py-[9px] rounded-[12px] bg-gradient-to-r from-[#2A3A65] to-[#384E85] text-white hover:opacity-95 text-[13px] font-bold flex items-center gap-2 shadow-sm transition cursor-pointer"
          >
            <Rocket className="w-3.5 h-3.5 text-white" />
            <span>Launch Offer</span>
          </button>
        </div>

      </div>
    </div>
  );
};
