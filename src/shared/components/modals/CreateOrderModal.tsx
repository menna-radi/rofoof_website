import React, { useState } from 'react';
import { X, ShoppingBag, User, Package, Plus, Trash2, CheckCircle2 } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderCreated?: (newOrder: any) => void;
}

const AVAILABLE_PRODUCTS = [
  { id: 'p1', name: 'Fresh Organic Milk 1L', price: 35 },
  { id: 'p2', name: 'Egyptian Farm Eggs (30 Pack)', price: 140 },
  { id: 'p3', name: 'Local Bananas 1kg', price: 25 },
  { id: 'p4', name: 'Sparkling Mineral Water 1.5L', price: 15 },
  { id: 'p5', name: 'White Bread Toast', price: 30 },
  { id: 'p6', name: 'Gourmet Mozzarella 250g', price: 85 },
];

export const CreateOrderModal: React.FC<CreateOrderModalProps> = ({ isOpen, onClose, onOrderCreated }) => {
  const [segment, setSegment] = useState<'retail' | 'wholesale'>('retail');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(AVAILABLE_PRODUCTS[0].id);
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);

  if (!isOpen) return null;

  const handleAddItem = () => {
    const prod = AVAILABLE_PRODUCTS.find(p => p.id === selectedProductId);
    if (!prod) return;

    setCartItems(prev => {
      const existing = prev.find(item => item.id === prod.id);
      if (existing) {
        return prev.map(item => item.id === prod.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id: prod.id, name: prod.name, price: prod.price, quantity: 1 }];
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const nextQty = item.quantity + delta;
        return nextQty > 0 ? { ...item, quantity: nextQty } : item;
      }
      return item;
    }));
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handlePlaceOrder = () => {
    if (onOrderCreated) {
      onOrderCreated({
        id: `ORD-${Math.floor(8900 + Math.random() * 100)}`,
        customer: customerName || (segment === 'retail' ? 'Ahmed Mohamed' : 'Egyptian Market Co.'),
        segment,
        amount: totalAmount > 0 ? totalAmount : (segment === 'retail' ? 120.00 : 850.00),
        items: cartItems.length > 0 ? cartItems.reduce((acc, i) => acc + i.quantity, 0) : 4,
        driver: { name: 'Ahmed K.', initials: 'AK' },
        status: 'Order Placed',
        statusClass: 'bg-[#EEF1F8] text-[#384E85]',
        time: 'Just now',
        progress: 10,
        phone: phone || '+20 100 000 0000',
        address: address || 'Full delivery address',
        timeline: [
          { label: 'Order Placed', done: true, time: 'Just now' },
          { label: 'Confirmed', done: false },
          { label: 'Preparing', done: false },
          { label: 'Ready for Pickup', done: false },
          { label: 'Picked Up', done: false },
          { label: 'On The Way', done: false },
          { label: 'Delivered', done: false }
        ]
      });
    }

    onClose();
    setCustomerName('');
    setPhone('');
    setAddress('');
    setCartItems([]);
  };

  return (
    <div className="fixed inset-0 bg-[#0F1629]/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200 select-none">
      <div className="bg-white rounded-[24px] shadow-[0px_40px_80px_0px_rgba(0,0,0,0.2)] w-full max-w-[640px] overflow-hidden relative flex flex-col">
        
        {/* Header with Dark Blue Gradient */}
        <div className="bg-gradient-to-r from-[#384E85] to-[#2A3A65] px-6 py-5 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[10px] bg-white/15 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-[15px] leading-[22.5px] text-white tracking-tight">Create New Order</h3>
              <p className="text-[11px] leading-[16.5px] text-white/70">Fill in customer and product details</p>
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
        <div className="p-6 space-y-4.5 overflow-y-auto max-h-[calc(85vh-130px)]">
          {/* Retail / Wholesale Segment Selector */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setSegment('retail')}
              className={`flex-1 py-2.5 rounded-[10px] text-[13px] font-bold capitalize transition cursor-pointer border-2 ${
                segment === 'retail' 
                  ? 'bg-[#EEF1F8] border-[#384E85] text-[#384E85] shadow-xs' 
                  : 'bg-[#FAFAFA] border-[#384E85]/15 text-[#7A8299] hover:border-[#384E85]/30'
              }`}
            >
              retail
            </button>
            <button
              type="button"
              onClick={() => setSegment('wholesale')}
              className={`flex-1 py-2.5 rounded-[10px] text-[13px] font-bold capitalize transition cursor-pointer border-2 ${
                segment === 'wholesale' 
                  ? 'bg-[#EEF1F8] border-[#384E85] text-[#384E85] shadow-xs' 
                  : 'bg-[#FAFAFA] border-[#384E85]/15 text-[#7A8299] hover:border-[#384E85]/30'
              }`}
            >
              wholesale
            </button>
          </div>

          {/* Customer Info Section */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#384E85]" />
              <span className="font-bold text-[12px] text-[#384E85] tracking-[0.5px] uppercase">Customer Info</span>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="text-[12px] font-semibold text-[#4A5568] flex items-center gap-0.5">
                  Customer Name <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Ahmed Mohamed"
                  className="w-full h-[41.5px] px-3.5 bg-[#F4F5F8] border border-transparent focus:border-[#384E85] focus:bg-white rounded-[12px] text-[13px] text-[#0F1629] placeholder-[rgba(15,22,41,0.5)] outline-none transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[12px] font-semibold text-[#4A5568]">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+20 100 000 0000"
                  className="w-full h-[41.5px] px-3.5 bg-[#F4F5F8] border border-transparent focus:border-[#384E85] focus:bg-white rounded-[12px] text-[13px] text-[#0F1629] placeholder-[rgba(15,22,41,0.5)] outline-none transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-[#4A5568] flex items-center gap-0.5">
                Delivery Address <span className="text-[#EF4444]">*</span>
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Full delivery address..."
                className="w-full h-[41.5px] px-3.5 bg-[#F4F5F8] border border-transparent focus:border-[#384E85] focus:bg-white rounded-[12px] text-[13px] text-[#0F1629] placeholder-[rgba(15,22,41,0.5)] outline-none transition"
              />
            </div>
          </div>

          {/* Order Items Section */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-[#384E85]" />
              <span className="font-bold text-[12px] text-[#384E85] tracking-[0.5px] uppercase">Order Items</span>
            </div>

            <div className="flex gap-2">
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="flex-1 h-[41.5px] px-3.5 bg-[#F4F5F8] border border-transparent focus:border-[#384E85] focus:bg-white rounded-[12px] text-[13px] text-[#0F1629] outline-none transition cursor-pointer"
              >
                {AVAILABLE_PRODUCTS.map(prod => (
                  <option key={prod.id} value={prod.id}>
                    {prod.name} ({prod.price} EGP)
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddItem}
                className="h-[41.5px] px-4 bg-[#EEF1F8] hover:bg-[#384E85] hover:text-white text-[#7A8299] rounded-[12px] font-semibold text-[13px] flex items-center gap-1.5 transition cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>

            {/* Selected Items List */}
            {cartItems.length > 0 && (
              <div className="bg-[#FAFAFA] border border-[#384E85]/10 rounded-[12px] p-3 space-y-2 max-h-36 overflow-y-auto">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between text-xs py-1 border-b border-[#384E85]/6 last:border-none">
                    <span className="font-medium text-[#0F1629] truncate max-w-[200px]">{item.name}</span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 bg-white border border-[#384E85]/15 rounded-lg px-2 py-0.5">
                        <button type="button" onClick={() => handleUpdateQuantity(item.id, -1)} className="text-[#7A8299] hover:text-[#0F1629] font-bold px-1 cursor-pointer">-</button>
                        <span className="font-bold text-[#384E85] min-w-4 text-center">{item.quantity}</span>
                        <button type="button" onClick={() => handleUpdateQuantity(item.id, 1)} className="text-[#7A8299] hover:text-[#0F1629] font-bold px-1 cursor-pointer">+</button>
                      </div>
                      <span className="font-bold text-[#0F1629] w-16 text-right">{item.price * item.quantity} EGP</span>
                      <button type="button" onClick={() => handleRemoveItem(item.id)} className="text-[#EF4444] hover:text-[#B91C1C] p-1 cursor-pointer">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="pt-2 flex justify-between items-center text-xs font-bold text-[#0F1629]">
                  <span>Total Amount:</span>
                  <span className="text-[#384E85] text-sm">{totalAmount} EGP</span>
                </div>
              </div>
            )}
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
            onClick={handlePlaceOrder}
            className="px-[22px] py-[9px] rounded-[12px] bg-gradient-to-r from-[#2A3A65] to-[#384E85] text-white hover:opacity-95 text-[13px] font-bold flex items-center gap-2 shadow-sm transition cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            <span>Place Order</span>
          </button>
        </div>

      </div>
    </div>
  );
};
