import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Package, 
  TrendingUp, 
  Activity, 
  Download, 
  Check 
} from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { ExportDataModal } from '@/shared/components/modals/ExportDataModal';

export const StockOverviewPage: React.FC = () => {
  const [exportOpen, setExportOpen] = useState(false);
  const lowStockItems = [
    { name: 'Organic Bananas', sku: 'FRU-001 · Produce', left: 8, progress: '35%' },
    { name: 'Whole Milk 2L', sku: 'DAI-034 · Dairy', left: 12, progress: '50%' },
    { name: 'Chicken Breast 1kg', sku: 'MEA-012 · Meat', left: 5, progress: '20%' },
    { name: 'Sourdough Bread', sku: 'BAK-007 · Bakery', left: 18, progress: '65%' },
  ];

  const outOfStockItems = [
    { name: 'Avocados (net 6)', sku: 'FRU-018 · Produce', lastSold: 'Last sold 2h ago' },
    { name: 'Oat Milk 1L', sku: 'DAI-091 · Dairy', lastSold: 'Last sold 5h ago' },
    { name: 'Almond Flour 500g', sku: 'BAK-045 · Bakery', lastSold: 'Last sold 1d ago' },
  ];

  const fastMovingItems = [
    { rank: 1, name: 'Coca-Cola 2L', units: '842 units sold', trend: '+18%' },
    { rank: 2, name: 'Free-Range Eggs 12', units: '710 units sold', trend: '+12%' },
    { rank: 3, name: 'Greek Yogurt 500g', units: '598 units sold', trend: '+9%' },
    { rank: 4, name: 'Whole Wheat Bread', units: '512 units sold', trend: '+7%' },
  ];

  return (
    <div className="space-y-5 select-none pb-8">
      {/* Header */}
      <div>
        <h1 className="text-[20px] font-bold text-[#0F1629] tracking-tight">
          Inventory Command Center
        </h1>
        <p className="text-[12px] text-[#7A8299] mt-0.5">
          Stock levels, alerts, and warehouse performance
        </p>
      </div>

      {/* 4 Command Center Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
        {/* Card 1: Low Stock */}
        <Card className="p-5 bg-white border border-[#384E85]/7 rounded-[20px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)] flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[10px] bg-[#FFFBEB] text-[#F59E0B] flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-[#0F1629]">Low Stock</h3>
                  <div className="text-[10px] font-bold text-[#EF4444]">4 products</div>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              {lowStockItems.map((item, idx) => (
                <div
                  key={idx}
                  className="px-3.5 py-2.5 bg-[#FAFAFA] border border-[#384E85]/6 rounded-[12px] flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[12.5px] font-bold text-[#0F1629]">
                      {item.name}
                    </span>
                    <span className="text-[11px] font-bold text-[#F97316]">
                      {item.left} left
                    </span>
                  </div>
                  <div className="text-[10px] text-[#7A8299]">{item.sku}</div>
                  <div className="w-full h-1 bg-[#E2E8F0] rounded-full overflow-hidden mt-0.5">
                    <div
                      className="h-full bg-[#F97316] rounded-full transition-all duration-300"
                      style={{ width: item.progress }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Card 2: Out of Stock */}
        <Card className="p-5 bg-white border border-[#384E85]/7 rounded-[20px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)] flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[10px] bg-[#FEF2F2] text-[#EF4444] flex items-center justify-center shrink-0">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-[#0F1629]">Out of Stock</h3>
                  <div className="text-[10px] font-bold text-[#EF4444]">3 products</div>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              {outOfStockItems.map((item, idx) => (
                <div
                  key={idx}
                  className="px-3.5 py-2.5 bg-[#FFF5F5] border border-[#EF4444]/15 rounded-[12px] flex items-center justify-between"
                >
                  <div>
                    <div className="text-[12.5px] font-bold text-[#0F1629]">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-[#7A8299] mt-0.5">
                      {item.sku}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#EF4444]">
                    {item.lastSold}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => alert('Reordering out of stock items...')}
            className="w-full bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold text-[13px] py-2.5 rounded-[12px] transition flex items-center justify-center gap-1.5 border-none cursor-pointer mt-4"
          >
            Reorder Now
          </button>
        </Card>

        {/* Card 3: Fast Moving */}
        <Card className="p-5 bg-white border border-[#384E85]/7 rounded-[20px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)] flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[10px] bg-[#ECFDF5] text-[#10B981] flex items-center justify-center shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-[#0F1629]">Fast Moving</h3>
                  <div className="text-[10px] font-bold text-[#10B981]">Top sellers today</div>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              {fastMovingItems.map((item) => (
                <div
                  key={item.rank}
                  className="px-3.5 py-2 bg-[#FAFAFA] border border-[#384E85]/6 rounded-[12px] flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-5 h-5 rounded-[6px] text-[10px] font-bold flex items-center justify-center shrink-0 ${
                        item.rank === 1
                          ? 'bg-[#1E293B] text-white'
                          : 'bg-[#F1F5F9] text-[#64748B]'
                      }`}
                    >
                      {item.rank}
                    </span>
                    <div>
                      <div className="text-[12px] font-bold text-[#0F1629]">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-[#7A8299]">{item.units}</div>
                    </div>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-[6px] text-[10px] font-bold bg-[#ECFDF5] text-[#10B981]">
                    {item.trend}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-2.5 bg-[#ECFDF5] rounded-[10px] text-center mt-3">
            <div className="text-[10px] text-[#7A8299]">Total units moved today</div>
            <div className="text-[14px] font-extrabold text-[#10B981]">
              2,662 units
            </div>
          </div>
        </Card>

        {/* Card 4: Warehouse Health */}
        <Card className="p-5 bg-white border border-[#384E85]/7 rounded-[20px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)] flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[10px] bg-[#F0F9FF] text-[#0284C7] flex items-center justify-center shrink-0">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-[#0F1629]">Warehouse Health</h3>
                  <div className="text-[10px] font-bold text-[#7A8299]">Score: 87/100</div>
                </div>
              </div>
            </div>

            {/* Concentric Gauge SVG */}
            <div className="py-2 flex justify-center">
              <svg className="w-[140px] h-[75px]" viewBox="0 0 120 65">
                {/* Outer Arc - Capacity (Blue #384E85) */}
                <path d="M 12 58 A 48 48 0 0 1 108 58" fill="none" stroke="#E2E8F0" strokeWidth="7" strokeLinecap="round" />
                <path d="M 12 58 A 48 48 0 0 1 97.4 34" fill="none" stroke="#F59E0B" strokeWidth="7" strokeLinecap="round" />

                {/* Middle Arc - Temp OK (Green #10B981) */}
                <path d="M 24 58 A 36 36 0 0 1 96 58" fill="none" stroke="#E2E8F0" strokeWidth="7" strokeLinecap="round" />
                <path d="M 24 58 A 36 36 0 0 1 93.6 50" fill="none" stroke="#10B981" strokeWidth="7" strokeLinecap="round" />

                {/* Inner Arc - Humidity (Amber #F59E0B) */}
                <path d="M 36 58 A 24 24 0 0 1 84 58" fill="none" stroke="#E2E8F0" strokeWidth="7" strokeLinecap="round" />
                <path d="M 36 58 A 24 24 0 0 1 79.2 43.6" fill="none" stroke="#384E85" strokeWidth="7" strokeLinecap="round" />
              </svg>
            </div>

            {/* Metrics Breakdown */}
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#7A8299]">
                  <span className="w-2 h-2 rounded-[2px] bg-[#384E85]" /> Capacity
                </span>
                <span className="font-extrabold text-[#0F1629]">78%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#7A8299]">
                  <span className="w-2 h-2 rounded-[2px] bg-[#10B981]" /> Temp OK
                </span>
                <span className="font-extrabold text-[#0F1629]">95%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#7A8299]">
                  <span className="w-2 h-2 rounded-[2px] bg-[#F59E0B]" /> Humidity
                </span>
                <span className="font-extrabold text-[#0F1629]">82%</span>
              </div>
            </div>
          </div>

          <div className="p-2 bg-[#ECFDF5] rounded-[10px] text-center text-[11px] font-bold text-[#10B981] flex items-center justify-center gap-1.5 mt-3">
            <Check className="w-3.5 h-3.5" /> All systems operational
          </div>
        </Card>
      </div>

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
      <ExportDataModal isOpen={exportOpen} onClose={() => setExportOpen(false)} pageName="Inventory" />
    </div>
  );
};
