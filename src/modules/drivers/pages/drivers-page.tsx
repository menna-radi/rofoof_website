import React, { useState } from 'react';
import { 
  UserPlus, 
  Search, 
  Phone, 
  Star, 
  Edit3, 
  RefreshCw, 
  Trash2, 
  Download,
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { AddDriverModal } from '@/shared/components/modals/AddDriverModal';
import { ExportDataModal } from '@/shared/components/modals/ExportDataModal';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDriverOpen, setIsAddDriverOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const [drivers, setDrivers] = useState<Driver[]>([
    { id: '1', name: 'Ahmed Khalil', handle: '@ahmed.khalil', initials: 'AK', phone: '+20 100 234 5678', nationalId: '28901234500012', vehicleType: 'Motorcycle', vehicleIcon: '🏍️', licensePlate: 'ABC-1234', status: 'Online', rating: 4.9, totalTrips: 1842, activeOrders: 3, earnings: '184.50 EGP', avatarBg: 'from-[#384E85] to-[#6B8ED4]' },
    { id: '2', name: 'Maria Santos', handle: '@maria.santos', initials: 'MS', phone: '+20 101 876 5432', nationalId: '29012345600023', vehicleType: 'Van', vehicleIcon: '🚐', licensePlate: 'DEF-5678', status: 'Online', rating: 4.8, totalTrips: 1204, activeOrders: 2, earnings: '142.00 EGP', avatarBg: 'from-[#10B981] to-[#059669]' },
    { id: '3', name: 'James Roberts', handle: '@james.roberts', initials: 'JR', phone: '+20 102 456 7890', nationalId: '27834567800034', vehicleType: 'Motorcycle', vehicleIcon: '🏍️', licensePlate: 'GHI-9012', status: 'Busy', rating: 4.6, totalTrips: 2156, activeOrders: 4, earnings: '98.30 EGP', avatarBg: 'from-[#D97706] to-[#F59E0B]' },
    { id: '4', name: 'Reza Moradi', handle: '@reza.moradi', initials: 'RM', phone: '+20 103 234 5670', nationalId: '29145678900045', vehicleType: 'Car', vehicleIcon: '🚗', licensePlate: 'JKL-3456', status: 'Online', rating: 5.0, totalTrips: 987, activeOrders: 5, earnings: '212.80 EGP', avatarBg: 'from-[#7C3AED] to-[#8B5CF6]' },
    { id: '5', name: 'Tom Wilson', handle: '@tom.wilson', initials: 'TW', phone: '+20 104 678 9012', nationalId: '29256789000056', vehicleType: 'Motorcycle', vehicleIcon: '🏍️', licensePlate: 'MNO-7890', status: 'Online', rating: 4.7, totalTrips: 763, activeOrders: 2, earnings: '128.60 EGP', avatarBg: 'from-[#0891B2] to-[#06B6D4]' },
    { id: '6', name: 'Lisa Park', handle: '@lisa.park', initials: 'LP', phone: '+20 105 890 1234', nationalId: '29367899100067', vehicleType: 'Bicycle', vehicleIcon: '🚲', licensePlate: 'PQR-0123', status: 'Offline', rating: 4.5, totalTrips: 521, activeOrders: 0, earnings: '0.00 EGP', avatarBg: 'from-gray-500 to-gray-600' },
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

  const handleToggleStatus = (id: string) => {
    setDrivers(prev => prev.map(d => {
      if (d.id !== id) return d;
      const statusMap: Record<string, Driver['status']> = {
        'Online': 'Busy',
        'Busy': 'Offline',
        'Offline': 'Online',
        'Suspended': 'Online'
      };
      return { ...d, status: statusMap[d.status] };
    }));
  };

  return (
    <div className="space-y-5 select-none pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[20px] font-bold text-[#0F1629] tracking-tight">
            Driver Management
          </h1>
          <p className="text-[12px] text-[#7A8299] mt-0.5">
            {drivers.length} drivers · <span className="font-bold text-[#10B981]">{onlineCount} online now</span>
          </p>
        </div>
        <button 
          onClick={() => setIsAddDriverOpen(true)}
          className="h-[36px] px-4 rounded-[12px] bg-gradient-to-r from-[#384E85] to-[#2A3A65] text-white text-[13px] font-bold flex items-center gap-2 shadow-xs hover:opacity-95 transition cursor-pointer border-none"
        >
          <UserPlus className="w-4 h-4 text-white" />
          <span>Add Driver</span>
        </button>
      </div>

      {/* 4 Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        <Card className="p-4 bg-white border border-[#384E85]/7 rounded-[16px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)] flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-[10px] bg-[#ECFDF5] flex items-center justify-center shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
          </div>
          <div>
            <div className="text-[20px] font-extrabold text-[#0F1629] leading-none mb-1">
              {onlineCount}
            </div>
            <div className="text-[11px] font-semibold text-[#7A8299] uppercase tracking-[0.5px]">
              Online
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white border border-[#384E85]/7 rounded-[16px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)] flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-[10px] bg-[#FFFBEB] flex items-center justify-center shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
          </div>
          <div>
            <div className="text-[20px] font-extrabold text-[#0F1629] leading-none mb-1">
              {busyCount}
            </div>
            <div className="text-[11px] font-semibold text-[#7A8299] uppercase tracking-[0.5px]">
              Busy
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white border border-[#384E85]/7 rounded-[16px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)] flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-[10px] bg-[#F1F5F9] flex items-center justify-center shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#94A3B8]" />
          </div>
          <div>
            <div className="text-[20px] font-extrabold text-[#0F1629] leading-none mb-1">
              {offlineCount}
            </div>
            <div className="text-[11px] font-semibold text-[#7A8299] uppercase tracking-[0.5px]">
              Offline
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white border border-[#384E85]/7 rounded-[16px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)] flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-[10px] bg-[#FEF2F2] flex items-center justify-center shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
          </div>
          <div>
            <div className="text-[20px] font-extrabold text-[#0F1629] leading-none mb-1">
              {suspendedCount}
            </div>
            <div className="text-[11px] font-semibold text-[#7A8299] uppercase tracking-[0.5px]">
              Suspended
            </div>
          </div>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card className="p-0 overflow-hidden bg-white border border-[#384E85]/7 rounded-[20px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)]">
        {/* Controls Bar */}
        <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#384E85]/8">
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A8299]" />
            <input
              type="text"
              placeholder="Search by name, phone, or national ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-3 bg-[#F4F5F8] border border-transparent rounded-[10px] text-[12.5px] text-[#0F1629] outline-none placeholder:text-[#7A8299] focus:border-[#384E85] focus:bg-white transition"
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
                    <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#0F1629]">
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
                      d.status === 'Offline' ? 'bg-[#F1F5F9] text-[#64748B]' : 'bg-[#FEF2F2] text-[#EF4444]'
                    }`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 font-bold text-[#0F1629]">
                      <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" /> {d.rating}
                    </div>
                    <div className="text-[10px] text-[#7A8299]">{d.totalTrips.toLocaleString()} total</div>
                  </td>
                  <td className="py-3.5 px-4 text-center font-extrabold text-[#384E85]">{d.activeOrders}</td>
                  <td className="py-3.5 px-4 font-bold text-[#065F46]">{d.earnings}</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        title="View Details"
                        className="w-7 h-7 rounded-[7px] bg-[#F4F5F8] hover:bg-[#E2E8F0] text-[#4A5568] flex items-center justify-center cursor-pointer transition border-none"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        title="Edit Driver"
                        className="w-7 h-7 rounded-[7px] bg-[#EEF1F8] hover:bg-[#E2E7F3] text-[#384E85] flex items-center justify-center cursor-pointer transition border-none"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        title="Toggle Status"
                        onClick={() => handleToggleStatus(d.id)}
                        className="w-7 h-7 rounded-[7px] bg-[#ECFDF5] hover:bg-[#D1FAE5] text-[#10B981] flex items-center justify-center cursor-pointer transition border-none"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        title="Delete Driver"
                        onClick={() => handleDelete(d.id)}
                        className="w-7 h-7 rounded-[7px] bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#EF4444] flex items-center justify-center cursor-pointer transition border-none"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="p-4 bg-[#FAFAFA] border-t border-[#384E85]/8 flex items-center justify-between text-[12px] text-[#7A8299]">
          <div>
            Showing 1–{filteredDrivers.length} of {drivers.length}
          </div>

          <div className="flex items-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="w-8 h-8 rounded-[8px] border border-[#384E85]/10 flex items-center justify-center text-[#7A8299] hover:bg-white transition cursor-pointer disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(1)}
              className={`w-8 h-8 rounded-[8px] text-[12px] font-bold flex items-center justify-center cursor-pointer transition border-none ${
                currentPage === 1 ? 'bg-[#384E85] text-white shadow-xs' : 'bg-white text-[#4A5568] border border-[#384E85]/10'
              }`}
            >
              1
            </button>
            <button
              onClick={() => setCurrentPage(2)}
              className={`w-8 h-8 rounded-[8px] text-[12px] font-bold flex items-center justify-center cursor-pointer transition border-none ${
                currentPage === 2 ? 'bg-[#384E85] text-white shadow-xs' : 'bg-white text-[#4A5568] border border-[#384E85]/10'
              }`}
            >
              2
            </button>
            <button
              onClick={() => setCurrentPage(p => p + 1)}
              className="w-8 h-8 rounded-[8px] border border-[#384E85]/10 flex items-center justify-center text-[#7A8299] hover:bg-white transition cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>

      {/* Export Data Button */}
      <div>
        <Button
          variant="outline"
          size="sm"
          className="bg-[#F4F5F8] border-none text-[#4A5568] hover:bg-[#E2E8F0] rounded-[12px] px-3.5 py-2 text-[13px] font-medium"
          leftIcon={<Download className="w-3.5 h-3.5" />}
          onClick={() => setExportOpen(true)}
        >
          Export Data
        </Button>
      </div>

      {/* Add Driver Modal */}
      <AddDriverModal
        isOpen={isAddDriverOpen}
        onClose={() => setIsAddDriverOpen(false)}
        onDriverAdded={(newDriver) => setDrivers([newDriver, ...drivers])}
      />
      <ExportDataModal isOpen={exportOpen} onClose={() => setExportOpen(false)} pageName="Drivers" />
    </div>
  );
};
