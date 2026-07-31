import React, { useState } from 'react';
import { 
  User, 
  Building2, 
  Bell, 
  Truck, 
  ShieldCheck, 
  Sun, 
  Check, 
  Save, 
  Globe, 
  Lock, 
  Smartphone, 
  CreditCard
} from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'business' | 'notifications' | 'delivery' | 'security' | 'appearance'>('profile');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Profile State
  const [firstName, setFirstName] = useState('Admin');
  const [lastName, setLastName] = useState('User');
  const [email, setEmail] = useState('admin@rofoof.com');
  const [phone, setPhone] = useState('+20 100 000 0000');
  const [language, setLanguage] = useState('en');

  // Business State
  const [storeName, setStoreName] = useState('ROFOOF Grocery & Delivery');
  const [taxId, setTaxId] = useState('EG-9842104-TAX');
  const [currency, setCurrency] = useState('USD');

  // Notifications State
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);

  // Delivery Config
  const [minOrder, setMinOrder] = useState(15);
  const [deliveryFee, setDeliveryFee] = useState(3.50);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 select-none pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-extrabold text-[#0F1629] tracking-tight">System &amp; Account Settings</h1>
          <p className="text-[13px] text-[#7A8299] mt-0.5">Manage profile, store configuration, notifications, delivery rules, and security</p>
        </div>

        {savedSuccess && (
          <div className="px-3.5 py-1.5 rounded-[12px] bg-[#ECFDF5] text-[#10B981] text-[12.5px] font-bold flex items-center gap-1.5 border border-[#10B981]/20 animate-fadeIn">
            <Check className="w-4 h-4" /> Settings saved successfully!
          </div>
        )}
      </div>

      {/* Main Settings Split Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Column: Vertical Settings Tabs */}
        <Card className="p-3 bg-white border border-[#384E85]/8 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)] space-y-1 h-fit">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'business', label: 'Business', icon: Building2 },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'delivery', label: 'Delivery', icon: Truck },
            { id: 'security', label: 'Security', icon: ShieldCheck },
            { id: 'appearance', label: 'Appearance', icon: Sun },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full h-10 px-3.5 rounded-[12px] text-[13px] font-bold flex items-center gap-3 transition cursor-pointer border-none text-left ${
                  isActive
                    ? 'bg-[#384E85] text-white shadow-xs'
                    : 'text-[#4A5568] hover:bg-[#EEF1F8] hover:text-[#0F1629]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </Card>

        {/* Right Column: Tab Content */}
        <div className="md:col-span-3 space-y-6">
          {/* TAB 1: PROFILE */}
          {activeTab === 'profile' && (
            <Card className="p-6 bg-white border border-[#384E85]/8 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)] space-y-5">
              <div>
                <h3 className="text-[16px] font-extrabold text-[#0F1629]">Personal Information</h3>
                <p className="text-[12px] text-[#7A8299]">Update your admin details and public information</p>
              </div>

              {/* Avatar Upload Preview */}
              <div className="flex items-center gap-4 p-4 bg-[#FAFAFA] border border-[#384E85]/8 rounded-[16px]">
                <div className="w-14 h-14 rounded-[16px] bg-gradient-to-br from-[#384E85] to-[#6B8ED4] text-white flex items-center justify-center font-bold text-[18px]">
                  AK
                </div>
                <div>
                  <div className="font-extrabold text-[#0F1629] text-[14px]">Admin User</div>
                  <div className="text-[11px] font-bold text-[#384E85]">Super Admin</div>
                  <div className="flex gap-2 mt-2">
                    <button className="h-7 px-3 bg-[#EEF1F8] hover:bg-[#E2E7F3] text-[#384E85] text-[11px] font-bold rounded-[8px] border-none cursor-pointer">
                      Change Photo
                    </button>
                    <button className="h-7 px-3 bg-gray-100 hover:bg-gray-200 text-gray-600 text-[11px] font-bold rounded-[8px] border-none cursor-pointer">
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[12.5px]">
                <div>
                  <label className="block text-[11px] font-bold text-[#0F1629] mb-1">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full h-9 px-3 bg-[#F4F5F8] border border-[#384E85]/10 rounded-[8px] outline-none font-semibold text-[#0F1629]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#0F1629] mb-1">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full h-9 px-3 bg-[#F4F5F8] border border-[#384E85]/10 rounded-[8px] outline-none font-semibold text-[#0F1629]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#0F1629] mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-9 px-3 bg-[#F4F5F8] border border-[#384E85]/10 rounded-[8px] outline-none font-semibold text-[#0F1629]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#0F1629] mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-9 px-3 bg-[#F4F5F8] border border-[#384E85]/10 rounded-[8px] outline-none font-semibold text-[#0F1629]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#F3F4F6] flex justify-end">
                <button
                  onClick={handleSave}
                  className="h-9 px-5 rounded-[12px] bg-[#384E85] hover:bg-[#2A3A65] text-white text-[12.5px] font-bold flex items-center gap-1.5 transition cursor-pointer border-none"
                >
                  <Save className="w-4 h-4" /> Save Profile
                </button>
              </div>
            </Card>
          )}

          {/* TAB 2: BUSINESS */}
          {activeTab === 'business' && (
            <Card className="p-6 bg-white border border-[#384E85]/8 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)] space-y-5">
              <div>
                <h3 className="text-[16px] font-extrabold text-[#0F1629]">Business Information</h3>
                <p className="text-[12px] text-[#7A8299]">Manage your store branding, tax details, and currency</p>
              </div>

              <div className="space-y-4 text-[12.5px]">
                <div>
                  <label className="block text-[11px] font-bold text-[#0F1629] mb-1">Store Name</label>
                  <input
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="w-full h-9 px-3 bg-[#F4F5F8] border border-[#384E85]/10 rounded-[8px] outline-none font-semibold text-[#0F1629]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#0F1629] mb-1">Tax Registration ID</label>
                    <input
                      type="text"
                      value={taxId}
                      onChange={(e) => setTaxId(e.target.value)}
                      className="w-full h-9 px-3 bg-[#F4F5F8] border border-[#384E85]/10 rounded-[8px] outline-none font-semibold text-[#0F1629]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#0F1629] mb-1">Base Currency</label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full h-9 px-2 bg-[#F4F5F8] border border-[#384E85]/10 rounded-[8px] outline-none font-semibold text-[#0F1629]"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EGP">EGP (EGP)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="SAR">SAR (SAR)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F3F4F6] flex justify-end">
                <button
                  onClick={handleSave}
                  className="h-9 px-5 rounded-[12px] bg-[#384E85] hover:bg-[#2A3A65] text-white text-[12.5px] font-bold flex items-center gap-1.5 transition cursor-pointer border-none"
                >
                  <Save className="w-4 h-4" /> Save Business Info
                </button>
              </div>
            </Card>
          )}

          {/* TAB 3: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <Card className="p-6 bg-white border border-[#384E85]/8 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)] space-y-5">
              <div>
                <h3 className="text-[16px] font-extrabold text-[#0F1629]">Notification Preferences</h3>
                <p className="text-[12px] text-[#7A8299]">Choose how you receive alerts and system updates</p>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-[#FAFAFA] border border-[#384E85]/8 rounded-[16px] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#0F1629] text-[13px]">Email Notifications</div>
                    <div className="text-[11px] text-[#7A8299]">Receive daily summaries and order invoices</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailNotifs}
                    onChange={(e) => setEmailNotifs(e.target.checked)}
                    className="w-4.5 h-4.5 accent-[#10B981] cursor-pointer"
                  />
                </div>

                <div className="p-4 bg-[#FAFAFA] border border-[#384E85]/8 rounded-[16px] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#0F1629] text-[13px]">SMS &amp; WhatsApp Alerts</div>
                    <div className="text-[11px] text-[#7A8299]">Instant urgent low stock and driver emergency alerts</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={smsNotifs}
                    onChange={(e) => setSmsNotifs(e.target.checked)}
                    className="w-4.5 h-4.5 accent-[#10B981] cursor-pointer"
                  />
                </div>

                <div className="p-4 bg-[#FAFAFA] border border-[#384E85]/8 rounded-[16px] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#0F1629] text-[13px]">Browser Push Notifications</div>
                    <div className="text-[11px] text-[#7A8299]">Real-time live order dispatch alerts</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={pushNotifs}
                    onChange={(e) => setPushNotifs(e.target.checked)}
                    className="w-4.5 h-4.5 accent-[#10B981] cursor-pointer"
                  />
                </div>
              </div>
            </Card>
          )}

          {/* TAB 4: DELIVERY */}
          {activeTab === 'delivery' && (
            <Card className="p-6 bg-white border border-[#384E85]/8 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)] space-y-5">
              <div>
                <h3 className="text-[16px] font-extrabold text-[#0F1629]">Delivery Settings &amp; Thresholds</h3>
                <p className="text-[12px] text-[#7A8299]">Configure minimum order value and default delivery fee</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[12.5px]">
                <div>
                  <label className="block text-[11px] font-bold text-[#0F1629] mb-1">Minimum Order Amount ($)</label>
                  <input
                    type="number"
                    value={minOrder}
                    onChange={(e) => setMinOrder(Number(e.target.value))}
                    className="w-full h-9 px-3 bg-[#F4F5F8] border border-[#384E85]/10 rounded-[8px] outline-none font-semibold text-[#0F1629]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#0F1629] mb-1">Default Delivery Fee ($)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={deliveryFee}
                    onChange={(e) => setDeliveryFee(Number(e.target.value))}
                    className="w-full h-9 px-3 bg-[#F4F5F8] border border-[#384E85]/10 rounded-[8px] outline-none font-semibold text-[#0F1629]"
                  />
                </div>
              </div>
            </Card>
          )}

          {/* TAB 5 & 6: SECURITY / APPEARANCE */}
          {(activeTab === 'security' || activeTab === 'appearance') && (
            <Card className="p-6 bg-white border border-[#384E85]/8 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)] space-y-4">
              <h3 className="text-[16px] font-extrabold text-[#0F1629] capitalize">{activeTab} Configuration</h3>
              <p className="text-[12px] text-[#7A8299]">Security policies, 2FA, and interface themes are active and up to date.</p>
              <div className="p-4 bg-[#ECFDF5] border border-[#10B981]/20 rounded-[14px] text-[12px] font-bold text-[#065F46] flex items-center gap-2">
                <Check className="w-4 h-4" /> All security protocols and color themes operating normally.
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
