import React from 'react';
import { X, HelpCircle, BookOpen, MessageCircle, Mail, ExternalLink, Phone, FileText, Zap } from 'lucide-react';

interface HelpSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const resources = [
  {
    icon: BookOpen,
    title: 'Documentation',
    desc: 'Browse the full product docs and guides',
    color: '#384e85',
    bg: '#eef1f8',
    href: '#',
  },
  {
    icon: Zap,
    title: 'Getting Started',
    desc: 'Quick setup guide for new admins',
    color: '#10b981',
    bg: '#ecfdf5',
    href: '#',
  },
  {
    icon: FileText,
    title: 'Release Notes',
    desc: "See what's new in the latest version",
    color: '#f59e0b',
    bg: '#fffbeb',
    href: '#',
  },
];

const contactOptions = [
  {
    icon: MessageCircle,
    title: 'Live Chat',
    desc: 'Available 9am – 6pm (Sun–Thu)',
    label: 'Start Chat',
    color: '#384e85',
    bg: '#eef1f8',
  },
  {
    icon: Mail,
    title: 'Email Support',
    desc: 'support@rofoof.com',
    label: 'Send Email',
    color: '#10b981',
    bg: '#ecfdf5',
  },
  {
    icon: Phone,
    title: 'Phone Support',
    desc: '+20 100 000 1234 (Business hours)',
    label: 'Call Now',
    color: '#7c3aed',
    bg: '#f5f3ff',
  },
];

export const HelpSupportModal: React.FC<HelpSupportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(15,22,41,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-white rounded-[20px] w-full max-w-[520px] mx-4 overflow-hidden"
        style={{ boxShadow: '0px 20px 60px rgba(0,0,0,0.18)' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-[25px] py-[20px]"
          style={{ borderBottom: '1px solid rgba(56,78,133,0.07)' }}
        >
          <div className="flex items-center gap-[12px]">
            <div
              className="flex items-center justify-center rounded-[11px] shrink-0"
              style={{ width: 38, height: 38, backgroundColor: '#eef1f8' }}
            >
              <HelpCircle style={{ width: 18, height: 18, color: '#384e85' }} />
            </div>
            <div>
              <p className="font-bold text-[#0f1629] text-[14px] leading-[21px]">Help &amp; Support</p>
              <p className="font-normal text-[#7a8299] text-[12px] leading-[18px]">Resources and contact options</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="border-none bg-transparent cursor-pointer rounded-[8px] p-[6px] hover:bg-[#f4f5f8] transition"
          >
            <X style={{ width: 16, height: 16, color: '#7a8299' }} />
          </button>
        </div>

        {/* Body */}
        <div className="px-[25px] py-[20px] flex flex-col gap-[20px]">

          {/* Resources */}
          <div>
            <p className="font-semibold text-[#4a5568] text-[12px] leading-[18px] mb-[10px]">
              Resources
            </p>
            <div className="flex flex-col gap-[8px]">
              {resources.map((r) => {
                const Icon = r.icon;
                return (
                  <a
                    key={r.title}
                    href={r.href}
                    className="flex items-center gap-[12px] p-[12px] rounded-[14px] no-underline transition group"
                    style={{ border: '1px solid rgba(56,78,133,0.08)', backgroundColor: '#fafafa' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f4f5f8')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fafafa')}
                  >
                    <div
                      className="flex items-center justify-center rounded-[10px] shrink-0"
                      style={{ width: 34, height: 34, backgroundColor: r.bg }}
                    >
                      <Icon style={{ width: 16, height: 16, color: r.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#0f1629] text-[13px] leading-[19.5px]">{r.title}</p>
                      <p className="font-normal text-[#7a8299] text-[11px] leading-[16.5px]">{r.desc}</p>
                    </div>
                    <ExternalLink style={{ width: 14, height: 14, color: '#7a8299' }} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="font-semibold text-[#4a5568] text-[12px] leading-[18px] mb-[10px]">
              Contact Us
            </p>
            <div className="grid grid-cols-3 gap-[8px]">
              {contactOptions.map((c) => {
                const Icon = c.icon;
                return (
                  <button
                    key={c.title}
                    className="flex flex-col items-center gap-[8px] p-[14px_10px] rounded-[14px] border-none cursor-pointer text-center transition"
                    style={{ border: '1px solid rgba(56,78,133,0.08)', backgroundColor: '#fafafa' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f4f5f8')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fafafa')}
                  >
                    <div
                      className="flex items-center justify-center rounded-[10px]"
                      style={{ width: 36, height: 36, backgroundColor: c.bg }}
                    >
                      <Icon style={{ width: 17, height: 17, color: c.color }} />
                    </div>
                    <div>
                      <p className="font-bold text-[#0f1629] text-[12px] leading-[18px]">{c.title}</p>
                      <p className="font-normal text-[#7a8299] text-[10px] leading-[15px] mt-[2px]">{c.desc}</p>
                    </div>
                    <span
                      className="text-[11px] font-semibold px-[10px] py-[4px] rounded-[8px]"
                      style={{ backgroundColor: c.bg, color: c.color }}
                    >
                      {c.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-[25px] py-[14px]"
          style={{ borderTop: '1px solid rgba(56,78,133,0.07)', backgroundColor: '#fafafa' }}
        >
          <p className="font-normal text-[#7a8299] text-[11px]">
            Version 2.4.1 · &copy; 2026 Rofoof
          </p>
          <button
            onClick={onClose}
            className="border-none cursor-pointer rounded-[10px] font-semibold text-[12px] text-[#7a8299] hover:bg-white transition px-[14px] py-[7px]"
            style={{ backgroundColor: 'transparent' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
