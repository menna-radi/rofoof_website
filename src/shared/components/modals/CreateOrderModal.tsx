import React, { useState } from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateOrderModal: React.FC<CreateOrderModalProps> = ({ isOpen, onClose }) => {
  const [orderType, setOrderType] = useState('retail');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[640px] overflow-hidden animate-fadeIn">
        <div className="px-7 py-5 bg-[#384E85] text-white flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">Create New Order</h2>
            <div className="text-xs text-white/80">Fill in customer and order details</div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-7 space-y-4 text-xs">
          <div className="flex gap-2">
            <button
              onClick={() => setOrderType('retail')}
              className={`flex-1 py-2 rounded-xl font-bold border transition cursor-pointer ${
                orderType === 'retail' ? 'bg-[#EEF1F8] border-[#384E85] text-[#384E85]' : 'bg-[#FAFAFA] border-[#384E85]/15 text-[#7A8299]'
              }`}
            >
              Retail Customer
            </button>
            <button
              onClick={() => setOrderType('wholesale')}
              className={`flex-1 py-2 rounded-xl font-bold border transition cursor-pointer ${
                orderType === 'wholesale' ? 'bg-[#EEF1F8] border-[#384E85] text-[#384E85]' : 'bg-[#FAFAFA] border-[#384E85]/15 text-[#7A8299]'
              }`}
            >
              Wholesale (B2B)
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#0F1629] mb-1">Customer Name *</label>
              <input type="text" placeholder="e.g. Ahmed Mansour" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-10 px-3 bg-[#F4F5F8] rounded-xl outline-none" />
            </div>
            <div>
              <label className="block font-bold text-[#0F1629] mb-1">Phone Number</label>
              <input type="text" placeholder="+966 50 000 0000" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full h-10 px-3 bg-[#F4F5F8] rounded-xl outline-none" />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#0F1629] mb-1">Delivery Address *</label>
            <input type="text" placeholder="Building, Street, District..." value={address} onChange={(e) => setAddress(e.target.value)} className="w-full h-10 px-3 bg-[#F4F5F8] rounded-xl outline-none" />
          </div>
        </div>

        <div className="px-7 py-4 bg-[#FAFAFA] border-t border-[#384E85]/8 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="primary" size="sm" onClick={onClose} leftIcon={<ShoppingBag className="w-4 h-4" />}>
            Create Order
          </Button>
        </div>
      </div>
    </div>
  );
};
