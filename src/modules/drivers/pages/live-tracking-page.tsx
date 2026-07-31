import React from 'react';
import { MapPin, Navigation, Star, Package, CheckCircle2, Clock } from 'lucide-react';
import { Card } from '@/shared/components/ui/card';

export const LiveTrackingPage: React.FC = () => {
  const drivers = [
    { initials: 'AK', name: 'Ahmed Khalil', orders: 12, rating: 4.9, earnings: '$184.50', status: 'Active', progress: 97, route: 'Downtown → East', avatarBg: 'from-[#384E85] to-[#6B8ED4]', progressColor: 'bg-[#10B981]' },
    { initials: 'MS', name: 'Maria Santos', orders: 9, rating: 4.8, earnings: '$142.00', status: 'Active', progress: 94, route: 'North → West', avatarBg: 'from-[#10B981] to-[#059669]', progressColor: 'bg-[#384E85]' },
    { initials: 'JR', name: 'James Roberts', orders: 6, rating: 4.6, earnings: '$98.30', status: 'Break', progress: 88, route: 'On Break', avatarBg: 'from-[#D97706] to-[#F59E0B]', progressColor: 'bg-[#F59E0B]' },
    { initials: 'RM', name: 'Reza Moradi', orders: 14, rating: 5.0, earnings: '$212.80', status: 'Active', progress: 99, route: 'City Center', avatarBg: 'from-[#7C3AED] to-[#8B5CF6]', progressColor: 'bg-[#10B981]' },
  ];

  const zones = [
    { name: 'Downtown', active: 8, done: 34, pct: '80%', color: 'bg-[#384E85]' },
    { name: 'East Side', active: 5, done: 21, pct: '55%', color: 'bg-[#7C3AED]' },
    { name: 'North Quarter', active: 6, done: 28, pct: '65%', color: 'bg-[#10B981]' },
    { name: 'West District', active: 4, done: 18, pct: '45%', color: 'bg-[#F59E0B]' },
    { name: 'Port Area', active: 3, done: 12, pct: '35%', color: 'bg-[#06B6D4]' },
  ];

  return (
    <div className="space-y-6 select-none pb-10">
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-extrabold text-[#0F1629] tracking-tight">Driver Live Operations &amp; GPS Tracking</h1>
        <p className="text-[13px] text-[#7A8299] mt-0.5">Real-time driver location map, route progress, and delivery zone coverage</p>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column: Driver Fleet Cards */}
        <Card className="p-6 bg-white border border-[#384E85]/8 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[15px] font-bold text-[#0F1629]">Driver Fleet</h3>
            <div className="flex gap-1.5">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ECFDF5] text-[#10B981]">4 Active</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFFBEB] text-[#D97706]">1 Break</span>
            </div>
          </div>

          <div className="space-y-3">
            {drivers.map((d, idx) => (
              <div key={idx} className="p-3.5 bg-[#FAFAFA] border border-[#384E85]/6 rounded-[16px] space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-[11px] bg-gradient-to-br ${d.avatarBg} text-white flex items-center justify-center font-bold text-[12px] shrink-0`}>
                      {d.initials}
                    </div>
                    <div>
                      <div className="font-bold text-[#0F1629] text-[13px]">{d.name}</div>
                      <div className="flex items-center gap-2 text-[11px] text-[#7A8299]">
                        <span>📦 {d.orders} orders</span>
                        <span>⭐ {d.rating}</span>
                        <strong className="text-[#0F1629]">{d.earnings}</strong>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    d.status === 'Active' ? 'bg-[#ECFDF5] text-[#10B981]' : 'bg-[#FFFBEB] text-[#D97706]'
                  }`}>
                    {d.status}
                  </span>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-[10.5px] text-[#7A8299] mb-1">
                    <span>Completion rate</span>
                    <strong className="text-[#0F1629]">{d.progress}%</strong>
                  </div>
                  <div className="w-full h-1.5 bg-[#F4F5F8] rounded-full overflow-hidden">
                    <div className={`h-full ${d.progressColor}`} style={{ width: `${d.progress}%` }} />
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-semibold text-[#384E85]">
                  <Navigation className="w-3 h-3 text-[#384E85]" /> {d.route}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right Column: Live Map + Delivery Zones */}
        <div className="lg:col-span-2 space-y-5">
          {/* Visual Map SVG Card */}
          <Card className="p-6 bg-white border border-[#384E85]/8 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)] relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-bold text-[#0F1629]">Live Delivery Map</h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-[#ECFDF5] text-[#10B981]">
                38 drivers online
              </span>
            </div>

            <div className="relative w-full h-[260px] rounded-[16px] overflow-hidden border border-[#384E85]/10 bg-[#EEF2F6]">
              <svg className="w-full h-full" viewBox="0 0 600 280">
                <rect width="600" height="280" fill="#EEF2F6"/>
                <path d="M 0 80 Q 200 60 400 120 T 600 100" fill="none" stroke="#E2E8F0" strokeWidth="12"/>
                <path d="M 120 0 L 180 280" fill="none" stroke="#E2E8F0" strokeWidth="10"/>
                <path d="M 450 0 L 410 280" fill="none" stroke="#E2E8F0" strokeWidth="8"/>
                <path d="M 0 190 Q 250 210 600 170" fill="none" stroke="#CBD5E1" strokeWidth="14"/>

                <circle cx="150" cy="110" r="65" fill="rgba(16,185,129,0.06)" stroke="rgba(16,185,129,0.25)" strokeWidth="1.5" strokeDasharray="4 4"/>
                <circle cx="430" cy="110" r="75" fill="rgba(56,78,133,0.06)" stroke="rgba(56,78,133,0.25)" strokeWidth="1.5" strokeDasharray="4 4"/>

                {/* Driver GPS Pins */}
                <circle cx="150" cy="110" r="12" fill="rgba(16,185,129,0.2)"/>
                <circle cx="150" cy="110" r="6" fill="#10B981" stroke="#ffffff" strokeWidth="2"/>

                <circle cx="280" cy="130" r="12" fill="rgba(16,185,129,0.2)"/>
                <circle cx="280" cy="130" r="6" fill="#10B981" stroke="#ffffff" strokeWidth="2"/>

                <circle cx="200" cy="180" r="12" fill="rgba(245,158,11,0.2)"/>
                <circle cx="200" cy="180" r="6" fill="#F59E0B" stroke="#ffffff" strokeWidth="2"/>

                <circle cx="430" cy="100" r="12" fill="rgba(16,185,129,0.2)"/>
                <circle cx="430" cy="100" r="6" fill="#10B981" stroke="#ffffff" strokeWidth="2"/>

                <circle cx="470" cy="160" r="12" fill="rgba(16,185,129,0.2)"/>
                <circle cx="470" cy="160" r="6" fill="#10B981" stroke="#ffffff" strokeWidth="2"/>
              </svg>

              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs p-2.5 rounded-[12px] border border-gray-200 shadow-xs text-[11px] space-y-1">
                <div className="font-bold text-[#0F1629] mb-1">Map Pins</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#10B981]" /> Active Driver</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#F59E0B]" /> On Break</div>
              </div>
            </div>
          </Card>

          {/* Delivery Zones */}
          <Card className="p-6 bg-white border border-[#384E85]/8 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)]">
            <h3 className="text-[15px] font-bold text-[#0F1629] mb-4">Delivery Zone Activity</h3>

            <div className="space-y-3">
              {zones.map((z, idx) => (
                <div key={idx} className="p-3 bg-[#FAFAFA] border border-[#384E85]/6 rounded-[12px] flex items-center justify-between gap-4">
                  <div className="w-28 font-bold text-[#0F1629] text-[13px] truncate">{z.name}</div>
                  <div className="flex-1 h-2 bg-[#F4F5F8] rounded-full overflow-hidden">
                    <div className={`h-full ${z.color}`} style={{ width: z.pct }} />
                  </div>
                  <div className="text-[12px] text-[#7A8299] text-right shrink-0">
                    <strong className="text-[#10B981]">{z.active} active</strong> · {z.done} done
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
