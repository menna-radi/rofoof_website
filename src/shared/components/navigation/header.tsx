import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, Bell, ChevronDown, Settings, LogOut, User, ShieldCheck, X, 
  ShoppingBag, Package, Users, Truck, LayoutDashboard, Boxes, Tag, 
  Megaphone, PieChart, Clock, Building2, ChevronRight 
} from 'lucide-react';
import { LanguageSwitcher } from './language-switcher';

interface HeaderProps {
  onOpenNotifications?: () => void;
}

interface SearchItem {
  id: string;
  category: 'Pages' | 'Products' | 'Orders' | 'Customers' | 'Drivers' | 'Categories';
  title: string;
  subtitle: string;
  path: string;
  badge?: string;
  badgeBg?: string;
  badgeColor?: string;
  icon: any;
}

const GLOBAL_SEARCH_INDEX: SearchItem[] = [
  // Navigation / Pages
  { id: 'p1', category: 'Pages', title: 'Dashboard', subtitle: 'Overview stats & revenue analytics', path: '/dashboard', icon: LayoutDashboard },
  { id: 'p2', category: 'Pages', title: 'All Orders', subtitle: 'View and manage all customer orders', path: '/orders', icon: ShoppingBag },
  { id: 'p3', category: 'Pages', title: 'Active Orders', subtitle: '184 orders currently in transit', path: '/orders?tab=active', badge: '184', badgeBg: '#FEF2F2', badgeColor: '#EF4444', icon: Clock },
  { id: 'p4', category: 'Pages', title: 'Products List', subtitle: 'Inventory catalog & pricing', path: '/products', icon: Package },
  { id: 'p5', category: 'Pages', title: 'Product Categories', subtitle: 'Organize catalog into categories', path: '/categories', icon: Tag },
  { id: 'p6', category: 'Pages', title: 'Stock Overview', subtitle: 'Inventory tracking & low stock alerts', path: '/stock-overview', icon: Boxes },
  { id: 'p7', category: 'Pages', title: 'Customers', subtitle: 'Retail and wholesale accounts', path: '/customers', icon: Users },
  { id: 'p8', category: 'Pages', title: 'Drivers Fleet', subtitle: 'Manage delivery drivers & status', path: '/drivers', icon: Truck },
  { id: 'p9', category: 'Pages', title: 'Live Tracking', subtitle: 'Real-time GPS tracking map', path: '/live-tracking', icon: Truck },
  { id: 'p10', category: 'Pages', title: 'Dispatch Board', subtitle: 'Assign orders to available drivers', path: '/dispatch-board', icon: Clock },
  { id: 'p11', category: 'Pages', title: 'Offers & Deals', subtitle: 'Promotional campaigns & discount codes', path: '/offers-deals', icon: Megaphone },
  { id: 'p12', category: 'Pages', title: 'Analytics & Reports', subtitle: 'Revenue charts & sales performance', path: '/analytics', icon: PieChart },
  { id: 'p13', category: 'Pages', title: 'Profile Settings', subtitle: 'Personal info & avatar', path: '/settings?tab=profile', icon: User },
  { id: 'p14', category: 'Pages', title: 'Business Settings', subtitle: 'Store details & tax ID', path: '/settings?tab=business', icon: Building2 },
  { id: 'p15', category: 'Pages', title: 'Security Settings', subtitle: 'Password & 2FA authentication', path: '/settings?tab=security', icon: ShieldCheck },
  { id: 'p16', category: 'Pages', title: 'Appearance Settings', subtitle: 'Theme, density, & language', path: '/settings?tab=appearance', icon: Settings },

  // Products
  { id: 'pr1', category: 'Products', title: 'Organic Bananas 1kg', subtitle: 'SKU: FRU-001 · Produce · $2.49', path: '/products', badge: '8 left', badgeBg: '#FEF2F2', badgeColor: '#EF4444', icon: Package },
  { id: 'pr2', category: 'Products', title: 'Whole Milk 2L', subtitle: 'SKU: DAI-034 · Dairy · $1.85', path: '/products', badge: '12 left', badgeBg: '#FFFBEB', badgeColor: '#D97706', icon: Package },
  { id: 'pr3', category: 'Products', title: 'Fresh Chicken Breast 1kg', subtitle: 'SKU: MEA-012 · Meat & Poultry · $6.99', path: '/products', badge: '4 left', badgeBg: '#FEF2F2', badgeColor: '#EF4444', icon: Package },
  { id: 'pr4', category: 'Products', title: 'Pure Egyptian Honey 500g', subtitle: 'SKU: HON-005 · Pantry · $8.50', path: '/products', badge: '45 in stock', badgeBg: '#ECFDF5', badgeColor: '#065F46', icon: Package },
  { id: 'pr5', category: 'Products', title: 'Fresh Orange Juice 1L', subtitle: 'SKU: BEV-089 · Beverages · $3.20', path: '/products', badge: '30 in stock', badgeBg: '#ECFDF5', badgeColor: '#065F46', icon: Package },
  { id: 'pr6', category: 'Products', title: 'Red Gala Apples 1kg', subtitle: 'SKU: FRU-008 · Produce · $3.15', path: '/products', badge: '50 in stock', badgeBg: '#ECFDF5', badgeColor: '#065F46', icon: Package },

  // Orders
  { id: 'o1', category: 'Orders', title: 'Order #8821', subtitle: 'Metro Grocers Ltd · 1,240 EGP · Driver: Ahmed Khalil', path: '/orders', badge: 'On The Way', badgeBg: '#EEF1F8', badgeColor: '#384E85', icon: ShoppingBag },
  { id: 'o2', category: 'Orders', title: 'Order #8820', subtitle: 'Cairo Retail Chain · 680 EGP', path: '/orders', badge: 'Delivered', badgeBg: '#ECFDF5', badgeColor: '#065F46', icon: ShoppingBag },
  { id: 'o3', category: 'Orders', title: 'Order #8819', subtitle: 'Nile Hypermarket · 2,450 EGP', path: '/orders', badge: 'Preparing', badgeBg: '#FFFBEB', badgeColor: '#D97706', icon: ShoppingBag },
  { id: 'o4', category: 'Orders', title: 'Order #8818', subtitle: 'Delta Supermarket · 310 EGP', path: '/orders', badge: 'Cancelled', badgeBg: '#FEF2F2', badgeColor: '#EF4444', icon: ShoppingBag },

  // Customers
  { id: 'c1', category: 'Customers', title: 'Metro Grocers Ltd', subtitle: 'Wholesale Account · Cairo · +20 100 123 4567', path: '/customers', badge: 'Wholesale', badgeBg: '#EEF1F8', badgeColor: '#384E85', icon: Building2 },
  { id: 'c2', category: 'Customers', title: 'Cairo Retail Chain', subtitle: 'Wholesale Account · Heliopolis', path: '/customers', badge: 'Wholesale', badgeBg: '#EEF1F8', badgeColor: '#384E85', icon: Building2 },
  { id: 'c3', category: 'Customers', title: 'Nile Hypermarket', subtitle: 'Wholesale Account · Maadi', path: '/customers', badge: 'Wholesale', badgeBg: '#EEF1F8', badgeColor: '#384E85', icon: Building2 },
  { id: 'c4', category: 'Customers', title: 'Sarah Ahmed', subtitle: 'Retail Customer · Zamalek', path: '/customers', badge: 'Retail', badgeBg: '#ECFDF5', badgeColor: '#065F46', icon: Users },

  // Drivers
  { id: 'd1', category: 'Drivers', title: 'Ahmed Khalil', subtitle: '@ahmed.khalil · Motorcycle · +20 100 234 5678', path: '/drivers', badge: 'Online', badgeBg: '#ECFDF5', badgeColor: '#065F46', icon: Truck },
  { id: 'd2', category: 'Drivers', title: 'Mohamed Hassan', subtitle: '@mohamed.h · Delivery Van', path: '/drivers', badge: 'Busy', badgeBg: '#FFFBEB', badgeColor: '#D97706', icon: Truck },
  { id: 'd3', category: 'Drivers', title: 'Tarek Mahmoud', subtitle: '@tarek.m · Delivery Car', path: '/drivers', badge: 'Online', badgeBg: '#ECFDF5', badgeColor: '#065F46', icon: Truck },

  // Categories
  { id: 'cat1', category: 'Categories', title: 'Produce Category', subtitle: 'Fruits & Vegetables · 142 items', path: '/categories', icon: Tag },
  { id: 'cat2', category: 'Categories', title: 'Dairy & Eggs Category', subtitle: 'Milk, Cheese, Yogurt · 98 items', path: '/categories', icon: Tag },
  { id: 'cat3', category: 'Categories', title: 'Meat & Poultry Category', subtitle: 'Fresh Meat, Chicken, Fish · 64 items', path: '/categories', icon: Tag },
  { id: 'cat4', category: 'Categories', title: 'Beverages Category', subtitle: 'Juices, Water, Soda · 115 items', path: '/categories', icon: Tag },
];

export const Header: React.FC<HeaderProps> = ({ onOpenNotifications }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [globalQuery, setGlobalQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getPageTitle = (path: string) => {
    if (path.startsWith('/orders')) return t('nav.orders');
    if (path.startsWith('/products')) return t('nav.products');
    if (path.startsWith('/categories')) return t('nav.categories');
    if (path.startsWith('/stock-overview')) return t('nav.stockOverview');
    if (path.startsWith('/inventory')) return t('nav.inventory');
    if (path.startsWith('/customers')) return t('nav.customers');
    if (path.startsWith('/drivers')) return t('nav.driverFleet');
    if (path.startsWith('/live-tracking')) return t('nav.liveTracking');
    if (path.startsWith('/dispatch-board')) return t('nav.dispatchBoard');
    if (path.startsWith('/analytics')) return t('nav.analytics');
    if (path.startsWith('/settings')) return t('nav.settings');
    return t('nav.dashboard');
  };

  // Keyboard shortcut: Ctrl+K or Cmd+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter global search results across all entities
  const filteredResults = GLOBAL_SEARCH_INDEX.filter((item) => {
    if (!globalQuery.trim()) return true;
    const q = globalQuery.toLowerCase().trim();
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  // Group results by category
  const groupedResults: Record<string, SearchItem[]> = {};
  filteredResults.forEach((item) => {
    if (!groupedResults[item.category]) {
      groupedResults[item.category] = [];
    }
    groupedResults[item.category].push(item);
  });

  // Handle arrow key navigation in search results
  const flattenedResults = filteredResults;
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, flattenedResults.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + flattenedResults.length) % Math.max(1, flattenedResults.length));
    } else if (e.key === 'Enter') {
      if (flattenedResults[selectedIndex]) {
        e.preventDefault();
        navigate(flattenedResults[selectedIndex].path);
        setSearchFocused(false);
      }
    } else if (e.key === 'Escape') {
      setSearchFocused(false);
    }
  };

  return (
    <header className="h-[64px] min-h-[64px] bg-white border-b border-[#384E85]/8 px-[32px] flex items-center gap-[16px] sticky top-0 z-20 shadow-xs">
      <div className="text-[17px] font-bold text-[#0F1629] tracking-tight whitespace-nowrap">
        {getPageTitle(location.pathname)}
      </div>

      {/* Enhanced Header Search Input */}
      <div className="flex-1 max-w-[500px] relative" ref={searchRef}>
        <div className="relative flex items-center">
          <Search
            className={`w-4 h-4 absolute left-[14px] pointer-events-none transition-colors ${
              searchFocused ? 'text-[#384E85]' : 'text-[#7A8299]'
            }`}
          />
          <input
            ref={inputRef}
            type="text"
            value={globalQuery}
            onChange={(e) => {
              setGlobalQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onFocus={() => setSearchFocused(true)}
            onKeyDown={handleInputKeyDown}
            placeholder="Search orders, products, customers, drivers... (Ctrl+K)"
            className="w-full h-[38px] pl-[40px] pr-[70px] bg-[#F4F5F8] border border-transparent rounded-[12px] text-[13px] text-[#0F1629] outline-none placeholder:text-[#7A8299] focus:border-[#384E85] focus:bg-white focus:ring-3 focus:ring-[#384E85]/10 transition-all font-sans"
          />
          {globalQuery ? (
            <button
              onClick={() => setGlobalQuery('')}
              className="absolute right-[12px] w-5 h-5 rounded-full bg-[#CBD5E0] hover:bg-[#A0AEC0] text-white flex items-center justify-center border-none cursor-pointer transition"
            >
              <X className="w-3 h-3" />
            </button>
          ) : (
            <kbd className="hidden sm:flex items-center gap-0.5 absolute right-[10px] px-1.5 py-0.5 text-[10px] font-semibold text-[#7A8299] bg-white border border-[#CBD5E0] rounded-[6px] shadow-2xs pointer-events-none select-none">
              ⌘K
            </kbd>
          )}
        </div>

        {/* Global Multi-Category Search Overlay */}
        {searchFocused && (
          <div
            className="absolute left-0 right-0 top-[calc(100%+6px)] bg-white rounded-[16px] overflow-hidden z-50 p-[8px] border border-[rgba(56,78,133,0.12)] max-h-[420px] overflow-y-auto"
            style={{ boxShadow: '0px 12px 36px rgba(0,0,0,0.14)' }}
          >
            <div className="flex items-center justify-between px-[10px] pt-[6px] pb-[6px] border-b border-[#384E85]/8">
              <span className="text-[10.5px] font-bold text-[#7A8299] uppercase tracking-[0.6px]">
                {globalQuery ? `Search results for "${globalQuery}"` : 'Quick Jump / All Records'}
              </span>
              <span className="text-[10px] text-[#7A8299]">{filteredResults.length} items found</span>
            </div>

            {filteredResults.length > 0 ? (
              <div className="flex flex-col gap-2 mt-2">
                {Object.keys(groupedResults).map((categoryName) => (
                  <div key={categoryName}>
                    <p className="px-[10px] py-[3px] text-[10px] font-extrabold text-[#384E85] uppercase tracking-[0.5px]">
                      {categoryName}
                    </p>
                    <div className="flex flex-col gap-0.5 mt-0.5">
                      {groupedResults[categoryName].map((item) => {
                        const Icon = item.icon;
                        const flatIndex = flattenedResults.findIndex((r) => r.id === item.id);
                        const isSelected = flatIndex === selectedIndex;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              navigate(item.path);
                              setSearchFocused(false);
                            }}
                            onMouseEnter={() => setSelectedIndex(flatIndex)}
                            className={`flex items-center gap-3 w-full p-[8px_10px] rounded-[10px] border-none cursor-pointer text-left transition group ${
                              isSelected ? 'bg-[#EEF1F8]' : 'bg-transparent hover:bg-[#F4F5F8]'
                            }`}
                          >
                            <div className={`w-7 h-7 rounded-[8px] flex items-center justify-center shrink-0 transition ${
                              isSelected ? 'bg-[#384E85] text-white' : 'bg-[#EEF1F8] text-[#384E85]'
                            }`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`font-semibold text-[12.5px] truncate transition ${
                                isSelected ? 'text-[#384E85]' : 'text-[#0F1629]'
                              }`}>
                                {item.title}
                              </p>
                              <p className="text-[11px] text-[#7A8299] truncate">{item.subtitle}</p>
                            </div>
                            {item.badge && (
                              <span
                                className="px-2 py-0.5 rounded-[6px] text-[10px] font-bold shrink-0"
                                style={{ backgroundColor: item.badgeBg || '#EEF1F8', color: item.badgeColor || '#384E85' }}
                              >
                                {item.badge}
                              </span>
                            )}
                            <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition ${
                              isSelected ? 'text-[#384E85] translate-x-0.5' : 'text-[#CBD5E0]'
                            }`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center">
                <Search className="w-6 h-6 text-[#CBD5E0] mx-auto mb-2" />
                <p className="text-[13px] font-semibold text-[#0F1629]">No results found for "{globalQuery}"</p>
                <p className="text-[11px] text-[#7A8299] mt-0.5">Try searching for orders, products, customers, or drivers</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Header Controls */}
      <div className="flex items-center gap-[16px] ml-auto">
        <LanguageSwitcher />

        {/* Notifications Bell Button */}
        <button
          onClick={onOpenNotifications}
          className="w-[36px] h-[36px] rounded-full border-none bg-none cursor-pointer flex items-center justify-center text-[#7A8299] relative hover:bg-[#EEF1F8] transition"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-[2px] right-[2px] bg-[#EF4444] text-white text-[9px] font-bold min-w-[16px] h-[16px] rounded-[8px] flex items-center justify-center px-[4px]">
            5
          </span>
        </button>

        {/* User Info Capsule with dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setUserMenuOpen((prev) => !prev)}
            className="flex items-center gap-[8px] p-[4px_8px_4px_4px] rounded-[8px] cursor-pointer hover:bg-[#FAFAFA] transition border-none bg-transparent"
          >
            <div className="w-[32px] h-[32px] rounded-[8px] bg-gradient-to-br from-[#384E85] to-[#6B8ED4] text-white flex items-center justify-center font-semibold text-[11px]">
              AK
            </div>
            <div className="hidden sm:block leading-tight text-left">
              <div className="text-[12px] font-semibold text-[#0F1629]">{t('common.adminUser')}</div>
              <div className="text-[10px] text-[#7A8299]">{t('common.superAdmin')}</div>
            </div>
            <ChevronDown
              className="w-3 h-3 text-[#7A8299] transition-transform duration-200"
              style={{ transform: userMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>

          {/* Dropdown Menu */}
          {userMenuOpen && (
            <div
              className="absolute right-0 top-[calc(100%+8px)] bg-white rounded-[16px] overflow-hidden z-50 min-w-[210px]"
              style={{
                boxShadow: '0px 8px 30px rgba(0,0,0,0.12)',
                border: '1px solid rgba(56,78,133,0.08)',
              }}
            >
              {/* User info header */}
              <div className="px-[14px] py-[12px]" style={{ borderBottom: '1px solid rgba(56,78,133,0.07)' }}>
                <div className="flex items-center gap-[10px]">
                  <div className="w-[36px] h-[36px] rounded-[10px] bg-gradient-to-br from-[#384E85] to-[#6B8ED4] text-white flex items-center justify-center font-bold text-[12px] shrink-0">
                    AK
                  </div>
                  <div>
                    <p className="font-bold text-[#0f1629] text-[13px]">{t('common.adminUser')}</p>
                    <p className="text-[11px] text-[#7a8299]">admin@rofoof.com</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-[6px]">
                <button
                  onClick={() => { navigate('/settings?tab=profile'); setUserMenuOpen(false); }}
                  className="w-full flex items-center gap-[10px] px-[10px] py-[9px] rounded-[10px] text-[13px] text-[#4a5568] font-medium border-none cursor-pointer bg-transparent hover:bg-[#eef1f8] hover:text-[#384e85] transition text-left"
                >
                  <User className="w-4 h-4 shrink-0" />
                  Profile
                </button>
                <button
                  onClick={() => { navigate('/settings?tab=security'); setUserMenuOpen(false); }}
                  className="w-full flex items-center gap-[10px] px-[10px] py-[9px] rounded-[10px] text-[13px] text-[#4a5568] font-medium border-none cursor-pointer bg-transparent hover:bg-[#eef1f8] hover:text-[#384e85] transition text-left"
                >
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  Security
                </button>
                <button
                  onClick={() => { navigate('/settings?tab=appearance'); setUserMenuOpen(false); }}
                  className="w-full flex items-center gap-[10px] px-[10px] py-[9px] rounded-[10px] text-[13px] text-[#4a5568] font-medium border-none cursor-pointer bg-transparent hover:bg-[#eef1f8] hover:text-[#384e85] transition text-left"
                >
                  <Settings className="w-4 h-4 shrink-0" />
                  Preferences
                </button>
              </div>

              {/* Sign Out */}
              <div className="p-[6px]" style={{ borderTop: '1px solid rgba(56,78,133,0.07)' }}>
                <button
                  onClick={() => setUserMenuOpen(false)}
                  className="w-full flex items-center gap-[10px] px-[10px] py-[9px] rounded-[10px] text-[13px] text-[#ef4444] font-medium border-none cursor-pointer bg-transparent hover:bg-[#fef2f2] transition text-left"
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Live Pill Indicator */}
        <div className="flex items-center gap-[6px] bg-[#ECFDF5] border border-[#10B981]/20 p-[4px_12px_4px_8px] rounded-[20px] text-[12px] text-[#065F46] font-medium">
          <div className="w-[8px] h-[8px] rounded-full bg-[#10B981] shadow-[0_0_0_2px_rgba(16,185,129,0.2)] animate-pulse" />
          <span>{t('common.live')}</span>
        </div>
      </div>
    </header>
  );
};
