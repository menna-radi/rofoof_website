import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Boxes, 
  Users, 
  Truck, 
  Clock, 
  PieChart, 
  Settings, 
  ChevronRight, 
  Tag, 
  Bell, 
  Megaphone,
  UserCheck, 
  User,
  Clock as ClockIcon
} from 'lucide-react';
import { cn } from '@/core/utils/cn';

interface SidebarProps {
  onOpenAddProduct?: () => void;
  onOpenCreateOffer?: () => void;
  onOpenCreateOrder?: () => void;
  onOpenAddDriver?: () => void;
  onOpenNotification?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onOpenAddProduct,
  onOpenCreateOffer,
  onOpenCreateOrder,
  onOpenAddDriver,
  onOpenNotification
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: LayoutDashboard, href: '/dashboard' },
    {
      id: 'orders',
      label: t('nav.orders'),
      icon: ShoppingBag,
      href: '/orders',
      children: [
        { id: 'all-orders', label: t('nav.allOrders'), href: '/orders' },
        { id: 'active-orders', label: t('nav.activeOrders'), href: '/orders?tab=active', badge: '184', badgeClass: 'bg-[#FEF2F2] text-[#EF4444]' },
        { id: 'delivered', label: t('nav.delivered'), href: '/orders?tab=delivered' },
        { id: 'cancelled', label: t('nav.cancelled'), href: '/orders?tab=cancelled' }
      ]
    },
    {
      id: 'products',
      label: t('nav.products'),
      icon: Package,
      href: '/products',
      children: [
        { id: 'product-list', label: t('nav.productList'), href: '/products' },
        { id: 'categories', label: t('nav.categories'), href: '/categories' }
      ]
    },
    {
      id: 'inventory',
      label: t('nav.inventory'),
      icon: Boxes,
      href: '/stock-overview',
      children: [
        { id: 'stock-overview', label: t('nav.stockOverview'), href: '/stock-overview' },
        { id: 'low-stock', label: t('nav.lowStock'), href: '/stock-overview?tab=low', badge: '12', badgeClass: 'bg-[#FFFBEB] text-[#D97706]' },
        { id: 'out-of-stock', label: t('nav.outOfStock'), href: '/stock-overview?tab=out', badge: '3', badgeClass: 'bg-[#FEF2F2] text-[#EF4444]' }
      ]
    },
    {
      id: 'customers',
      label: t('nav.customers'),
      icon: Users,
      href: '/customers',
      children: [
        { id: 'customer-accounts', label: t('nav.customerAccounts'), href: '/customers' }
      ]
    },
    {
      id: 'drivers',
      label: t('nav.drivers'),
      icon: Truck,
      href: '/drivers',
      children: [
        { id: 'driver-fleet', label: t('nav.driverFleet'), href: '/drivers' },
        { id: 'live-tracking', label: t('nav.liveTracking'), href: '/live-tracking' }
      ]
    },
    {
      id: 'dispatch',
      label: t('nav.dispatch'),
      icon: Clock,
      href: '/dispatch-board',
      children: [
        { id: 'dispatch-board', label: t('nav.dispatchBoard'), href: '/dispatch-board' },
        { id: 'assignment-queue', label: t('nav.assignmentQueue'), href: '/dispatch-board?tab=queue', badge: '7', badgeClass: 'bg-[#ECFDF5] text-[#10B981]' }
      ]
    },
    {
      id: 'marketing',
      label: t('nav.marketing'),
      icon: Megaphone,
      href: '/marketing/offers',
      children: [
        { id: 'offers-deals', label: t('nav.offersDeals'), href: '/marketing/offers' },
        { id: 'push-notifications', label: t('nav.pushNotifications'), href: '/marketing/notifications' }
      ]
    },
    { id: 'analytics', label: t('nav.analytics'), icon: PieChart, href: '/analytics' },
    { id: 'settings', label: t('nav.settings'), icon: Settings, href: '/settings' }
  ];

  const getActiveParentId = () => {
    const currentPath = location.pathname;
    for (const item of navItems) {
      if (item.href && currentPath === item.href) return item.id;
      if (item.children) {
        for (const child of item.children) {
          const childBasePath = child.href.split('?')[0];
          if (currentPath === childBasePath) return item.id;
        }
      }
    }
    return 'dispatch';
  };

  const [expandedSub, setExpandedSub] = useState<string | null>(getActiveParentId());

  useEffect(() => {
    const activeId = getActiveParentId();
    if (activeId) setExpandedSub(activeId);
  }, [location.pathname]);

  return (
    <aside className="w-[252px] min-w-[252px] h-screen bg-white border-r border-[#384E85]/8 shadow-[2px_0px_20px_rgba(0,0,0,0.04)] flex flex-col sticky top-0 z-30 select-none overflow-y-auto overflow-x-hidden">
      {/* Sidebar Logo */}
      <div className="flex items-center gap-2.5 px-[18px] pt-[20px] pb-[16px] min-h-[73px] border-b border-[#384E85]/8">
        <img src="/img/logo.png" alt="Rofof" className="w-[36px] h-[36px] object-contain rounded-[10px]" />
        <div>
          <div className="text-[14px] font-bold text-[#0F1629] tracking-tight leading-none">Rofof</div>
          <div className="text-[10px] font-medium text-[#7A8299] mt-[2px]">Grocery &amp; Delivery</div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="px-[14px] py-[8px] border-b border-[#384E85]/8">
        <button
          onClick={() => setQuickActionsOpen(!quickActionsOpen)}
          className="w-full h-[35px] px-[12px] gap-[7px] rounded-[11px] bg-gradient-to-r from-[#2A3A65] to-[#384E85] text-white font-bold text-[12.5px] flex items-center justify-center shadow-[0px_4px_14px_rgba(56,78,133,0.3)] cursor-pointer hover:opacity-95 transition"
        >
          <ClockIcon className="w-3.5 h-3.5" />
          <span>{t('nav.quickActions')}</span>
        </button>

        {quickActionsOpen && (
          <div className="mt-[6px] bg-[#FAFAFA] rounded-[12px] shadow-[0px_8px_24px_rgba(0,0,0,0.07)] overflow-hidden">
            <button onClick={onOpenAddProduct} className="w-full h-[45px] px-[13px] gap-[9px] flex items-center border-b border-[#384E85]/6 text-[12.5px] font-medium text-[#0F1629] hover:bg-[#384E85]/4 transition cursor-pointer text-left">
              <span className="w-[26px] h-[26px] rounded-[7px] bg-[#EEF1F8] text-[#384E85] flex items-center justify-center"><Package className="w-3.5 h-3.5" /></span>
              {t('common.addProduct')}
            </button>
            <button onClick={onOpenCreateOffer} className="w-full h-[45px] px-[13px] gap-[9px] flex items-center border-b border-[#384E85]/6 text-[12.5px] font-medium text-[#0F1629] hover:bg-[#384E85]/4 transition cursor-pointer text-left">
              <span className="w-[26px] h-[26px] rounded-[7px] bg-[#ECFDF5] text-[#10B981] flex items-center justify-center"><Tag className="w-3.5 h-3.5" /></span>
              {t('common.createOffer')}
            </button>
            <button onClick={onOpenCreateOrder} className="w-full h-[45px] px-[13px] gap-[9px] flex items-center border-b border-[#384E85]/6 text-[12.5px] font-medium text-[#0F1629] hover:bg-[#384E85]/4 transition cursor-pointer text-left">
              <span className="w-[26px] h-[26px] rounded-[7px] bg-[#FFFBEB] text-[#F59E0B] flex items-center justify-center"><ShoppingBag className="w-3.5 h-3.5" /></span>
              {t('common.createOrder')}
            </button>
            <button onClick={onOpenAddDriver} className="w-full h-[45px] px-[13px] gap-[9px] flex items-center border-b border-[#384E85]/6 text-[12.5px] font-medium text-[#0F1629] hover:bg-[#384E85]/4 transition cursor-pointer text-left">
              <span className="w-[26px] h-[26px] rounded-[7px] bg-[#F5F3FF] text-[#8B5CF6] flex items-center justify-center"><UserCheck className="w-3.5 h-3.5" /></span>
              {t('common.addDriver')}
            </button>
            <button onClick={onOpenNotification} className="w-full h-[45px] px-[13px] gap-[9px] flex items-center text-[12.5px] font-medium text-[#0F1629] hover:bg-[#384E85]/4 transition cursor-pointer text-left">
              <span className="w-[26px] h-[26px] rounded-[7px] bg-[#FFF7ED] text-[#F97316] flex items-center justify-center"><Bell className="w-3.5 h-3.5" /></span>
              {t('common.sendNotification')}
            </button>
          </div>
        )}
      </div>

      {/* Main Navigation Section */}
      <div className="flex-1 px-[10px] pt-[2px] pb-[12px] flex flex-col">
        <div className="text-[9.5px] font-bold text-[#7A8299] uppercase tracking-[0.8px] px-[8px] pt-[8px] pb-[4px]">Navigation</div>
        
        <div className="flex flex-col gap-[2px]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedSub === item.id;
            const isActive = location.pathname.startsWith(item.href) || (hasChildren && item.children?.some(c => location.pathname === c.href.split('?')[0]));

            return (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (hasChildren) {
                      setExpandedSub(isExpanded ? null : item.id);
                    }
                    navigate(item.href);
                  }}
                  className={cn(
                    "w-full flex items-center gap-[9px] px-[9px] py-[7px] rounded-[10px] text-[13px] transition duration-150 cursor-pointer text-left border-none bg-none font-medium",
                    isActive
                      ? "bg-[#EEF1F8] text-[#384E85] font-semibold"
                      : "text-[#4A5568] hover:bg-[#EEF1F8] hover:text-[#0F1629]"
                  )}
                >
                  <Icon className="w-[16px] h-[16px] shrink-0" />
                  <span>{item.label}</span>
                  {hasChildren && (
                    <ChevronRight className={cn("w-[14px] h-[14px] ml-auto transition-transform duration-200", isExpanded && "rotate-90")} />
                  )}
                </button>

                {hasChildren && isExpanded && (
                  <div className="pl-[26px] flex flex-col gap-[1px] mt-[1px]">
                    {item.children.map((child) => {
                      const fullCurrent = location.pathname + location.search;
                      const isChildActive = child.href === '/orders'
                        ? (location.pathname === '/orders' && (!location.search || location.search === '?tab=all'))
                        : fullCurrent === child.href;

                      return (
                        <button
                          key={child.id}
                          onClick={() => navigate(child.href)}
                          className={cn(
                            "w-[205px] flex items-center gap-[8px] px-[9px] py-[6px] rounded-[8px] text-[12.5px] transition cursor-pointer text-left border-none bg-none font-sans",
                            isChildActive
                              ? "bg-[#EEF1F8] text-[#384E85] font-semibold"
                              : "text-[#6B7280] hover:bg-[#EEF1F8] hover:text-[#0F1629]"
                          )}
                        >
                          <span className={cn("w-[5px] h-[5px] rounded-[2.5px] shrink-0", isChildActive ? "bg-[#384E85]" : "bg-[#CBD5E0]")} />
                          <span className="flex-1 truncate">{child.label}</span>
                          {child.badge && (
                            <span className={cn("ml-auto px-[6px] py-[1px] rounded-[8px] text-[9.5px] font-bold shrink-0", child.badgeClass || "bg-[#FEF2F2] text-[#EF4444]")}>
                              {child.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sidebar Profile Card Footer */}
      <div className="mt-auto p-[10px_14px] border-t border-[#384E85]/8 bg-[#FAFAFA]">
        <div className="bg-white border border-[#384E85]/8 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] rounded-[14px] p-[11px_13px]">
          <div className="flex items-center gap-[9px] mb-[10px]">
            <div className="relative">
              <div className="w-[36px] h-[36px] rounded-[11px] bg-gradient-to-br from-[#384E85] to-[#6B8ED4] text-white flex items-center justify-center font-bold text-[12px]">
                AK
              </div>
              <div className="w-[9px] h-[9px] rounded-[4.5px] bg-[#10B981] border-2 border-white absolute -bottom-[1px] -right-[2px]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-[12.5px] text-[#0F1629] truncate">{t('common.adminUser')}</div>
              <div className="inline-block bg-[#EEF1F8] rounded-[5px] px-[6px] py-[1px] text-[10px] font-semibold text-[#384E85] mt-[2px]">
                {t('common.superAdmin')}
              </div>
            </div>
            <div className="relative w-[28px] h-[28px] bg-[#F4F5F8] rounded-[8px] flex items-center justify-center text-[#7A8299] cursor-pointer" onClick={onOpenNotification}>
              <Bell className="w-3.5 h-3.5" />
              <span className="absolute left-[18px] top-[4px] w-[6px] h-[6px] bg-[#EF4444] border border-white rounded-[3px]" />
            </div>
          </div>

          <div className="mb-[10px] flex gap-[8px]">
            <div className="flex-1 bg-[#F4F5F8] rounded-[7px] p-[5px_8px]">
              <div className="text-[9px] text-[#7A8299]">{t('common.lastLogin')}</div>
              <div className="text-[10.5px] font-semibold text-[#0F1629] mt-[1px]">2 hours ago</div>
            </div>
            <div className="flex-1 bg-[#F4F5F8] rounded-[7px] p-[5px_8px]">
              <div className="text-[9px] text-[#7A8299]">{t('common.alerts')}</div>
              <div className="text-[10.5px] font-bold text-[#EF4444] mt-[1px]">{t('common.unreadAlerts')}</div>
            </div>
          </div>

          <button
            onClick={() => navigate('/settings?tab=profile')}
            className="w-full h-[30.5px] px-[6px] rounded-[8px] border border-[#384E85]/13 bg-white text-[#7A8299] text-[11px] font-semibold flex items-center justify-center gap-[5px] cursor-pointer hover:bg-[#EEF1F8] hover:text-[#384E85] transition"
          >
            <User className="w-3 h-3" />
            <span>Profile Settings</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
