import React, { useState } from 'react';
import { Download, TrendingUp, ShoppingBag, PieChart, ArrowUpRight } from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';

export const AnalyticsPage: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');

  return (
    <div className="space-y-6 select-none pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-extrabold text-[#0F1629] tracking-tight">Business Analytics &amp; Reports</h1>
          <p className="text-[13px] text-[#7A8299] mt-0.5">Revenue analytics, order distribution, and category sales performance</p>
        </div>
        <Button variant="outline" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
          Export Data
        </Button>
      </div>

      {/* Row 1: Revenue Trend + Order Status */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Revenue Trend Line Chart (3/5 width) */}
        <Card className="lg:col-span-3 p-6 bg-white border border-[#384E85]/8 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)] flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-[15px] font-bold text-[#0F1629]">Revenue Trend</h3>
                <p className="text-[12px] text-[#7A8299]">Retail vs Wholesale comparison</p>
              </div>

              <div className="bg-[#F4F5F8] p-1 rounded-[12px] flex items-center gap-1">
                {(['daily', 'weekly', 'monthly', 'yearly'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimePeriod(t)}
                    className={`px-3 py-1 rounded-[9px] text-[12px] font-semibold capitalize transition cursor-pointer border-none ${
                      timePeriod === t ? 'bg-[#384E85] text-white shadow-xs' : 'text-[#7A8299] hover:text-[#0F1629]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* SVG Bezier Line Chart */}
            <div className="h-[220px] w-full relative py-2">
              <svg viewBox="0 0 600 200" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="retailGradA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#384E85" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#384E85" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Y Axis Grid Lines */}
                {['$1200K', '$900K', '$600K', '$300K', '$0K'].map((lbl, idx) => {
                  const y = 20 + idx * 36;
                  return (
                    <g key={idx}>
                      <line x1="45" y1={y} x2="590" y2={y} stroke="#F3F4F6" strokeWidth="1" />
                      <text x="40" y={y + 3} textAnchor="end" fill="#9CA3AF" fontSize="9" fontFamily="sans-serif">{lbl}</text>
                    </g>
                  );
                })}

                <polygon points="50,164 50,118 95,124 140,98 185,110 230,80 275,90 320,68 365,54 410,65 455,45 500,32 545,15 545,164" fill="url(#retailGradA)" />
                <path d="M 50 118 Q 72 128, 95 124 T 140 98 T 185 110 T 230 80 T 275 90 T 320 68 T 365 54 T 410 65 T 455 45 T 500 32 T 545 15" fill="none" stroke="#384E85" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 50 138 Q 72 134, 95 132 T 140 120 T 185 114 T 230 104 T 275 98 T 320 90 T 365 84 T 410 76 T 455 70 T 500 60 T 545 50" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round" />

                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
                  <text key={i} x={50 + i * 45} y="186" textAnchor="middle" fill="#9CA3AF" fontSize="9" fontFamily="sans-serif">{m}</text>
                ))}
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-6 pt-3 border-t border-[#F3F4F6] text-[12px]">
            <div className="flex items-center gap-2">
              <span className="w-5 h-[3px] rounded-full bg-[#384E85]" />
              <span className="text-[#7A8299]">Retail</span>
              <span className="font-bold text-[#0F1629]">$1.95M</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-[2px] rounded-full bg-[#10B981] border-b border-dashed border-[#10B981]" />
              <span className="text-[#7A8299]">Wholesale</span>
              <span className="font-bold text-[#0F1629]">$892K</span>
            </div>
          </div>
        </Card>

        {/* Order Status Donut Chart (2/5 width) */}
        <Card className="lg:col-span-2 p-6 bg-white border border-[#384E85]/8 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)] flex flex-col justify-between">
          <div>
            <h3 className="text-[15px] font-bold text-[#0F1629]">Order Status Breakdown</h3>
            <p className="text-[12px] text-[#7A8299] mb-4">3,249 total orders today</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
              <div className="relative w-[150px] h-[150px] shrink-0">
                <svg width="150" height="150" viewBox="0 0 160 160" className="transform -rotate-90">
                  <circle cx="80" cy="80" r="65" fill="none" stroke="#F3F4F6" strokeWidth="18" />
                  <circle cx="80" cy="80" r="65" fill="none" stroke="#10B981" strokeWidth="18" strokeDasharray="236 408" strokeDashoffset="0" strokeLinecap="round" />
                  <circle cx="80" cy="80" r="65" fill="none" stroke="#384E85" strokeWidth="18" strokeDasharray="73 408" strokeDashoffset="-242" strokeLinecap="round" />
                  <circle cx="80" cy="80" r="65" fill="none" stroke="#F59E0B" strokeWidth="18" strokeDasharray="57 408" strokeDashoffset="-320" strokeLinecap="round" />
                  <circle cx="80" cy="80" r="65" fill="none" stroke="#EF4444" strokeWidth="18" strokeDasharray="40 408" strokeDashoffset="-382" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[22px] font-extrabold text-[#0F1629] leading-none">3,249</span>
                  <span className="text-[10px] font-bold text-[#7A8299] uppercase tracking-wider mt-1">ORDERS</span>
                </div>
              </div>

              <div className="flex-1 w-full space-y-2.5 text-[12.5px]">
                {[
                  { label: 'Delivered', count: '1,884', pct: '58%', color: 'bg-[#10B981]', textColor: 'text-[#10B981]' },
                  { label: 'On The Way', count: '585', pct: '18%', color: 'bg-[#384E85]', textColor: 'text-[#384E85]' },
                  { label: 'Preparing', count: '455', pct: '14%', color: 'bg-[#F59E0B]', textColor: 'text-[#F59E0B]' },
                  { label: 'Cancelled', count: '325', pct: '10%', color: 'bg-[#EF4444]', textColor: 'text-[#EF4444]' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                      <span className="text-[#0F1629] font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0F1629]">{item.count}</span>
                      <span className={`text-[11px] font-bold ${item.textColor} min-w-[28px] text-right`}>{item.pct}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Row 2: Top Categories Sales Distribution */}
      <Card className="p-6 bg-white border border-[#384E85]/8 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)]">
        <div className="mb-4">
          <h3 className="text-[15px] font-bold text-[#0F1629]">Top Categories Sales Distribution</h3>
          <p className="text-[12px] text-[#7A8299]">Sales volume by product category</p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-[140px] h-[140px] shrink-0">
            <svg width="140" height="140" viewBox="0 0 160 160" className="transform -rotate-90">
              <circle cx="80" cy="80" r="65" fill="none" stroke="#10B981" strokeWidth="22" strokeDasharray="130 408" strokeDashoffset="0" strokeLinecap="round" />
              <circle cx="80" cy="80" r="65" fill="none" stroke="#384E85" strokeWidth="22" strokeDasharray="73 408" strokeDashoffset="-135" strokeLinecap="round" />
              <circle cx="80" cy="80" r="65" fill="none" stroke="#F59E0B" strokeWidth="22" strokeDasharray="90 408" strokeDashoffset="-213" strokeLinecap="round" />
              <circle cx="80" cy="80" r="65" fill="none" stroke="#8B5CF6" strokeWidth="22" strokeDasharray="45 408" strokeDashoffset="-308" strokeLinecap="round" />
              <circle cx="80" cy="80" r="65" fill="none" stroke="#06B6D4" strokeWidth="22" strokeDasharray="37 408" strokeDashoffset="-358" strokeLinecap="round" />
              <circle cx="80" cy="80" r="65" fill="none" stroke="#F97316" strokeWidth="22" strokeDasharray="32 408" strokeDashoffset="-400" strokeLinecap="round" />
            </svg>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full">
            {[
              { name: 'Fresh Produce', pct: '32%', color: 'bg-[#10B981]', textColor: 'text-[#10B981]' },
              { name: 'Dairy & Eggs', pct: '18%', color: 'bg-[#384E85]', textColor: 'text-[#384E85]' },
              { name: 'Meat & Poultry', pct: '22%', color: 'bg-[#F59E0B]', textColor: 'text-[#F59E0B]' },
              { name: 'Bakery', pct: '11%', color: 'bg-[#8B5CF6]', textColor: 'text-[#8B5CF6]' },
              { name: 'Beverages', pct: '9%', color: 'bg-[#06B6D4]', textColor: 'text-[#06B6D4]' },
              { name: 'Snacks', pct: '8%', color: 'bg-[#F97316]', textColor: 'text-[#F97316]' },
            ].map((c, idx) => (
              <div key={idx} className="p-3.5 bg-[#FAFAFA] border border-[#384E85]/6 rounded-[14px] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${c.color}`} />
                  <span className="text-[12.5px] font-semibold text-[#0F1629]">{c.name}</span>
                </div>
                <span className={`text-[13px] font-extrabold ${c.textColor}`}>{c.pct}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
