import React from 'react';
import { 
  DollarSign, 
  Building2, 
  ShoppingBag, 
  FileText, 
  UserPlus, 
  RefreshCw, 
  Download, 
  TrendingUp, 
  Award,
  ArrowUpRight
} from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';

export const CustomersPage: React.FC = () => {
  const topAccounts = [
    { rank: 1, name: 'FreshMart Chain', tier: 'Platinum', orders: 142, amount: '$284,000', trend: '+24%', tierClass: 'bg-[#F5F3FF] text-[#7C3AED]' },
    { rank: 2, name: 'Metro Grocers Ltd', tier: 'Gold', orders: 89, amount: '$168,500', trend: '+18%', tierClass: 'bg-[#FFFBEB] text-[#D97706]' },
    { rank: 3, name: 'Sunrise Wholesale', tier: 'Gold', orders: 76, amount: '$142,000', trend: '+12%', tierClass: 'bg-[#FFFBEB] text-[#D97706]' },
    { rank: 4, name: 'City Foods Co.', tier: 'Silver', orders: 54, amount: '$98,400', trend: '+8%', tierClass: 'bg-[#EEF1F8] text-[#384E85]' },
    { rank: 5, name: 'Urban Grocery', tier: 'Silver', orders: 48, amount: '$84,200', trend: '+5%', tierClass: 'bg-[#EEF1F8] text-[#384E85]' },
  ];

  return (
    <div className="space-y-6 select-none pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-extrabold text-[#0F1629] tracking-tight">Customers &amp; B2B Accounts Dashboard</h1>
          <p className="text-[13px] text-[#7A8299] mt-0.5">B2B accounts, bulk orders, tier pricing, and contract management</p>
        </div>
        <Button variant="outline" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
          Export Data
        </Button>
      </div>

      {/* 6 Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4 bg-white border border-[#384E85]/8 rounded-[18px] shadow-[0px_4px_16px_rgba(0,0,0,0.04)] flex items-center justify-between">
          <div>
            <div className="text-[22px] font-extrabold text-[#0F1629]">$892K</div>
            <div className="text-[11px] font-semibold text-[#7A8299] uppercase tracking-[0.5px]">Wholesale Revenue</div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#ECFDF5] text-[#10B981]">+24.7%</span>
        </Card>

        <Card className="p-4 bg-white border border-[#384E85]/8 rounded-[18px] shadow-[0px_4px_16px_rgba(0,0,0,0.04)] flex items-center justify-between">
          <div>
            <div className="text-[22px] font-extrabold text-[#0F1629]">284</div>
            <div className="text-[11px] font-semibold text-[#7A8299] uppercase tracking-[0.5px]">Active B2B Accounts</div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#EEF1F8] text-[#384E85]">+12 new</span>
        </Card>

        <Card className="p-4 bg-white border border-[#384E85]/8 rounded-[18px] shadow-[0px_4px_16px_rgba(0,0,0,0.04)] flex items-center justify-between">
          <div>
            <div className="text-[22px] font-extrabold text-[#0F1629]">1,840</div>
            <div className="text-[11px] font-semibold text-[#7A8299] uppercase tracking-[0.5px]">Bulk Orders (MTD)</div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#ECFDF5] text-[#10B981]">+18%</span>
        </Card>

        <Card className="p-4 bg-white border border-[#384E85]/8 rounded-[18px] shadow-[0px_4px_16px_rgba(0,0,0,0.04)] flex items-center justify-between">
          <div>
            <div className="text-[22px] font-extrabold text-[#0F1629]">23</div>
            <div className="text-[11px] font-semibold text-[#7A8299] uppercase tracking-[0.5px]">Pending Quotations</div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#FFFBEB] text-[#D97706]">5 expiring</span>
        </Card>

        <Card className="p-4 bg-white border border-[#384E85]/8 rounded-[18px] shadow-[0px_4px_16px_rgba(0,0,0,0.04)] flex items-center justify-between">
          <div>
            <div className="text-[22px] font-extrabold text-[#0F1629]">18</div>
            <div className="text-[11px] font-semibold text-[#7A8299] uppercase tracking-[0.5px]">New Business Clients</div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#ECFEFF] text-[#0891B2]">+6 this week</span>
        </Card>

        <Card className="p-4 bg-white border border-[#384E85]/8 rounded-[18px] shadow-[0px_4px_16px_rgba(0,0,0,0.04)] flex items-center justify-between">
          <div>
            <div className="text-[22px] font-extrabold text-[#0F1629]">7</div>
            <div className="text-[11px] font-semibold text-[#7A8299] uppercase tracking-[0.5px]">Contract Renewals</div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#FFF7ED] text-[#F97316]">Due this month</span>
        </Card>
      </div>

      {/* Main Split Grid: Top Accounts & Revenue Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Top Wholesale Accounts */}
        <Card className="p-6 bg-white border border-[#384E85]/8 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)]">
          <h3 className="text-[15px] font-bold text-[#0F1629] mb-4">Top Wholesale Accounts</h3>

          <div className="space-y-3">
            {topAccounts.map((acc) => (
              <div key={acc.rank} className="p-3 bg-[#FAFAFA] border border-[#384E85]/6 rounded-[14px] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#EEF1F8] text-[#384E85] text-[11px] font-extrabold flex items-center justify-center shrink-0">
                    {acc.rank}
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-[#0F1629]">{acc.name}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`px-2 py-0.2 rounded text-[9.5px] font-extrabold ${acc.tierClass}`}>{acc.tier}</span>
                      <span className="text-[11px] text-[#7A8299]">{acc.orders} orders</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[13.5px] font-extrabold text-[#0F1629]">{acc.amount}</div>
                  <div className="text-[11px] font-bold text-[#10B981] flex items-center justify-end">
                    <ArrowUpRight className="w-3 h-3" /> {acc.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Monthly Revenue Bar Chart */}
        <Card className="p-6 bg-white border border-[#384E85]/8 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)] flex flex-col justify-between">
          <div>
            <h3 className="text-[15px] font-bold text-[#0F1629]">Monthly Wholesale Revenue</h3>
            <p className="text-[12px] text-[#7A8299] mb-6">USD thousands · 2026 performance</p>

            <div className="h-[180px] flex items-end justify-between gap-3 px-4">
              {[
                { month: 'Jan', h: '45%' },
                { month: 'Feb', h: '55%' },
                { month: 'Mar', h: '65%' },
                { month: 'Apr', h: '60%' },
                { month: 'May', h: '80%' },
                { month: 'Jun', h: '100%', active: true },
              ].map((b, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <div className="w-full bg-[#EEF1F8] rounded-t-lg h-full max-h-[140px] relative overflow-hidden">
                    <div 
                      className={`w-full absolute bottom-0 rounded-t-lg transition-all duration-500 ${
                        b.active ? 'bg-gradient-to-t from-[#2A3A65] to-[#384E85]' : 'bg-[#384E85]/40'
                      }`} 
                      style={{ height: b.h }} 
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-[#7A8299]">{b.month}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-[#F3F4F6]">
            <div className="flex-1 p-3 bg-[#EEF1F8] rounded-[12px] text-center">
              <div className="text-[16px] font-extrabold text-[#384E85]">$128K</div>
              <div className="text-[10px] text-[#384E85] font-semibold">MTD Revenue</div>
            </div>
            <div className="flex-1 p-3 bg-[#ECFDF5] rounded-[12px] text-center">
              <div className="text-[16px] font-extrabold text-[#10B981]">+16.4%</div>
              <div className="text-[10px] text-[#10B981] font-semibold">vs Last Month</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
