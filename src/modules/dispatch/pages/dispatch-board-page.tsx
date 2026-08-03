import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  UserX, 
  Zap, 
  Truck, 
  MapPin, 
  ArrowRight,
  ArrowLeft,
  X,
  Package,
  Star,
  Check,
  ChevronRight
} from 'lucide-react';
import { Card } from '@/shared/components/ui/card';

interface QueueOrder {
  id: string;
  customer: string;
  type: 'retail' | 'wholesale';
  amount: string;
  location: string;
  items: number;
  time: string;
  status: 'Awaiting' | 'Assigned' | 'Driver Rejected';
  driver?: { name: string; initials: string };
  waitTime?: string;
  rejectedBy?: string;
}

interface RosterDriver {
  id: string;
  name: string;
  initials: string;
  rating: number;
  orders: number;
  distance: string;
  vehicle: string;
  vehicleIcon: string;
  status: 'Available' | 'Busy';
  onTime: number;
  onTimeColor: string;
}

export const DispatchBoardPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') || 'all';

  const [activeTab, setActiveTab] = useState<'all' | 'queue' | 'assigned' | 'rejected'>('all');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>('8831');
  const [rosterFilter, setRosterFilter] = useState<'available' | 'all'>('available');
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  useEffect(() => {
    if (tabParam === 'queue') {
      setActiveTab('queue');
    } else if (tabParam === 'assigned') {
      setActiveTab('assigned');
    } else if (tabParam === 'rejected') {
      setActiveTab('rejected');
    } else {
      setActiveTab('all');
    }
  }, [tabParam]);

  const handleTabChange = (tab: 'all' | 'queue' | 'assigned' | 'rejected') => {
    setActiveTab(tab);
    if (tab === 'all') {
      searchParams.delete('tab');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ tab });
    }
  };

  const [orders, setOrders] = useState<QueueOrder[]>([
    { id: '8831', customer: 'Metro Grocers Ltd', type: 'wholesale', amount: '2840 EGP', location: '14 Corniche Rd, Alexandria', items: 180, time: '10:15', status: 'Awaiting' },
    { id: '8830', customer: 'Emma Collins', type: 'retail', amount: '76 EGP', location: '28 Garden City St, Cairo', items: 7, time: '10:22', status: 'Awaiting' },
    { id: '8828', customer: 'Layla Hassan', type: 'retail', amount: '142 EGP', location: '12 Nasr City, Cairo', items: 11, time: '09:30', status: 'Driver Rejected', waitTime: '43m wait', rejectedBy: 'James Roberts' },
    { id: '8827', customer: 'Youssef Mansour', type: 'wholesale', amount: '520 EGP', location: 'Smouha, Alexandria', items: 34, time: '08:50', status: 'Assigned', driver: { name: 'Maria Santos', initials: 'MS' } },
    { id: '8826', customer: 'Omar Khalid', type: 'retail', amount: '59 EGP', location: 'Maadi, Cairo', items: 5, time: '10:34', status: 'Awaiting' },
    { id: '8825', customer: 'FreshMart Branch 4', type: 'wholesale', amount: '1640 EGP', location: 'Sheikh Zayed, Giza', items: 98, time: '10:40', status: 'Awaiting' },
    { id: '8824', customer: 'Nour El-Din', type: 'retail', amount: '210 EGP', location: 'Heliopolis, Cairo', items: 14, time: '10:45', status: 'Awaiting' },
  ]);

  const allDrivers: RosterDriver[] = [
    { id: '1', name: 'Maria Santos', initials: 'MS', rating: 4.8, orders: 1, distance: '1.2 km', vehicle: 'Van', vehicleIcon: '🚐', status: 'Available', onTime: 94, onTimeColor: 'bg-[#F59E0B]' },
    { id: '2', name: 'Tom Wilson', initials: 'TW', rating: 4.7, orders: 1, distance: '2.1 km', vehicle: 'Motorcycle', vehicleIcon: '🏍️', status: 'Available', onTime: 91, onTimeColor: 'bg-[#F59E0B]' },
    { id: '3', name: 'Lisa Park', initials: 'LP', rating: 4.5, orders: 0, distance: '3.4 km', vehicle: 'Bicycle', vehicleIcon: '🚲', status: 'Available', onTime: 86, onTimeColor: 'bg-[#EF4444]' },
    { id: '4', name: 'Carlos Mendez', initials: 'CM', rating: 4.6, orders: 2, distance: '1.8 km', vehicle: 'Motorcycle', vehicleIcon: '🏍️', status: 'Available', onTime: 88, onTimeColor: 'bg-[#EF4444]' },
    { id: '5', name: 'Ahmed Khalil', initials: 'AK', rating: 4.9, orders: 3, distance: '0.8 km', vehicle: 'Motorcycle', vehicleIcon: '🏍️', status: 'Busy', onTime: 97, onTimeColor: 'bg-[#10B981]' },
    { id: '6', name: 'Reza Moradi', initials: 'RM', rating: 5.0, orders: 4, distance: '0.5 km', vehicle: 'Car', vehicleIcon: '🚗', status: 'Busy', onTime: 99, onTimeColor: 'bg-[#10B981]' },
  ];

  const filteredDrivers = rosterFilter === 'available'
    ? allDrivers.filter(d => d.status === 'Available')
    : allDrivers;

  const awaitingCount = orders.filter(o => o.status === 'Awaiting').length;
  const assignedCount = orders.filter(o => o.status === 'Assigned').length;
  const rejectedCount = orders.filter(o => o.status === 'Driver Rejected').length;

  const filteredOrders = orders.filter(o => {
    if (activeTab === 'queue') return o.status === 'Awaiting';
    if (activeTab === 'assigned') return o.status === 'Assigned';
    if (activeTab === 'rejected') return o.status === 'Driver Rejected';
    return true;
  });

  const selectedOrder = orders.find(o => o.id === selectedOrderId);

  const handleAssignDriver = (driverName: string, initials: string) => {
    if (!selectedOrderId) return;

    setOrders(prev => prev.map(o => o.id === selectedOrderId ? {
      ...o,
      status: 'Assigned',
      driver: { name: driverName, initials }
    } : o));

    setSuccessBanner(`Order #${selectedOrderId} assigned to ${driverName}`);
    setSelectedOrderId(null);
  };

  const handleUnassign = (orderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? {
      ...o,
      status: 'Awaiting',
      driver: undefined
    } : o));
    setSuccessBanner(null);
  };

  return (
    <div className="space-y-5 select-none pb-8">
      {/* Header */}
      <div>
        <h1 className="text-[20px] font-bold text-[#0F1629] tracking-tight">
          Dispatch Center
        </h1>
        <p className="text-[12px] text-[#7A8299] mt-0.5">
          Assign and manage order deliveries in real-time
        </p>
      </div>

      {/* 6 Stat KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <Card 
          onClick={() => handleTabChange('queue')}
          className={`p-3.5 bg-white border rounded-[16px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)] flex items-center gap-3 cursor-pointer transition ${activeTab === 'queue' ? 'border-[#D97706] ring-1 ring-[#D97706]/30' : 'border-[#384E85]/7 hover:border-[#384E85]/20'}`}
        >
          <div className="w-8 h-8 rounded-[9px] bg-[#FFFBEB] text-[#D97706] flex items-center justify-center font-bold shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[18px] font-extrabold text-[#0F1629] leading-none mb-1">
              {awaitingCount}
            </div>
            <div className="text-[10px] font-semibold text-[#7A8299] uppercase tracking-[0.5px]">
              Awaiting Assignment
            </div>
          </div>
        </Card>

        <Card 
          onClick={() => handleTabChange('assigned')}
          className={`p-3.5 bg-white border rounded-[16px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)] flex items-center gap-3 cursor-pointer transition ${activeTab === 'assigned' ? 'border-[#384E85] ring-1 ring-[#384E85]/30' : 'border-[#384E85]/7 hover:border-[#384E85]/20'}`}
        >
          <div className="w-8 h-8 rounded-[9px] bg-[#EEF1F8] text-[#384E85] flex items-center justify-center font-bold shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[18px] font-extrabold text-[#0F1629] leading-none mb-1">
              {assignedCount}
            </div>
            <div className="text-[10px] font-semibold text-[#7A8299] uppercase tracking-[0.5px]">
              Assigned Orders
            </div>
          </div>
        </Card>

        <Card 
          onClick={() => handleTabChange('rejected')}
          className={`p-3.5 bg-white border rounded-[16px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)] flex items-center gap-3 cursor-pointer transition ${activeTab === 'rejected' ? 'border-[#EF4444] ring-1 ring-[#EF4444]/30' : 'border-[#384E85]/7 hover:border-[#384E85]/20'}`}
        >
          <div className="w-8 h-8 rounded-[9px] bg-[#FEF2F2] text-[#EF4444] flex items-center justify-center font-bold shrink-0">
            <XCircle className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[18px] font-extrabold text-[#0F1629] leading-none mb-1">
              {rejectedCount}
            </div>
            <div className="text-[10px] font-semibold text-[#7A8299] uppercase tracking-[0.5px]">
              Driver Rejected
            </div>
          </div>
        </Card>

        <Card className="p-3.5 bg-white border border-[#384E85]/7 rounded-[16px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)] flex items-center gap-3">
          <div className="w-8 h-8 rounded-[9px] bg-[#F4F5F8] text-[#7A8299] flex items-center justify-center font-bold shrink-0">
            <UserX className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[18px] font-extrabold text-[#0F1629] leading-none mb-1">
              1
            </div>
            <div className="text-[10px] font-semibold text-[#7A8299] uppercase tracking-[0.5px]">
              No Driver Available
            </div>
          </div>
        </Card>

        <Card className="p-3.5 bg-white border border-[#384E85]/7 rounded-[16px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)] flex items-center gap-3">
          <div className="w-8 h-8 rounded-[9px] bg-[#ECFDF5] text-[#10B981] flex items-center justify-center font-bold shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[18px] font-extrabold text-[#0F1629] leading-none mb-1">
              6
            </div>
            <div className="text-[10px] font-semibold text-[#7A8299] uppercase tracking-[0.5px]">
              Online Drivers
            </div>
          </div>
        </Card>

        <Card className="p-3.5 bg-white border border-[#384E85]/7 rounded-[16px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)] flex items-center gap-3">
          <div className="w-8 h-8 rounded-[9px] bg-[#ECFEFF] text-[#0891B2] flex items-center justify-center font-bold shrink-0">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[18px] font-extrabold text-[#0F1629] leading-none mb-1">
              4
            </div>
            <div className="text-[10px] font-semibold text-[#7A8299] uppercase tracking-[0.5px]">
              Available Now
            </div>
          </div>
        </Card>
      </div>

      {/* Dynamic Alert Banner */}
      {successBanner ? (
        <div className="bg-[#ECFDF5] border border-[#10B981]/25 rounded-[14px] p-3.5 flex items-center justify-between text-[#10B981] animate-in fade-in duration-200">
          <div className="flex items-center gap-2 font-bold text-[13px]">
            <Check className="w-4 h-4 text-[#10B981]" />
            <span>{successBanner}</span>
          </div>
          <button
            onClick={() => setSuccessBanner(null)}
            className="w-6 h-6 rounded-[6px] hover:bg-[#10B981]/10 flex items-center justify-center transition cursor-pointer border-none text-[#10B981]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : selectedOrder && selectedOrder.status !== 'Assigned' ? (
        <div className="bg-gradient-to-r from-[#384E85] to-[#2A3A65] text-white rounded-[16px] p-4 flex items-center justify-between shadow-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[9px] bg-white/15 flex items-center justify-center shrink-0">
              <Package className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-bold text-[13.5px]">
                #{selectedOrder.id} — {selectedOrder.customer}
              </div>
              <div className="text-[11.5px] text-white/80">
                {selectedOrder.amount} · {selectedOrder.items} items · {selectedOrder.location}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-white/20 px-3.5 py-1.5 rounded-[10px] text-[12px] font-bold text-white flex items-center gap-1.5">
              Now pick a driver <ArrowRight className="w-3.5 h-3.5" />
            </span>
            <button
              onClick={() => setSelectedOrderId(null)}
              className="w-7 h-7 rounded-[8px] hover:bg-white/20 flex items-center justify-center transition cursor-pointer border-none text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#EEF1F8] border border-[#384E85]/12 rounded-[14px] p-3.5 text-[12.5px] font-semibold text-[#384E85] flex items-center gap-2">
          <span>👇</span> Click any order on the left to select it, then click a driver on the right to assign.
        </div>
      )}

      {/* 2-Column Dispatch Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
        {/* Left Column: Order Queue */}
        <Card className="p-5 bg-white border border-[#384E85]/7 rounded-[20px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)] flex flex-col h-full space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#F3F4F6] shrink-0">
            <div>
              <h3 className="text-[14px] font-bold text-[#0F1629]">Order Queue</h3>
              <p className="text-[11.5px] text-[#7A8299]">{orders.length} orders · {awaitingCount + rejectedCount} need action</p>
            </div>
            <div className="bg-[#F4F5F8] p-1 rounded-[10px] flex gap-1 flex-wrap">
              <button
                onClick={() => handleTabChange('all')}
                className={`px-2.5 py-1 rounded-[8px] text-[11px] font-semibold transition cursor-pointer border-none ${
                  activeTab === 'all' ? 'bg-[#384E85] text-white shadow-xs' : 'text-[#7A8299]'
                }`}
              >
                All ({orders.length})
              </button>
              <button
                onClick={() => handleTabChange('queue')}
                className={`px-2.5 py-1 rounded-[8px] text-[11px] font-semibold transition cursor-pointer border-none ${
                  activeTab === 'queue' ? 'bg-[#384E85] text-white shadow-xs' : 'text-[#7A8299]'
                }`}
              >
                Queue ({awaitingCount})
              </button>
              <button
                onClick={() => handleTabChange('assigned')}
                className={`px-2.5 py-1 rounded-[8px] text-[11px] font-semibold transition cursor-pointer border-none ${
                  activeTab === 'assigned' ? 'bg-[#384E85] text-white shadow-xs' : 'text-[#7A8299]'
                }`}
              >
                Assigned ({assignedCount})
              </button>
              <button
                onClick={() => handleTabChange('rejected')}
                className={`px-2.5 py-1 rounded-[8px] text-[11px] font-semibold transition cursor-pointer border-none ${
                  activeTab === 'rejected' ? 'bg-[#384E85] text-white shadow-xs' : 'text-[#7A8299]'
                }`}
              >
                Rejected ({rejectedCount})
              </button>
            </div>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-[560px] pr-1">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-10 text-[13px] text-[#7A8299]">
                No orders match the selected queue filter.
              </div>
            ) : (
              filteredOrders.map((o) => {
              const isSelected = selectedOrderId === o.id;
              const isRejected = o.status === 'Driver Rejected';
              const isAssigned = o.status === 'Assigned';

              return (
                <div
                  key={o.id}
                  onClick={() => setSelectedOrderId(o.id === selectedOrderId ? null : o.id)}
                  className={`p-3.5 rounded-[14px] border transition cursor-pointer space-y-1.5 relative ${
                    isSelected
                      ? 'bg-[#EEF1F8]/60 border-[#384E85]'
                      : isRejected
                      ? 'bg-[#FEF2F2]/40 border-l-4 border-l-[#EF4444] border-t-[#EF4444]/20 border-r-[#EF4444]/20 border-b-[#EF4444]/20'
                      : 'bg-[#FAFAFA] border-[#384E85]/6 hover:bg-[#EEF1F8]/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[13px] text-[#384E85]">#{o.id}</span>
                      <span
                        className={`px-2 py-0.5 rounded-[8px] text-[10.5px] font-bold ${
                          isAssigned
                            ? 'bg-[#ECFDF5] text-[#10B981]'
                            : isRejected
                            ? 'bg-[#FEF2F2] text-[#EF4444]'
                            : 'bg-[#FFFBEB] text-[#D97706]'
                        }`}
                      >
                        {o.status}
                      </span>
                      <span className="px-2 py-0.5 rounded-[8px] text-[10px] font-semibold capitalize bg-[#EEF2F6] text-[#384E85]">
                        {o.type}
                      </span>
                      {o.waitTime && (
                        <span className="text-[10.5px] font-bold text-[#EF4444] flex items-center gap-0.5">
                          ⚡ {o.waitTime}
                        </span>
                      )}
                    </div>
                    <span className="font-bold text-[13px] text-[#0F1629]">{o.amount}</span>
                  </div>

                  <div className="font-bold text-[#0F1629] text-[13px]">{o.customer}</div>

                  <div className="flex items-center gap-1 text-[11px] text-[#7A8299]">
                    <MapPin className="w-3 h-3 text-[#7A8299]" /> {o.location} · {o.items} items · {o.time}
                  </div>

                  {/* Sub-banner for Rejection alert */}
                  {isRejected && (
                    <div className="bg-[#FEF2F2] p-2 rounded-[10px] text-[11px] font-semibold text-[#EF4444] flex items-center gap-1.5 mt-1">
                      <span>🚫</span> {o.rejectedBy} rejected — click to reassign
                    </div>
                  )}

                  {/* Sub-banner for Selected order */}
                  {isSelected && !isAssigned && !isRejected && (
                    <div className="bg-[#EEF1F8] p-2 rounded-[10px] text-[11px] font-semibold text-[#384E85] flex items-center gap-1.5 mt-1">
                      <ChevronRight className="w-3.5 h-3.5 text-[#384E85]" /> Select a driver on the right to assign
                    </div>
                  )}

                  {/* Sub-banner for Assigned driver */}
                  {isAssigned && o.driver && (
                    <div className="bg-[#F4F5F8] p-2 rounded-[10px] flex items-center justify-between mt-1">
                      <div className="flex items-center gap-2 text-[11.5px] font-bold text-[#0F1629]">
                        <div className="w-5 h-5 rounded-full bg-[#384E85] text-white text-[9px] font-bold flex items-center justify-center">
                          {o.driver.initials}
                        </div>
                        <span>{o.driver.name}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUnassign(o.id);
                        }}
                        className="text-[11px] font-bold text-[#7A8299] hover:text-[#EF4444] transition cursor-pointer border-none bg-none"
                      >
                        Unassign
                      </button>
                    </div>
                  )}
                </div>
              );
            }))}
          </div>
        </Card>

        {/* Right Column: Driver Roster */}
        <Card className="p-5 bg-white border border-[#384E85]/7 rounded-[20px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)] flex flex-col h-full space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#F3F4F6] shrink-0">
            <div>
              <h3 className="text-[14px] font-bold text-[#0F1629]">Driver Roster</h3>
              <p className="text-[11.5px] text-[#7A8299]">4 available · 2 busy</p>
            </div>
            <div className="bg-[#F4F5F8] p-1 rounded-[10px] flex gap-1">
              <button
                onClick={() => setRosterFilter('available')}
                className={`px-3 py-1 rounded-[8px] text-[11px] font-semibold transition cursor-pointer border-none ${
                  rosterFilter === 'available' ? 'bg-[#384E85] text-white shadow-xs' : 'text-[#7A8299]'
                }`}
              >
                Available
              </button>
              <button
                onClick={() => setRosterFilter('all')}
                className={`px-3 py-1 rounded-[8px] text-[11px] font-semibold transition cursor-pointer border-none ${
                  rosterFilter === 'all' ? 'bg-[#384E85] text-white shadow-xs' : 'text-[#7A8299]'
                }`}
              >
                All
              </button>
            </div>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-[560px] pr-1">
            {filteredDrivers.map((d) => {
              const isBusy = d.status === 'Busy';

              return (
                <div key={d.id} className="p-3.5 bg-[#FAFAFA] border border-[#384E85]/6 rounded-[16px] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-9 h-9 rounded-full bg-[#384E85] text-white flex items-center justify-center font-bold text-[12px] shrink-0">
                          {d.initials}
                        </div>
                        <span
                          className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#FAFAFA] ${
                            isBusy ? 'bg-[#F59E0B]' : 'bg-[#10B981]'
                          }`}
                        />
                      </div>
                      <div>
                        <div className="font-bold text-[#0F1629] text-[13px]">{d.name}</div>
                        <div className="flex items-center gap-2 text-[10.5px] text-[#7A8299] mt-0.5">
                          <span className="flex items-center gap-0.5">
                            <Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" /> {d.rating}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <Truck className="w-3 h-3 text-[#7A8299]" /> {d.orders} orders
                          </span>
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-3 h-3 text-[#7A8299]" /> {d.distance}
                          </span>
                          <span>{d.vehicleIcon} {d.vehicle}</span>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-bold ${
                        isBusy ? 'bg-[#FFFBEB] text-[#D97706]' : 'bg-[#ECFDF5] text-[#10B981]'
                      }`}
                    >
                      {d.status}
                    </span>
                  </div>

                  {/* On-time progress line */}
                  <div>
                    <div className="flex justify-between text-[10px] mb-0.5">
                      <span className="text-[#7A8299]">On-time delivery</span>
                      <strong className="text-[#0F1629]">{d.onTime}% on-time</strong>
                    </div>
                    <div className="w-full h-[3px] bg-[#F4F5F8] rounded-[3px] overflow-hidden">
                      <div className={`h-[3px] rounded-[3px] ${d.onTimeColor}`} style={{ width: `${d.onTime}%` }} />
                    </div>
                  </div>

                  {/* Assign Button */}
                  <button
                    disabled={!selectedOrderId}
                    onClick={() => handleAssignDriver(d.name, d.initials)}
                    className={`w-full h-8.5 rounded-[10px] text-[12px] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border-none ${
                      selectedOrderId && !isBusy
                        ? 'bg-[#384E85] hover:bg-[#2A3A65] text-white shadow-xs'
                        : selectedOrderId && isBusy
                        ? 'bg-[#F4F5F8] text-[#384E85] hover:bg-[#EEF1F8]'
                        : 'bg-[#F4F5F8] text-[#7A8299] cursor-not-allowed'
                    }`}
                  >
                    {selectedOrderId ? (
                      isBusy ? (
                        <>
                          <ArrowRight className="w-3.5 h-3.5" />
                          <span>Assign anyway</span>
                        </>
                      ) : (
                        <>
                          <ArrowRight className="w-3.5 h-3.5" />
                          <span>Assign #{selectedOrderId}</span>
                        </>
                      )
                    ) : (
                      <>
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Select an order first</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};
