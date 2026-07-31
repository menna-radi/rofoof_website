import React, { useState } from 'react';
import { X, ShoppingBag, Truck, AlertTriangle, UserPlus, CheckCircle2, Trash2 } from 'lucide-react';

interface NotificationItem {
  id: string;
  type: 'order' | 'driver' | 'stock' | 'customer';
  title: string;
  description: string;
  time: string;
  urgent: boolean;
  read: boolean;
  dotColor: string;
}

interface NotificationPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationPopover: React.FC<NotificationPopoverProps> = ({ isOpen, onClose }) => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: 'n1', type: 'order', title: 'New order received', description: 'ORD-8832 — FreshMart HQ — $6,200', time: 'Just now', urgent: false, read: false, dotColor: '#384E85' },
    { id: 'n2', type: 'driver', title: 'Driver arrived', description: 'Ahmed Khalil reached Metro Grocers', time: '2 min ago', urgent: false, read: false, dotColor: '#8B5CF6' },
    { id: 'n3', type: 'stock', title: 'Low stock warning', description: 'Organic Milk 2L — only 8 units left', time: '5 min ago', urgent: true, read: false, dotColor: '#F97316' },
    { id: 'n4', type: 'customer', title: 'New customer registered', description: 'QuickBite Café — Wholesale account', time: '14 min ago', urgent: false, read: true, dotColor: '#10B981' },
    { id: 'n5', type: 'order', title: 'Order delivered', description: 'ORD-8826 — QuickBite Café — $340', time: '18 min ago', urgent: false, read: false, dotColor: '#384E85' },
    { id: 'n6', type: 'stock', title: 'Out of stock alert', description: 'Avocados (net 6) — 0 units remaining', time: '1h ago', urgent: true, read: true, dotColor: '#F97316' },
    { id: 'n7', type: 'driver', title: 'Driver on break', description: 'James R. — paused deliveries — 30 min', time: '1.5h ago', urgent: false, read: true, dotColor: '#8B5CF6' },
    { id: 'n8', type: 'customer', title: 'Account upgraded', description: 'Sunrise Wholesale → Gold tier', time: '2h ago', urgent: false, read: true, dotColor: '#10B981' },
  ]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = filter === 'unread' ? notifications.filter(n => !n.read) : notifications;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const dismissItem = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'order': return <ShoppingBag className="w-4 h-4 text-[#384E85]" />;
      case 'driver': return <Truck className="w-4 h-4 text-[#8B5CF6]" />;
      case 'stock': return <AlertTriangle className="w-4 h-4 text-[#F97316]" />;
      case 'customer': return <UserPlus className="w-4 h-4 text-[#10B981]" />;
      default: return <ShoppingBag className="w-4 h-4 text-[#384E85]" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'order': return 'bg-[#EEF1F8]';
      case 'driver': return 'bg-[#F5F3FF]';
      case 'stock': return 'bg-[#FFF7ED]';
      case 'customer': return 'bg-[#ECFDF5]';
      default: return 'bg-[#EEF1F8]';
    }
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div className="fixed inset-0 z-40 bg-black/10" onClick={onClose} />

      {/* Popover Card */}
      <div className="fixed top-[60px] right-6 z-50 w-[400px] max-h-[540px] bg-white rounded-[14px] shadow-[0_12px_40px_rgba(0,0,0,0.18)] border border-[#384E85]/10 flex flex-col overflow-hidden animate-fadeIn font-sans text-left">
        {/* Header */}
        <div className="p-[16px_18px_12px] border-b border-[#F0F0F0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[16px] font-bold text-[#111111]">Notifications</span>
            <span className="bg-[#EF4444] text-white text-[11px] font-bold min-w-[20px] h-[20px] rounded-[10px] flex items-center justify-center px-1.5">
              {unreadCount}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllRead}
              className="text-[12px] text-[#384E85] hover:bg-[#F0F2F8] font-semibold px-2 py-1 rounded-[6px] transition cursor-pointer border-none bg-none"
            >
              Mark all as read
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full text-[#888888] hover:bg-[#F0F0F0] hover:text-[#333333] flex items-center justify-center transition cursor-pointer border-none bg-none"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex border-b border-[#F0F0F0] px-[18px]">
          <button
            onClick={() => setFilter('all')}
            className={`py-2.5 px-3.5 text-[13px] font-medium transition relative cursor-pointer border-none bg-none ${
              filter === 'all' ? 'text-[#384E85] font-bold border-b-2 border-[#384E85]' : 'text-[#888888] hover:text-[#555555]'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`py-2.5 px-3.5 text-[13px] font-medium transition relative cursor-pointer border-none bg-none ${
              filter === 'unread' ? 'text-[#384E85] font-bold border-b-2 border-[#384E85]' : 'text-[#888888] hover:text-[#555555]'
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto max-h-[380px] divide-y divide-[#F0F0F0]">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center text-[#888888]">
              <div className="text-[32px] mb-2">🔔</div>
              <div className="text-[15px] font-bold text-[#111111]">All caught up!</div>
              <div className="text-[12px]">No notifications right now</div>
            </div>
          ) : (
            filteredNotifications.map((n) => (
              <div
                key={n.id}
                className={`p-[12px_18px] flex items-start gap-3 relative transition hover:bg-[#F8F9FC] ${
                  !n.read ? 'bg-[#F4F6FB]' : 'bg-white'
                }`}
              >
                {/* Left Indicator Strip */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ backgroundColor: n.dotColor }} />

                <div className={`w-[36px] h-[36px] rounded-[10px] flex items-center justify-center shrink-0 ${getIconBg(n.type)}`}>
                  {getIcon(n.type)}
                </div>

                <div className="flex-1 min-w-0">
                  {n.urgent && (
                    <div className="mb-1">
                      <span className="text-[9px] font-bold text-[#EF4444] bg-[#FEF2F2] px-1.5 py-0.5 rounded tracking-wide">
                        URGENT
                      </span>
                    </div>
                  )}
                  <div className="text-[13px] font-semibold text-[#111111] leading-tight">{n.title}</div>
                  <div className="text-[12px] text-[#666666] truncate mt-0.5">{n.description}</div>
                  <div className="text-[11px] text-[#AAAAAA] mt-1">{n.time}</div>
                </div>

                {!n.read && (
                  <div className="w-2 h-2 rounded-full bg-[#384E85] shrink-0 mt-3" />
                )}

                <button
                  onClick={() => dismissItem(n.id)}
                  className="w-5 h-5 rounded-full hover:bg-[#F0F0F0] text-[#BBBBBB] hover:text-[#666666] flex items-center justify-center transition cursor-pointer border-none bg-none ml-1 opacity-0 hover:opacity-100 group-hover:opacity-100"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-[10px_18px] border-t border-[#F0F0F0] flex justify-center bg-[#FAFAFA]">
          <button
            onClick={clearAll}
            className="text-[12px] text-[#EF4444] hover:bg-[#FEF2F2] font-semibold px-3 py-1.5 rounded-[6px] transition cursor-pointer border-none bg-none"
          >
            Clear All
          </button>
        </div>
      </div>
    </>
  );
};
