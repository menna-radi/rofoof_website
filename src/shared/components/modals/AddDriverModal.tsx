import React, { useState } from 'react';
import { X, UserCheck, Truck } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

interface AddDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddDriverModal: React.FC<AddDriverModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicle, setVehicle] = useState('van');
  const [zone, setZone] = useState('north');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[560px] overflow-hidden animate-fadeIn">
        <div className="px-7 py-5 bg-[#384E85] text-white flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">Add New Fleet Driver</h2>
            <div className="text-xs text-white/80">Register driver roster profile</div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-7 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#0F1629] mb-1">Driver Full Name *</label>
            <input type="text" placeholder="e.g. Tariq Mansoor" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-10 px-3 bg-[#F4F5F8] rounded-xl outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#0F1629] mb-1">Phone Number *</label>
              <input type="text" placeholder="+966 50 000 0000" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full h-10 px-3 bg-[#F4F5F8] rounded-xl outline-none" />
            </div>
            <div>
              <label className="block font-bold text-[#0F1629] mb-1">Assigned Zone</label>
              <select value={zone} onChange={(e) => setZone(e.target.value)} className="w-full h-10 px-3 bg-[#F4F5F8] rounded-xl outline-none">
                <option value="north">North Zone</option>
                <option value="central">Central Zone</option>
                <option value="south">South Zone</option>
                <option value="wholesale">Wholesale B2B Route</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#0F1629] mb-1">Vehicle Type *</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'van', label: 'Delivery Van' },
                { id: 'bike', label: 'Motorcycle' },
                { id: 'truck', label: 'Heavy Truck' }
              ].map(v => (
                <button
                  key={v.id}
                  onClick={() => setVehicle(v.id)}
                  className={`p-3 rounded-xl border text-center font-bold capitalize transition cursor-pointer ${
                    vehicle === v.id ? 'bg-[#EEF1F8] border-[#384E85] text-[#384E85]' : 'bg-[#FAFAFA] border-[#384E85]/15 text-[#7A8299]'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-7 py-4 bg-[#FAFAFA] border-t border-[#384E85]/8 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="primary" size="sm" onClick={onClose} leftIcon={<UserCheck className="w-4 h-4" />}>
            Register Driver
          </Button>
        </div>
      </div>
    </div>
  );
};
