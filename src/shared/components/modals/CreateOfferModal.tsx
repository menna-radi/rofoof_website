import React, { useState } from 'react';
import { X, Tag } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

interface CreateOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateOfferModal: React.FC<CreateOfferModalProps> = ({ isOpen, onClose }) => {
  const [offerType, setOfferType] = useState('flash');
  const [name, setName] = useState('');
  const [product, setProduct] = useState('');
  const [discount, setDiscount] = useState(25);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[580px] overflow-hidden animate-fadeIn">
        <div className="px-7 py-5 bg-gradient-to-r from-[#EF4444] to-[#B91C1C] text-white flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">Create New Offer</h2>
            <div className="text-xs text-white/80">Set up a promotion or flash deal</div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-7 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#0F1629] mb-1.5">Offer Type</label>
            <div className="flex flex-wrap gap-2">
              {['flash', 'seasonal', 'loyalty', 'bulk', 'bundle'].map((type) => (
                <button
                  key={type}
                  onClick={() => setOfferType(type)}
                  className={`px-3 py-1.5 rounded-full font-semibold capitalize transition cursor-pointer border ${
                    offerType === type ? 'bg-[#FEF2F2] border-[#EF4444] text-[#EF4444] font-bold' : 'bg-white border-[#384E85]/15 text-[#7A8299]'
                  }`}
                >
                  {type} sale
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#0F1629] mb-1">Offer Name *</label>
            <input type="text" placeholder="e.g. Weekend Flash Sale" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-10 px-3 bg-[#F4F5F8] rounded-xl outline-none" />
          </div>

          <div>
            <label className="block font-bold text-[#0F1629] mb-1">Apply to Product *</label>
            <select value={product} onChange={(e) => setProduct(e.target.value)} className="w-full h-10 px-3 bg-[#F4F5F8] rounded-xl outline-none">
              <option value="">Select product...</option>
              <option value="milk">Organic Whole Milk 2L</option>
              <option value="banana">Fresh Bananas 1kg</option>
              <option value="water">Sparkling Mineral Water 1.5L</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#0F1629] mb-1">Discount % *</label>
              <input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} className="w-full h-10 px-3 bg-[#F4F5F8] rounded-xl outline-none" />
            </div>
            <div>
              <label className="block font-bold text-[#0F1629] mb-1">End Date</label>
              <input type="date" className="w-full h-10 px-3 bg-[#F4F5F8] rounded-xl outline-none" />
            </div>
          </div>
        </div>

        <div className="px-7 py-4 bg-[#FAFAFA] border-t border-[#384E85]/8 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="danger" size="sm" onClick={onClose} leftIcon={<Tag className="w-4 h-4" />}>
            Launch Offer
          </Button>
        </div>
      </div>
    </div>
  );
};
