import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LogIn, ShieldCheck, Layers } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { LanguageSwitcher } from '@/shared/components/navigation/language-switcher';

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@rofoof.com');
  const [password, setPassword] = useState('admin123');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (email === 'admin@rofoof.com' && password === 'admin123') {
        sessionStorage.setItem('rofoof_logged_in', 'true');
        navigate('/dashboard');
      } else {
        setError(t('auth.invalidError'));
        setIsLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#F0F2F8] to-[#FAFAFA]">
      {/* Left Login Container */}
      <div className="flex-1 flex items-center justify-center p-10 relative">
        <div className="absolute top-6 left-6">
          <LanguageSwitcher />
        </div>

        <div className="w-full max-w-[420px]">
          {/* Logo Header (Matching Figma) */}
          <div className="flex items-center gap-3 mb-10">
            <div
              className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center shrink-0 shadow-xs"
              style={{ background: 'linear-gradient(135deg, rgb(56, 78, 133) 0%, rgb(91, 123, 200) 100%)' }}
            >
              <Layers className="w-6 h-6 text-white stroke-[2.2]" />
            </div>
            <div>
              <div className="text-[22px] font-bold text-[#0F1629] tracking-[-0.5px] leading-none">Rofof</div>
              <div className="text-[11px] text-[#7A8299] mt-0.5">Grocery &amp; Delivery</div>
            </div>
          </div>

          <h1 className="text-[28px] font-bold text-[#0F1629] mb-1.5 leading-tight">
            {t('auth.welcome')}
          </h1>
          <p className="text-[14px] text-[#7A8299] mb-8">{t('auth.signInDesc')}</p>

          <div className="bg-white border border-[#384E85]/7 shadow-[0px_8px_30px_rgba(0,0,0,0.06)] rounded-[20px] p-8">
            {error && (
              <div className="mb-4 p-3 rounded-[10px] bg-[#FEF2F2] text-[#991B1B] text-[12px] font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[13px] font-semibold text-[#0F1629] mb-1.5">
                  {t('auth.email')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[44px] px-3.5 bg-[#F4F5F8] border-2 border-transparent focus:border-[#384E85] focus:bg-white rounded-[12px] text-[14px] text-[#0F1629] outline-none transition font-sans"
                  placeholder="admin@rofoof.com"
                  required
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#0F1629] mb-1.5">
                  {t('auth.password')}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[44px] px-3.5 bg-[#F4F5F8] border-2 border-transparent focus:border-[#384E85] focus:bg-white rounded-[12px] text-[14px] text-[#0F1629] outline-none transition font-sans"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-[13px]">
                <label className="flex items-center gap-2 text-[#7A8299] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 accent-[#384E85] rounded"
                  />
                  {t('auth.rememberMe')}
                </label>
                <a href="#" className="font-semibold text-[#384E85] hover:underline">
                  {t('auth.forgotPassword')}
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-[46px] bg-gradient-to-r from-[#384E85] to-[#2A3A65] text-white text-[15px] font-bold rounded-[12px] shadow-[0px_4px_14px_rgba(56,78,133,0.3)] hover:shadow-[0px_6px_20px_rgba(56,78,133,0.4)] hover:-translate-y-0.5 transition flex items-center justify-center gap-2 cursor-pointer border-none font-sans"
              >
                <LogIn className="w-4 h-4" />
                {t('auth.signIn')}
              </button>
            </form>
          </div>

          <div className="text-center mt-5 text-[13px] text-[#7A8299]">
            {t('auth.demoHint')}
          </div>
        </div>
      </div>

      {/* Right Hero Banner */}
      <div className="hidden md:flex flex-1 bg-gradient-to-br from-[#384E85] to-[#2A3A65] items-center justify-center p-10 relative overflow-hidden text-white">
        <div className="w-[400px] h-[400px] rounded-full bg-white/[0.03] absolute -top-[100px] -right-[100px] pointer-events-none" />
        <div className="w-[300px] h-[300px] rounded-full bg-white/[0.03] absolute -bottom-[50px] -left-[50px] pointer-events-none" />

        <div className="max-w-[380px] text-center relative z-10 space-y-6">
          <div className="w-[80px] h-[80px] rounded-[20px] bg-white/10 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-[26px] font-bold">ROFOOF Dashboard</h2>
          <p className="text-[14px] text-white/70 leading-[1.7]">
            Complete grocery &amp; delivery management platform. Manage orders, products, drivers, and analytics in one place.
          </p>

          <div className="flex items-center justify-center gap-6 pt-4">
            <div className="text-center">
              <div className="text-[28px] font-bold">12K+</div>
              <div className="text-[12px] text-white/60 mt-0.5">Orders</div>
            </div>
            <div className="text-center">
              <div className="text-[28px] font-bold">500+</div>
              <div className="text-[12px] text-white/60 mt-0.5">Products</div>
            </div>
            <div className="text-center">
              <div className="text-[28px] font-bold">50+</div>
              <div className="text-[12px] text-white/60 mt-0.5">Drivers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
