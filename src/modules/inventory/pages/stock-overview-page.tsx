import React from 'react';
import { 
  AlertTriangle, 
  Package, 
  TrendingUp, 
  Activity, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';

export const StockOverviewPage: React.FC = () => {
  const lowStockItems = [
    { name: 'Organic Bananas', sku: 'FRU-001 · Produce', left: 8 },
    { name: 'Whole Milk 2L', sku: 'DAI-034 · Dairy', left: 12 },
    { name: 'Chicken Breast 1kg', sku: 'MEA-012 · Meat', left: 5 },
    { name: 'Sourdough Bread', sku: 'BAK-007 · Bakery', left: 18 },
  ];

  const outOfStockItems = [
    { name: 'Avocados (net 6)', sku: 'FRU-018 · Produce', lastSold: '2h ago' },
    { name: 'Oat Milk 1L', sku: 'DAI-091 · Dairy', lastSold: '5h ago' },
    { name: 'Almond Flour 500g', sku: 'BAK-045 · Bakery', lastSold: '1d ago' },
  ];

  const fastMovingItems = [
    { rank: 1, name: 'Coca-Cola 2L', units: '842 units sold', trend: '+18%' },
    { rank: 2, name: 'Free-Range Eggs 12', units: '710 units sold', trend: '+12%' },
    { rank: 3, name: 'Greek Yogurt 500g', units: '598 units sold', trend: '+9%' },
    { rank: 4, name: 'Whole Wheat Bread', units: '512 units sold', trend: '+7%' },
  ];

  return (
    <div className="space-y-6 select-none pb-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-extrabold text-[#0F1629] tracking-tight">Inventory Command Center</h1>
          <p className="text-[13px] text-[#7A8299] mt-0.5">Real-time stock levels, alerts, and warehouse environmental performance</p>
        </div>
        <Button variant="outline" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
          Export Data
        </Button>
      </div>

      {/* 4 Primary Command Center Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Low Stock */}
        <Card className="p-5 bg-white border border-[#384E85]/8 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8.5 h-8.5 rounded-[10px] bg-[#FFFBEB] text-[#D97706] flex items-center justify-center font-bold">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <h3 className="text-[15px] font-bold text-[#0F1629]">Low Stock</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-[#FFFBEB] text-[#D97706]">
                4 products
              </span>
            </div>

            <div className="space-y-3">
              {lowStockItems.map((item, idx) => (
                <div key={idx} className="p-2.5 bg-[#FAFAFA] border border-[#384E85]/6 rounded-[12px] flex items-center justify-between">
                  <div>
                    <div className="text-[12.5px] font-bold text-[#0F1629]">{item.name}</div>
                    <div className="text-[10.5px] text-[#7A8299]">{item.sku}</div>
                  </div>
                  <span className="text-[11.5px] font-extrabold text-[#D97706]">{item.left} left</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Card 2: Out of Stock */}
        <Card className="p-5 bg-white border border-[#384E85]/8 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8.5 h-8.5 rounded-[10px] bg-[#FEF2F2] text-[#EF4444] flex items-center justify-center font-bold">
                  <Package className="w-4 h-4" />
                </div>
                <h3 className="text-[15px] font-bold text-[#0F1629]">Out of Stock</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-[#FEF2F2] text-[#EF4444]">
                3 products
              </span>
            </div>

            <div className="space-y-3 mb-4">
              {outOfStockItems.map((item, idx) => (
                <div key={idx} className="p-2.5 bg-[#FEF2F2]/40 border border-[#EF4444]/15 rounded-[12px] flex items-center justify-between">
                  <div>
                    <div className="text-[12.5px] font-bold text-[#0F1629]">{item.name}</div>
                    <div className="text-[10.5px] text-[#7A8299]">{item.sku}</div>
                  </div>
                  <span className="text-[10px] text-[#EF4444] font-semibold">{item.lastSold}</span>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => alert('Reordering out of stock items...')}
            className="w-full h-8.5 bg-[#EF4444] hover:bg-[#DC2626] text-white text-[12px] font-bold rounded-[10px] flex items-center justify-center gap-1.5 transition cursor-pointer border-none"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reorder Now
          </button>
        </Card>

        {/* Card 3: Fast Moving */}
        <Card className="p-5 bg-white border border-[#384E85]/8 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8.5 h-8.5 rounded-[10px] bg-[#ECFDF5] text-[#10B981] flex items-center justify-center font-bold">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h3 className="text-[15px] font-bold text-[#0F1629]">Fast Moving</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-[#ECFDF5] text-[#10B981]">
                Top Sellers
              </span>
            </div>

            <div className="space-y-2.5">
              {fastMovingItems.map((item) => (
                <div key={item.rank} className="p-2 bg-[#FAFAFA] border border-[#384E85]/6 rounded-[12px] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#EEF1F8] text-[#384E85] text-[10px] font-bold flex items-center justify-center shrink-0">
                      {item.rank}
                    </span>
                    <div>
                      <div className="text-[12px] font-bold text-[#0F1629]">{item.name}</div>
                      <div className="text-[10px] text-[#7A8299]">{item.units}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#10B981] flex items-center">
                    <ArrowUpRight className="w-3 h-3" /> {item.trend}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 text-[11px] text-[#7A8299] text-center pt-2 border-t border-[#F3F4F6]">
            Total units moved today: <strong className="text-[#0F1629]">2,662 units</strong>
          </div>
        </Card>

        {/* Card 4: Warehouse Health (Multi-Arc Gauge) */}
        <Card className="p-5 bg-white border border-[#384E85]/8 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8.5 h-8.5 rounded-[10px] bg-[#EEF1F8] text-[#384E85] flex items-center justify-center font-bold">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#0F1629]">Warehouse Health</h3>
                  <div className="text-[11px] font-bold text-[#10B981]">Score: 87/100</div>
                </div>
              </div>
            </div>

            {/* Multi-Arc Gauge SVG */}
            <div className="py-2 flex justify-center">
              <svg className="w-[140px] h-[80px]" viewBox="0 0 120 70">
                <path d="M 16 60 A 44 44 0 0 1 104 60" fill="none" stroke="#F3F4F6" strokeWidth="8" strokeLinecap="round"/>
                <path d="M 16 60 A 44 44 0 0 1 97.15 36.42" fill="none" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round"/>

                <path d="M 30 60 A 30 30 0 0 1 90 60" fill="none" stroke="#F3F4F6" strokeWidth="8" strokeLinecap="round"/>
                <path d="M 30 60 A 30 30 0 0 1 89.63 55.31" fill="none" stroke="#10B981" strokeWidth="8" strokeLinecap="round"/>

                <path d="M 44 60 A 16 16 0 0 1 76 60" fill="none" stroke="#F3F4F6" strokeWidth="8" strokeLinecap="round"/>
                <path d="M 44 60 A 16 16 0 0 1 72.33 49.80" fill="none" stroke="#384E85" strokeWidth="8" strokeLinecap="round"/>
              </svg>
            </div>

            <div className="space-y-1.5 text-[11.5px] mt-1">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#7A8299]">
                  <span className="w-2 h-2 rounded-full bg-[#384E85]" /> Capacity
                </span>
                <strong className="text-[#0F1629]">78%</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#7A8299]">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" /> Temp OK
                </span>
                <strong className="text-[#10B981]">95%</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#7A8299]">
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B]" /> Humidity
                </span>
                <strong className="text-[#D97706]">82%</strong>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-[#F3F4F6] text-center text-[10.5px] font-bold text-[#10B981] flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> All systems operational
          </div>
        </Card>
      </div>
    </div>
  );
};
