import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  User, 
  Zap, 
  Truck, 
  MapPin, 
  ArrowRight,
  UserCheck,
  AlertTriangle
} from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';

interface QueueOrder {
  id: string;
  customer: string;
  type: 'retail' | 'wholesale';
  amount: string;
  location: string;
  items: number;
  time: string;
  status: 'Awaiting' | 'Assigned' | 'Rejected';
  driver?: { name: string; initials: string };
  waitTime?: string;
  rejectedBy?: string;
}

interface RosterDriver {
  name: string;
  initials: string;
  rating: number;
  orders: number;
  distance: string;
  vehicle: string;
  vehicleIcon: string;
  status: 'Available' | 'Busy';
  onTime: number;
  avatarBg: string;
}

export const DispatchBoardPage: React.FC = () => {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>('8831');
  const [rosterFilter, setRosterFilter] = useState<'available' | 'all'>('available');

  const [orders, setOrders] = useState<QueueOrder[]>([
    { id: '8831', customer: 'Metro Grocers Ltd', type: 'wholesale', amount: '2,840 EGP', location: '14 Corniche Rd, Alexandria', items: 180, time: '10:15', status: 'Awaiting' },
    { id: '8830', customer: 'Emma Collins', type: 'retail', amount: '76 EGP', location: '28 Garden City St, Cairo', items: 7, time: '10:22', status: 'Awaiting' },
    { id: '8828', customer: 'Layla Hassan', type: 'retail', amount: '142 EGP', location: '12 Nasr City, Cairo', items: 11, time: '09:30', status: 'Rejected', waitTime: '43m wait', rejectedBy: 'James Roberts' },
    { id: '8826', customer: 'Omar Khalid', type: 'retail', amount: '59 EGP', location: 'Maadi, Cairo', items: 5, time: '10:34', status: 'Awaiting' },
    { id: '8825', customer: 'FreshMart Branch 4', type: 'wholesale', amount: '1,640 EGP', location: 'Sheikh Zayed, Giza', items: 98, time: '10:40', status: 'Awaiting' },
    { id: '8829', customer: 'Metro Grocers Ltd', type: 'wholesale', amount: '5,200 EGP', location: '14 Corniche Rd, Alexandria', items: 180, time: '10:15', status: 'Assigned', driver: { name: 'Maria Santos', initials: 'MS' } },
  ]);

  const drivers: RosterDriver[] = [
    { name: 'Maria Santos', initials: 'MS', rating: 4.8, orders: 1, distance: '1.2 km', vehicle: 'Van', vehicleIcon: '🚐', status: 'Available', onTime: 94, avatarBg: 'from-[#4A5568] to-[#718096]' },
    { name: 'Tom Wilson', initials: 'TW', rating: 4.7, orders: 1, distance: '2.1 km', vehicle: 'Motorcycle', vehicleIcon: '🏍️', status: 'Available', onTime: 91, avatarBg: 'from-[#059669] to-[#10B981]' },
    { name: 'Lisa Park', initials: 'LP', rating: 4.5, orders: 0, distance: '3.4 km', vehicle: 'Bicycle', vehicleIcon: '🚲', status: 'Available', onTime: 86, avatarBg: 'from-[#64748B] to-[#94A3B8]' },
    { name: 'Carlos Mendez', initials: 'CM', rating: 4.6, orders: 2, distance: '1.8 km', vehicle: 'Motorcycle', vehicleIcon: '🏍️', status: 'Available', onTime: 88, avatarBg: 'from-[#2563EB] to-[#3B82F6]' },
    { name: 'Ahmed Khalil', initials: 'AK', rating: 4.9, orders: 3, distance: '0.8 km', vehicle: 'Motorcycle', vehicleIcon: '🏍️', status: 'Busy', onTime: 97, avatarBg: 'from-[#384E85] to-[#5B7BC8]' },
    { name: 'Reza Moradi', initials: 'RM', rating: 5.0, orders: 4, distance: '0.5 km', vehicle: 'Car', vehicleIcon: '🚗', status: 'Busy', onTime: 99, avatarBg: 'from-[#7C3AED] to-[#8B5CF6]' },
  ];

  const filteredDrivers = drivers.filter(d => rosterFilter === 'all' || d.status === 'Available');

  const handleAssign = (driverName: string, initials: string) => {
    if (!selectedOrderId) return;
    setOrders(prev => prev.map(o => o.id === selectedOrderId ? {
      ...o,
      status: 'Assigned',
      driver: { name: driverName, initials }
    } : o));
  };

  const handleUnassign = (orderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? {
      ...o,
      status: 'Awaiting',
      driver: undefined
    } : o));
  };

  const awaitingCount = orders.filter(o => o.status === 'Awaiting').length;
  const assignedCount = orders.filter(o => o.status === 'Assigned').length;
  const rejectedCount = orders.filter(o => o.status === 'Rejected').length;

  return (
    <div className="space-y-6 select-none pb-10">
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-extrabold text-[#0F1629] tracking-tight">Logistics Dispatch Center</h1>
        <p className="text-[13px] text-[#7A8299] mt-0.5">Assign, dispatch, and manage order deliveries in real time</p>
      </div>

      {/* 6 Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <Card className="p-3.5 bg-white border border-[#384E85]/8 rounded-[16px] shadow-xs flex items-center gap-3">
          <div className="w-8 h-8 rounded-[9px] bg-[#FFFBEB] text-[#D97706] flex items-center justify-center font-bold">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[20px] font-extrabold text-[#D97706]">{awaitingCount}</div>
            <div className="text-[10px] font-bold text-[#7A8299] uppercase">Awaiting</div>
          </div>
        </Card>

        <Card className="p-3.5 bg-white border border-[#384E85]/8 rounded-[16px] shadow-xs flex items-center gap-3">
          <div className="w-8 h-8 rounded-[9px] bg-[#EEF1F8] text-[#384E85] flex items-center justify-center font-bold">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[20px] font-extrabold text-[#384E85]">{assignedCount}</div>
            <div className="text-[10px] font-bold text-[#7A8299] uppercase">Assigned</div>
          </div>
        </Card>

        <Card className="p-3.5 bg-white border border-[#384E85]/8 rounded-[16px] shadow-xs flex items-center gap-3">
          <div className="w-8 h-8 rounded-[9px] bg-[#FEF2F2] text-[#EF4444] flex items-center justify-center font-bold">
            <XCircle className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[20px] font-extrabold text-[#EF4444]">{rejectedCount}</div>
            <div className="text-[10px] font-bold text-[#7A8299] uppercase">Rejected</div>
          </div>
        </Card>

        <Card className="p-3.5 bg-white border border-[#384E85]/8 rounded-[16px] shadow-xs flex items-center gap-3">
          <div className="w-8 h-8 rounded-[9px] bg-[#F4F5F8] text-[#7A8299] flex items-center justify-center font-bold">
            <User className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[20px] font-extrabold text-[#7A8299]">1</div>
            <div className="text-[10px] font-bold text-[#7A8299] uppercase">No Driver</div>
          </div>
        </Card>

        <Card className="p-3.5 bg-white border border-[#384E85]/8 rounded-[16px] shadow-xs flex items-center gap-3">
          <div className="w-8 h-8 rounded-[9px] bg-[#ECFDF5] text-[#10B981] flex items-center justify-center font-bold">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[20px] font-extrabold text-[#10B981]">6</div>
            <div className="text-[10px] font-bold text-[#7A8299] uppercase">Online Drivers</div>
          </div>
        </Card>

        <Card className="p-3.5 bg-white border border-[#384E85]/8 rounded-[16px] shadow-xs flex items-center gap-3">
          <div className="w-8 h-8 rounded-[9px] bg-[#ECFEFF] text-[#0891B2] flex items-center justify-center font-bold">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[20px] font-extrabold text-[#0891B2]">4</div>
            <div className="text-[10px] font-bold text-[#7A8299] uppercase">Available Now</div>
          </div>
        </Card>
      </div>

      {/* Interactive Helper Banner */}
      <div className="p-3.5 bg-[#EEF1F8] border border-[#384E85]/15 rounded-[14px] text-[12.5px] font-bold text-[#384E85] flex items-center gap-2">
        <span>👇</span> Click any order on the left to select it, then click a driver on the right to assign.
      </div>

      {/* 2-Column Main Dispatch Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left Column: Order Queue */}
        <Card className="p-5 bg-white border border-[#384E85]/8 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
            <div>
              <h3 className="text-[15px] font-bold text-[#0F1629]">Order Queue</h3>
              <p className="text-[11.5px] text-[#7A8299]">{orders.length} orders total</p>
            </div>
            <div className="flex gap-1.5">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFFBEB] text-[#D97706]">{awaitingCount} unassigned</span>
              {rejectedCount > 0 && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF2F2] text-[#EF4444]">{rejectedCount} rejected</span>}
            </div>
          </div>

          <div className="space-y-3">
            {orders.map((o) => {
              const isSelected = selectedOrderId === o.id;
              return (
                <div
                  key={o.id}
                  onClick={() => setSelectedOrderId(o.id)}
                  className={`p-4 rounded-[16px] border transition cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-[#EEF1F8] border-[#384E85] shadow-xs'
                      : o.status === 'Rejected'
                      ? 'bg-[#FEF2F2]/50 border-[#EF4444]/30'
                      : 'bg-[#FAFAFA] border-[#384E85]/8 hover:bg-[#EEF1F8]/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-[13px] text-[#384E85]">#{o.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        o.status === 'Awaiting' ? 'bg-[#FFFBEB] text-[#D97706]' :
                        o.status === 'Assigned' ? 'bg-[#ECFDF5] text-[#10B981]' : 'bg-[#FEF2F2] text-[#EF4444]'
                      }`}>
                        {o.status}
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[9.5px] font-bold uppercase bg-gray-100 text-gray-600">{o.type}</span>
                      {o.waitTime && <span className="text-[10px] font-bold text-[#EF4444]">{o.waitTime}</span>}
                    </div>
                    <span className="font-extrabold text-[13px] text-[#0F1629]">{o.amount}</span>
                  </div>

                  <div className="font-bold text-[#0F1629] text-[13px]">{o.customer}</div>

                  <div className="flex items-center gap-1 text-[11px] text-[#7A8299]">
                    <MapPin className="w-3 h-3 text-[#7A8299]" /> {o.location} · {o.items} items · {o.time}
                  </div>

                  {o.status === 'Rejected' && (
                    <div className="text-[11px] font-bold text-[#EF4444] flex items-center gap-1 pt-1">
                      <AlertTriangle className="w-3 h-3" /> {o.rejectedBy} rejected — click driver to reassign
                    </div>
                  )}

                  {o.status === 'Assigned' && o.driver && (
                    <div className="pt-2 flex items-center justify-between border-t border-emerald-100">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-[#10B981] text-white text-[9px] font-bold flex items-center justify-center">
                          {o.driver.initials}
                        </span>
                        <span className="text-[11.5px] font-bold text-[#065F46]">{o.driver.name}</span>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleUnassign(o.id); }} 
                        className="text-[10.5px] font-bold text-[#EF4444] hover:underline cursor-pointer border-none bg-none"
                      >
                        Unassign
                      </button>
                    </div>
                  )}

                  {isSelected && o.status !== 'Assigned' && (
                    <div className="text-[11px] font-bold text-[#384E85] pt-1 flex items-center gap-1">
                      <ArrowRight className="w-3 h-3 animate-pulse" /> Select a driver on the right to assign
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Right Column: Driver Roster */}
        <Card className="p-5 bg-white border border-[#384E85]/8 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
            <div>
              <h3 className="text-[15px] font-bold text-[#0F1629]">Driver Roster</h3>
              <p className="text-[11.5px] text-[#7A8299]">4 available · 2 busy</p>
            </div>
            <div className="bg-[#F4F5F8] p-1 rounded-[12px] flex gap-1">
              <button
                onClick={() => setRosterFilter('available')}
                className={`px-3 py-1 rounded-[9px] text-[11.5px] font-semibold cursor-pointer border-none ${
                  rosterFilter === 'available' ? 'bg-[#384E85] text-white' : 'text-[#7A8299]'
                }`}
              >
                Available
              </button>
              <button
                onClick={() => setRosterFilter('all')}
                className={`px-3 py-1 rounded-[9px] text-[11.5px] font-semibold cursor-pointer border-none ${
                  rosterFilter === 'all' ? 'bg-[#384E85] text-white' : 'text-[#7A8299]'
                }`}
              >
                All
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredDrivers.map((d, idx) => (
              <div key={idx} className="p-4 bg-[#FAFAFA] border border-[#384E85]/6 rounded-[16px] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-[11px] bg-gradient-to-br ${d.avatarBg} text-white flex items-center justify-center font-bold text-[12px] shrink-0 relative`}>
                      {d.initials}
                      <span className={`w-2 h-2 rounded-full border border-white absolute -bottom-0.5 -right-0.5 ${
                        d.status === 'Available' ? 'bg-[#10B981]' : 'bg-[#F59E0B]'
                      }`} />
                    </div>
                    <div>
                      <div className="font-bold text-[#0F1629] text-[13px]">{d.name}</div>
                      <div className="flex items-center gap-2 text-[10.5px] text-[#7A8299]">
                        <span>⭐ {d.rating}</span>
                        <span>📦 {d.orders} orders</span>
                        <span>📍 {d.distance}</span>
                        <span>{d.vehicleIcon} {d.vehicle}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-bold ${
                    d.status === 'Available' ? 'bg-[#ECFDF5] text-[#10B981]' : 'bg-[#FFFBEB] text-[#D97706]'
                  }`}>
                    {d.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10.5px] text-[#7A8299]">
                  <span>On-time delivery</span>
                  <strong className="text-[#0F1629]">{d.onTime}%</strong>
                </div>

                <button
                  disabled={!selectedOrderId}
                  onClick={() => handleAssign(d.name, d.initials)}
                  className={`w-full h-8.5 rounded-[10px] text-[12px] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border-none ${
                    selectedOrderId
                      ? 'bg-[#384E85] hover:bg-[#2A3A65] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  {selectedOrderId ? `Assign to Order #${selectedOrderId}` : '← Select an order first'}
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
