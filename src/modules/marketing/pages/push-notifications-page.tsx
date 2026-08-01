import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Bell, 
  Send, 
  Users, 
  Smartphone, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Calendar, 
  Target, 
  Sparkles, 
  ExternalLink,
  MessageSquare,
  Filter
} from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { SendNotificationModal } from '@/shared/components/modals/SendNotificationModal';

interface PushNotificationLog {
  id: string;
  title: string;
  body: string;
  targetSegment: string;
  sentAt: string;
  deliveredCount: number;
  openRate: number;
  ctr: number;
  status: 'sent' | 'scheduled' | 'draft';
}

export const PushNotificationsPage: React.FC = () => {
  const { t } = useTranslation();

  // Modal State
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('🔥 Flash Sale: 30% Off Fresh Vegetables!');
  const [body, setBody] = useState('Enjoy 30% discount on all organic vegetables for the next 4 hours. Use code WEEKEND30 at checkout.');
  const [targetSegment, setTargetSegment] = useState('All Customers (42,891)');
  const [deepLink, setDeepLink] = useState('Offers Page (/marketing/offers)');
  const [sendOption, setSendOption] = useState<'now' | 'scheduled'>('now');
  const [scheduleTime, setScheduleTime] = useState('2026-08-01T18:00');

  // Success Alert State
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // History List
  const [logs, setLogs] = useState<PushNotificationLog[]>([
    {
      id: '1',
      title: '🔥 Flash Sale: 30% Off Fresh Vegetables!',
      body: 'Enjoy 30% discount on all organic vegetables for the next 4 hours. Use code WEEKEND30 at checkout.',
      targetSegment: 'All Customers',
      sentAt: 'Today, 2:30 PM',
      deliveredCount: 41200,
      openRate: 48.2,
      ctr: 19.5,
      status: 'sent'
    },
    {
      id: '2',
      title: '⭐ VIP Exclusive: Free Delivery Weekend',
      body: 'As a valued Rofof VIP member, enjoy zero delivery fees on all orders placed this weekend.',
      targetSegment: 'VIP Members (3,400)',
      sentAt: 'Yesterday, 10:00 AM',
      deliveredCount: 3380,
      openRate: 64.1,
      ctr: 31.8,
      status: 'sent'
    },
    {
      id: '3',
      title: '🛒 We Miss You! Here is $10 Gift Credit',
      body: 'We noticed you havent ordered in a while. Use code WELCOMEBACK for $10 off your next order.',
      targetSegment: 'Inactive Users (30 Days)',
      sentAt: '2 days ago',
      deliveredCount: 8900,
      openRate: 38.5,
      ctr: 14.2,
      status: 'sent'
    },
    {
      id: '4',
      title: '🚚 Peak Demand Alert: High Bonus Rates',
      body: 'High order volume in New Cairo. Complete 5 deliveries between 6 PM - 9 PM for an extra bonus!',
      targetSegment: 'Driver Fleet',
      sentAt: '2026-08-01 18:00 (Scheduled)',
      deliveredCount: 0,
      openRate: 0,
      ctr: 0,
      status: 'scheduled'
    }
  ]);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) return;

    const newLog: PushNotificationLog = {
      id: Date.now().toString(),
      title,
      body,
      targetSegment: targetSegment.split(' ')[0],
      sentAt: sendOption === 'now' ? 'Just now' : `${scheduleTime} (Scheduled)`,
      deliveredCount: sendOption === 'now' ? 42890 : 0,
      openRate: sendOption === 'now' ? 12.4 : 0,
      ctr: sendOption === 'now' ? 4.8 : 0,
      status: sendOption === 'now' ? 'sent' : 'scheduled'
    };

    setLogs([newLog, ...logs]);
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 4000);
  };

  return (
    <div className="space-y-6 select-none pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F1629] tracking-tight">Push Notifications</h1>
          <p className="text-sm text-[#7A8299] mt-0.5">Broadcast targeted alerts, promotional messages, and customer reminders</p>
        </div>
        <Button
          onClick={() => setIsSendModalOpen(true)}
          className="bg-gradient-to-r from-[#2A3A65] to-[#384E85] text-white hover:opacity-95 font-semibold shadow-md gap-2 h-10 px-4 rounded-xl cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span>New Notification Ad</span>
        </Button>
      </div>

      {/* Success Alert Banner */}
      {showSuccessAlert && (
        <div className="bg-[#ECFDF5] border border-[#10B981]/30 rounded-2xl p-4 flex items-center gap-3 text-[#047857] text-xs font-bold animate-in fade-in duration-200 shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />
          <span>Notification broadcast queued successfully! Delivered to target audience.</span>
        </div>
      )}

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 bg-white border border-[#384E85]/8 shadow-sm rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[#7A8299]">Total Sent This Month</p>
              <h3 className="text-2xl font-bold text-[#0F1629] mt-1">128,450</h3>
              <div className="flex items-center gap-1 text-xs text-[#10B981] font-semibold mt-2">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>99.4% delivery rate</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#EEF1F8] text-[#384E85] flex items-center justify-center font-bold">
              <Bell className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-white border border-[#384E85]/8 shadow-sm rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[#7A8299]">Avg. Open Rate</p>
              <h3 className="text-2xl font-bold text-[#0F1629] mt-1">46.8%</h3>
              <div className="flex items-center gap-1 text-xs text-[#10B981] font-semibold mt-2">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+5.2% vs industry avg</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] text-[#10B981] flex items-center justify-center font-bold">
              <MessageSquare className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-white border border-[#384E85]/8 shadow-sm rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[#7A8299]">Click-Through (CTR)</p>
              <h3 className="text-2xl font-bold text-[#0F1629] mt-1">21.4%</h3>
              <div className="flex items-center gap-1 text-xs text-[#384E85] font-semibold mt-2">
                <Target className="w-3.5 h-3.5" />
                <span>High engagement</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#FFFBEB] text-[#D97706] flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-white border border-[#384E85]/8 shadow-sm rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[#7A8299]">Converted Orders</p>
              <h3 className="text-2xl font-bold text-[#0F1629] mt-1">6,840</h3>
              <div className="flex items-center gap-1 text-xs text-[#10B981] font-semibold mt-2">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>$89,200 revenue</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#F5F3FF] text-[#8B5CF6] flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Composer & Live Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Composer Form */}
        <Card className="lg:col-span-7 bg-white border border-[#384E85]/8 shadow-sm rounded-2xl p-6">
          <form onSubmit={handleBroadcast} className="space-y-5">
            <div className="flex items-center gap-2 text-[#384E85] pb-3 border-b border-[#384E85]/8">
              <Send className="w-5 h-5" />
              <h2 className="font-bold text-base text-[#0F1629]">Compose Notification</h2>
            </div>

            {/* Target Audience */}
            <div>
              <label className="text-xs font-bold text-[#0F1629] block mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#384E85]" />
                Target Audience Segment
              </label>
              <select
                value={targetSegment}
                onChange={(e) => setTargetSegment(e.target.value)}
                className="w-full h-11 px-3.5 bg-[#FAFAFA] border border-[#384E85]/12 rounded-xl text-xs text-[#0F1629] font-medium focus:outline-none focus:border-[#384E85] transition"
              >
                <option value="All Customers (42,891)">All Registered Customers (42,891 users)</option>
                <option value="VIP Gold Members (3,400)">VIP Gold &amp; Platinum Members (3,400 users)</option>
                <option value="Inactive Users (30 Days)">Inactive Users &gt; 30 Days (8,900 users)</option>
                <option value="Active Drivers (38)">Online &amp; Active Drivers (38 drivers)</option>
                <option value="New Cairo Residents">Geofence: New Cairo &amp; Tagamoa (12,100 users)</option>
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="text-xs font-bold text-[#0F1629] block mb-1.5">
                Notification Header Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Catchy alert title..."
                className="w-full h-11 px-3.5 bg-[#FAFAFA] border border-[#384E85]/12 rounded-xl text-xs text-[#0F1629] font-semibold focus:outline-none focus:border-[#384E85] transition"
              />
            </div>

            {/* Body */}
            <div>
              <label className="text-xs font-bold text-[#0F1629] block mb-1.5">
                Message Body Content
              </label>
              <textarea
                rows={3}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write compelling notification message..."
                className="w-full p-3.5 bg-[#FAFAFA] border border-[#384E85]/12 rounded-xl text-xs text-[#0F1629] focus:outline-none focus:border-[#384E85] transition resize-none"
              />
            </div>

            {/* Deep Link Navigation Target */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#0F1629] block mb-1.5 flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 text-[#384E85]" />
                  Deep-Link Target
                </label>
                <select
                  value={deepLink}
                  onChange={(e) => setDeepLink(e.target.value)}
                  className="w-full h-11 px-3.5 bg-[#FAFAFA] border border-[#384E85]/12 rounded-xl text-xs text-[#0F1629] focus:outline-none focus:border-[#384E85] transition"
                >
                  <option value="Offers Page (/marketing/offers)">Promotional Offers Page</option>
                  <option value="Fresh Produce Category (/products)">Category: Fresh Vegetables</option>
                  <option value="Cart Reminder Page (/cart)">Cart Checkout Screen</option>
                  <option value="Homepage Hero (/dashboard)">App Homepage</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0F1629] block mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#384E85]" />
                  Dispatch Schedule
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSendOption('now')}
                    className={`flex-1 h-11 rounded-xl text-xs font-bold transition cursor-pointer border ${
                      sendOption === 'now'
                        ? 'bg-[#EEF1F8] border-[#384E85] text-[#384E85]'
                        : 'bg-[#FAFAFA] border-[#384E85]/12 text-[#7A8299]'
                    }`}
                  >
                    Send Now
                  </button>
                  <button
                    type="button"
                    onClick={() => setSendOption('scheduled')}
                    className={`flex-1 h-11 rounded-xl text-xs font-bold transition cursor-pointer border ${
                      sendOption === 'scheduled'
                        ? 'bg-[#FFFBEB] border-[#D97706] text-[#D97706]'
                        : 'bg-[#FAFAFA] border-[#384E85]/12 text-[#7A8299]'
                    }`}
                  >
                    Schedule
                  </button>
                </div>
              </div>
            </div>

            {sendOption === 'scheduled' && (
              <div className="animate-in fade-in duration-150">
                <label className="text-xs font-bold text-[#0F1629] block mb-1">Pick Date &amp; Time</label>
                <input
                  type="datetime-local"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full h-11 px-3.5 bg-[#FAFAFA] border border-[#384E85]/12 rounded-xl text-xs text-[#0F1629] focus:outline-none"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex justify-end gap-3">
              <Button
                type="submit"
                className="h-11 px-6 rounded-xl bg-gradient-to-r from-[#2A3A65] to-[#384E85] text-white font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{sendOption === 'now' ? 'Broadcast Notification Now' : 'Schedule Broadcast'}</span>
              </Button>
            </div>
          </form>
        </Card>

        {/* Right Column: Mobile Live Device Preview */}
        <Card className="lg:col-span-5 bg-gradient-to-b from-[#1E293B] to-[#0F172A] text-white border-none shadow-xl rounded-3xl p-6 flex flex-col items-center justify-between relative overflow-hidden">
          <div className="w-full flex items-center justify-between text-xs text-white/60 mb-4">
            <span className="font-semibold flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-[#10B981]" /> Live Mobile Device Preview
            </span>
            <span className="bg-white/10 px-2.5 py-0.5 rounded-full text-[10px] font-mono">iOS / Android</span>
          </div>

          {/* Smartphone Frame Mockup */}
          <div className="w-full max-w-[300px] bg-slate-900 border-4 border-slate-700/60 rounded-[36px] p-4 shadow-2xl space-y-4 my-2 relative">
            {/* Notch */}
            <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-2 flex items-center justify-center">
              <div className="w-3 h-3 bg-slate-900 rounded-full" />
            </div>

            {/* App Header Status */}
            <div className="flex justify-between items-center text-[10px] text-slate-400 px-1 font-mono">
              <span>9:41</span>
              <span>5G ⚡ 100%</span>
            </div>

            {/* Notification Banner Overlay */}
            <div className="bg-white/95 backdrop-blur-md text-[#0F1629] p-3.5 rounded-2xl shadow-xl space-y-1.5 border border-white/40 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#384E85] text-white flex items-center justify-center text-[10px] font-bold">
                    R
                  </div>
                  <span className="font-bold text-[11px] text-[#0F1629]">Rofof Grocery</span>
                </div>
                <span className="text-[9px] text-[#7A8299]">now</span>
              </div>

              <div className="font-bold text-xs leading-snug text-[#0F1629]">
                {title || 'Notification Header Title'}
              </div>

              <p className="text-[11px] text-[#4A5568] leading-tight line-clamp-3">
                {body || 'Your message description will appear here as the user sees it on their phone screen.'}
              </p>

              <div className="pt-1 flex items-center justify-between text-[9.5px] font-bold text-[#384E85]">
                <span>Tap to open {deepLink.split(' ')[0]}</span>
                <span>→</span>
              </div>
            </div>

            {/* App Mock Content Background */}
            <div className="h-44 bg-slate-800/40 rounded-xl p-3 space-y-2 border border-slate-700/30">
              <div className="h-3 bg-slate-700/50 rounded-full w-2/3" />
              <div className="h-3 bg-slate-700/30 rounded-full w-full" />
              <div className="h-20 bg-slate-700/20 rounded-lg w-full flex items-center justify-center text-slate-500 text-[10px]">
                [App Homepage Screen]
              </div>
            </div>

            {/* Home Indicator */}
            <div className="w-24 h-1 bg-slate-600 rounded-full mx-auto mt-2" />
          </div>

          <div className="w-full text-center text-[11px] text-white/50 pt-2">
            Targeting: <strong className="text-white">{targetSegment}</strong>
          </div>
        </Card>
      </div>

      {/* Campaign Broadcast Log Table */}
      <Card className="bg-white border border-[#384E85]/8 shadow-sm rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-[#384E85]/8 bg-[#FAFAFA] flex items-center justify-between">
          <h3 className="font-bold text-sm text-[#0F1629]">Recent Broadcast History</h3>
          <span className="text-xs text-[#7A8299]">Showing last {logs.length} notifications</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-[#384E85]/8 text-[11px] font-bold text-[#7A8299] uppercase tracking-wider">
                <th className="py-3.5 px-5">Notification Title &amp; Body</th>
                <th className="py-3.5 px-5">Audience Segment</th>
                <th className="py-3.5 px-5">Delivered</th>
                <th className="py-3.5 px-5">Open Rate</th>
                <th className="py-3.5 px-5">CTR %</th>
                <th className="py-3.5 px-5">Dispatch Date</th>
                <th className="py-3.5 px-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#384E85]/6 text-xs text-[#0F1629]">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-[#EEF1F8]/30 transition">
                  <td className="py-4 px-5">
                    <div className="font-bold text-[#0F1629]">{log.title}</div>
                    <div className="text-[10.5px] text-[#7A8299] mt-0.5 line-clamp-1 max-w-md">{log.body}</div>
                  </td>

                  <td className="py-4 px-5 font-semibold text-[#384E85]">
                    {log.targetSegment}
                  </td>

                  <td className="py-4 px-5 font-bold">
                    {log.deliveredCount > 0 ? log.deliveredCount.toLocaleString() : '-'}
                  </td>

                  <td className="py-4 px-5 font-semibold text-[#10B981]">
                    {log.openRate > 0 ? `${log.openRate}%` : '-'}
                  </td>

                  <td className="py-4 px-5 font-semibold text-[#D97706]">
                    {log.ctr > 0 ? `${log.ctr}%` : '-'}
                  </td>

                  <td className="py-4 px-5 text-[#7A8299] text-[11px]">
                    {log.sentAt}
                  </td>

                  <td className="py-4 px-5 text-right">
                    {log.status === 'sent' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#ECFDF5] text-[#10B981]">
                        <CheckCircle2 className="w-3 h-3" /> Broadcasted
                      </span>
                    )}
                    {log.status === 'scheduled' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#FFFBEB] text-[#D97706]">
                        <Clock className="w-3 h-3" /> Scheduled
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      {/* Send Notification / Ad Modal (Figma Design 1:42888) */}
      <SendNotificationModal
        isOpen={isSendModalOpen}
        onClose={() => setIsSendModalOpen(false)}
        onNotificationSent={(newNotif) => setLogs([newNotif, ...logs])}
      />
    </div>
  );
};
