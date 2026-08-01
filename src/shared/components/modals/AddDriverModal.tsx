import React, { useState } from 'react';
import { X, User, Truck, Key, Zap, UserPlus } from 'lucide-react';

interface AddDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDriverAdded?: (newDriver: any) => void;
}

export const AddDriverModal: React.FC<AddDriverModalProps> = ({ isOpen, onClose, onDriverAdded }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [vehicleType, setVehicleType] = useState('Motorcycle');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleGenerateCredentials = () => {
    const cleanName = name ? name.toLowerCase().replace(/\s+/g, '.') : 'driver';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setUsername(`driver.${cleanName}`);
    setPassword(`Rofoof@${randomNum}`);
  };

  const handleAddDriver = () => {
    if (onDriverAdded) {
      const driverName = name || 'Tariq Mansoor';
      const initials = driverName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'TM';
      
      const vehicleIconMap: Record<string, string> = {
        'Motorcycle': '🏍️',
        'Van': '🚐',
        'Car': '🚗',
        'Scooter': '🛵',
        'Bicycle': '🚲'
      };

      onDriverAdded({
        id: Date.now().toString(),
        name: driverName,
        handle: username ? `@${username}` : `@${driverName.toLowerCase().replace(/\s+/g, '.')}`,
        initials,
        phone: phone || '+20 100 000 0000',
        nationalId: nationalId || '29012345600012',
        vehicleType: vehicleType,
        vehicleIcon: vehicleIconMap[vehicleType] || '🏍️',
        licensePlate: vehicleNumber ? vehicleNumber.toUpperCase() : 'ABC-1234',
        status: 'Online',
        rating: 5.0,
        totalTrips: 0,
        activeOrders: 0,
        earnings: '0.00 EGP',
        avatarBg: 'from-[#384E85] to-[#6B8ED4]'
      });
    }

    onClose();
    setName('');
    setPhone('');
    setNationalId('');
    setVehicleNumber('');
    setUsername('');
    setPassword('');
  };

  return (
    <div className="fixed inset-0 bg-[#0F1629]/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200 select-none">
      <div className="bg-white rounded-[24px] shadow-[0px_40px_80px_0px_rgba(0,0,0,0.2)] w-full max-w-[560px] overflow-hidden relative flex flex-col">
        
        {/* Header with Dark Blue Gradient */}
        <div className="bg-gradient-to-r from-[#384E85] to-[#2A3A65] px-6 py-5 flex items-center justify-between text-white shrink-0">
          <div>
            <h3 className="font-extrabold text-[16px] leading-[24px] text-white tracking-tight">Add New Driver</h3>
            <p className="text-[12px] leading-[18px] text-white/70">Fill in driver details and account credentials</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-[10px] bg-white/15 hover:bg-white/25 flex items-center justify-center transition cursor-pointer text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(85vh-130px)] text-xs text-[#0F1629]">
          
          {/* Section 1: Personal Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-[22px] h-[22px] rounded-[6px] bg-[#EEF1F8] flex items-center justify-center text-[#384E85] shrink-0">
                <User className="w-[12px] h-[12px]" />
              </div>
              <span className="font-bold text-[12px] text-[#384E85] tracking-[0.5px] uppercase">Personal Information</span>
            </div>

            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-[#4A5568] flex items-center gap-0.5">
                Full Name <span className="text-[#EF4444]">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ahmed Khalil"
                className="w-full h-[41.5px] px-3.5 bg-[#F4F5F8] border border-transparent focus:border-[#384E85] focus:bg-white rounded-[12px] text-[13px] text-[#0F1629] placeholder-[rgba(15,22,41,0.5)] outline-none transition"
              />
            </div>

            {/* Mobile Number & National ID (2 Columns) */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="text-[12px] font-semibold text-[#4A5568] flex items-center gap-0.5">
                  Mobile Number <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+20 100 000 0000"
                  className="w-full h-[41.5px] px-3.5 bg-[#F4F5F8] border border-transparent focus:border-[#384E85] focus:bg-white rounded-[12px] text-[13px] text-[#0F1629] placeholder-[rgba(15,22,41,0.5)] outline-none transition"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-semibold text-[#4A5568] flex items-center gap-0.5">
                  National ID <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  type="text"
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value)}
                  placeholder="14-digit ID"
                  className="w-full h-[41.5px] px-3.5 bg-[#F4F5F8] border border-transparent focus:border-[#384E85] focus:bg-white rounded-[12px] text-[13px] text-[#0F1629] placeholder-[rgba(15,22,41,0.5)] outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Vehicle Details */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <div className="w-[22px] h-[22px] rounded-[6px] bg-[#EEF1F8] flex items-center justify-center text-[#384E85] shrink-0">
                <Truck className="w-[12px] h-[12px]" />
              </div>
              <span className="font-bold text-[12px] text-[#384E85] tracking-[0.5px] uppercase">Vehicle Details</span>
            </div>

            {/* Vehicle Type & Vehicle Number (2 Columns) */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="text-[12px] font-semibold text-[#4A5568]">
                  Vehicle Type
                </label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full h-[40px] px-3.5 bg-[#F4F5F8] border border-transparent focus:border-[#384E85] focus:bg-white rounded-[12px] text-[13px] text-[#0F1629] outline-none transition cursor-pointer"
                >
                  <option value="Motorcycle">Motorcycle 🏍️</option>
                  <option value="Van">Delivery Van 🚐</option>
                  <option value="Car">Delivery Car 🚗</option>
                  <option value="Scooter">Electric Scooter 🛵</option>
                  <option value="Bicycle">Bicycle 🚲</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-semibold text-[#4A5568] flex items-center gap-0.5">
                  Vehicle Number <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  type="text"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  placeholder="e.g. ABC-1234"
                  className="w-full h-[41.5px] px-3.5 bg-[#F4F5F8] border border-transparent focus:border-[#384E85] focus:bg-white rounded-[12px] text-[13px] text-[#0F1629] placeholder-[rgba(15,22,41,0.5)] outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Account Credentials */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <div className="w-[22px] h-[22px] rounded-[6px] bg-[#EEF1F8] flex items-center justify-center text-[#384E85] shrink-0">
                <Key className="w-[12px] h-[12px]" />
              </div>
              <span className="font-bold text-[12px] text-[#384E85] tracking-[0.5px] uppercase">Account Credentials</span>
            </div>

            {/* Auto-Generate Box */}
            <div className="bg-[#F4F5F8] rounded-[12px] px-3.5 py-3 flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-[13px] leading-[19.5px] text-[#0F1629]">Auto-Generate Credentials</h4>
                <p className="text-[11px] leading-[16.5px] text-[#7A8299]">System generates a secure username &amp; password</p>
              </div>
              <button
                type="button"
                onClick={handleGenerateCredentials}
                className="bg-[#384E85] hover:bg-[#2A3A65] text-white rounded-[9px] px-3 py-1.5 text-[12px] font-semibold flex items-center gap-1.5 transition cursor-pointer shrink-0"
              >
                <Zap className="w-3 h-3 text-white" />
                <span>Generate</span>
              </button>
            </div>

            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-[#4A5568]">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username manually"
                className="w-full h-[41.5px] px-3.5 bg-[#F4F5F8] border border-transparent focus:border-[#384E85] focus:bg-white rounded-[12px] text-[13px] text-[#0F1629] placeholder-[rgba(15,22,41,0.5)] outline-none transition"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-[#4A5568]">
                Password
              </label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full h-[41.5px] px-3.5 bg-[#F4F5F8] border border-transparent focus:border-[#384E85] focus:bg-white rounded-[12px] text-[13px] text-[#0F1629] placeholder-[rgba(15,22,41,0.5)] outline-none transition"
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
            onClick={handleAddDriver}
            className="px-[20px] py-[9px] rounded-[12px] bg-gradient-to-r from-[#2A3A65] to-[#384E85] text-white hover:opacity-95 text-[13px] font-bold flex items-center gap-2 shadow-sm transition cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5 text-white" />
            <span>Add Driver</span>
          </button>
        </div>

      </div>
    </div>
  );
};
