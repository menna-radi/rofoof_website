import React, { useState } from 'react';
import { 
  UserPlus, 
  Search, 
  Phone, 
  Star, 
  Truck, 
  Edit3, 
  RefreshCw, 
  CheckCircle2, 
  Trash2, 
  Download,
  AlertTriangle
} from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';

interface Driver {
  id: string;
  name: string;
  handle: string;
  initials: string;
  phone: string;
  nationalId: string;
  vehicleType: string;
  vehicleIcon: string;
  licensePlate: string;
  status: 'Online' | 'Busy' | 'Offline' | 'Suspended';
  rating: number;
  totalTrips: number;
  activeOrders: number;
  earnings: string;
  avatarBg: string;
}

export const DriversPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'online' | 'busy' | 'offline' | 'suspended'>('all');
  const [search, setSearch] = useState('');

  const [drivers, setDrivers] = useState<Driver[]>([
    { id: '1', name: 'Ahmed Khalil', handle: '@ahmed.khalil', initials: 'AK', phone: '+20 100 234 5678', nationalId: '28901234500012', vehicleType: 'Motorcycle', vehicleIcon: '🏍️', licensePlate: 'ABC-1234', status: 'Online', rating: 4.9, totalTrips: 1842, activeOrders: 3, earnings: '184.50 EGP', avatarBg: 'from-[#384E85] to-[#6B8ED4]' },
    { id: '2', name: 'Maria Santos', handle: '@maria.santos', initials: 'MS', phone: '+20 101 876 5432', nationalId: '29012345600023', vehicleType: 'Van', vehicleIcon: '🚐', licensePlate: 'DEF-5678', status: 'Online', rating: 4.8, totalTrips: 1204, activeOrders: 2, earnings: '142.00 EGP', avatarBg: 'from-[#10B981] to-[#059669]' },
    { id: '3', name: 'James Roberts', handle: '@james.roberts', initials: 'JR', phone: '+20 102 456 7890', nationalId: '27834567800034', vehicleType: 'Motorcycle', vehicleIcon: '🏍️', licensePlate: 'GHI-9012', status: 'Busy', rating: 4.6, totalTrips: 2156, activeOrders: 4, earnings: '98.30 EGP', avatarBg: 'from-[#D97706] to-[#F59E0B]' },
    { id: '4', name: 'Reza Moradi', handle: '@reza.moradi', initials: 'RM', phone: '+20 103 234 5670', nationalId: '29145678900045', vehicleType: 'Car', vehicleIcon: '🚗', licensePlate: 'JKL-3456', status: 'Online', rating: 5.0, totalTrips: 987, activeOrders: 5, earnings: '212.80 EGP', avatarBg: 'from-[#7C3AED] to-[#8B5CF6]' },
    { id: '5', name: 'Tom Wilson', handle: '@tom.wilson', initials: 'TW', phone: '+20 104 678 9012', nationalId: '29256789000056', vehicleType: 'Motorcycle', vehicleIcon: '🏍️', licensePlate: 'MNO-7890', status: 'Online', rating: 4.7, totalTrips: 763, activeOrders: 2, earnings: '128.60 EGP', avatarBg: 'from-[#0891B2] to-[#06B6D4]' },
    { id: '6', name: 'Lisa Park', handle: '@lisa.park', initials: 'LP', phone: '+20 105 890 1234', nationalId: '29367899100067', vehicleType: 'Bicycle', vehicleIcon: '🚲', licensePlate: 'PQR-6123', status: 'Offline', rating: 4.5, totalTrips: 521, activeOrders: 0, earnings: '0.00 EGP', avatarBg: 'from-gray-500 to-gray-600' },
    { id: '7', name: 'Omar Farooq', handle: '@omar.farooq', initials: 'OF', phone: '+20 106 901 2345', nationalId: '29478901200078', vehicleType: 'Motorcycle', vehicleIcon: '🏍️', licensePlate: 'STU-4567', status: 'Suspended', rating: 4.2, totalTrips: 310, activeOrders: 0, earnings: '0.00 EGP', avatarBg: 'from-[#EF4444] to-[#DC2626]' },
  ]);

  const filteredDrivers = drivers.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || 
                          d.phone.toLowerCase().includes(search.toLowerCase()) || 
                          d.nationalId.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === 'online') return d.status === 'Online';
    if (filter === 'busy') return d.status === 'Busy';
    if (filter === 'offline') return d.status === 'Offline';
    if (filter === 'suspended') return d.status === 'Suspended';
    return true;
  });

  const onlineCount = drivers.filter(d => d.status === 'Online').length;
  const busyCount = drivers.filter(d => d.status === 'Busy').length;
  const offlineCount = drivers.filter(d => d.status === 'Offline').length;
  const suspendedCount = drivers.filter(d => d.status === 'Suspended').length;

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this driver?')) {
      setDrivers(prev => prev.filter(d => d.id !== id));
    }
  };

  return (
    <div className="space-y-6 select-none pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-extrabold text-[#0F1629] tracking-tight">Driver Fleet Management</h1>
          <p className="text-[13px] text-[#7A8299] mt-0.5">{drivers.length} total drivers · <span className="font-semibold text-[#10B981]">{onlineCount} online live</span></p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
            Export Data
          </Button>
          <button className="h-[38px] px-4 rounded-[12px] bg-gradient-to-r from-[#384E85] to-[#2A3A65] text-white text-[13px] font-bold flex items-center gap-2 shadow-[0px_4px_14px_rgba(56,78,133,0.3)] hover:opacity-95 transition cursor-pointer border-none">
            <UserPlus className="w-4 h-4" />
            <span>Add Driver</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 bg-white border border-[#384E85]/8 rounded-[16px] shadow-xs flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#10B981] animate-pulse" />
          <div>
            <div className="text-[22px] font-extrabold text-[#0F1629]">{onlineCount}</div>
            <div className="text-[11px] font-semibold text-[#7A8299] uppercase tracking-[0.5px]">Online</div>
          </div>
        </Card>

        <Card className="p-4 bg-white border border-[#384E85]/8 rounded-[16px] shadow-xs flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
          <div>
            <div className="text-[22px] font-extrabold text-[#0F1629]">{busyCount}</div>
            <div className="text-[11px] font-semibold text-[#7A8299] uppercase tracking-[0.5px]">Busy</div>
          </div>
        </Card>

        <Card className="p-4 bg-white border border-[#384E85]/8 rounded-[16px] shadow-xs flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#94A3B8]" />
          <div>
            <div className="text-[22px] font-extrabold text-[#0F1629]">{offlineCount}</div>
            <div className="text-[11px] font-semibold text-[#7A8299] uppercase tracking-[0.5px]">Offline</div>
          </div>
        </Card>

        <Card className="p-4 bg-white border border-[#384E85]/8 rounded-[16px] shadow-xs flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
          <div>
            <div className="text-[22px] font-extrabold text-[#0F1629]">{suspendedCount}</div>
            <div className="text-[11px] font-semibold text-[#7A8299] uppercase tracking-[0.5px]">Suspended</div>
          </div>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card className="p-0 overflow-hidden bg-white border border-[#384E85]/8 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)] space-y-4">
        {/* Controls Bar */}
        <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#384E85]/8">
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A8299]" />
            <input
              type="text"
              placeholder="Search by name, phone, or national ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-8 pr-3 bg-[#F4F5F8] border border-transparent rounded-[10px] text-[12.5px] text-[#0F1629] outline-none"
            />
          </div>

          <div className="bg-[#F4F5F8] p-1 rounded-[12px] flex items-center gap-1 overflow-x-auto">
            {(['all', 'online', 'busy', 'offline', 'suspended'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-3 py-1 rounded-[9px] text-[12px] font-semibold capitalize transition cursor-pointer border-none ${
                  filter === t ? 'bg-[#384E85] text-white shadow-xs' : 'text-[#7A8299] hover:text-[#0F1629]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Driver Fleet Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#FAFAFA] border-b border-[#384E85]/8 text-[#7A8299] font-bold uppercase tracking-[0.5px] text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Driver</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Vehicle</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Rating</th>
                <th className="py-3.5 px-4 text-center">Active Orders</th>
                <th className="py-3.5 px-4">Today's Earnings</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#384E85]/6">
              {filteredDrivers.map((d) => (
                <tr key={d.id} className="hover:bg-[#FAFAFA] transition">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-[11px] bg-gradient-to-br ${d.avatarBg} text-white flex items-center justify-center font-bold text-[12px] shrink-0`}>
                        {d.initials}
                      </div>
                      <div>
                        <div className="font-bold text-[#0F1629]">{d.name}</div>
                        <div className="text-[11px] text-[#7A8299]">{d.handle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 text-[12px] font-semibold text-[#0F1629]">
                      <Phone className="w-3 h-3 text-[#7A8299]" /> {d.phone}
                    </div>
                    <div className="text-[10.5px] font-mono text-[#7A8299] mt-0.5">{d.nationalId}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[16px]">{d.vehicleIcon}</span>
                      <div>
                        <div className="font-bold text-[#0F1629] text-[12px]">{d.vehicleType}</div>
                        <div className="text-[10.5px] font-mono text-[#7A8299]">{d.licensePlate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      d.status === 'Online' ? 'bg-[#ECFDF5] text-[#10B981]' :
                      d.status === 'Busy' ? 'bg-[#FFFBEB] text-[#D97706]' :
                      d.status === 'Offline' ? 'bg-gray-100 text-gray-500' : 'bg-[#FEF2F2] text-[#EF4444]'
                    }`}>
                      ● {d.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 font-bold text-[#0F1629]">
                      <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" /> {d.rating}
                    </div>
                    <div className="text-[10px] text-[#7A8299]">{d.totalTrips} trips</div>
                  </td>
                  <td className="py-3.5 px-4 text-center font-extrabold text-[#384E85]">{d.activeOrders}</td>
                  <td className="py-3.5 px-4 font-bold text-[#065F46]">{d.earnings}</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="w-7 h-7 rounded-[7px] bg-[#EEF1F8] hover:bg-[#E2E7F3] text-[#384E85] flex items-center justify-center cursor-pointer transition border-none">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button className="w-7 h-7 rounded-[7px] bg-[#ECFDF5] hover:bg-[#D1FAE5] text-[#10B981] flex items-center justify-center cursor-pointer transition border-none">
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete(d.id)} className="w-7 h-7 rounded-[7px] bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#EF4444] flex items-center justify-center cursor-pointer transition border-none">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
