import React, { useState } from 'react';
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
  DollarSign
} from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';

interface OrderTimelineStep {
  label: string;
  done: boolean;
  time?: string;
}

interface ActiveOrder {
  id: string;
  customer: string;
  segment: 'retail' | 'wholesale';
  amount: number;
  items: number;
  driver: { name: string; initials: string };
  status: string;
  statusClass: string;
  time: string;
  progress: number;
  phone: string;
  address: string;
  timeline: OrderTimelineStep[];
}

export const OrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'delivered' | 'cancelled'>('active');
  const [search, setSearch] = useState('');
  const [expandedRow, setExpandedRow] = useState<string | null>('ORD-8901');
  const [cancelModalOrder, setCancelModalOrder] = useState<ActiveOrder | null>(null);
  const [cancelReason, setCancelReason] = useState('Customer request');

  const [activeOrders, setActiveOrders] = useState<ActiveOrder[]>([
    {
      id: 'ORD-8901', customer: 'Omar Khalid', segment: 'retail', amount: 58.00, items: 3,
      driver: { name: 'Ahmed K.', initials: 'AK' }, status: 'On The Way', statusClass: 'bg-[#ECFDF5] text-[#065F46]',
      time: '12 min ago', progress: 83, phone: '+20 100 123 4567', address: '14 Nile St., Downtown, Cairo',
      timeline: [
        { label: 'Order Placed', done: true, time: '10:32 AM' },
        { label: 'Confirmed', done: true, time: '10:35 AM' },
        { label: 'Preparing', done: true, time: '10:48 AM' },
        { label: 'Ready for Pickup', done: true, time: '11:05 AM' },
        { label: 'Picked Up', done: true, time: '11:20 AM' },
        { label: 'On The Way', done: true, time: '11:32 AM' },
        { label: 'Delivered', done: false }
      ]
    },
    {
      id: 'ORD-8902', customer: 'Sarah Mitchell', segment: 'retail', amount: 127.00, items: 5,
      driver: { name: 'Reza M.', initials: 'RM' }, status: 'Preparing', statusClass: 'bg-[#FFFBEB] text-[#D97706]',
      time: '8 min ago', progress: 33, phone: '+20 100 234 5678', address: '22 Tahrir Sq., Giza',
      timeline: [
        { label: 'Order Placed', done: true, time: '11:45 AM' },
        { label: 'Confirmed', done: true, time: '11:47 AM' },
        { label: 'Preparing', done: true, time: '11:52 AM' },
        { label: 'Ready for Pickup', done: false },
        { label: 'Picked Up', done: false },
        { label: 'On The Way', done: false },
        { label: 'Delivered', done: false }
      ]
    },
    {
      id: 'ORD-8903', customer: 'David Kumar', segment: 'wholesale', amount: 340.00, items: 12,
      driver: { name: 'Maria S.', initials: 'MS' }, status: 'Picked Up', statusClass: 'bg-[#ECFEFF] text-[#0891B2]',
      time: '4 min ago', progress: 67, phone: '+20 100 345 6789', address: '5 Corniche Rd., Alexandria',
      timeline: [
        { label: 'Order Placed', done: true, time: '10:15 AM' },
        { label: 'Confirmed', done: true, time: '10:18 AM' },
        { label: 'Preparing', done: true, time: '10:30 AM' },
        { label: 'Ready for Pickup', done: true, time: '10:55 AM' },
        { label: 'Picked Up', done: true, time: '11:10 AM' },
        { label: 'On The Way', done: false },
        { label: 'Delivered', done: false }
      ]
    },
    {
      id: 'ORD-8904', customer: 'Layla Hassan', segment: 'retail', amount: 85.00, items: 2,
      driver: { name: 'Tom W.', initials: 'TW' }, status: 'Order Placed', statusClass: 'bg-[#EEF1F8] text-[#384E85]',
      time: '8 min ago', progress: 10, phone: '+20 100 456 7890', address: '8 Othman St., Maadi, Cairo',
      timeline: [
        { label: 'Order Placed', done: true, time: '12:05 PM' },
        { label: 'Confirmed', done: false },
        { label: 'Preparing', done: false },
        { label: 'Ready for Pickup', done: false },
        { label: 'Picked Up', done: false },
        { label: 'On The Way', done: false },
        { label: 'Delivered', done: false }
      ]
    },
    {
      id: 'ORD-8905', customer: 'City Foods Co.', segment: 'wholesale', amount: 890.00, items: 28,
      driver: { name: 'James R.', initials: 'JR' }, status: 'Confirmed', statusClass: 'bg-[#F5F3FF] text-[#7C3AED]',
      time: '12 min ago', progress: 20, phone: '+20 100 567 8901', address: '12 Industrial Zone, 6th October',
      timeline: [
        { label: 'Order Placed', done: true, time: '09:30 AM' },
        { label: 'Confirmed', done: true, time: '09:35 AM' },
        { label: 'Preparing', done: false },
        { label: 'Ready for Pickup', done: false },
        { label: 'Picked Up', done: false },
        { label: 'On The Way', done: false },
        { label: 'Delivered', done: false }
      ]
    }
  ]);

  const [deliveredOrders, setDeliveredOrders] = useState([
    { id: 'ORD-8850', customer: 'Metro Grocers Ltd', segment: 'wholesale', amount: 1240.00, items: 42, driver: 'Ahmed K.', deliveredAt: '2026-07-29 14:32' },
    { id: 'ORD-8848', customer: 'QuickBite Café', segment: 'wholesale', amount: 520.00, items: 18, driver: 'Reza M.', deliveredAt: '2026-07-29 13:15' },
    { id: 'ORD-8845', customer: 'Sunrise Wholesale', segment: 'wholesale', amount: 2100.00, items: 65, driver: 'Maria S.', deliveredAt: '2026-07-29 12:00' },
    { id: 'ORD-8842', customer: 'Ahmed Hassan', segment: 'retail', amount: 73.00, items: 4, driver: 'Tom W.', deliveredAt: '2026-07-29 11:45' },
    { id: 'ORD-8839', customer: 'Fatima Zahra', segment: 'retail', amount: 92.00, items: 3, driver: 'Lisa P.', deliveredAt: '2026-07-29 10:30' },
  ]);

  const [cancelledOrders, setCancelledOrders] = useState([
    { id: 'ORD-8870', customer: 'Mona Adel', amount: 45.00, reason: 'Changed mind, no longer needed', cancelledBy: 'Customer', atStage: 'Confirmed' },
    { id: 'ORD-8868', customer: 'Sami Nader', amount: 120.00, reason: 'Payment verification failed', cancelledBy: 'System', atStage: 'Order Placed' },
    { id: 'ORD-8865', customer: 'Cairo Mart', amount: 560.00, reason: 'Driver unavailable in area', cancelledBy: 'Driver', atStage: 'On The Way' },
    { id: 'ORD-8862', customer: 'Rania Youssef', amount: 78.00, reason: 'Duplicate order placed', cancelledBy: 'Admin', atStage: 'Preparing' },
  ]);

  const handleMarkDelivered = (orderId: string) => {
    const target = activeOrders.find(o => o.id === orderId);
    if (!target) return;
    setActiveOrders(prev => prev.filter(o => o.id !== orderId));
    setDeliveredOrders(prev => [
      { id: target.id, customer: target.customer, segment: target.segment, amount: target.amount, items: target.items, driver: target.driver.name, deliveredAt: 'Just now' },
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
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-extrabold text-[#0F1629] tracking-tight">Order Management</h1>
          <p className="text-[13px] text-[#7A8299] mt-0.5">Track, update, and manage all orders in real time</p>
        </div>
        <button className="h-[38px] px-4 rounded-[12px] bg-gradient-to-r from-[#384E85] to-[#2A3A65] text-white text-[13px] font-bold flex items-center gap-2 shadow-[0px_4px_14px_rgba(56,78,133,0.3)] hover:opacity-95 transition cursor-pointer border-none">
          <Plus className="w-4 h-4" />
          <span>Create Order</span>
        </button>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 bg-white border border-[#384E85]/8 rounded-[18px] shadow-[0px_4px_16px_rgba(0,0,0,0.04)] flex items-center gap-4">
          <div className="w-11 h-11 rounded-[12px] bg-[#EEF1F8] text-[#384E85] flex items-center justify-center font-bold shrink-0">
            <Clock className="w-5.5 h-5.5" />
          </div>
          <div>
            <div className="text-[22px] font-extrabold text-[#0F1629] leading-tight">{activeOrders.length}</div>
            <div className="text-[11px] font-semibold text-[#7A8299] uppercase tracking-[0.5px]">Active Orders</div>
            <div className="text-[10px] text-[#10B981] font-bold mt-0.5">↑ 12.1% vs yesterday</div>
          </div>
        </Card>

        <Card className="p-4 bg-white border border-[#384E85]/8 rounded-[18px] shadow-[0px_4px_16px_rgba(0,0,0,0.04)] flex items-center gap-4">
          <div className="w-11 h-11 rounded-[12px] bg-[#ECFDF5] text-[#10B981] flex items-center justify-center font-bold shrink-0">
            <CheckCircle2 className="w-5.5 h-5.5" />
          </div>
          <div>
            <div className="text-[22px] font-extrabold text-[#0F1629] leading-tight">{deliveredOrders.length}</div>
            <div className="text-[11px] font-semibold text-[#7A8299] uppercase tracking-[0.5px]">Delivered Today</div>
            <div className="text-[10px] text-[#10B981] font-bold mt-0.5">↑ 8.3% vs yesterday</div>
          </div>
        </Card>

        <Card className="p-4 bg-white border border-[#384E85]/8 rounded-[18px] shadow-[0px_4px_16px_rgba(0,0,0,0.04)] flex items-center gap-4">
          <div className="w-11 h-11 rounded-[12px] bg-[#FEF2F2] text-[#EF4444] flex items-center justify-center font-bold shrink-0">
            <XCircle className="w-5.5 h-5.5" />
          </div>
          <div>
            <div className="text-[22px] font-extrabold text-[#0F1629] leading-tight">{cancelledOrders.length}</div>
            <div className="text-[11px] font-semibold text-[#7A8299] uppercase tracking-[0.5px]">Cancelled Today</div>
            <div className="text-[10px] text-[#EF4444] font-bold mt-0.5">↑ 2.4% vs yesterday</div>
          </div>
        </Card>
      </div>

      {/* Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#384E85]/8 pb-0 gap-4">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('active')}
            className={`pb-3 text-[13.5px] font-medium transition relative cursor-pointer border-none bg-none ${
              activeTab === 'active' ? 'text-[#384E85] font-bold border-b-2 border-[#384E85]' : 'text-[#7A8299] hover:text-[#0F1629]'
            }`}
          >
            Active <span className="ml-1.5 px-2 py-0.5 rounded-[8px] text-[10.5px] font-bold bg-[#EEF1F8] text-[#384E85]">{activeOrders.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('delivered')}
            className={`pb-3 text-[13.5px] font-medium transition relative cursor-pointer border-none bg-none ${
              activeTab === 'delivered' ? 'text-[#384E85] font-bold border-b-2 border-[#384E85]' : 'text-[#7A8299] hover:text-[#0F1629]'
            }`}
          >
            Delivered <span className="ml-1.5 px-2 py-0.5 rounded-[8px] text-[10.5px] font-bold bg-[#ECFDF5] text-[#10B981]">{deliveredOrders.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('cancelled')}
            className={`pb-3 text-[13.5px] font-medium transition relative cursor-pointer border-none bg-none ${
              activeTab === 'cancelled' ? 'text-[#EF4444] font-bold border-b-2 border-[#EF4444]' : 'text-[#7A8299] hover:text-[#0F1629]'
            }`}
          >
            Cancelled <span className="ml-1.5 px-2 py-0.5 rounded-[8px] text-[10.5px] font-bold bg-[#FEF2F2] text-[#EF4444]">{cancelledOrders.length}</span>
          </button>
        </div>

        <div className="w-full sm:w-[260px] relative pb-2 sm:pb-0">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A8299]" />
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-8.5 pl-8 pr-3 bg-[#F4F5F8] border border-transparent rounded-[10px] text-[12.5px] text-[#0F1629] outline-none"
          />
        </div>
      </div>

      {/* ACTIVE ORDERS TAB */}
      {activeTab === 'active' && (
        <Card className="p-0 overflow-hidden bg-white border border-[#384E85]/8 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#FAFAFA] border-b border-[#384E85]/8 text-[#7A8299] font-bold uppercase tracking-[0.5px] text-[11px]">
                <tr>
                  <th className="py-3.5 px-3 w-8"></th>
                  <th className="py-3.5 px-4">Order ID</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Segment</th>
                  <th className="py-3.5 px-4">Amount</th>
                  <th className="py-3.5 px-4">Items</th>
                  <th className="py-3.5 px-4">Driver</th>
                  <th className="py-3.5 px-4">Status / Progress</th>
                  <th className="py-3.5 px-4">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#384E85]/6">
                {activeOrders
                  .filter(o => o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase()))
                  .map((o) => {
                    const isExpanded = expandedRow === o.id;
                    return (
                      <React.Fragment key={o.id}>
                        <tr 
                          onClick={() => setExpandedRow(isExpanded ? null : o.id)} 
                          className="hover:bg-[#FAFAFA] transition cursor-pointer"
                        >
                          <td className="py-3.5 px-3">
                            <button className="w-6 h-6 rounded-full hover:bg-[#EEF1F8] flex items-center justify-center border-none bg-none transition">
                              <ChevronRight className={`w-3.5 h-3.5 text-[#7A8299] transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                            </button>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-[#384E85]">{o.id}</td>
                          <td className="py-3.5 px-4 font-bold text-[#0F1629]">{o.customer}</td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded-md text-[10.5px] font-bold capitalize ${
                              o.segment === 'wholesale' ? 'bg-[#F5F3FF] text-[#7C3AED]' : 'bg-[#EEF1F8] text-[#384E85]'
                            }`}>
                              {o.segment}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-extrabold text-[#0F1629]">${o.amount.toFixed(2)}</td>
                          <td className="py-3.5 px-4 text-[#7A8299]">{o.items} items</td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-[#EEF1F8] text-[#384E85] text-[10px] font-bold flex items-center justify-center">
                                {o.driver.initials}
                              </span>
                              <span className="font-semibold text-[#0F1629]">{o.driver.name}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 min-w-[180px]">
                            <div className="flex items-center justify-between text-[11px] mb-1">
                              <span className={`font-bold px-2 py-0.5 rounded-full ${o.statusClass}`}>{o.status}</span>
                              <span className="font-bold text-[#0F1629]">{o.progress}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-[#F4F5F8] rounded-full overflow-hidden">
                              <div className={`h-full ${o.progress < 50 ? 'bg-[#F59E0B]' : 'bg-[#384E85]'}`} style={{ width: `${o.progress}%` }} />
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-[#7A8299] text-[12px]">{o.time}</td>
                        </tr>

                        {/* EXPANDED ROW ACCORDION CARD */}
                        {isExpanded && (
                          <tr className="bg-[#FAFAFA]">
                            <td colSpan={9} className="p-5 border-t border-b border-[#384E85]/8">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-5 rounded-[16px] border border-[#384E85]/10 shadow-xs">
                                {/* Customer Details */}
                                <div className="space-y-2.5">
                                  <div className="text-[11px] font-bold text-[#7A8299] uppercase tracking-[0.5px]">Customer &amp; Location</div>
                                  <div className="flex items-center gap-2 text-[12.5px] font-semibold text-[#0F1629]">
                                    <User className="w-4 h-4 text-[#384E85]" /> {o.customer}
                                  </div>
                                  <div className="flex items-center gap-2 text-[12px] text-[#7A8299]">
                                    <Phone className="w-4 h-4 text-[#7A8299]" /> {o.phone}
                                  </div>
                                  <div className="flex items-center gap-2 text-[12px] text-[#7A8299]">
                                    <MapPin className="w-4 h-4 text-[#7A8299]" /> {o.address}
                                  </div>
                                  <div className="flex items-center gap-2 text-[12px] text-[#7A8299]">
                                    <Truck className="w-4 h-4 text-[#384E85]" /> Driver: <strong className="text-[#0F1629]">{o.driver.name}</strong>
                                  </div>
                                </div>

                                {/* Delivery Journey Timeline Stepper */}
                                <div className="space-y-2">
                                  <div className="text-[11px] font-bold text-[#7A8299] uppercase tracking-[0.5px]">Delivery Journey</div>
                                  <div className="space-y-2 relative pl-2">
                                    {o.timeline.map((step, idx) => (
                                      <div key={idx} className="flex items-center gap-2 text-[12px]">
                                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                                          step.done ? 'bg-[#10B981] text-white' : 'bg-[#EEF1F8] text-[#7A8299]'
                                        }`}>
                                          {step.done ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-1.5 h-1.5 rounded-full bg-[#CBD5E0]" />}
                                        </div>
                                        <span className={step.done ? 'font-bold text-[#0F1629]' : 'text-[#7A8299]'}>{step.label}</span>
                                        {step.time && <span className="ml-auto text-[10px] text-[#7A8299]">{step.time}</span>}
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="space-y-3 flex flex-col justify-between">
                                  <div>
                                    <div className="text-[11px] font-bold text-[#7A8299] uppercase tracking-[0.5px] mb-2">Manage Order</div>
                                    <p className="text-[11.5px] text-[#7A8299]">Update order lifecycle or initiate emergency cancellation</p>
                                  </div>
                                  <div className="space-y-2">
                                    <button 
                                      onClick={(e) => { e.stopPropagation(); handleMarkDelivered(o.id); }} 
                                      className="w-full h-8.5 px-3 bg-[#ECFDF5] hover:bg-[#D1FAE5] text-[#10B981] text-[12px] font-bold rounded-[10px] flex items-center justify-center gap-1.5 transition cursor-pointer border-none"
                                    >
                                      <CheckCircle2 className="w-4 h-4" /> Mark Delivered
                                    </button>
                                    <button 
                                      onClick={(e) => { e.stopPropagation(); setCancelModalOrder(o); }} 
                                      className="w-full h-8.5 px-3 bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#EF4444] text-[12px] font-bold rounded-[10px] flex items-center justify-center gap-1.5 transition cursor-pointer border-none"
                                    >
                                      <XCircle className="w-4 h-4" /> Cancel Order
                                    </button>
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
        </Card>
      )}

      {/* DELIVERED ORDERS TAB */}
      {activeTab === 'delivered' && (
        <Card className="p-0 overflow-hidden bg-white border border-[#384E85]/8 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#FAFAFA] border-b border-[#384E85]/8 text-[#7A8299] font-bold uppercase tracking-[0.5px] text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Order ID</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Segment</th>
                  <th className="py-3.5 px-4">Amount</th>
                  <th className="py-3.5 px-4">Items</th>
                  <th className="py-3.5 px-4">Driver</th>
                  <th className="py-3.5 px-4">Delivered At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#384E85]/6">
                {deliveredOrders
                  .filter(o => o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase()))
                  .map((o) => (
                    <tr key={o.id} className="hover:bg-[#FAFAFA] transition">
                      <td className="py-3.5 px-4 font-bold text-[#384E85]">{o.id}</td>
                      <td className="py-3.5 px-4 font-bold text-[#0F1629]">{o.customer}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-md text-[10.5px] font-bold capitalize ${
                          o.segment === 'wholesale' ? 'bg-[#F5F3FF] text-[#7C3AED]' : 'bg-[#EEF1F8] text-[#384E85]'
                        }`}>
                          {o.segment}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-[#0F1629]">${o.amount.toFixed(2)}</td>
                      <td className="py-3.5 px-4 text-[#7A8299]">{o.items} items</td>
                      <td className="py-3.5 px-4 font-semibold text-[#0F1629]">{o.driver}</td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#ECFDF5] text-[#10B981]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> {o.deliveredAt}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* CANCELLED ORDERS TAB */}
      {activeTab === 'cancelled' && (
        <div className="space-y-4">
          {/* Mini cancellation statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-[#EEF1F8] border border-[#384E85]/15 rounded-[14px]">
              <div className="text-[18px] font-extrabold text-[#384E85]">2</div>
              <div className="text-[11px] font-semibold text-[#384E85]">By Customer</div>
            </div>
            <div className="p-3 bg-[#FFFBEB] border border-[#F59E0B]/20 rounded-[14px]">
              <div className="text-[18px] font-extrabold text-[#D97706]">1</div>
              <div className="text-[11px] font-semibold text-[#D97706]">By Driver</div>
            </div>
            <div className="p-3 bg-[#F5F3FF] border border-[#7C3AED]/20 rounded-[14px]">
              <div className="text-[18px] font-extrabold text-[#7C3AED]">1</div>
              <div className="text-[11px] font-semibold text-[#7C3AED]">By Admin</div>
            </div>
            <div className="p-3 bg-[#FAFAFA] border border-gray-200 rounded-[14px]">
              <div className="text-[18px] font-extrabold text-[#7A8299]">1</div>
              <div className="text-[11px] font-semibold text-[#7A8299]">By System</div>
            </div>
          </div>

          <Card className="p-0 overflow-hidden bg-white border border-[#384E85]/8 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead className="bg-[#FAFAFA] border-b border-[#384E85]/8 text-[#7A8299] font-bold uppercase tracking-[0.5px] text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">Order ID</th>
                    <th className="py-3.5 px-4">Customer</th>
                    <th className="py-3.5 px-4">Amount</th>
                    <th className="py-3.5 px-4">Reason</th>
                    <th className="py-3.5 px-4">Cancelled By</th>
                    <th className="py-3.5 px-4">At Stage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#384E85]/6">
                  {cancelledOrders
                    .filter(o => o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase()))
                    .map((o) => (
                      <tr key={o.id} className="hover:bg-[#FAFAFA] transition">
                        <td className="py-3.5 px-4 font-bold text-[#EF4444]">{o.id}</td>
                        <td className="py-3.5 px-4 font-bold text-[#0F1629]">{o.customer}</td>
                        <td className="py-3.5 px-4 font-extrabold text-[#0F1629]">${o.amount.toFixed(2)}</td>
                        <td className="py-3.5 px-4 text-[#7A8299] font-medium">{o.reason}</td>
                        <td className="py-3.5 px-4 font-bold text-[#384E85]">{o.cancelledBy}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#FEF2F2] text-[#EF4444]">
                            {o.atStage}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* CANCEL ORDER MODAL */}
      {cancelModalOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[500px] overflow-hidden flex flex-col animate-fadeIn border-none">
            <div className="px-6 py-4 bg-[#FEF2F2] border-b border-[#EF4444]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#EF4444] text-white flex items-center justify-center">
                  <XCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#991B1B]">Cancel Order {cancelModalOrder.id}</h3>
                  <p className="text-[11px] text-[#991B1B]/80">{cancelModalOrder.customer} · ${cancelModalOrder.amount.toFixed(2)}</p>
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
    </div>
  );
};
