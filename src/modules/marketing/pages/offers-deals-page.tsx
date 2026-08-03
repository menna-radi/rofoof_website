import React, { useState } from 'react';
import { 
  Megaphone, 
  Tag, 
  Zap, 
  Bell, 
  Users, 
  Star, 
  Plus, 
  Download 
} from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { ExportDataModal } from '@/shared/components/modals/ExportDataModal';

interface CampaignItem {
  id: string;
  title: string;
  type: string;
  reach: string;
  revenue: string;
  cvr: string;
  cvrColor: string;
  status: 'Active' | 'Ending Soon';
  badgeBg: string;
  badgeText: string;
  iconBg: string;
  iconColor: string;
}

export const OffersDealsPage: React.FC = () => {
  const [exportOpen, setExportOpen] = useState(false);
  const campaignItems: CampaignItem[] = [
    {
      id: 'c1',
      title: 'Summer Freshness Sale',
      type: 'Flash Deal',
      reach: '12.4K reach',
      revenue: '$24,800',
      cvr: '8.2% CVR',
      cvrColor: 'text-[#10B981]',
      status: 'Active',
      badgeBg: 'bg-[#ECFDF5]',
      badgeText: 'text-[#10B981]',
      iconBg: 'bg-[#ECFDF5]',
      iconColor: 'text-[#10B981]'
    },
    {
      id: 'c2',
      title: 'Wholesale Partner Discount',
      type: 'Offer',
      reach: '840 reach',
      revenue: '$68,400',
      cvr: '34.5% CVR',
      cvrColor: 'text-[#384E85]',
      status: 'Active',
      badgeBg: 'bg-[#ECFDF5]',
      badgeText: 'text-[#10B981]',
      iconBg: 'bg-[#EEF1F8]',
      iconColor: 'text-[#384E85]'
    },
    {
      id: 'c3',
      title: 'Weekend Bakery Deal',
      type: 'Flash Deal',
      reach: '5.2K reach',
      revenue: '$8,200',
      cvr: '11.4% CVR',
      cvrColor: 'text-[#F59E0B]',
      status: 'Ending Soon',
      badgeBg: 'bg-[#FFFBEB]',
      badgeText: 'text-[#F59E0B]',
      iconBg: 'bg-[#FFFBEB]',
      iconColor: 'text-[#F59E0B]'
    },
    {
      id: 'c4',
      title: 'Loyalty Points 2x',
      type: 'Loyalty',
      reach: '28K reach',
      revenue: '$41,000',
      cvr: '22.1% CVR',
      cvrColor: 'text-[#8B5CF6]',
      status: 'Active',
      badgeBg: 'bg-[#ECFDF5]',
      badgeText: 'text-[#10B981]',
      iconBg: 'bg-[#F5F3FF]',
      iconColor: 'text-[#8B5CF6]'
    }
  ];

  return (
    <div className="space-y-6 select-none pb-12">
      {/* Top Header & Send Notification Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[20px] font-bold text-[#0F1629] tracking-tight">Marketing Performance</h1>
          <p className="text-[12px] text-[#7A8299] mt-0.5">Campaign analytics, coupon usage, and customer engagement</p>
        </div>
        <button 
          className="bg-[#384E85] hover:bg-[#2A3A65] text-white font-semibold shadow-xs flex items-center gap-2 h-9 px-4 rounded-xl cursor-pointer text-xs border-none transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Send notification</span>
        </button>
      </div>

      {/* 6 Stat KPI Cards Horizontal Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Card 1: Active Campaigns */}
        <Card className="p-3.5 bg-white border border-[#384E85]/7 rounded-[16px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)] flex flex-col justify-between h-[125px]">
          <div className="w-8 h-8 rounded-[10px] bg-[#EEF1F8] text-[#384E85] flex items-center justify-center font-bold shrink-0">
            <Megaphone className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[20px] font-extrabold text-[#0F1629] leading-tight">8</div>
            <div className="text-[10px] font-normal text-[#7A8299] mt-0.5">Active Campaigns</div>
            <div className="text-[10px] font-semibold text-[#384E85] mt-0.5">2 ending today</div>
          </div>
        </Card>

        {/* Card 2: Coupon Redemptions */}
        <Card className="p-3.5 bg-white border border-[#384E85]/7 rounded-[16px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)] flex flex-col justify-between h-[125px]">
          <div className="w-8 h-8 rounded-[10px] bg-[#ECFDF5] text-[#10B981] flex items-center justify-center font-bold shrink-0">
            <Tag className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[20px] font-extrabold text-[#0F1629] leading-tight">1,248</div>
            <div className="text-[10px] font-normal text-[#7A8299] mt-0.5">Coupon Redemptions</div>
            <div className="text-[10px] font-semibold text-[#10B981] mt-0.5">+18% this week</div>
          </div>
        </Card>

        {/* Card 3: Flash Deal Sales */}
        <Card className="p-3.5 bg-white border border-[#384E85]/7 rounded-[16px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)] flex flex-col justify-between h-[125px]">
          <div className="w-8 h-8 rounded-[10px] bg-[#FFFBEB] text-[#F59E0B] flex items-center justify-center font-bold shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[20px] font-extrabold text-[#0F1629] leading-tight">$33K</div>
            <div className="text-[10px] font-normal text-[#7A8299] mt-0.5">Flash Deal Sales</div>
            <div className="text-[10px] font-semibold text-[#F59E0B] mt-0.5">3 deals active</div>
          </div>
        </Card>

        {/* Card 4: Push Sent Today */}
        <Card className="p-3.5 bg-white border border-[#384E85]/7 rounded-[16px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)] flex flex-col justify-between h-[125px]">
          <div className="w-8 h-8 rounded-[10px] bg-[#F5F3FF] text-[#8B5CF6] flex items-center justify-center font-bold shrink-0">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[20px] font-extrabold text-[#0F1629] leading-tight">48.2K</div>
            <div className="text-[10px] font-normal text-[#7A8299] mt-0.5">Push Sent Today</div>
            <div className="text-[10px] font-semibold text-[#8B5CF6] mt-0.5">22.4% open rate</div>
          </div>
        </Card>

        {/* Card 5: Customer Retention */}
        <Card className="p-3.5 bg-white border border-[#384E85]/7 rounded-[16px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)] flex flex-col justify-between h-[125px]">
          <div className="w-8 h-8 rounded-[10px] bg-[#ECFEFF] text-[#06B6D4] flex items-center justify-center font-bold shrink-0">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[20px] font-extrabold text-[#0F1629] leading-tight">78.4%</div>
            <div className="text-[10px] font-normal text-[#7A8299] mt-0.5">Customer Retention</div>
            <div className="text-[10px] font-semibold text-[#06B6D4] mt-0.5">+3.2% vs last mo</div>
          </div>
        </Card>

        {/* Card 6: Loyalty Members */}
        <Card className="p-3.5 bg-white border border-[#384E85]/7 rounded-[16px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)] flex flex-col justify-between h-[125px]">
          <div className="w-8 h-8 rounded-[10px] bg-[#FFF7ED] text-[#F97316] flex items-center justify-center font-bold shrink-0">
            <Star className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[20px] font-extrabold text-[#0F1629] leading-tight">18,420</div>
            <div className="text-[10px] font-normal text-[#7A8299] mt-0.5">Loyalty Members</div>
            <div className="text-[10px] font-semibold text-[#F97316] mt-0.5">842 new this week</div>
          </div>
        </Card>
      </div>

      {/* 2-Column Section: Active Campaigns (Left) & Push Notification Analytics (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Active Campaigns */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="p-5 bg-white border border-[#384E85]/7 rounded-[20px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)] flex flex-col justify-between h-[360px]">
            <h3 className="text-[14px] font-bold text-[#0F1629] pb-1 border-b border-[#F3F4F6]">
              Active Campaigns
            </h3>

            <div className="space-y-2.5 flex-1 flex flex-col justify-between pt-2">
              {campaignItems.map((c) => (
                <div 
                  key={c.id} 
                  className="p-3 bg-[#FAFAFA] border border-[#384E85]/6 rounded-[16px] flex items-center justify-between gap-3 hover:bg-[#EEF1F8]/40 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-[10px] ${c.iconBg} ${c.iconColor} flex items-center justify-center font-bold shrink-0`}>
                      <Megaphone className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-[13px] text-[#0F1629] truncate">{c.title}</div>
                      <div className="text-[10.5px] text-[#7A8299] flex items-center gap-1.5 mt-0.5">
                        <span>{c.type}</span>
                        <span>·</span>
                        <span>{c.reach}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <div className="font-bold text-[13px] text-[#0F1629]">{c.revenue}</div>
                      <div className={`text-[10.5px] font-semibold ${c.cvrColor}`}>{c.cvr}</div>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-[8px] text-[10.5px] font-bold ${c.badgeBg} ${c.badgeText}`}>
                      {c.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Export Data Button */}
          <div>
            <button onClick={() => setExportOpen(true)} className="h-9 px-4 bg-[#F4F5F8] hover:bg-[#EEF1F8] text-[#4A5568] text-[12px] font-semibold rounded-[12px] flex items-center justify-center gap-1.5 cursor-pointer transition border-none shadow-2xs">
              <Download className="w-3.5 h-3.5 text-[#4A5568]" />
              <span>Export Data</span>
            </button>
          </div>
          <ExportDataModal isOpen={exportOpen} onClose={() => setExportOpen(false)} pageName="Offers & Deals" />
        </div>

        {/* Right Column: Push Notification Analytics */}
        <div className="lg:col-span-5">
          <Card className="p-5 bg-white border border-[#384E85]/7 rounded-[20px] shadow-[0px_8px_15px_rgba(0,0,0,0.06)] flex flex-col justify-between h-[360px]">
            <div>
              <h3 className="text-[14px] font-bold text-[#0F1629]">Push Notification Analytics</h3>
              <p className="text-[11px] text-[#7A8299] mt-0.5">Sent vs Opened · Last 14 days</p>
            </div>

            {/* Smooth Double Line Chart */}
            <div className="relative w-full h-[180px] bg-[#FAFAFA] border border-[#384E85]/6 rounded-[16px] p-3 flex flex-col justify-end overflow-hidden">
              <svg className="w-full h-[130px] overflow-visible" viewBox="0 0 400 130" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradSent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#CBD5E0" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#CBD5E0" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="gradOpened" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#384E85" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#384E85" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Sent Line (Light Gray) */}
                <path
                  d="M 0,90 Q 50,40 100,60 T 200,45 T 300,70 T 400,35 L 400,130 L 0,130 Z"
                  fill="url(#gradSent)"
                />
                <path
                  d="M 0,90 Q 50,40 100,60 T 200,45 T 300,70 T 400,35"
                  fill="none"
                  stroke="#CBD5E0"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Opened Line (Navy Blue) */}
                <path
                  d="M 0,105 Q 50,75 100,90 T 200,70 T 300,95 T 400,60 L 400,130 L 0,130 Z"
                  fill="url(#gradOpened)"
                />
                <path
                  d="M 0,105 Q 50,75 100,90 T 200,70 T 300,95 T 400,60"
                  fill="none"
                  stroke="#384E85"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* 3 Metrics Row */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#F3F4F6]">
              <div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#7A8299]">
                  <span className="w-2 h-2 rounded-[2px] bg-[#CBD5E0] inline-block" />
                  <span>Avg Sent/day</span>
                </div>
                <div className="text-[16px] font-extrabold text-[#7A8299] mt-0.5">3,440</div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#7A8299]">
                  <span className="w-2 h-2 rounded-[2px] bg-[#384E85] inline-block" />
                  <span>Avg Opened/day</span>
                </div>
                <div className="text-[16px] font-extrabold text-[#384E85] mt-0.5">1,180</div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#7A8299]">
                  <span className="w-2 h-2 rounded-[2px] bg-[#10B981] inline-block" />
                  <span>Open Rate</span>
                </div>
                <div className="text-[16px] font-extrabold text-[#10B981] mt-0.5">34.3%</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
