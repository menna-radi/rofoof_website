import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronDown, Settings, LogOut, User, ShieldCheck } from 'lucide-react';
import { LanguageSwitcher } from './language-switcher';

interface HeaderProps {
  onOpenNotifications?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenNotifications }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-[64px] min-h-[64px] bg-white border-b border-[#384E85]/8 px-[32px] flex items-center gap-[16px] sticky top-0 z-20 shadow-xs">
      <div className="text-[17px] font-bold text-[#0F1629] tracking-tight whitespace-nowrap">
        {getPageTitle(location.pathname)}
      </div>

      {/* Header Search Input */}
      <div className="flex-1 max-w-[480px] relative">
        <Search className="w-4 h-4 absolute left-[12px] top-1/2 -translate-y-1/2 text-[#7A8299]" />
        <input
          type="text"
          placeholder={t('common.search')}
          className="w-full h-[37px] pl-[38px] pr-[14px] bg-[#F4F5F8] border border-transparent rounded-[12px] text-[13px] text-[#0F1629] outline-none placeholder:text-[#7A8299] focus:border-[#384E85] focus:bg-white transition font-sans"
        />
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
