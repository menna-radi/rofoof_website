import React from 'react';
import { 
  DollarSign, 
  Building2, 
  ShoppingBag, 
  RefreshCw, 
  Users, 
  TrendingUp, 
  Download 
} from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';

export const CustomersPage: React.FC = () => {
  const statCards = [
    {
      icon: <DollarSign className="w-4 h-4 text-[#384E85]" />,
      iconBg: 'bg-[#EEF1F8]',
      value: '$892K',
      label: 'Wholesale Revenue',
      badge: '+24.7%',
      badgeColor: 'text-[#384E85]',
    },
    {
      icon: <Building2 className="w-4 h-4 text-[#8B5CF6]" />,
      iconBg: 'bg-[#F5F3FF]',
      value: '284',
      label: 'Active B2B Accounts',
      badge: '+12',
      badgeColor: 'text-[#8B5CF6]',
    },
    {
      icon: <ShoppingBag className="w-4 h-4 text-[#10B981]" />,
      iconBg: 'bg-[#ECFDF5]',
      value: '1,840',
      label: 'Bulk Orders (MTD)',
      badge: '+18%',
      badgeColor: 'text-[#10B981]',
    },
    {
      icon: <RefreshCw className="w-4 h-4 text-[#F59E0B]" />,
      iconBg: 'bg-[#FFFBEB]',
      value: '23',
      label: 'Pending Quotations',
      badge: '5 expiring',
      badgeColor: 'text-[#F59E0B]',
    },
    {
      icon: <Users className="w-4 h-4 text-[#06B6D4]" />,
      iconBg: 'bg-[#ECFEFF]',
      value: '18',
      label: 'New Business Clients',
      badge: '+6 this week',
      badgeColor: 'text-[#06B6D4]',
    },
    {
      icon: <TrendingUp className="w-4 h-4 text-[#F97316]" />,
      iconBg: 'bg-[#FFF7ED]',
      value: '7',
      label: 'Contract Renewals',
      badge: 'Due this month',
      badgeColor: 'text-[#F97316]',
    },
  ];

  const topAccounts = [
    {
      rank: 1,
      name: 'FreshMart Chain',
      tier: 'Platinum',
      orders: 142,
      amount: '$284,000',
      trend: '+24%',
      rankBg: 'bg-[#EEF1F8] text-[#384E85]',
      tierClass: 'bg-[#FFFBEB] text-[#F59E0B]',
    },
    {
      rank: 2,
      name: 'Metro Grocers Ltd',
      tier: 'Gold',
      orders: 89,
      amount: '$168,500',
      trend: '+18%',
      rankBg: 'bg-[#F4F5F8] text-[#7A8299]',
      tierClass: 'bg-[#FDF6E3] text-[#C0A060]',
    },
    {
      rank: 3,
      name: 'Sunrise Wholesale',
      tier: 'Gold',
      orders: 76,
      amount: '$142,000',
      trend: '+12%',
      rankBg: 'bg-[#F4F5F8] text-[#7A8299]',
      tierClass: 'bg-[#FDF6E3] text-[#C0A060]',
    },
    {
      rank: 4,
      name: 'City Foods Co.',
      tier: 'Silver',
      orders: 54,
      amount: '$98,400',
      trend: '+8%',
      rankBg: 'bg-[#F4F5F8] text-[#7A8299]',
      tierClass: 'bg-[#F4F5F8] text-[#718096]',
    },
    {
      rank: 5,
      name: 'Urban Grocery',
      tier: 'Silver',
      orders: 48,
      amount: '$84,200',
      trend: '+5%',
      rankBg: 'bg-[#F4F5F8] text-[#7A8299]',
      tierClass: 'bg-[#F4F5F8] text-[#718096]',
    },
  ];

  const chartData = [
    { month: 'Jan', val: 45, height: '32%' },
    { month: 'Feb', val: 55, height: '42%' },
    { month: 'Mar', val: 65, height: '52%' },
    { month: 'Apr', val: 60, height: '48%' },
    { month: 'May', val: 80, height: '68%' },
    { month: 'Jun', val: 128, height: '88%', active: true },
  ];

  return (
    <div className="space-y-5 select-none pb-8">
      {/* Header */}
      <div>
        <h1 className="text-[20px] font-bold text-[#0F1629] tracking-tight">
          Customers Accounts Business Dashboard
        </h1>
        <p className="text-[12px] text-[#7A8299] mt-0.5">
          B2B accounts, bulk orders, and contract management
        </p>
      </div>

      {/* 6 Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5">
        {statCards.map((card, idx) => (
          <Card
            key={idx}
            className="p-3.5 bg-white border border-[#384E85]/7 rounded-[16px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)] flex flex-col justify-between h-[125px]"
          >
            <div className={`w-8 h-8 rounded-[10px] ${card.iconBg} flex items-center justify-center shrink-0`}>
              {card.icon}
            </div>
            <div>
              <div className="text-[20px] font-extrabold text-[#0F1629] leading-none mb-1">
                {card.value}
              </div>
              <div className="text-[10px] text-[#7A8299] font-normal leading-tight">
                {card.label}
              </div>
              <div className={`text-[10px] font-bold mt-1 ${card.badgeColor}`}>
                {card.badge}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Grid: Top Accounts & Monthly Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Top Wholesale Accounts (7 columns on large screens) */}
        <div className="lg:col-span-7">
          <Card className="p-5 bg-white border border-[#384E85]/7 rounded-[20px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)] h-full flex flex-col justify-between">
            <div>
              <h3 className="text-[14px] font-bold text-[#0F1629] mb-3.5">
                Top Wholesale Accounts
              </h3>

              <div className="space-y-2.5">
                {topAccounts.map((acc) => (
                  <div
                    key={acc.rank}
                    className="px-3.5 py-2.5 bg-[#FAFAFA] border border-[#384E85]/6 rounded-[12px] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-[6px] text-[11px] font-bold flex items-center justify-center shrink-0 ${acc.rankBg}`}
                      >
                        {acc.rank}
                      </div>
                      <div>
                        <div className="text-[13px] font-bold text-[#0F1629]">
                          {acc.name}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span
                            className={`px-1.5 py-0.5 rounded-[6px] text-[10px] font-bold ${acc.tierClass}`}
                          >
                            {acc.tier}
                          </span>
                          <span className="text-[10px] text-[#7A8299]">
                            {acc.orders} orders
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[13px] font-extrabold text-[#0F1629]">
                        {acc.amount}
                      </div>
                      <div className="text-[10px] font-bold text-[#10B981]">
                        {acc.trend}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Monthly Wholesale Revenue (5 columns on large screens) */}
        <div className="lg:col-span-5">
          <Card className="p-5 bg-white border border-[#384E85]/7 rounded-[20px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)] h-full flex flex-col justify-between">
            <div>
              <h3 className="text-[14px] font-bold text-[#0F1629]">
                Monthly Wholesale Revenue
              </h3>
              <p className="text-[11px] text-[#7A8299] mb-3">
                USD thousands · 2026
              </p>

              {/* Bar Chart Container with Y-Axis */}
              <div className="relative h-[180px] pt-2 pb-6 px-2 flex items-end">
                {/* Horizontal Gridlines */}
                <div className="absolute inset-x-0 inset-y-6 flex flex-col justify-between pointer-events-none pr-2 pl-10">
                  <div className="border-b border-[#E2E8F0]/60 w-full" />
                  <div className="border-b border-[#E2E8F0]/60 w-full" />
                  <div className="border-b border-[#E2E8F0]/60 w-full" />
                  <div className="border-b border-[#E2E8F0]/60 w-full" />
                </div>

                {/* Y-Axis Labels */}
                <div className="absolute left-0 top-6 bottom-6 flex flex-col justify-between text-[11px] text-[#7A8299] pr-2 pointer-events-none">
                  <span>$140K</span>
                  <span>$105K</span>
                  <span>$70K</span>
                  <span>$35K</span>
                  <span>$0K</span>
                </div>

                {/* Bars */}
                <div className="flex-1 ml-12 h-full flex items-end justify-between gap-3 relative z-10">
                  {chartData.map((b, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full max-w-[28px] bg-[#EEF1F8] rounded-[4px] h-full relative overflow-hidden flex items-end">
                        <div
                          className={`w-full rounded-[4px] transition-all duration-500 ${
                            b.active ? 'bg-[#384E85]' : 'bg-[#D1D5DB]'
                          }`}
                          style={{ height: b.height }}
                        />
                      </div>
                      <span className="text-[11px] font-normal text-[#7A8299]">
                        {b.month}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Summary Boxes */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#F1F5F9]">
              <div className="p-2.5 bg-[#F4F5F8] rounded-[10px] text-center">
                <div className="text-[14px] font-extrabold text-[#384E85]">
                  $128K
                </div>
                <div className="text-[10px] text-[#7A8299] font-normal">
                  MTD Revenue
                </div>
              </div>
              <div className="p-2.5 bg-[#F4F5F8] rounded-[10px] text-center">
                <div className="text-[14px] font-extrabold text-[#10B981]">
                  +16.4%
                </div>
                <div className="text-[10px] text-[#7A8299] font-normal">
                  vs Last Month
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Export Data Button */}
      <div>
        <Button
          variant="outline"
          size="sm"
          className="bg-[#F4F5F8] border-none text-[#4A5568] hover:bg-[#E2E8F0] rounded-[12px] px-3.5 py-2 text-[13px] font-medium"
          leftIcon={<Download className="w-3.5 h-3.5" />}
        >
          Export Data
        </Button>
      </div>
    </div>
  );
};
