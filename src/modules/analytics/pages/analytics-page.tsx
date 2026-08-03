import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { ExportDataModal } from '@/shared/components/modals/ExportDataModal';

export const AnalyticsPage: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');
  const [exportOpen, setExportOpen] = useState(false);

  const orderStatuses = [
    { label: 'Delivered', count: '1,884', pct: '58%', color: '#10B981', dotClass: 'bg-[#10B981]', textClass: 'text-[#10B981]' },
    { label: 'On The Way', count: '585', pct: '18%', color: '#384E85', dotClass: 'bg-[#384e85]', textClass: 'text-[#384e85]' },
    { label: 'Preparing', count: '455', pct: '14%', color: '#F59E0B', dotClass: 'bg-[#f59e0b]', textClass: 'text-[#f59e0b]' },
    { label: 'Cancelled', count: '325', pct: '10%', color: '#EF4444', dotClass: 'bg-[#ef4444]', textClass: 'text-[#ef4444]' },
  ];

  const categories = [
    { name: 'Fresh Produce', pct: '32%', color: '#10B981', dotClass: 'bg-[#10B981]', textClass: 'text-[#10B981]' },
    { name: 'Dairy & Eggs', pct: '18%', color: '#384E85', dotClass: 'bg-[#384e85]', textClass: 'text-[#384e85]' },
    { name: 'Meat & Poultry', pct: '22%', color: '#F59E0B', dotClass: 'bg-[#f59e0b]', textClass: 'text-[#f59e0b]' },
    { name: 'Bakery', pct: '11%', color: '#8B5CF6', dotClass: 'bg-[#8b5cf6]', textClass: 'text-[#8b5cf6]' },
    { name: 'Beverages', pct: '9%', color: '#06B6D4', dotClass: 'bg-[#06b6d4]', textClass: 'text-[#06b6d4]' },
    { name: 'Snacks', pct: '8%', color: '#F97316', dotClass: 'bg-[#f97316]', textClass: 'text-[#f97316]' },
  ];

  // Donut segments for Order Status (circumference = 2π×65 ≈ 408)
  const donutSegments = [
    { color: '#10B981', dash: 236, offset: 0 },
    { color: '#384E85', dash: 73, offset: -242 },
    { color: '#F59E0B', dash: 57, offset: -320 },
    { color: '#EF4444', dash: 40, offset: -382 },
  ];

  // Pie chart segments for categories (circumference = 2π×65 ≈ 408)
  const catSegments = [
    { color: '#10B981', dash: 130, offset: 0 },
    { color: '#F59E0B', dash: 90, offset: -135 },
    { color: '#384E85', dash: 73, offset: -230 },
    { color: '#8B5CF6', dash: 45, offset: -308 },
    { color: '#06B6D4', dash: 37, offset: -358 },
    { color: '#F97316', dash: 32, offset: -400 },
  ];

  return (
    <div className="space-y-6 select-none pb-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-[17px] font-bold text-[#0F1629] tracking-[-0.3px]">Business Overview</h1>
          <p className="text-[13px] text-[#7A8299] mt-0.5 leading-[19.5px]">Revenue analytics, order distribution, and category performance</p>
        </div>
      </div>

      {/* Row 1: Revenue Trend + Order Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Revenue Trend - 7/12 */}
        <Card className="lg:col-span-7 p-6 bg-white border border-[rgba(56,78,133,0.07)] rounded-[20px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)] flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="text-[15px] font-bold text-[#0F1629] leading-[22.5px]">Revenue Trend</h3>
              <p className="text-[12px] text-[#7A8299] leading-[18px]">Retail vs Wholesale comparison</p>
            </div>
            {/* Period Switcher */}
            <div className="bg-[#F4F5F8] p-[3px] rounded-[10px] flex items-center gap-[3px]">
              {(['daily', 'weekly', 'monthly', 'yearly'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimePeriod(t)}
                  className={`px-[11px] py-[5px] rounded-[8px] text-[11px] font-medium capitalize transition-all cursor-pointer border-none ${
                    timePeriod === t
                      ? 'bg-[#384E85] text-white font-bold'
                      : 'text-[#7A8299] hover:text-[#0F1629] bg-transparent'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Line Chart */}
          <div className="flex-1 min-h-[220px] w-full relative pt-5">
            <svg viewBox="0 0 600 200" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="retailGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#384E85" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#384E85" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Y Axis Grid Lines */}
              {['$1200K', '$900K', '$600K', '$300K', '$0K'].map((lbl, idx) => {
                const y = 10 + idx * 38;
                return (
                  <g key={idx}>
                    <line x1="48" y1={y} x2="592" y2={y} stroke="#F3F4F6" strokeWidth="1" />
                    <text x="44" y={y + 4} textAnchor="end" fill="#7A8299" fontSize="10" fontFamily="Inter, sans-serif">{lbl}</text>
                  </g>
                );
              })}

              {/* Retail area fill */}
              <polygon
                points="55,162 55,118 100,124 145,98 190,110 235,80 280,90 325,68 370,54 415,65 460,45 505,32 550,15 550,162"
                fill="url(#retailGrad)"
              />
              {/* Retail line */}
              <path
                d="M 55 118 Q 77 128, 100 124 T 145 98 T 190 110 T 235 80 T 280 90 T 325 68 T 370 54 T 415 65 T 460 45 T 505 32 T 550 15"
                fill="none" stroke="#384E85" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              />
              {/* Wholesale dashed line */}
              <path
                d="M 55 138 Q 77 134, 100 132 T 145 120 T 190 114 T 235 104 T 280 98 T 325 90 T 370 84 T 415 76 T 460 70 T 505 60 T 550 50"
                fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="5 3" strokeLinecap="round"
              />

              {/* X Axis Labels */}
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
                <text key={i} x={55 + i * 45} y="190" textAnchor="middle" fill="#7A8299" fontSize="11" fontFamily="Inter, sans-serif">{m}</text>
              ))}
            </svg>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-5 pt-3 mt-2">
            <div className="flex items-center gap-[6px]">
              <span className="w-5 h-[8px] rounded-sm bg-[#384E85] inline-block" />
              <span className="text-[12px] text-[#7A8299]">Retail</span>
              <span className="text-[12px] font-bold text-[#0F1629]">$1.95M</span>
            </div>
            <div className="flex items-center gap-[6px]">
              <span className="w-5 h-[8px] rounded-sm bg-[#10B981] inline-block opacity-60" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #10B981 0, #10B981 4px, transparent 4px, transparent 7px)' }} />
              <span className="text-[12px] text-[#7A8299]">Wholesale</span>
              <span className="text-[12px] font-bold text-[#0F1629]">$892K</span>
            </div>
          </div>
        </Card>

        {/* Order Status - 5/12 */}
        <Card className="lg:col-span-5 p-6 bg-white border border-[rgba(56,78,133,0.07)] rounded-[20px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)] flex flex-col">
          <div className="mb-5">
            <h3 className="text-[15px] font-bold text-[#0F1629] leading-[22.5px]">Order Status</h3>
            <p className="text-[12px] text-[#7A8299] leading-[18px]">3,249 total orders today</p>
          </div>

          <div className="flex items-center gap-6 flex-1">
            {/* Donut Chart */}
            <div className="relative shrink-0 size-[160px]">
              <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
                <circle cx="80" cy="80" r="65" fill="none" stroke="#F3F4F6" strokeWidth="20" />
                {donutSegments.map((seg, idx) => (
                  <circle
                    key={idx}
                    cx="80" cy="80" r="65"
                    fill="none"
                    stroke={seg.color}
                    strokeWidth="20"
                    strokeDasharray={`${seg.dash} 408`}
                    strokeDashoffset={seg.offset}
                    strokeLinecap="round"
                  />
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[18px] font-extrabold text-[#0F1629] leading-[18px]">3,249</span>
                <span className="text-[9px] font-semibold text-[#7A8299] uppercase tracking-wider mt-1">Orders</span>
              </div>
            </div>

            {/* Legend list */}
            <div className="flex-1 flex flex-col gap-2">
              {orderStatuses.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between px-2 py-1.5 rounded-[10px] hover:bg-[#FAFAFA] transition-colors">
                  <div className="flex items-center gap-2">
                    <span className={`w-[10px] h-[10px] rounded-[3px] ${item.dotClass}`} />
                    <span className="text-[12px] text-[#4A5568]">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-extrabold text-[#0F1629]">{item.count}</span>
                    <span className={`text-[10px] font-bold ${item.textClass} min-w-[28px] text-right`}>{item.pct}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Row 2: Top Categories */}
      <Card className="p-6 bg-white border border-[rgba(56,78,133,0.07)] rounded-[20px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)]">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-[15px] font-bold text-[#0F1629] leading-[22.5px]">Top Categories</h3>
            <p className="text-[12px] text-[#7A8299] leading-[18px]">Sales distribution by product category</p>
          </div>
          {/* Export Data button */}
          <button onClick={() => setExportOpen(true)} className="flex items-center gap-[5px] px-[14px] py-[8px] bg-[#F4F5F8] rounded-[12px] text-[13px] font-medium text-[#4A5568] border-none cursor-pointer hover:bg-[#E8EBF2] transition-colors">
            <Download className="w-[14px] h-[14px]" />
            Export Data
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Pie Chart */}
          <div className="relative shrink-0 size-[160px]">
            <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
              <circle cx="80" cy="80" r="65" fill="none" stroke="#F3F4F6" strokeWidth="22" />
              {catSegments.map((seg, idx) => (
                <circle
                  key={idx}
                  cx="80" cy="80" r="65"
                  fill="none"
                  stroke={seg.color}
                  strokeWidth="22"
                  strokeDasharray={`${seg.dash} 408`}
                  strokeDashoffset={seg.offset}
                  strokeLinecap="round"
                />
              ))}
            </svg>
          </div>

          {/* Category badges grid: 3 cols × 2 rows */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-[11px] py-[9px] bg-[#FAFAFA] border border-[rgba(56,78,133,0.06)] rounded-[10px]"
              >
                <span className={`w-[10px] h-[10px] rounded-[3px] shrink-0 ${cat.dotClass}`} />
                <span className="text-[12px] text-[#4A5568] flex-1 truncate">{cat.name}</span>
                <span className={`text-[12px] font-extrabold shrink-0 ${cat.textClass}`}>{cat.pct}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <ExportDataModal isOpen={exportOpen} onClose={() => setExportOpen(false)} pageName="Analytics" />
    </div>
  );
};
