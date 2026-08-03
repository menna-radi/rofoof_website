import React, { useState, useEffect } from 'react';
import {
  User,
  Building2,
  Store,
  Bell,
  Truck,
  ShieldCheck,
  Sun,
  Check,
  Save,
  Mail,
  Phone,
  ChevronRight,
  Upload,
  MapPin,
  Globe,
  Eye,
  EyeOff,
  Moon,
  Monitor,
  Palette,
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

type TabId = 'profile' | 'business' | 'notifications' | 'delivery' | 'security' | 'appearance';

export const SettingsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab') as TabId | null;
    const validTabs: TabId[] = ['profile', 'business', 'notifications', 'delivery', 'security', 'appearance'];
    return tab && validTabs.includes(tab) ? tab : 'profile';
  });

  // Sync activeTab when searchParams change (e.g. clicking Preferences from header dropdown)
  useEffect(() => {
    const tab = searchParams.get('tab') as TabId | null;
    const validTabs: TabId[] = ['profile', 'business', 'notifications', 'delivery', 'security', 'appearance'];
    if (tab && validTabs.includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Profile State
  const [fullName, setFullName] = useState('Admin User');
  const [email, setEmail] = useState('admin@grocerERP.com');
  const [phone, setPhone] = useState('+20 100 000 0000');

  // Business State
  const [storeName, setStoreName] = useState('FreshMart Chain');
  const [currency, setCurrency] = useState('EGP');
  const [address, setAddress] = useState('12 Tahrir Square, Cairo, Egypt');
  const [timezone, setTimezone] = useState('Africa/Cairo');

  // Notifications State — In-App Alerts
  const [newOrderAlert, setNewOrderAlert] = useState(true);
  const [lowStockAlert, setLowStockAlert] = useState(true);
  const [driverRejection, setDriverRejection] = useState(true);
  const [orderDelivered, setOrderDelivered] = useState(false);
  // Notifications State — Channels
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [whatsappNotifs, setWhatsappNotifs] = useState(false);
  const [notifSound, setNotifSound] = useState(true);

  // Delivery Config
  const [autoAssign, setAutoAssign] = useState(false);
  const [maxOrdersPerDriver, setMaxOrdersPerDriver] = useState(5);
  const [deliveryRadius, setDeliveryRadius] = useState(15);
  const [minDriverRating, setMinDriverRating] = useState('4.0');

  // Security State
  const [twoFA, setTwoFA] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('8');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Appearance State
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [density, setDensity] = useState<'compact' | 'comfortable' | 'spacious'>('comfortable');
  const [language, setLanguage] = useState('en');

  const tabs = [
    { id: 'profile' as TabId, label: 'Profile', icon: User },
    { id: 'business' as TabId, label: 'Business', icon: Store },
    { id: 'notifications' as TabId, label: 'Notifications', icon: Bell },
    { id: 'delivery' as TabId, label: 'Delivery', icon: Truck },
    { id: 'security' as TabId, label: 'Security', icon: ShieldCheck },
    { id: 'appearance' as TabId, label: 'Appearance', icon: Palette },
  ];

  return (
    <div className="select-none">
      {/* Saved success banner */}
      {savedSuccess && (
        <div
          className="mb-4 px-4 py-2 rounded-[12px] bg-[#ECFDF5] text-[#10B981] text-[12.5px] font-bold flex items-center gap-1.5 border border-[#10B981]/20 w-fit"
          style={{ animation: 'fadeIn 0.2s ease' }}
        >
          <Check className="w-4 h-4" /> Settings saved successfully!
        </div>
      )}

      {/* Main content: Left settings nav + Right panel */}
      <div className="relative flex items-start gap-0">
        {/* ── Left Settings Nav Panel ── */}
        <div
          className="absolute bg-white border border-[rgba(56,78,133,0.07)] rounded-[20px] p-[13px] flex flex-col gap-0 shrink-0"
          style={{
            width: 220,
            top: 24,
            left: 0,
            boxShadow: '0px 8px 15px rgba(0,0,0,0.06)',
          }}
        >
          {/* Label */}
          <div className="px-[10px] pb-[8px] pt-[4px]">
            <p className="text-[#7a8299] text-[10px] font-bold tracking-[0.7px] uppercase leading-[15px]">
              Settings
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-col gap-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSearchParams({ tab: tab.id });
                  }}
                  className="w-full flex items-center gap-[9px] px-[11px] py-[9px] rounded-[10px] border-none cursor-pointer text-left transition-all"
                  style={{
                    height: 37.5,
                    backgroundColor: isActive ? '#eef1f8' : 'transparent',
                    marginBottom: 2,
                  }}
                >
                  <Icon
                    className="shrink-0"
                    style={{
                      width: 15,
                      height: 15,
                      color: isActive ? '#384e85' : '#4a5568',
                    }}
                  />
                  <span
                    className="text-[13px] leading-[19.5px]"
                    style={{
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? '#384e85' : '#4a5568',
                    }}
                  >
                    {tab.label}
                  </span>
                  {isActive && (
                    <ChevronRight
                      className="ml-auto shrink-0"
                      style={{ width: 13, height: 13, color: '#384e85' }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Right Content Panel ── */}
        <div
          className="absolute flex flex-col"
          style={{ left: 240, top: 0, right: 0, paddingBottom: 16 }}
        >
          {/* ── PROFILE TAB ── */}
          {activeTab === 'profile' && (
            <div
              className="bg-white border border-[rgba(56,78,133,0.07)] rounded-[20px] w-full"
              style={{ boxShadow: '0px 8px 15px rgba(0,0,0,0.06)', padding: 25 }}
            >
              {/* Card header */}
              <div
                className="flex items-center gap-[12px] pb-[17px]"
                style={{ borderBottom: '1px solid rgba(56,78,133,0.07)' }}
              >
                <div
                  className="flex items-center justify-center rounded-[11px] shrink-0"
                  style={{ width: 38, height: 38, backgroundColor: '#eef1f8' }}
                >
                  <User style={{ width: 18, height: 18, color: '#384e85' }} />
                </div>
                <div className="flex flex-col items-start">
                  <p className="font-bold text-[#0f1629] text-[14px] leading-[21px]">
                    Admin Profile
                  </p>
                  <p className="font-normal text-[#7a8299] text-[12px] leading-[18px]">
                    Your personal account details
                  </p>
                </div>
              </div>

              {/* Profile photo section */}
              <div className="pt-[20px]">
                <div
                  className="flex items-center gap-[16px] p-[16px] rounded-[14px]"
                  style={{ backgroundColor: '#fafafa' }}
                >
                  {/* Avatar */}
                  <div
                    className="flex items-center justify-center rounded-[18px] shrink-0"
                    style={{
                      width: 64,
                      height: 64,
                      background: 'linear-gradient(135deg, rgb(56, 78, 133) 0%, rgb(107, 142, 212) 100%)',
                    }}
                  >
                    <span className="font-extrabold text-white text-[20px] leading-[30px]">
                      AK
                    </span>
                  </div>

                  {/* Photo info */}
                  <div className="flex flex-col items-start gap-0">
                    <p className="font-bold text-[#0f1629] text-[14px] leading-[21px]">
                      Profile Photo
                    </p>
                    <p
                      className="font-normal text-[#7a8299] text-[12px] leading-[18px]"
                      style={{ paddingBottom: 8 }}
                    >
                      JPG, PNG · Max 2MB
                    </p>
                    <button
                      className="flex items-center gap-[5px] rounded-[8px] border-none cursor-pointer px-[14px]"
                      style={{
                        height: 28,
                        backgroundColor: '#eef1f8',
                        color: '#384e85',
                        fontSize: 12,
                        fontWeight: 600,
                        lineHeight: '18px',
                      }}
                    >
                      <Upload style={{ width: 11, height: 11 }} />
                      Upload Photo
                    </button>
                  </div>
                </div>
              </div>

              {/* Form grid — 2 columns × 2 rows */}
              <div className="pt-[24px]">
                <div className="grid grid-cols-2 gap-x-[16px] gap-y-[34px]">
                  {/* Full Name */}
                  <div className="flex flex-col gap-0">
                    <label
                      className="font-semibold text-[#4a5568] text-[12px] leading-[18px] pb-[6px]"
                    >
                      Full Name
                    </label>
                    <div
                      className="flex flex-col justify-center rounded-[12px] overflow-hidden"
                      style={{ height: 41.5, backgroundColor: '#f4f5f8', border: '1px solid transparent' }}
                    >
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-transparent outline-none font-normal text-[#0f1629] text-[13px] leading-[19.5px]"
                        style={{ padding: '11px 13px' }}
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="flex flex-col gap-0">
                    <label
                      className="font-semibold text-[#4a5568] text-[12px] leading-[18px] pb-[6px]"
                    >
                      Email Address
                    </label>
                    <div
                      className="relative flex flex-col justify-center rounded-[12px] overflow-hidden"
                      style={{ height: 41.5, backgroundColor: '#f4f5f8', border: '1px solid transparent' }}
                    >
                      <Mail
                        className="absolute"
                        style={{ left: 11, top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, color: '#7a8299' }}
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent outline-none font-normal text-[#0f1629] text-[13px] leading-[19.5px]"
                        style={{ paddingLeft: 33, paddingRight: 13, paddingTop: 11, paddingBottom: 11 }}
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col gap-0">
                    <label
                      className="font-semibold text-[#4a5568] text-[12px] leading-[18px] pb-[6px]"
                    >
                      Phone Number
                    </label>
                    <div
                      className="relative flex flex-col justify-center rounded-[12px] overflow-hidden"
                      style={{ height: 41.5, backgroundColor: '#f4f5f8', border: '1px solid transparent' }}
                    >
                      <Phone
                        className="absolute"
                        style={{ left: 11, top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, color: '#7a8299' }}
                      />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-transparent outline-none font-normal text-[#0f1629] text-[13px] leading-[19.5px]"
                        style={{ paddingLeft: 33, paddingRight: 13, paddingTop: 11, paddingBottom: 11 }}
                      />
                    </div>
                  </div>

                  {/* Role (read-only) */}
                  <div className="flex flex-col gap-0">
                    <label
                      className="font-semibold text-[#4a5568] text-[12px] leading-[18px] pb-[6px]"
                    >
                      Role
                    </label>
                    <div
                      className="flex flex-col justify-center rounded-[12px] overflow-hidden"
                      style={{ height: 41.5, backgroundColor: '#f4f5f8', border: '1px solid transparent' }}
                    >
                      <span
                        className="font-normal text-[#7a8299] text-[13px] leading-[19.5px]"
                        style={{ padding: '11px 13px' }}
                      >
                        Super Admin
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Changes button */}
              <div className="flex justify-end pt-[4px] mt-[4px]">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-[7px] border-none cursor-pointer rounded-[12px] text-white font-bold text-[13px] leading-[19.5px]"
                  style={{
                    height: 41.5,
                    padding: '9px 22px',
                    background: 'linear-gradient(166.73deg, rgb(56, 78, 133) 0%, rgb(91, 123, 200) 100%)',
                    boxShadow: '0px 4px 7px rgba(56,78,133,0.28)',
                  }}
                >
                  <Save style={{ width: 14, height: 14 }} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* ── BUSINESS TAB ── */}
          {activeTab === 'business' && (
            <div
              className="bg-white border border-[rgba(56,78,133,0.07)] rounded-[20px] w-full"
              style={{ boxShadow: '0px 8px 15px rgba(0,0,0,0.06)', padding: 25 }}
            >
              {/* Card header */}
              <div
                className="flex items-center gap-[12px] pb-[17px]"
                style={{ borderBottom: '1px solid rgba(56,78,133,0.07)' }}
              >
                <div
                  className="flex items-center justify-center rounded-[11px] shrink-0"
                  style={{ width: 38, height: 38, backgroundColor: '#eef1f8' }}
                >
                  <Store style={{ width: 18, height: 18, color: '#384e85' }} />
                </div>
                <div className="flex flex-col items-start">
                  <p className="font-bold text-[#0f1629] text-[14px] leading-[21px]">
                    Business Settings
                  </p>
                  <p className="font-normal text-[#7a8299] text-[12px] leading-[18px]">
                    Your store and operations configuration
                  </p>
                </div>
              </div>

              {/* Form grid — 2 columns × 2 rows */}
              <div className="pt-[20px]">
                <div className="grid grid-cols-2 gap-x-[16px] gap-y-[34px]">

                  {/* Store / Chain Name */}
                  <div className="flex flex-col gap-0">
                    <label className="font-semibold text-[#4a5568] text-[12px] leading-[18px] pb-[6px]">
                      Store / Chain Name
                    </label>
                    <div
                      className="flex flex-col justify-center rounded-[12px] overflow-hidden"
                      style={{ height: 41.5, backgroundColor: '#f4f5f8', border: '1px solid transparent' }}
                    >
                      <input
                        type="text"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        className="w-full bg-transparent outline-none font-normal text-[#0f1629] text-[13px] leading-[19.5px]"
                        style={{ padding: '11px 13px' }}
                      />
                    </div>
                  </div>

                  {/* Currency */}
                  <div className="flex flex-col gap-0">
                    <label className="font-semibold text-[#4a5568] text-[12px] leading-[18px] pb-[6px]">
                      Currency
                    </label>
                    <div
                      className="flex flex-col justify-center rounded-[12px] overflow-hidden"
                      style={{ height: 41.5, backgroundColor: '#f4f5f8', border: '1px solid transparent' }}
                    >
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full bg-transparent outline-none font-normal text-[#0f1629] text-[13px] leading-[19.5px]"
                        style={{ padding: '11px 13px' }}
                      >
                        <option value="EGP">EGP — Egyptian Pound</option>
                        <option value="USD">USD — US Dollar</option>
                        <option value="EUR">EUR — Euro</option>
                        <option value="SAR">SAR — Saudi Riyal</option>
                        <option value="AED">AED — UAE Dirham</option>
                      </select>
                    </div>
                  </div>

                  {/* Main Address */}
                  <div className="flex flex-col gap-0">
                    <label className="font-semibold text-[#4a5568] text-[12px] leading-[18px] pb-[6px]">
                      Main Address
                    </label>
                    <div
                      className="relative flex flex-col justify-center rounded-[12px] overflow-hidden"
                      style={{ height: 41.5, backgroundColor: '#f4f5f8', border: '1px solid transparent' }}
                    >
                      <MapPin
                        className="absolute"
                        style={{ left: 11, top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, color: '#7a8299' }}
                      />
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-transparent outline-none font-normal text-[#0f1629] text-[13px] leading-[19.5px]"
                        style={{ paddingLeft: 33, paddingRight: 13, paddingTop: 11, paddingBottom: 11 }}
                      />
                    </div>
                    <p className="font-normal text-[#7a8299] text-[11px] leading-[16.5px] pt-[5px]">
                      Used for distance calculations
                    </p>
                  </div>

                  {/* Timezone */}
                  <div className="flex flex-col gap-0">
                    <label className="font-semibold text-[#4a5568] text-[12px] leading-[18px] pb-[6px]">
                      Timezone
                    </label>
                    <div
                      className="relative flex flex-col justify-center rounded-[12px] overflow-hidden"
                      style={{ height: 41.5, backgroundColor: '#f4f5f8', border: '1px solid transparent' }}
                    >
                      <Globe
                        className="absolute"
                        style={{ left: 11, top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, color: '#7a8299' }}
                      />
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="w-full bg-transparent outline-none font-normal text-[#0f1629] text-[13px] leading-[19.5px]"
                        style={{ paddingLeft: 33, paddingRight: 13, paddingTop: 11, paddingBottom: 11 }}
                      >
                        <option value="Africa/Cairo">Africa/Cairo (UTC+2)</option>
                        <option value="Asia/Riyadh">Asia/Riyadh (UTC+3)</option>
                        <option value="Asia/Dubai">Asia/Dubai (UTC+4)</option>
                        <option value="Europe/London">Europe/London (UTC+0)</option>
                        <option value="America/New_York">America/New_York (UTC-5)</option>
                      </select>
                    </div>
                  </div>

                </div>
              </div>

              {/* Save Changes button */}
              <div className="flex justify-end pt-[4px] mt-[4px]">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-[7px] border-none cursor-pointer rounded-[12px] text-white font-bold text-[13px] leading-[19.5px]"
                  style={{
                    height: 41.5,
                    padding: '9px 22px',
                    background: 'linear-gradient(166.73deg, rgb(56, 78, 133) 0%, rgb(91, 123, 200) 100%)',
                    boxShadow: '0px 4px 7px rgba(56,78,133,0.28)',
                  }}
                >
                  <Save style={{ width: 14, height: 14 }} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* ── NOTIFICATIONS TAB ── */}
          {activeTab === 'notifications' && (
            <div className="flex flex-col gap-0">
              {/* Send Notification button */}
              <div className="mb-[24px]">
                <button
                  className="flex items-center gap-[7px] border-none cursor-pointer rounded-[12px] text-white font-bold text-[13px] leading-[19.5px]"
                  style={{
                    height: 37.5,
                    padding: '9px 22px',
                    background: 'linear-gradient(168.04deg, rgb(56, 78, 133) 0%, rgb(91, 123, 200) 100%)',
                    boxShadow: '0px 4px 7px rgba(56,78,133,0.28)',
                  }}
                >
                  <span style={{ fontSize: 16, lineHeight: 1, marginTop: -1 }}>+</span>
                  Send Notification
                </button>
              </div>

              {/* Main card */}
              <div
                className="bg-white border border-[rgba(56,78,133,0.07)] rounded-[20px] w-full"
                style={{ boxShadow: '0px 8px 15px rgba(0,0,0,0.06)', padding: 25 }}
              >
                {/* Card header */}
                <div
                  className="flex items-center gap-[12px] pb-[17px]"
                  style={{ borderBottom: '1px solid rgba(56,78,133,0.07)' }}
                >
                  <div
                    className="flex items-center justify-center rounded-[11px] shrink-0"
                    style={{ width: 38, height: 38, backgroundColor: '#eef1f8' }}
                  >
                    <Bell style={{ width: 18, height: 18, color: '#384e85' }} />
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="font-bold text-[#0f1629] text-[14px] leading-[21px]">
                      Notification Preferences
                    </p>
                    <p className="font-normal text-[#7a8299] text-[12px] leading-[18px]">
                      Control what alerts you receive and how
                    </p>
                  </div>
                </div>

                {/* IN-APP ALERTS section */}
                <div className="pt-[20px]">
                  <p
                    className="font-semibold text-[#7a8299] text-[12px] leading-[18px] uppercase"
                    style={{ letterSpacing: '0.5px' }}
                  >
                    In-App Alerts
                  </p>
                </div>

                <div className="pt-[8px] flex flex-col">
                  {([
                    { label: 'New Order Received', sub: 'Alert when a new order is placed', value: newOrderAlert, set: setNewOrderAlert },
                    { label: 'Low Stock Warning', sub: 'Alert when product stock falls below threshold', value: lowStockAlert, set: setLowStockAlert },
                    { label: 'Driver Rejection', sub: 'Alert when a driver rejects an order', value: driverRejection, set: setDriverRejection },
                    { label: 'Order Delivered', sub: 'Alert when a delivery is completed', value: orderDelivered, set: setOrderDelivered },
                  ] as Array<{ label: string; sub: string; value: boolean; set: (v: boolean) => void }>).map((item, i, arr) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between"
                      style={{
                        paddingTop: 10,
                        paddingBottom: 11,
                        borderBottom: i < arr.length - 1 ? '1px solid rgba(56,78,133,0.06)' : 'none',
                      }}
                    >
                      <div className="flex flex-col">
                        <p className="font-medium text-[#0f1629] text-[13px] leading-[19.5px]">{item.label}</p>
                        <p className="font-normal text-[#7a8299] text-[11px] leading-[16.5px]">{item.sub}</p>
                      </div>
                      {/* Custom toggle */}
                      <button
                        onClick={() => item.set(!item.value)}
                        className="border-none cursor-pointer relative shrink-0 rounded-[12px] transition-colors"
                        style={{
                          width: 42,
                          height: 24,
                          backgroundColor: item.value ? '#384e85' : '#cbd5e0',
                          padding: 0,
                        }}
                      >
                        <div
                          className="absolute bg-white rounded-[9px]"
                          style={{
                            width: 18,
                            height: 18,
                            top: 3,
                            left: item.value ? 20 : 3,
                            boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.2)',
                            transition: 'left 0.15s ease',
                          }}
                        />
                      </button>
                    </div>
                  ))}
                </div>

                {/* CHANNELS section */}
                <div className="pt-[20px]">
                  <p
                    className="font-semibold text-[#7a8299] text-[12px] leading-[18px] uppercase"
                    style={{ letterSpacing: '0.5px' }}
                  >
                    Channels
                  </p>
                </div>

                <div className="pt-[8px] flex flex-col">
                  {([
                    { label: 'Email Notifications', sub: 'Receive summaries to your email', value: emailNotifs, set: setEmailNotifs },
                    { label: 'WhatsApp Notifications', sub: 'Send alerts to your WhatsApp number', value: whatsappNotifs, set: setWhatsappNotifs },
                    { label: 'Notification Sound', sub: 'Play a sound for new alerts', value: notifSound, set: setNotifSound },
                  ] as Array<{ label: string; sub: string; value: boolean; set: (v: boolean) => void }>).map((item, i, arr) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between"
                      style={{
                        paddingTop: 10,
                        paddingBottom: 11,
                        borderBottom: i < arr.length - 1 ? '1px solid rgba(56,78,133,0.06)' : 'none',
                      }}
                    >
                      <div className="flex flex-col">
                        <p className="font-medium text-[#0f1629] text-[13px] leading-[19.5px]">{item.label}</p>
                        <p className="font-normal text-[#7a8299] text-[11px] leading-[16.5px]">{item.sub}</p>
                      </div>
                      {/* Custom toggle */}
                      <button
                        onClick={() => item.set(!item.value)}
                        className="border-none cursor-pointer relative shrink-0 rounded-[12px] transition-colors"
                        style={{
                          width: 42,
                          height: 24,
                          backgroundColor: item.value ? '#384e85' : '#cbd5e0',
                          padding: 0,
                        }}
                      >
                        <div
                          className="absolute bg-white rounded-[9px]"
                          style={{
                            width: 18,
                            height: 18,
                            top: 3,
                            left: item.value ? 20 : 3,
                            boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.2)',
                            transition: 'left 0.15s ease',
                          }}
                        />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Save Changes button */}
                <div className="flex justify-end pt-[4px] mt-[4px]">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-[7px] border-none cursor-pointer rounded-[12px] text-white font-bold text-[13px] leading-[19.5px]"
                    style={{
                      height: 41.5,
                      padding: '9px 22px',
                      background: 'linear-gradient(166.73deg, rgb(56, 78, 133) 0%, rgb(91, 123, 200) 100%)',
                      boxShadow: '0px 4px 7px rgba(56,78,133,0.28)',
                    }}
                  >
                    <Save style={{ width: 14, height: 14 }} />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── DELIVERY TAB ── */}
          {activeTab === 'delivery' && (
            <div
              className="bg-white border border-[rgba(56,78,133,0.07)] rounded-[20px] w-full"
              style={{ boxShadow: '0px 8px 15px rgba(0,0,0,0.06)', padding: 25 }}
            >
              {/* Card header */}
              <div
                className="flex items-center gap-[12px] pb-[17px]"
                style={{ borderBottom: '1px solid rgba(56,78,133,0.07)' }}
              >
                <div
                  className="flex items-center justify-center rounded-[11px] shrink-0"
                  style={{ width: 38, height: 38, backgroundColor: '#eef1f8' }}
                >
                  <Truck style={{ width: 18, height: 18, color: '#384e85' }} />
                </div>
                <div className="flex flex-col items-start">
                  <p className="font-bold text-[#0f1629] text-[14px] leading-[21px]">Delivery Settings</p>
                  <p className="font-normal text-[#7a8299] text-[12px] leading-[18px]">Driver assignment and logistics rules</p>
                </div>
              </div>

              {/* Auto-Assign Drivers toggle row */}
              <div
                className="flex items-center justify-between"
                style={{
                  paddingTop: 20,
                  paddingBottom: 11,
                  borderBottom: '1px solid rgba(56,78,133,0.06)',
                }}
              >
                <div className="flex flex-col">
                  <p className="font-medium text-[#0f1629] text-[13px] leading-[19.5px]">Auto-Assign Drivers</p>
                  <p className="font-normal text-[#7a8299] text-[11px] leading-[16.5px]">Automatically assign the nearest available driver to new orders</p>
                </div>
                <button
                  onClick={() => setAutoAssign(!autoAssign)}
                  className="border-none cursor-pointer relative shrink-0 rounded-[12px]"
                  style={{
                    width: 42,
                    height: 24,
                    backgroundColor: autoAssign ? '#384e85' : '#cbd5e0',
                    padding: 0,
                  }}
                >
                  <div
                    className="absolute bg-white rounded-[9px]"
                    style={{
                      width: 18,
                      height: 18,
                      top: 3,
                      left: autoAssign ? 20 : 3,
                      boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.2)',
                      transition: 'left 0.15s ease',
                    }}
                  />
                </button>
              </div>

              {/* Fields grid */}
              <div className="pt-[16px]">
                <div className="grid grid-cols-2 gap-x-[16px] gap-y-[22px]">

                  {/* Max Orders Per Driver */}
                  <div className="flex flex-col gap-0">
                    <label className="font-semibold text-[#4a5568] text-[12px] leading-[18px] pb-[6px]">
                      Max Orders Per Driver
                    </label>
                    <div
                      className="flex flex-col justify-center rounded-[12px] overflow-hidden"
                      style={{ height: 41.5, backgroundColor: '#f4f5f8', border: '1px solid transparent' }}
                    >
                      <input
                        type="number"
                        min={1}
                        max={20}
                        value={maxOrdersPerDriver}
                        onChange={(e) => setMaxOrdersPerDriver(Number(e.target.value))}
                        className="w-full bg-transparent outline-none font-normal text-[#0f1629] text-[13px] leading-[19.5px]"
                        style={{ padding: '11px 13px' }}
                      />
                    </div>
                    <p className="font-normal text-[#7a8299] text-[11px] leading-[16.5px] pt-[5px]">
                      Maximum simultaneous active orders
                    </p>
                  </div>

                  {/* Delivery Radius */}
                  <div className="flex flex-col gap-0">
                    <label className="font-semibold text-[#4a5568] text-[12px] leading-[18px] pb-[6px]">
                      Delivery Radius (km)
                    </label>
                    <div
                      className="flex flex-col justify-center rounded-[12px] overflow-hidden"
                      style={{ height: 41.5, backgroundColor: '#f4f5f8', border: '1px solid transparent' }}
                    >
                      <input
                        type="number"
                        min={1}
                        value={deliveryRadius}
                        onChange={(e) => setDeliveryRadius(Number(e.target.value))}
                        className="w-full bg-transparent outline-none font-normal text-[#0f1629] text-[13px] leading-[19.5px]"
                        style={{ padding: '11px 13px' }}
                      />
                    </div>
                    <p className="font-normal text-[#7a8299] text-[11px] leading-[16.5px] pt-[5px]">
                      Maximum delivery distance from store
                    </p>
                  </div>

                  {/* Minimum Driver Rating */}
                  <div className="flex flex-col gap-0">
                    <label className="font-semibold text-[#4a5568] text-[12px] leading-[18px] pb-[6px]">
                      Minimum Driver Rating
                    </label>
                    <div
                      className="flex flex-col justify-center rounded-[12px] overflow-hidden"
                      style={{ height: 40, backgroundColor: '#f4f5f8', border: '1px solid transparent' }}
                    >
                      <select
                        value={minDriverRating}
                        onChange={(e) => setMinDriverRating(e.target.value)}
                        className="w-full bg-transparent outline-none font-normal text-[#0f1629] text-[13px] leading-[19.5px]"
                        style={{ padding: '11px 13px' }}
                      >
                        <option value="3.0">3.0 ★ and above</option>
                        <option value="3.5">3.5 ★ and above</option>
                        <option value="4.0">4.0 ★ and above</option>
                        <option value="4.5">4.5 ★ and above</option>
                        <option value="5.0">5.0 ★ only</option>
                      </select>
                    </div>
                    <p className="font-normal text-[#7a8299] text-[11px] leading-[16.5px] pt-[5px]">
                      Only assign to drivers with this rating or above
                    </p>
                  </div>

                </div>
              </div>

              {/* Save Changes */}
              <div className="flex justify-end pt-[4px] mt-[4px]">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-[7px] border-none cursor-pointer rounded-[12px] text-white font-bold text-[13px] leading-[19.5px]"
                  style={{
                    height: 41.5,
                    padding: '9px 22px',
                    background: 'linear-gradient(166.73deg, rgb(56, 78, 133) 0%, rgb(91, 123, 200) 100%)',
                    boxShadow: '0px 4px 7px rgba(56,78,133,0.28)',
                  }}
                >
                  <Save style={{ width: 14, height: 14 }} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* ── SECURITY TAB ── */}
          {activeTab === 'security' && (
            <div
              className="bg-white border border-[rgba(56,78,133,0.07)] rounded-[20px] w-full"
              style={{ boxShadow: '0px 8px 15px rgba(0,0,0,0.06)', padding: 25 }}
            >
              {/* Card header */}
              <div
                className="flex items-center gap-[12px] pb-[17px]"
                style={{ borderBottom: '1px solid rgba(56,78,133,0.07)' }}
              >
                <div
                  className="flex items-center justify-center rounded-[11px] shrink-0"
                  style={{ width: 38, height: 38, backgroundColor: '#eef1f8' }}
                >
                  <ShieldCheck style={{ width: 18, height: 18, color: '#384e85' }} />
                </div>
                <div className="flex flex-col items-start">
                  <p className="font-bold text-[#0f1629] text-[14px] leading-[21px]">Security</p>
                  <p className="font-normal text-[#7a8299] text-[12px] leading-[18px]">Password, authentication, and session settings</p>
                </div>
              </div>

              {/* 2FA toggle row */}
              <div
                className="flex items-center justify-between"
                style={{
                  paddingTop: 20,
                  paddingBottom: 11,
                  borderBottom: '1px solid rgba(56,78,133,0.06)',
                }}
              >
                <div className="flex flex-col">
                  <p className="font-medium text-[#0f1629] text-[13px] leading-[19.5px]">Two-Factor Authentication (2FA)</p>
                  <p className="font-normal text-[#7a8299] text-[11px] leading-[16.5px]">Require OTP on every login for extra security</p>
                </div>
                <button
                  onClick={() => setTwoFA(!twoFA)}
                  className="border-none cursor-pointer relative shrink-0 rounded-[12px]"
                  style={{
                    width: 42, height: 24,
                    backgroundColor: twoFA ? '#384e85' : '#cbd5e0',
                    padding: 0,
                  }}
                >
                  <div
                    className="absolute bg-white rounded-[9px]"
                    style={{
                      width: 18, height: 18, top: 3,
                      left: twoFA ? 20 : 3,
                      boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.2)',
                      transition: 'left 0.15s ease',
                    }}
                  />
                </button>
              </div>

              {/* Session Timeout — full width */}
              <div className="pt-[16px] flex flex-col gap-0">
                <label className="font-semibold text-[#4a5568] text-[12px] leading-[18px] pb-[6px]">
                  Session Timeout (hours)
                </label>
                <div
                  className="flex flex-col justify-center rounded-[12px] overflow-hidden w-full"
                  style={{ height: 40, backgroundColor: '#f4f5f8', border: '1px solid transparent' }}
                >
                  <select
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                    className="w-full bg-transparent outline-none font-normal text-[#0f1629] text-[13px] leading-[19.5px]"
                    style={{ padding: '11px 13px' }}
                  >
                    <option value="1">1 hour</option>
                    <option value="2">2 hours</option>
                    <option value="4">4 hours</option>
                    <option value="8">8 hours</option>
                    <option value="24">24 hours</option>
                    <option value="0">Never</option>
                  </select>
                </div>
                <p className="font-normal text-[#7a8299] text-[11px] leading-[16.5px] pt-[5px]">
                  Automatically log out after this period of inactivity
                </p>
              </div>

              {/* Change Password section */}
              <div className="pt-[22px]">
                <p
                  className="font-semibold text-[#7a8299] text-[12px] leading-[18px] uppercase"
                  style={{ letterSpacing: '0.5px' }}
                >
                  Change Password
                </p>
              </div>

              {/* 3-column password grid */}
              <div className="pt-[12px] grid grid-cols-3 gap-x-[14px]">

                {/* Current Password */}
                <div className="flex flex-col gap-0">
                  <label className="font-semibold text-[#4a5568] text-[12px] leading-[18px] pb-[6px]">
                    Current Password
                  </label>
                  <div
                    className="relative flex flex-col justify-center rounded-[12px] overflow-hidden"
                    style={{ height: 41.5, backgroundColor: '#f4f5f8', border: '1px solid transparent' }}
                  >
                    <input
                      type={showCurrentPw ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-transparent outline-none font-normal text-[rgba(15,22,41,0.5)] text-[13px]"
                      style={{ paddingLeft: 13, paddingRight: 36, paddingTop: 11, paddingBottom: 11 }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPw(!showCurrentPw)}
                      className="absolute border-none bg-transparent cursor-pointer p-0"
                      style={{ right: 13, top: '50%', transform: 'translateY(-50%)' }}
                    >
                      {showCurrentPw
                        ? <EyeOff style={{ width: 14, height: 14, color: '#7a8299' }} />
                        : <Eye style={{ width: 14, height: 14, color: '#7a8299' }} />
                      }
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div className="flex flex-col gap-0">
                  <label className="font-semibold text-[#4a5568] text-[12px] leading-[18px] pb-[6px]">
                    New Password
                  </label>
                  <div
                    className="relative flex flex-col justify-center rounded-[12px] overflow-hidden"
                    style={{ height: 41.5, backgroundColor: '#f4f5f8', border: '1px solid transparent' }}
                  >
                    <input
                      type={showNewPw ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min 8 characters"
                      className="w-full bg-transparent outline-none font-normal text-[rgba(15,22,41,0.5)] text-[13px]"
                      style={{ paddingLeft: 13, paddingRight: 36, paddingTop: 11, paddingBottom: 11 }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPw(!showNewPw)}
                      className="absolute border-none bg-transparent cursor-pointer p-0"
                      style={{ right: 13, top: '50%', transform: 'translateY(-50%)' }}
                    >
                      {showNewPw
                        ? <EyeOff style={{ width: 14, height: 14, color: '#7a8299' }} />
                        : <Eye style={{ width: 14, height: 14, color: '#7a8299' }} />
                      }
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-0">
                  <label className="font-semibold text-[#4a5568] text-[12px] leading-[18px] pb-[6px]">
                    Confirm Password
                  </label>
                  <div
                    className="relative flex flex-col justify-center rounded-[12px] overflow-hidden"
                    style={{ height: 41.5, backgroundColor: '#f4f5f8', border: '1px solid transparent' }}
                  >
                    <input
                      type={showConfirmPw ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat new password"
                      className="w-full bg-transparent outline-none font-normal text-[rgba(15,22,41,0.5)] text-[13px]"
                      style={{ paddingLeft: 13, paddingRight: 36, paddingTop: 11, paddingBottom: 11 }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPw(!showConfirmPw)}
                      className="absolute border-none bg-transparent cursor-pointer p-0"
                      style={{ right: 13, top: '50%', transform: 'translateY(-50%)' }}
                    >
                      {showConfirmPw
                        ? <EyeOff style={{ width: 14, height: 14, color: '#7a8299' }} />
                        : <Eye style={{ width: 14, height: 14, color: '#7a8299' }} />
                      }
                    </button>
                  </div>
                </div>

              </div>

              {/* Save Changes */}
              <div className="flex justify-end pt-[4px] mt-[4px]">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-[7px] border-none cursor-pointer rounded-[12px] text-white font-bold text-[13px] leading-[19.5px]"
                  style={{
                    height: 41.5,
                    padding: '9px 22px',
                    background: 'linear-gradient(166.73deg, rgb(56, 78, 133) 0%, rgb(91, 123, 200) 100%)',
                    boxShadow: '0px 4px 7px rgba(56,78,133,0.28)',
                  }}
                >
                  <Save style={{ width: 14, height: 14 }} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* ── APPEARANCE TAB ── */}
          {activeTab === 'appearance' && (
            <div
              className="bg-white border border-[rgba(56,78,133,0.07)] rounded-[20px] w-full"
              style={{ boxShadow: '0px 8px 15px rgba(0,0,0,0.06)', padding: 25 }}
            >
              {/* Card header */}
              <div
                className="flex items-center gap-[12px] pb-[17px]"
                style={{ borderBottom: '1px solid rgba(56,78,133,0.07)' }}
              >
                <div
                  className="flex items-center justify-center rounded-[11px] shrink-0"
                  style={{ width: 38, height: 38, backgroundColor: '#eef1f8' }}
                >
                  <Palette style={{ width: 18, height: 18, color: '#384e85' }} />
                </div>
                <div className="flex flex-col items-start">
                  <p className="font-bold text-[#0f1629] text-[14px] leading-[21px]">Appearance</p>
                  <p className="font-normal text-[#7a8299] text-[12px] leading-[18px]">Customize how the dashboard looks and feels</p>
                </div>
              </div>

              {/* Theme Section */}
              <div className="pt-[20px]">
                <label className="font-semibold text-[#4a5568] text-[12px] leading-[18px]">Theme</label>
                <div className="pt-[6px] grid grid-cols-3 gap-[10px]">
                  {([
                    { id: 'light', label: 'Light', sub: 'Clean white interface', icon: <Sun style={{ width: 18, height: 18, color: theme === 'light' ? '#384e85' : '#7a8299' }} /> },
                    { id: 'dark',  label: 'Dark',  sub: 'Easy on the eyes',     icon: <Moon style={{ width: 18, height: 18, color: theme === 'dark'  ? '#384e85' : '#7a8299' }} /> },
                    { id: 'system',label: 'System',sub: 'Follow OS preference', icon: <Monitor style={{ width: 18, height: 18, color: theme === 'system' ? '#384e85' : '#7a8299' }} /> },
                  ] as Array<{ id: 'light'|'dark'|'system'; label: string; sub: string; icon: React.ReactNode }>).map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className="flex flex-col items-center justify-center border-none cursor-pointer rounded-[14px] text-center"
                      style={{
                        padding: '18px 14px',
                        height: 96.5,
                        backgroundColor: theme === t.id ? '#eef1f8' : '#fafafa',
                        border: theme === t.id ? '2px solid #384e85' : '2px solid rgba(56,78,133,0.12)',
                      }}
                    >
                      {t.icon}
                      <p
                        className="mt-[6px] text-[13px] leading-[19.5px] text-center"
                        style={{
                          fontWeight: theme === t.id ? 700 : 500,
                          color: theme === t.id ? '#384e85' : '#0f1629',
                        }}
                      >
                        {t.label}
                      </p>
                      <p className="font-medium text-[#7a8299] text-[10px] leading-[15px] text-center mt-[2px]">{t.sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Display Density */}
              <div className="pt-[18px]">
                <label className="font-semibold text-[#4a5568] text-[12px] leading-[18px]">Display Density</label>
                <div className="pt-[6px] flex gap-[8px]">
                  {([
                    { id: 'compact',     label: 'Compact' },
                    { id: 'comfortable', label: 'Comfortable' },
                    { id: 'spacious',    label: 'Spacious' },
                  ] as Array<{ id: 'compact'|'comfortable'|'spacious'; label: string }>).map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setDensity(d.id)}
                      className="flex-1 border-none cursor-pointer rounded-[10px] text-center"
                      style={{
                        padding: 11,
                        backgroundColor: density === d.id ? '#eef1f8' : 'transparent',
                        border: density === d.id ? '2px solid #384e85' : '2px solid rgba(56,78,133,0.12)',
                      }}
                    >
                      <span
                        className="capitalize text-[12px] leading-[18px]"
                        style={{
                          fontWeight: density === d.id ? 700 : 500,
                          color: density === d.id ? '#384e85' : '#4a5568',
                        }}
                      >
                        {d.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div className="pt-[18px]">
                <label className="font-semibold text-[#4a5568] text-[12px] leading-[18px]">Language</label>
                <div
                  className="pt-[6px] relative flex items-center rounded-[12px] overflow-hidden"
                  style={{ height: 40, backgroundColor: '#f4f5f8' }}
                >
                  <Globe
                    style={{ width: 14, height: 14, color: '#7a8299', position: 'absolute', left: 11, pointerEvents: 'none' }}
                  />
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-transparent outline-none font-normal text-[#0f1629] text-[13px] leading-[19.5px]"
                    style={{ paddingLeft: 34, paddingRight: 13, paddingTop: 0, paddingBottom: 0, height: '100%' }}
                  >
                    <option value="en">English</option>
                    <option value="ar">عربي (Arabic)</option>
                    <option value="fr">Français (French)</option>
                    <option value="es">Español (Spanish)</option>
                    <option value="de">Deutsch (German)</option>
                    <option value="tr">Türkçe (Turkish)</option>
                  </select>
                </div>
              </div>

              {/* Save Changes */}
              <div className="flex justify-end pt-[18px]">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-[7px] border-none cursor-pointer rounded-[12px] text-white font-bold text-[13px] leading-[19.5px]"
                  style={{
                    height: 41.5,
                    padding: '9px 22px',
                    background: 'linear-gradient(166.73deg, rgb(56, 78, 133) 0%, rgb(91, 123, 200) 100%)',
                    boxShadow: '0px 4px 7px rgba(56,78,133,0.28)',
                  }}
                >
                  <Save style={{ width: 14, height: 14 }} />
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Spacer to push content below the absolute panels */}
        <div style={{ height: 550 }} />
      </div>
    </div>
  );
};
