import React from 'react';
import { Truck, Star, DollarSign, MapPin } from 'lucide-react';
import { Card } from '@/shared/components/ui/card';

export const LiveTrackingPage: React.FC = () => {
  const drivers = [
    {
      initials: 'AK',
      name: 'Ahmed Khalil',
      orders: 12,
      rating: 4.9,
      earnings: '$184.50',
      status: 'Active',
      progress: 97,
      route: 'Downtown → East',
      avatarBg: 'from-[#384E85] to-[#6B8ED4]',
      progressColor: 'bg-[#10B981]',
    },
    {
      initials: 'MS',
      name: 'Maria Santos',
      orders: 9,
      rating: 4.8,
      earnings: '$142.00',
      status: 'Active',
      progress: 94,
      route: 'North → West',
      avatarBg: 'from-[#384E85] to-[#6B8ED4]',
      progressColor: 'bg-[#F59E0B]',
    },
    {
      initials: 'JR',
      name: 'James Roberts',
      orders: 6,
      rating: 4.6,
      earnings: '$98.30',
      status: 'Break',
      progress: 88,
      route: '',
      avatarBg: 'from-[#384E85] to-[#6B8ED4]',
      progressColor: 'bg-[#EF4444]',
    },
    {
      initials: 'RM',
      name: 'Reza Moradi',
      orders: 14,
      rating: 5.0,
      earnings: '$212.80',
      status: 'Active',
      progress: 99,
      route: 'City Center',
      avatarBg: 'from-[#384E85] to-[#6B8ED4]',
      progressColor: 'bg-[#10B981]',
    },
  ];

  const zones = [
    { name: 'Downtown', active: 8, done: 34, pct: '80%', color: 'bg-[#384E85]' },
    { name: 'East Side', active: 5, done: 21, pct: '55%', color: 'bg-[#8B5CF6]' },
    { name: 'North Quarter', active: 6, done: 28, pct: '65%', color: 'bg-[#10B981]' },
    { name: 'West District', active: 4, done: 18, pct: '45%', color: 'bg-[#F97316]' },
    { name: 'Port Area', active: 3, done: 12, pct: '35%', color: 'bg-[#06B6D4]' },
  ];

  return (
    <div className="space-y-5 select-none pb-8">
      {/* Header */}
      <div>
        <h1 className="text-[20px] font-bold text-[#0F1629] tracking-tight">
          Driver Operations
        </h1>
        <p className="text-[12px] text-[#7A8299] mt-0.5">
          Live driver status, performance, and delivery zones
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Driver Fleet Card (5 columns) */}
        <div className="lg:col-span-5">
          <Card className="p-5 bg-white border border-[#384E85]/7 rounded-[20px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-bold text-[#0F1629]">Driver Fleet</h3>
              <div className="flex gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ECFDF5] text-[#10B981]">
                  4 Active
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFFBEB] text-[#F59E0B]">
                  1 Break
                </span>
              </div>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-hidden">
              {drivers.map((d, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-[#FAFAFA] border border-[#384E85]/6 rounded-[16px] flex gap-3.5 items-start"
                >
                  {/* Avatar & Status Dot */}
                  <div className="relative shrink-0">
                    <div
                      className={`w-10 h-10 rounded-[12px] bg-gradient-to-br ${d.avatarBg} text-white flex items-center justify-center font-bold text-[13px]`}
                    >
                      {d.initials}
                    </div>
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#FAFAFA] ${
                        d.status === 'Active' ? 'bg-[#10B981]' : 'bg-[#F59E0B]'
                      }`}
                    />
                  </div>

                  {/* Driver Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0F1629] text-[13px]">
                        {d.name}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                          d.status === 'Active'
                            ? 'bg-[#ECFDF5] text-[#10B981]'
                            : 'bg-[#FFFBEB] text-[#F59E0B]'
                        }`}
                      >
                        {d.status}
                      </span>
                    </div>

                    {/* Metrics Row: Truck Orders, Star Rating, Green Earnings */}
                    <div className="flex items-center gap-3 text-[11px] pt-1">
                      <div className="flex items-center gap-1 text-[#7A8299]">
                        <Truck className="w-3 h-3 text-[#7A8299]" />
                        <span>{d.orders} orders</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#7A8299]">
                        <Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
                        <span>{d.rating}</span>
                      </div>
                      <div className="flex items-center gap-0.5 font-semibold text-[#10B981]">
                        <DollarSign className="w-3 h-3 text-[#10B981]" />
                        <span>{d.earnings.replace('$', '')}</span>
                      </div>
                    </div>

                    {/* Completion rate bar */}
                    <div className="pt-1.5">
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-[#7A8299]">Completion rate</span>
                        <strong className="text-[#0F1629] font-bold">{d.progress}%</strong>
                      </div>
                      <div className="w-full h-[3px] bg-[#F4F5F8] rounded-[3px] overflow-hidden">
                        <div
                          className={`h-[3px] rounded-[3px] transition-all duration-300 ${d.progressColor}`}
                          style={{ width: `${d.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Route location with MapPin icon */}
                    {d.route && (
                      <div className="flex items-center gap-1 text-[10.5px] font-medium text-[#384E85] pt-1.5">
                        <MapPin className="w-3 h-3 text-[#7A8299]" />
                        <span>{d.route}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Live Map + Delivery Zones (7 columns) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Live Delivery Map Card */}
          <Card className="p-5 bg-white border border-[#384E85]/7 rounded-[20px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)] relative overflow-hidden">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-[14px] font-bold text-[#0F1629]">Live Delivery Map</h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ECFDF5] text-[#10B981]">
                38 drivers online
              </span>
            </div>

            {/* Map Graphic Canvas */}
            <div className="relative w-full h-[250px] rounded-[16px] overflow-hidden border border-[#384E85]/10 bg-[#EEF2F6]">
              <svg className="w-full h-full" viewBox="0 0 600 250">
                <rect width="600" height="250" fill="#EEF2F6" />
                {/* Road Network Lines */}
                <path d="M 0 70 Q 200 50 400 110 T 600 90" fill="none" stroke="#E2E8F0" strokeWidth="12" />
                <path d="M 120 0 L 180 250" fill="none" stroke="#E2E8F0" strokeWidth="10" />
                <path d="M 450 0 L 410 250" fill="none" stroke="#E2E8F0" strokeWidth="8" />
                <path d="M 0 170 Q 250 190 600 150" fill="none" stroke="#CBD5E1" strokeWidth="14" />

                {/* Zone Range Circles */}
                <circle cx="140" cy="95" r="55" fill="rgba(16,185,129,0.06)" stroke="rgba(16,185,129,0.25)" strokeWidth="1.5" strokeDasharray="4 4" />
                <circle cx="420" cy="95" r="65" fill="rgba(56,78,133,0.06)" stroke="rgba(56,78,133,0.25)" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Driver GPS Pins */}
                <circle cx="140" cy="95" r="11" fill="rgba(16,185,129,0.2)" />
                <circle cx="140" cy="95" r="5.5" fill="#10B981" stroke="#ffffff" strokeWidth="2" />

                <circle cx="270" cy="115" r="11" fill="rgba(16,185,129,0.2)" />
                <circle cx="270" cy="115" r="5.5" fill="#10B981" stroke="#ffffff" strokeWidth="2" />

                <circle cx="190" cy="160" r="11" fill="rgba(245,158,11,0.2)" />
                <circle cx="190" cy="160" r="5.5" fill="#F59E0B" stroke="#ffffff" strokeWidth="2" />

                <circle cx="420" cy="85" r="11" fill="rgba(16,185,129,0.2)" />
                <circle cx="420" cy="85" r="5.5" fill="#10B981" stroke="#ffffff" strokeWidth="2" />

                <circle cx="460" cy="140" r="11" fill="rgba(16,185,129,0.2)" />
                <circle cx="460" cy="140" r="5.5" fill="#10B981" stroke="#ffffff" strokeWidth="2" />
              </svg>

              {/* Map Legend Overlay Box */}
              <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs p-2.5 rounded-[12px] border border-gray-200 shadow-xs text-[11px] space-y-1">
                <div className="font-bold text-[#0F1629] mb-1 text-[10px] uppercase tracking-[0.5px]">Map Legend</div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#4A5568]">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" /> Active
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#4A5568]">
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B]" /> On Break
                </div>
              </div>
            </div>
          </Card>

          {/* Delivery Zones Card */}
          <Card className="p-5 bg-white border border-[#384E85]/7 rounded-[20px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)]">
            <h3 className="text-[14px] font-bold text-[#0F1629] mb-3.5">
              Delivery Zones
            </h3>

            <div className="space-y-2.5">
              {zones.map((z, idx) => (
                <div
                  key={idx}
                  className="px-3.5 py-2.5 bg-[#FAFAFA] border border-[#384E85]/6 rounded-[12px] flex items-center justify-between gap-4"
                >
                  <div className="w-28 font-bold text-[#0F1629] text-[12.5px] truncate">
                    {z.name}
                  </div>
                  <div className="flex-1 h-2 bg-[#EEF1F8] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${z.color}`}
                      style={{ width: z.pct }}
                    />
                  </div>
                  <div className="text-[11.5px] text-[#7A8299] text-right shrink-0">
                    <strong className="text-[#0F1629] font-bold">{z.active} active</strong>{' '}
                    <span>{z.done} done</span>
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
