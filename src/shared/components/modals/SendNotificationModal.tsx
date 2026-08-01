import React, { useState } from 'react';
import { X, Bell, Send, ArrowLeft, Upload, Calendar, Check, Layers, Users, MapPin } from 'lucide-react';

interface SendNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotificationSent?: (newNotif: any) => void;
}

export const SendNotificationModal: React.FC<SendNotificationModalProps> = ({ isOpen, onClose, onNotificationSent }) => {
  // Form State
  const [adTitle, setAdTitle] = useState('Fresh Organic Milk 20% Off');
  const [description, setDescription] = useState('Get 20% off on all dairy and fresh food products today!');
  const [ctaText, setCtaText] = useState('Shop Now');
  const [destinationUrl, setDestinationUrl] = useState('/marketing/offers');
  
  // Image State
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Schedule State
  const [startDate, setStartDate] = useState('2026-08-01');
  const [endDate, setEndDate] = useState('2026-08-15');
  const [runContinuously, setRunContinuously] = useState(false);

  // Placement State
  const [placement, setPlacement] = useState<'home' | 'search' | 'notif'>('home');

  // Targeting State
  const [userType, setUserType] = useState<'customers' | 'drivers' | 'both'>('customers');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Dairy']);
  const [selectedCities, setSelectedCities] = useState<string[]>(['Riyadh', 'Jeddah', 'Cairo']);

  if (!isOpen) return null;

  const handleCategoryToggle = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleRemoveCity = (city: string) => {
    setSelectedCities(prev => prev.filter(c => c !== city));
  };

  const handleSend = () => {
    if (onNotificationSent) {
      onNotificationSent({
        id: Date.now().toString(),
        title: adTitle || 'New Promotion',
        body: description,
        targetSegment: userType === 'customers' ? 'Customers Only' : userType === 'drivers' ? 'Drivers Fleet' : 'All Users',
        sentAt: 'Just now',
        deliveredCount: 125000,
        openRate: 52.4,
        ctr: 24.1,
        status: 'sent'
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#0F1629]/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200 select-none">
      <div className="bg-white rounded-[24px] shadow-[0px_40px_80px_0px_rgba(0,0,0,0.2)] w-full max-w-[934px] overflow-hidden relative flex flex-col max-h-[92vh]">
        
        {/* Header with Dark Blue Gradient */}
        <div className="bg-gradient-to-r from-[#384E85] to-[#2A3A65] px-6 py-4 flex items-center justify-between text-white shrink-0">
          <div>
            <h3 className="font-extrabold text-[16px] leading-[24px] text-white tracking-tight">Add New Advertisement</h3>
            <p className="text-[12px] leading-[18px] text-white/70">Send Notification &amp; Promotion Campaign</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-[10px] bg-white/15 hover:bg-white/25 flex items-center justify-center transition cursor-pointer text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: 2 Columns */}
        <div className="p-6 flex flex-col md:flex-row gap-7 overflow-y-auto flex-1 text-xs text-[#0F1629] bg-[#FAFAFA]">
          
          {/* Left Column: Form Cards */}
          <div className="flex-1 space-y-5">
            {/* Page Title Row */}
            <div className="flex items-center gap-3.5 pb-1">
              <button 
                type="button" 
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#4A5568] hover:bg-gray-50 transition cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-[22px] font-semibold text-[#4A5568] leading-tight tracking-tight">Send Notification</h2>
                <p className="text-[13px] text-[#6B7280]">Configure ad creative, targeting, and schedule</p>
              </div>
            </div>

            {/* Card 1: Creative */}
            <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-5 shadow-2xs space-y-4">
              <div>
                <h4 className="font-semibold text-[15px] text-[#4A5568]">Creative</h4>
                <p className="text-[12.5px] text-[#6B7280]">Upload your ad assets and define the copy.</p>
              </div>

              {/* Image Upload Box */}
              <div className="space-y-1.5">
                <label className="text-[12.5px] font-medium text-[#4A5568]">Ad Image</label>
                <div className="bg-[#F9FAFB] border-2 border-dashed border-[#E5E7EB] hover:border-[#384E85] rounded-[12px] p-4 flex flex-col items-center justify-center text-center cursor-pointer transition min-h-[120px]">
                  <Upload className="w-7 h-7 text-[#72767C] mb-1.5" />
                  <p className="text-[13px] font-medium text-[#72767C]">Drop image or click to upload</p>
                  <p className="text-[11.5px] text-[#6B7280] mt-0.5">1200×400 recommended · PNG, JPG up to 5MB</p>
                </div>
              </div>

              {/* Ad Title */}
              <div className="space-y-1.5">
                <label className="text-[12.5px] font-medium text-[#4A5568]">Ad Title</label>
                <input
                  type="text"
                  value={adTitle}
                  onChange={(e) => setAdTitle(e.target.value)}
                  placeholder="Enter ad title"
                  className="w-full h-[41.5px] px-3.5 bg-white border border-[#E5E7EB] focus:border-[#384E85] rounded-[8px] text-[13px] text-[#0F1629] placeholder-[#9CA3AF] outline-none transition"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-[12.5px] font-medium text-[#4A5568]">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter ad description"
                  className="w-full p-3 bg-white border border-[#E5E7EB] focus:border-[#384E85] rounded-[8px] text-[13px] text-[#0F1629] placeholder-[#9CA3AF] outline-none transition resize-none"
                />
              </div>

              {/* CTA Button Text & Destination URL (2 Columns) */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="text-[12.5px] font-medium text-[#4A5568]">CTA Button Text</label>
                  <input
                    type="text"
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    placeholder="Shop Now"
                    className="w-full h-[41.5px] px-3.5 bg-white border border-[#E5E7EB] focus:border-[#384E85] rounded-[8px] text-[13px] text-[#0F1629] outline-none transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12.5px] font-medium text-[#4A5568]">Destination URL</label>
                  <input
                    type="text"
                    value={destinationUrl}
                    onChange={(e) => setDestinationUrl(e.target.value)}
                    placeholder="/offers"
                    className="w-full h-[41.5px] px-3.5 bg-white border border-[#E5E7EB] focus:border-[#384E85] rounded-[8px] text-[13px] text-[#0F1629] outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Schedule */}
            <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-5 shadow-2xs space-y-4">
              <div>
                <h4 className="font-semibold text-[15px] text-[#4A5568]">Schedule</h4>
                <p className="text-[12.5px] text-[#6B7280]">Set when your campaign should run.</p>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="text-[12.5px] font-medium text-[#4A5568]">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full h-[41.5px] px-3.5 bg-white border border-[#E5E7EB] focus:border-[#384E85] rounded-[8px] text-[13px] text-[#0F1629] outline-none transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12.5px] font-medium text-[#4A5568]">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    disabled={runContinuously}
                    className="w-full h-[41.5px] px-3.5 bg-white border border-[#E5E7EB] focus:border-[#384E85] rounded-[8px] text-[13px] text-[#0F1629] outline-none transition disabled:opacity-50"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={runContinuously}
                  onChange={(e) => setRunContinuously(e.target.checked)}
                  className="rounded text-[#384E85] focus:ring-[#384E85] w-4 h-4 accent-[#384E85]"
                />
                <span className="text-[12.5px] text-[#4A5568]">Run continuously (no end date)</span>
              </label>
            </div>

            {/* Card 3: Placement */}
            <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-5 shadow-2xs space-y-4">
              <div>
                <h4 className="font-semibold text-[15px] text-[#4A5568]">Placement</h4>
                <p className="text-[12.5px] text-[#6B7280]">Choose where your ad will appear.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'home', label: 'Home Page Banner' },
                  { id: 'search', label: 'Search Results' },
                  { id: 'notif', label: 'Notifications Section' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPlacement(item.id as any)}
                    className={`p-3 rounded-[10px] border text-left font-medium text-[13px] flex items-center gap-2.5 transition cursor-pointer ${
                      placement === item.id 
                        ? 'bg-[#FAFBFD] border-[#384E85] text-[#384E85] font-semibold shadow-2xs' 
                        : 'bg-white border-[#E5E7EB] text-[#4A5568] hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${placement === item.id ? 'bg-[#384E85] border-[#384E85] text-white' : 'border-gray-300 bg-white'}`}>
                      {placement === item.id && <Check className="w-3 h-3" />}
                    </div>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Card 4: Targeting */}
            <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-5 shadow-2xs space-y-4">
              <div>
                <h4 className="font-semibold text-[15px] text-[#4A5568]">Targeting</h4>
                <p className="text-[12.5px] text-[#6B7280]">Define who should see this advertisement.</p>
              </div>

              {/* User Type Radio */}
              <div className="space-y-1.5">
                <label className="text-[12.5px] font-medium text-[#4A5568]">User Type</label>
                <div className="flex items-center gap-5 pt-1">
                  {[
                    { id: 'customers', label: 'Customers only' },
                    { id: 'drivers', label: 'Drivers only' },
                    { id: 'both', label: 'Both' }
                  ].map(u => (
                    <label key={u.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="userType"
                        checked={userType === u.id}
                        onChange={() => setUserType(u.id as any)}
                        className="accent-[#384E85] w-4 h-4"
                      />
                      <span className="text-[13px] text-[#4A5568]">{u.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Categories Pills */}
              <div className="space-y-1.5">
                <label className="text-[12.5px] font-medium text-[#4A5568]">Target Categories</label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['Bakery', 'Fresh', 'Dairy', 'Snacks', 'Meat'].map(cat => {
                    const isSelected = selectedCategories.includes(cat);
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => handleCategoryToggle(cat)}
                        className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#384E85] to-[#5B7BC8] text-white font-bold shadow-xs'
                            : 'bg-[#F4F4F5] text-[#4B5563] hover:bg-[#E5E7EB]'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cities Tag Input */}
              <div className="space-y-1.5">
                <label className="text-[12.5px] font-medium text-[#4A5568]">Target Locations</label>
                <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] p-3 flex flex-wrap gap-2">
                  {selectedCities.map(city => (
                    <span key={city} className="bg-white border border-[#384E85]/40 text-[#4A5568] px-3 py-1 rounded-full text-[12px] font-medium flex items-center gap-1.5">
                      {city}
                      <button type="button" onClick={() => handleRemoveCity(city)} className="text-gray-400 hover:text-gray-600 cursor-pointer">×</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Live Mobile App Simulator */}
          <div className="w-full md:w-[320px] shrink-0 space-y-4">
            <h5 className="text-[12px] font-semibold text-[#6B7280] tracking-[0.65px] uppercase">Live Preview</h5>
            
            {/* Phone Screen Frame */}
            <div className="w-[320px] h-[530px] border-8 border-[#4D69AD] rounded-[32px] bg-white shadow-xl overflow-hidden flex flex-col relative mx-auto">
              {/* App Top Bar */}
              <div className="h-[44px] bg-white border-b border-[#E5E7EB] flex items-center justify-center shrink-0">
                <span className="font-semibold text-[13px] text-[#4A5568]">ROFOOF Home</span>
              </div>

              {/* App Content Body */}
              <div className="p-3.5 bg-[#FAFAFA] flex-1 overflow-y-auto space-y-3">
                {/* Live Ad Card */}
                <div className="bg-white border border-[#E5E7EB] rounded-[16px] shadow-xs overflow-hidden">
                  <div className="h-[110px] bg-[#F4F4F5] flex items-center justify-center relative">
                    <span className="text-2xl">🛍️</span>
                    <span className="absolute top-2 left-2 bg-[#384E85] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">Ad</span>
                  </div>
                  <div className="p-3 space-y-1.5">
                    <h6 className="font-semibold text-[14px] text-[#4A5568] leading-tight line-clamp-1">{adTitle || 'Ad Title'}</h6>
                    <p className="text-[12px] text-[#6B7280] leading-snug line-clamp-2">{description || 'Ad Description'}</p>
                    <button type="button" className="w-full h-8 mt-2 rounded-[55px] bg-gradient-to-r from-[#384E85] to-[#5B7BC8] text-white font-bold text-[12px] border-none shadow-xs">
                      {ctaText || 'Shop Now'}
                    </button>
                  </div>
                </div>

                <div className="h-16 bg-white border border-[#E5E7EB] rounded-[14px] opacity-40" />
                <div className="h-16 bg-white border border-[#E5E7EB] rounded-[14px] opacity-40" />
              </div>
            </div>

            {/* Estimated Reach Stat Card */}
            <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-4 shadow-2xs space-y-1">
              <span className="text-[12.5px] font-semibold text-[#4A5568]">Estimated Reach</span>
              <div className="flex items-baseline gap-2">
                <span className="text-[24px] font-extrabold text-[#4A5568]">125K</span>
                <span className="text-[13px] text-[#6B7280]">users / day</span>
              </div>
              <p className="text-[11.5px] text-[#6B7280] pt-1">
                Based on your selected targeting: {selectedCategories.join(', ') || 'All Categories'}
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-[#FAFAFA] border-t border-[rgba(56,78,133,0.08)] px-6 py-3.5 flex items-center justify-end gap-2.5 rounded-b-[24px] shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-[19px] py-[10px] rounded-[12px] border border-[rgba(56,78,133,0.18)] text-[#4A5568] text-[13px] font-semibold hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSend}
            className="px-[22px] py-[9px] rounded-[12px] bg-gradient-to-r from-[#2A3A65] to-[#384E85] text-white hover:opacity-95 text-[13px] font-bold flex items-center gap-2 shadow-sm transition cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-white" />
            <span>Send Broadcast Notification</span>
          </button>
        </div>

      </div>
    </div>
  );
};
