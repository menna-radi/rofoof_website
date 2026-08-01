import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  ChevronRight, 
  User, 
  Phone, 
  MapPin, 
  Truck, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  ShoppingBag,
  Printer,
  Eye,
  Trash2,
  Check
} from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { CreateOrderModal } from '@/shared/components/modals/CreateOrderModal';

interface OrderTimelineStep {
  label: string;
  done: boolean;
  time?: string;
}

interface OrderItem {
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface ActiveOrder {
  id: string;
  customer: string;
  segment: 'retail' | 'wholesale';
  amount: number;
  itemsCount: number;
  items: OrderItem[];
  driver: { name: string; initials: string; phone: string };
  status: string;
  statusClass: string;
  time: string;
  progress: number;
  phone: string;
  address: string;
  timeline: OrderTimelineStep[];
}

export const OrdersPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  
  const [activeTab, setActiveTab] = useState<'active' | 'delivered' | 'cancelled'>('active');

  useEffect(() => {
    if (tabParam === 'delivered') {
      setActiveTab('delivered');
    } else if (tabParam === 'cancelled') {
      setActiveTab('cancelled');
    } else {
      setActiveTab('active');
    }
  }, [tabParam]);
  const [search, setSearch] = useState('');
  const [expandedRow, setExpandedRow] = useState<string | null>('#8821');
  const [cancelModalOrder, setCancelModalOrder] = useState<ActiveOrder | null>(null);
  const [cancelReason, setCancelReason] = useState('Customer request');
  const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false);

  const [activeOrders, setActiveOrders] = useState<ActiveOrder[]>([
    {
      id: '#8821', 
      customer: 'Metro Grocers Ltd', 
      segment: 'wholesale', 
      amount: 1240.00, 
      itemsCount: 48,
      items: [
        { name: 'Organic Fresh Milk (1L)', quantity: 24, unitPrice: 35.00, totalPrice: 840.00 },
        { name: 'Fresh Egyptian Eggs 30s', quantity: 10, unitPrice: 40.00, totalPrice: 400.00 }
      ],
      driver: { name: 'Ahmed Khalil', initials: 'AK', phone: '+20 100 234 5678' }, 
      status: 'On The Way', 
      statusClass: 'bg-[#EEF1F8] text-[#384E85]',
      time: '09:14', 
      progress: 83, 
      phone: '+20 100 123 4567', 
      address: '14 Nile St., Downtown, Cairo',
      timeline: [
        { label: 'Order Placed', done: true, time: '09:14 AM' },
        { label: 'Confirmed', done: true, time: '09:16 AM' },
        { label: 'Preparing', done: true, time: '09:20 AM' },
        { label: 'Ready for Pickup', done: true, time: '09:35 AM' },
        { label: 'Picked Up', done: true, time: '09:42 AM' },
        { label: 'On The Way', done: true, time: '09:50 AM' },
        { label: 'Delivered', done: false }
      ]
    },
    {
      id: '#8820', 
      customer: 'Sarah Mitchell', 
      segment: 'retail', 
      amount: 85.00, 
      itemsCount: 6,
      items: [
        { name: 'Fresh Apples (1kg)', quantity: 2, unitPrice: 25.00, totalPrice: 50.00 },
        { name: 'Orange Juice 1.5L', quantity: 1, unitPrice: 35.00, totalPrice: 35.00 }
      ],
      driver: { name: 'Maria Santos', initials: 'MS', phone: '+20 100 345 6789' }, 
      status: 'Preparing', 
      statusClass: 'bg-[#FFFBEB] text-[#D97706]',
      time: '09:28', 
      progress: 35, 
      phone: '+20 100 234 5678', 
      address: '22 Tahrir Sq., Giza',
      timeline: [
        { label: 'Order Placed', done: true, time: '09:28 AM' },
        { label: 'Confirmed', done: true, time: '09:30 AM' },
        { label: 'Preparing', done: true, time: '09:35 AM' },
        { label: 'Ready for Pickup', done: false },
        { label: 'Picked Up', done: false },
        { label: 'On The Way', done: false },
        { label: 'Delivered', done: false }
      ]
    },
    {
      id: '#8819', 
      customer: 'City Foods Co.', 
      segment: 'wholesale', 
      amount: 2450.00, 
      itemsCount: 112,
      items: [
        { name: 'Bulk Basmati Rice 10kg', quantity: 10, unitPrice: 245.00, totalPrice: 2450.00 }
      ],
      driver: { name: 'Reza Mahmoud', initials: 'RM', phone: '+20 100 456 7890' }, 
      status: 'Ready for Pickup', 
      statusClass: 'bg-[#ECFEFF] text-[#0891B2]',
      time: '09:05', 
      progress: 50, 
      phone: '+20 100 567 8901', 
      address: '12 Industrial Zone, 6th October',
      timeline: [
        { label: 'Order Placed', done: true, time: '09:05 AM' },
        { label: 'Confirmed', done: true, time: '09:08 AM' },
        { label: 'Preparing', done: true, time: '09:15 AM' },
        { label: 'Ready for Pickup', done: true, time: '09:40 AM' },
        { label: 'Picked Up', done: false },
        { label: 'On The Way', done: false },
        { label: 'Delivered', done: false }
      ]
    },
    {
      id: '#8818', 
      customer: 'Omar Khalid', 
      segment: 'retail', 
      amount: 190.00, 
      itemsCount: 8,
      items: [
        { name: 'Cheddar Cheese 500g', quantity: 2, unitPrice: 95.00, totalPrice: 190.00 }
      ],
      driver: { name: 'Tom Wilson', initials: 'TW', phone: '+20 100 678 9012' }, 
      status: 'Picked Up', 
      statusClass: 'bg-[#ECFEFF] text-[#0891B2]',
      time: '08:52', 
      progress: 65, 
      phone: '+20 100 678 1234', 
      address: '5 Corniche Rd., Alexandria',
      timeline: [
        { label: 'Order Placed', done: true, time: '08:52 AM' },
        { label: 'Confirmed', done: true, time: '08:55 AM' },
        { label: 'Preparing', done: true, time: '09:02 AM' },
        { label: 'Ready for Pickup', done: true, time: '09:20 AM' },
        { label: 'Picked Up', done: true, time: '09:35 AM' },
        { label: 'On The Way', done: false },
        { label: 'Delivered', done: false }
      ]
    },
    {
      id: '#8817', 
      customer: 'Sunrise Bakery', 
      segment: 'wholesale', 
      amount: 680.00, 
      itemsCount: 24,
      items: [
        { name: 'Pastry Flour 25kg', quantity: 2, unitPrice: 340.00, totalPrice: 680.00 }
      ],
      driver: { name: 'James Roberts', initials: 'JR', phone: '+20 100 789 0123' }, 
      status: 'Confirmed', 
      statusClass: 'bg-[#F5F3FF] text-[#7C3AED]',
      time: '09:30', 
      progress: 20, 
      phone: '+20 100 789 4567', 
      address: '44 El-Nasr Ave, Nasr City',
      timeline: [
        { label: 'Order Placed', done: true, time: '09:30 AM' },
        { label: 'Confirmed', done: true, time: '09:32 AM' },
        { label: 'Preparing', done: false },
        { label: 'Ready for Pickup', done: false },
        { label: 'Picked Up', done: false },
        { label: 'On The Way', done: false },
        { label: 'Delivered', done: false }
      ]
    },
    {
      id: '#8816', 
      customer: 'Layla Hassan', 
      segment: 'retail', 
      amount: 120.00, 
      itemsCount: 5,
      items: [
        { name: 'Olive Oil Extra Virgin 1L', quantity: 1, unitPrice: 120.00, totalPrice: 120.00 }
      ],
      driver: { name: 'Lisa Park', initials: 'LP', phone: '+20 100 890 1234' }, 
      status: 'Order Placed', 
      statusClass: 'bg-[#EEF1F8] text-[#384E85]',
      time: '09:41', 
      progress: 10, 
      phone: '+20 100 890 5678', 
      address: '8 Othman St., Maadi, Cairo',
      timeline: [
        { label: 'Order Placed', done: true, time: '09:41 AM' },
        { label: 'Confirmed', done: false },
        { label: 'Preparing', done: false },
        { label: 'Ready for Pickup', done: false },
        { label: 'Picked Up', done: false },
        { label: 'On The Way', done: false },
        { label: 'Delivered', done: false }
      ]
    }
  ]);

  const [deliveredOrders, setDeliveredOrders] = useState([
    { id: '#8815', customer: 'Metro Grocers Ltd', segment: 'wholesale', amount: 1240, items: 48, driver: 'Ahmed Khalil', deliveredAt: 'Today, 08:30 AM' },
    { id: '#8814', customer: 'QuickBite Café', segment: 'wholesale', amount: 520, items: 18, driver: 'Reza Mahmoud', deliveredAt: 'Today, 08:15 AM' },
    { id: '#8813', customer: 'Sunrise Wholesale', segment: 'wholesale', amount: 2100, items: 65, driver: 'Maria Santos', deliveredAt: 'Yesterday, 06:00 PM' },
    { id: '#8812', customer: 'Ahmed Hassan', segment: 'retail', amount: 73, items: 4, driver: 'Tom Wilson', deliveredAt: 'Yesterday, 05:45 PM' },
  ]);

  const [cancelledOrders, setCancelledOrders] = useState([
    { id: '#8811', customer: 'Mona Adel', amount: 45, reason: 'Changed mind, no longer needed', cancelledBy: 'Customer', atStage: 'Confirmed' },
    { id: '#8810', customer: 'Sami Nader', amount: 120, reason: 'Payment verification failed', cancelledBy: 'System', atStage: 'Order Placed' },
    { id: '#8809', customer: 'Cairo Mart', amount: 560, reason: 'Driver unavailable in area', cancelledBy: 'Driver', atStage: 'On The Way' },
    { id: '#8808', customer: 'Rania Youssef', amount: 78, reason: 'Duplicate order placed', cancelledBy: 'Admin', atStage: 'Preparing' },
  ]);

  const handleMarkDelivered = (orderId: string) => {
    const target = activeOrders.find(o => o.id === orderId);
    if (!target) return;
    setActiveOrders(prev => prev.filter(o => o.id !== orderId));
    setDeliveredOrders(prev => [
      { id: target.id, customer: target.customer, segment: target.segment, amount: target.amount, items: target.itemsCount, driver: target.driver.name, deliveredAt: 'Just now' },
      ...prev
    ]);
  };

  const handleConfirmCancel = () => {
    if (!cancelModalOrder) return;
    const target = cancelModalOrder;
    setActiveOrders(prev => prev.filter(o => o.id !== target.id));
    setCancelledOrders(prev => [
      { id: target.id, customer: target.customer, amount: target.amount, reason: cancelReason, cancelledBy: 'Admin', atStage: target.status },
      ...prev
    ]);
    setCancelModalOrder(null);
  };

  return (
    <div className="space-y-6 select-none pb-10">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-extrabold text-[#0F1629] tracking-tight">Order Management</h1>
          <p className="text-[13px] text-[#7A8299] mt-0.5">Track, update, and manage all orders in real time</p>
        </div>
        <button 
          onClick={() => setIsCreateOrderOpen(true)}
          className="h-[38px] px-4 rounded-[12px] bg-gradient-to-r from-[#384E85] to-[#2A3A65] text-white text-[13px] font-bold flex items-center gap-2 shadow-[0px_4px_14px_rgba(56,78,133,0.3)] hover:opacity-95 transition cursor-pointer border-none"
        >
          <Plus className="w-4 h-4" />
          <span>Create Order</span>
        </button>
      </div>

      {/* 3 Summary Stat Cards (Figma 1:18108) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 bg-white border border-[rgba(56,78,133,0.07)] rounded-[16px] shadow-[0px_4px_8px_rgba(0,0,0,0.05)] flex items-center gap-3">
          <div className="w-[38px] h-[38px] rounded-[11px] bg-[#EEF1F8] text-[#384E85] flex items-center justify-center font-bold shrink-0">
            <Clock className="w-4 h-4 text-[#384E85]" />
          </div>
          <div>
            <div className="text-[22px] font-extrabold text-[#384E85] leading-none">{activeOrders.length}</div>
            <div className="text-[11px] text-[#7A8299] mt-1">Active</div>
          </div>
        </Card>

        <Card className="p-4 bg-white border border-[rgba(56,78,133,0.07)] rounded-[16px] shadow-[0px_4px_8px_rgba(0,0,0,0.05)] flex items-center gap-3">
          <div className="w-[38px] h-[38px] rounded-[11px] bg-[#ECFDF5] text-[#10B981] flex items-center justify-center font-bold shrink-0">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
          </div>
          <div>
            <div className="text-[22px] font-extrabold text-[#10B981] leading-none">{deliveredOrders.length}</div>
            <div className="text-[11px] text-[#7A8299] mt-1">Delivered</div>
          </div>
        </Card>

        <Card className="p-4 bg-white border border-[rgba(56,78,133,0.07)] rounded-[16px] shadow-[0px_4px_8px_rgba(0,0,0,0.05)] flex items-center gap-3">
          <div className="w-[38px] h-[38px] rounded-[11px] bg-[#FEF2F2] text-[#EF4444] flex items-center justify-center font-bold shrink-0">
            <XCircle className="w-4 h-4 text-[#EF4444]" />
          </div>
          <div>
            <div className="text-[22px] font-extrabold text-[#EF4444] leading-none">{cancelledOrders.length}</div>
            <div className="text-[11px] text-[#7A8299] mt-1">Cancelled</div>
          </div>
        </Card>
      </div>

      {/* Main Table Container with Header Tab Bar (Figma Node 1:18108) */}
      <Card className="p-0 overflow-hidden bg-white border border-[rgba(56,78,133,0.07)] rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)]">
        
        {/* Table Top Filter Header */}
        <div className="border-b border-[rgba(56,78,133,0.07)] px-4 py-2.5 flex items-center justify-between gap-4 flex-wrap bg-white">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-3.5 py-2 rounded-none text-[13px] font-bold flex items-center gap-1.5 transition cursor-pointer border-b-2 bg-transparent ${
                activeTab === 'active' 
                  ? 'border-[#384E85] text-[#384E85]' 
                  : 'border-transparent text-[#7A8299] hover:text-[#0F1629]'
              }`}
            >
              <span>Active</span>
              <span className={`px-2 py-0.5 rounded-[9px] text-[10px] font-bold ${
                activeTab === 'active' ? 'bg-[#384E85] text-white' : 'bg-[#F4F5F8] text-[#7A8299]'
              }`}>
                {activeOrders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('delivered')}
              className={`px-3.5 py-2 rounded-none text-[13px] font-medium flex items-center gap-1.5 transition cursor-pointer border-b-2 bg-transparent ${
                activeTab === 'delivered' 
                  ? 'border-[#384E85] text-[#384E85] font-bold' 
                  : 'border-transparent text-[#7A8299] hover:text-[#0F1629]'
              }`}
            >
              <span>Delivered</span>
              <span className={`px-2 py-0.5 rounded-[9px] text-[10px] font-bold ${
                activeTab === 'delivered' ? 'bg-[#384E85] text-white' : 'bg-[#F4F5F8] text-[#7A8299]'
              }`}>
                {deliveredOrders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('cancelled')}
              className={`px-3.5 py-2 rounded-none text-[13px] font-medium flex items-center gap-1.5 transition cursor-pointer border-b-2 bg-transparent ${
                activeTab === 'cancelled' 
                  ? 'border-[#EF4444] text-[#EF4444] font-bold' 
                  : 'border-transparent text-[#7A8299] hover:text-[#0F1629]'
              }`}
            >
              <span>Cancelled</span>
              <span className={`px-2 py-0.5 rounded-[9px] text-[10px] font-bold ${
                activeTab === 'cancelled' ? 'bg-[#EF4444] text-white' : 'bg-[#F4F5F8] text-[#7A8299]'
              }`}>
                {cancelledOrders.length}
              </span>
            </button>
          </div>

          <div className="w-[180px] relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A8299]" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-[34px] pl-8 pr-3 bg-[#F4F5F8] border border-transparent rounded-[9px] text-[12px] text-[#0F1629] placeholder-[rgba(15,22,41,0.5)] outline-none"
            />
          </div>
        </div>

        {/* ACTIVE ORDERS TAB (Figma 1:18108 & 1:43210) */}
        {activeTab === 'active' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#FAFAFA] border-b border-[rgba(56,78,133,0.07)] text-[#7A8299] font-bold uppercase tracking-[0.5px] text-[11px]">
                <tr>
                  <th className="py-2.5 px-4">Order #</th>
                  <th className="py-2.5 px-4">Customer</th>
                  <th className="py-2.5 px-4">Amount</th>
                  <th className="py-2.5 px-4 text-center">Items</th>
                  <th className="py-2.5 px-4">Driver</th>
                  <th className="py-2.5 px-4">Status</th>
                  <th className="py-2.5 px-4">Time</th>
                  <th className="py-2.5 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(56,78,133,0.06)]">
                {activeOrders
                  .filter(o => o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase()))
                  .map((o) => {
                    const isExpanded = expandedRow === o.id;
                    return (
                      <React.Fragment key={o.id}>
                        <tr className="hover:bg-[#FAFAFA] transition">
                          <td className="py-4 px-4 font-mono font-extrabold text-[#384E85]">{o.id}</td>
                          <td className="py-4 px-4">
                            <div className="font-semibold text-[#0F1629] text-[13px]">{o.customer}</div>
                            <span className={`inline-block px-1.5 py-0.5 rounded-[5px] text-[10px] font-semibold capitalize ${
                              o.segment === 'wholesale' ? 'bg-[#EEF1F8] text-[#384E85]' : 'bg-[#F4F5F8] text-[#7A8299]'
                            }`}>
                              {o.segment}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-mono font-extrabold text-[#0F1629]">{o.amount.toFixed(0)} EGP</td>
                          <td className="py-4 px-4 text-center text-[#4A5568]">{o.itemsCount}</td>
                          <td className="py-4 px-4 text-[#4A5568] text-[12px]">{o.driver.name}</td>
                          <td className="py-4 px-4 min-w-[170px]">
                            <div className="text-[11px] font-semibold text-[#384E85] mb-1">
                              {o.status} <span className="text-[#7A8299] font-normal">{o.progress}%</span>
                            </div>
                            <div className="w-[160px] h-[4px] bg-[#EEF1F8] rounded-[4px] overflow-hidden">
                              <div className="h-full bg-[#384E85] rounded-[4px]" style={{ width: `${o.progress}%` }} />
                            </div>
                          </td>
                          <td className="py-4 px-4 text-[#7A8299] text-[12px]">{o.time}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleMarkDelivered(o.id)}
                                className="h-[28px] px-2.5 bg-[#EEF1F8] hover:bg-[#E2E7F3] text-[#384E85] text-[11px] font-bold rounded-[8px] flex items-center gap-1 cursor-pointer transition border-none"
                              >
                                <Check className="w-3 h-3" />
                                <span>Mark Delivered</span>
                              </button>
                              <button
                                onClick={() => setExpandedRow(isExpanded ? null : o.id)}
                                className={`w-7 h-7 rounded-[8px] flex items-center justify-center cursor-pointer transition border-none ${
                                  isExpanded ? 'bg-[#384E85] text-white' : 'bg-[#F4F5F8] text-[#7A8299] hover:bg-gray-200'
                                }`}
                                title="View details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setCancelModalOrder(o)}
                                className="w-7 h-7 rounded-[8px] bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#EF4444] flex items-center justify-center cursor-pointer transition border-none"
                                title="Cancel order"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* EXPANDED ORDER DETAILS PANEL (Figma Node 1:43210) */}
                        {isExpanded && (
                          <tr className="bg-[#FAFAFA]">
                            <td colSpan={8} className="p-5 border-t border-b border-[rgba(56,78,133,0.07)]">
                              <div className="bg-white p-5 rounded-[16px] border border-[rgba(56,78,133,0.1)] shadow-2xs space-y-5">
                                
                                {/* 7-Step Delivery Stepper */}
                                <div className="space-y-2">
                                  <span className="text-[11px] font-extrabold text-[#7A8299] uppercase tracking-[0.5px]">Delivery Progress Lifecycle</span>
                                  <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
                                    {o.timeline.map((step, idx) => (
                                      <div key={idx} className={`p-2.5 rounded-[10px] border text-center transition ${
                                        step.done 
                                          ? 'bg-[#ECFDF5] border-[#10B981]/30 text-[#065F46]' 
                                          : 'bg-[#F9FAFB] border-gray-200 text-[#9CA3AF]'
                                      }`}>
                                        <div className="flex items-center justify-center mb-1">
                                          {step.done ? (
                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                                          ) : (
                                            <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                                          )}
                                        </div>
                                        <div className="text-[11px] font-bold leading-tight">{step.label}</div>
                                        {step.time && <div className="text-[9.5px] text-[#6B7280] mt-0.5">{step.time}</div>}
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Customer & Driver Row */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2 border-t border-gray-100">
                                  <div className="space-y-1.5">
                                    <span className="text-[11px] font-bold text-[#7A8299] uppercase tracking-[0.5px]">Customer Details</span>
                                    <div className="flex items-center gap-2 text-[13px] font-bold text-[#0F1629]">
                                      <User className="w-3.5 h-3.5 text-[#384E85]" /> {o.customer}
                                    </div>
                                    <div className="text-[12px] text-[#7A8299] flex items-center gap-2">
                                      <Phone className="w-3 h-3" /> {o.phone}
                                    </div>
                                    <div className="text-[12px] text-[#7A8299] flex items-center gap-2">
                                      <MapPin className="w-3 h-3" /> {o.address}
                                    </div>
                                  </div>

                                  <div className="space-y-1.5">
                                    <span className="text-[11px] font-bold text-[#7A8299] uppercase tracking-[0.5px]">Driver Information</span>
                                    <div className="flex items-center gap-2.5 pt-1">
                                      <div className="w-8 h-8 rounded-full bg-[#EEF1F8] text-[#384E85] font-bold text-[11px] flex items-center justify-center">
                                        {o.driver.initials}
                                      </div>
                                      <div>
                                        <div className="text-[12.5px] font-bold text-[#0F1629]">{o.driver.name}</div>
                                        <div className="text-[11px] text-[#7A8299]">{o.driver.phone}</div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="space-y-1.5 flex flex-col justify-end">
                                    <div className="flex items-center gap-2">
                                      <button
                                        onClick={() => handleMarkDelivered(o.id)}
                                        className="flex-1 h-8.5 px-3 bg-[#EEF1F8] hover:bg-[#E2E7F3] text-[#384E85] text-[12px] font-bold rounded-[8px] flex items-center justify-center gap-1.5 transition cursor-pointer border-none"
                                      >
                                        <Check className="w-3.5 h-3.5" /> Mark Delivered
                                      </button>
                                      <button
                                        onClick={() => setCancelModalOrder(o)}
                                        className="h-8.5 px-3 bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#EF4444] text-[12px] font-bold rounded-[8px] flex items-center justify-center gap-1.5 transition cursor-pointer border-none"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" /> Cancel
                                      </button>
                                    </div>
                                  </div>
                                </div>

                                {/* Items Breakdown */}
                                <div className="space-y-2 pt-2 border-t border-gray-100">
                                  <span className="text-[11px] font-bold text-[#7A8299] uppercase tracking-[0.5px]">Order Items</span>
                                  <div className="bg-[#FAFAFA] rounded-[10px] border border-gray-200 p-2.5">
                                    <table className="w-full text-left text-[12px]">
                                      <thead>
                                        <tr className="text-[#7A8299] font-semibold border-b border-gray-200">
                                          <th className="pb-1">Item</th>
                                          <th className="pb-1 text-center">Qty</th>
                                          <th className="pb-1 text-right">Price</th>
                                          <th className="pb-1 text-right">Total</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-gray-200">
                                        {o.items.map((item, i) => (
                                          <tr key={i}>
                                            <td className="py-1 font-medium text-[#0F1629]">{item.name}</td>
                                            <td className="py-1 text-center font-bold text-[#0F1629]">{item.quantity}</td>
                                            <td className="py-1 text-right text-[#7A8299]">{item.unitPrice.toFixed(0)} EGP</td>
                                            <td className="py-1 text-right font-bold text-[#0F1629]">{item.totalPrice.toFixed(0)} EGP</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>

                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}

        {/* DELIVERED ORDERS TAB (Figma Node 1:18600) */}
        {activeTab === 'delivered' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#FAFAFA] border-b border-[rgba(56,78,133,0.07)] text-[#7A8299] font-bold uppercase tracking-[0.5px] text-[11px]">
                <tr>
                  <th className="py-2.5 px-4">Order #</th>
                  <th className="py-2.5 px-4">Customer</th>
                  <th className="py-2.5 px-4">Amount</th>
                  <th className="py-2.5 px-4">Items</th>
                  <th className="py-2.5 px-4">Driver</th>
                  <th className="py-2.5 px-4">Delivered At</th>
                  <th className="py-2.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(56,78,133,0.06)]">
                {deliveredOrders
                  .filter(o => o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase()))
                  .map((o) => (
                    <tr key={o.id} className="hover:bg-[#FAFAFA] transition">
                      <td className="py-4 px-4 font-mono font-extrabold text-[#384E85]">{o.id}</td>
                      <td className="py-4 px-4 font-bold text-[#0F1629]">{o.customer}</td>
                      <td className="py-4 px-4 font-mono font-extrabold text-[#0F1629]">{o.amount.toFixed(0)} EGP</td>
                      <td className="py-4 px-4 text-[#7A8299]">{o.items} items</td>
                      <td className="py-4 px-4 text-[#4A5568]">{o.driver}</td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#ECFDF5] text-[#10B981]">
                          <CheckCircle2 className="w-3 h-3" /> {o.deliveredAt}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button className="p-1.5 rounded-[8px] bg-[#F4F5F8] hover:bg-gray-200 text-[#384E85] border-none cursor-pointer transition" title="Print Receipt">
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* CANCELLED ORDERS TAB (Figma Node 1:18972) */}
        {activeTab === 'cancelled' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#FAFAFA] border-b border-[rgba(56,78,133,0.07)] text-[#7A8299] font-bold uppercase tracking-[0.5px] text-[11px]">
                <tr>
                  <th className="py-2.5 px-4">Order #</th>
                  <th className="py-2.5 px-4">Customer</th>
                  <th className="py-2.5 px-4">Amount</th>
                  <th className="py-2.5 px-4">Reason</th>
                  <th className="py-2.5 px-4">Cancelled By</th>
                  <th className="py-2.5 px-4">At Stage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(56,78,133,0.06)]">
                {cancelledOrders
                  .filter(o => o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase()))
                  .map((o) => (
                    <tr key={o.id} className="hover:bg-[#FAFAFA] transition">
                      <td className="py-4 px-4 font-mono font-extrabold text-[#EF4444]">{o.id}</td>
                      <td className="py-4 px-4 font-bold text-[#0F1629]">{o.customer}</td>
                      <td className="py-4 px-4 font-mono font-extrabold text-[#0F1629]">{o.amount.toFixed(0)} EGP</td>
                      <td className="py-4 px-4 text-[#7A8299] font-medium">{o.reason}</td>
                      <td className="py-4 px-4 font-bold text-[#384E85]">{o.cancelledBy}</td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#FEF2F2] text-[#EF4444]">
                          {o.atStage}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

      </Card>

      {/* CANCEL ORDER MODAL */}
      {cancelModalOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 select-none">
          <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[480px] overflow-hidden flex flex-col border-none">
            <div className="px-6 py-4 bg-[#FEF2F2] border-b border-[#EF4444]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#EF4444] text-white flex items-center justify-center">
                  <XCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#991B1B]">Cancel Order {cancelModalOrder.id}</h3>
                  <p className="text-[11px] text-[#991B1B]/80">{cancelModalOrder.customer} · {cancelModalOrder.amount.toFixed(0)} EGP</p>
                </div>
              </div>
              <button onClick={() => setCancelModalOrder(null)} className="w-7 h-7 rounded-full bg-white/50 text-[#991B1B] flex items-center justify-center border-none cursor-pointer">
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-[13px]">
              <div className="p-3 bg-[#FFF7ED] border border-[#F97316]/20 rounded-[12px] flex items-start gap-2.5 text-[#9A3412]">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="text-[12px]">This action <strong>cannot be undone</strong>. The order will be moved to cancelled and customer notified.</span>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#0F1629] mb-2">Select cancellation reason</label>
                <div className="space-y-1.5">
                  {[
                    'Customer request',
                    'Item out of stock',
                    'Payment issue',
                    'Duplicate order',
                    'Customer unreachable',
                    'Address cannot be located',
                    'Other reason'
                  ].map((r) => (
                    <label key={r} className="flex items-center gap-2 p-2 hover:bg-[#FAFAFA] rounded-lg cursor-pointer">
                      <input
                        type="radio"
                        name="cancelReason"
                        value={r}
                        checked={cancelReason === r}
                        onChange={(e) => setCancelReason(e.target.value)}
                        className="accent-[#EF4444]"
                      />
                      <span className="text-[12.5px] font-medium text-[#0F1629]">{r}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-3.5 bg-[#FAFAFA] border-t border-gray-100 flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => setCancelModalOrder(null)}>Keep Order</Button>
              <button
                onClick={handleConfirmCancel}
                className="h-9 px-4 rounded-[12px] bg-[#EF4444] hover:bg-[#DC2626] text-white text-[12.5px] font-bold flex items-center gap-1.5 transition cursor-pointer border-none"
              >
                <XCircle className="w-4 h-4" /> Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Order Modal (Figma Design 1:17684) */}
      <CreateOrderModal 
        isOpen={isCreateOrderOpen} 
        onClose={() => setIsCreateOrderOpen(false)}
        onOrderCreated={(newOrder) => setActiveOrders([newOrder, ...activeOrders])}
      />
    </div>
  );
};
