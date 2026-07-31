import React, { useState } from 'react';
import { X, Bell, Send, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

interface SendNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SendNotificationModal: React.FC<SendNotificationModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('🔥 Weekend Super Sale!');
  const [body, setBody] = useState('Enjoy up to 30% OFF on all fresh fruits & dairy products. Order now!');
  const [targetCat, setTargetCat] = useState('all');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[840px] overflow-hidden flex flex-col max-h-[92vh] animate-fadeIn">
        {/* Header */}
        <div className="px-7 py-5 bg-[#384E85] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition border-none">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h2 className="text-[17px] font-bold tracking-tight">Create Push Notification</h2>
              <div className="text-[12px] text-white/80">Configure broadcast message and live app preview</div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition border-none">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-7 flex flex-col md:flex-row gap-6 overflow-y-auto flex-1 text-[13px] bg-[#FAFAFA]">
          {/* Form Column */}
          <div className="flex-1 space-y-4 bg-white border border-[#E5E7EB] rounded-[16px] p-6 shadow-xs">
            <div>
              <label className="block text-[12px] font-semibold text-[#0F1629] mb-1">Notification Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter compelling headline..."
                className="w-full h-[41.5px] px-3 bg-[#F4F5F8] rounded-[12px] text-[13px] text-[#0F1629] outline-none font-sans"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#0F1629] mb-1">Notification Body Message *</label>
              <textarea
                rows={3}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write message details..."
                className="w-full p-3 bg-[#F4F5F8] rounded-[12px] text-[13px] text-[#0F1629] outline-none font-sans resize-y"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#0F1629] mb-1">Target Customer Segment</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Users (42.8K)' },
                  { id: 'b2b', label: 'Wholesale B2B Only' },
                  { id: 'b2c', label: 'Retail Shoppers' },
                  { id: 'vip', label: 'VIP Credit Accounts' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setTargetCat(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition cursor-pointer border-none ${
                      targetCat === cat.id ? 'bg-gradient-to-r from-[#384E85] to-[#5B7BC8] text-white shadow-sm font-bold' : 'bg-[#F4F4F5] text-[#4B5563] hover:bg-[#E5E7EB]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] space-y-1">
              <div className="text-[12px] font-semibold text-[#4A5568]">Estimated Reach</div>
              <div className="text-[22px] font-extrabold text-[#384E85]">42,891 users</div>
              <div className="text-[11px] text-[#6B7280]">Message will be delivered immediately to active devices.</div>
            </div>
          </div>

          {/* Right Mobile Smartphone Preview Column matching modals.html */}
          <div className="w-full md:w-[280px] flex flex-col items-center justify-center shrink-0 border-l border-[#384E85]/8 md:pl-6">
            <div className="text-[10px] font-bold text-[#7A8299] uppercase tracking-[0.5px] mb-3">Live Mobile App Simulator</div>
            
            <div className="w-[256px] h-[390px] border-[7px] border-[#4D69AD] rounded-[32px] bg-[#FAFAFA] shadow-xl overflow-hidden flex flex-col">
              <div className="h-[36px] bg-white border-b border-[#E5E7EB] flex items-center justify-center shrink-0">
                <span className="font-semibold text-[12px] text-[#4A5568]">Rofof Grocery App</span>
              </div>

              <div className="p-3 flex-1 overflow-y-auto space-y-2 text-left">
                {/* Push Notification Card inside simulator */}
                <div className="bg-white border border-[#E5E7EB] shadow-xs rounded-[16px] p-3 space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <img src="/img/logo.png" alt="Rofof" className="w-4 h-4 rounded" />
                    <span className="font-bold text-[11px] text-[#4A5568]">ROFOOF Push</span>
                    <span className="text-[9px] text-[#9CA3AF] ml-auto">now</span>
                  </div>
                  <div className="font-bold text-[12.5px] text-[#0F1629]">{title || 'Notification Title'}</div>
                  <div className="text-[11px] text-[#6B7280] leading-tight">{body || 'Notification body text...'}</div>
                  <button className="w-full h-7 mt-1.5 rounded-full bg-gradient-to-r from-[#384E85] to-[#5B7BC8] text-white font-bold text-[11px] border-none cursor-pointer">
                    View Deal
                  </button>
                </div>

                <div className="h-14 bg-white border border-[#E5E7EB] rounded-[12px] opacity-40" />
                <div className="h-14 bg-white border border-[#E5E7EB] rounded-[12px] opacity-40" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-7 py-3.5 bg-[#FAFAFA] border-t border-[#384E85]/8 flex items-center justify-between h-[64px] shrink-0">
          <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <button
            onClick={onClose}
            className="h-9 px-5 rounded-[12px] bg-gradient-to-r from-[#384E85] to-[#2A3A65] text-white text-[13px] font-bold shadow-[0px_4px_14px_rgba(56,78,133,0.3)] hover:shadow-[0px_6px_20px_rgba(56,78,133,0.4)] transition cursor-pointer border-none flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Send Broadcast Push</span>
          </button>
        </div>
      </div>
    </div>
  );
};
