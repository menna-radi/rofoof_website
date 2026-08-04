import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LogIn, ShieldCheck, Layers } from 'lucide-react';
import { LanguageSwitcher } from '@/shared/components/navigation/language-switcher';
import { authRepository } from '../data/repositories/AuthRepositoryImpl';
import { ROUTE_PATHS } from '@/app/routes/routePaths';

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@rofoof.com');
  const [password, setPassword] = useState('admin123');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await authRepository.login({ email, password, rememberMe });
      navigate(ROUTE_PATHS.DASHBOARD, { replace: true });
    } catch (err: any) {
      setError(err.message || t('auth.invalidError'));
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#F0F2F8] to-[#FAFAFA]">
      {/* Left Login Container */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-12 relative">
        <div className="absolute top-6 left-6">
          <LanguageSwitcher />
        </div>

        <div className="w-full max-w-[480px]">
          {/* Logo Header */}
          <div className="flex items-center gap-3.5 mb-10">
            <div
              className="w-[50px] h-[50px] rounded-[14px] flex items-center justify-center shrink-0 shadow-md"
              style={{ background: 'linear-gradient(135deg, rgb(56, 78, 133) 0%, rgb(91, 123, 200) 100%)' }}
            >
              <Layers className="w-7 h-7 text-white stroke-[2.2]" />
            </div>
            <div>
              <div className="text-[25px] font-extrabold text-[#0F1629] tracking-[-0.5px] leading-none">Rofof</div>
              <div className="text-[12px] font-medium text-[#7A8299] mt-1">Grocery &amp; Delivery</div>
            </div>
          </div>

          <h1 className="text-[32px] font-extrabold text-[#0F1629] mb-2 leading-tight">
            {t('auth.welcome')}
          </h1>
          <p className="text-[15px] text-[#7A8299] mb-8">{t('auth.signInDesc')}</p>

          <div className="bg-white border border-[#384E85]/10 shadow-[0px_12px_40px_rgba(0,0,0,0.07)] rounded-[24px] p-9 md:p-10">
            {error && (
              <div className="mb-5 p-3.5 rounded-[12px] bg-[#FEF2F2] text-[#991B1B] text-[13px] font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[14px] font-semibold text-[#0F1629] mb-2">
                  {t('auth.email')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[50px] px-4 bg-[#F4F5F8] border-2 border-transparent focus:border-[#384E85] focus:bg-white rounded-[14px] text-[15px] text-[#0F1629] outline-none transition font-sans"
                  placeholder="admin@rofoof.com"
                  required
                />
              </div>

              <div>
                <label className="block text-[14px] font-semibold text-[#0F1629] mb-2">
                  {t('auth.password')}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[50px] px-4 bg-[#F4F5F8] border-2 border-transparent focus:border-[#384E85] focus:bg-white rounded-[14px] text-[15px] text-[#0F1629] outline-none transition font-sans"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-[14px]">
                <label className="flex items-center gap-2.5 text-[#7A8299] cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4.5 h-4.5 accent-[#384E85] rounded cursor-pointer"
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
                className="w-full h-[52px] bg-gradient-to-r from-[#384E85] to-[#2A3A65] text-white text-[16px] font-bold rounded-[14px] shadow-[0px_6px_18px_rgba(56,78,133,0.35)] hover:shadow-[0px_8px_24px_rgba(56,78,133,0.45)] hover:-translate-y-0.5 transition flex items-center justify-center gap-2.5 cursor-pointer border-none font-sans disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                <LogIn className="w-5 h-5" />
                {isLoading ? 'Signing in...' : t('auth.signIn')}
              </button>
            </form>
          </div>

          <div className="text-center mt-6 text-[14px] text-[#7A8299]">
            {t('auth.demoHint')}
          </div>
        </div>
      </div>

      {/* Right Hero Banner */}
      <div className="hidden md:flex flex-1 bg-gradient-to-br from-[#384E85] to-[#2A3A65] items-center justify-center p-12 relative overflow-hidden text-white">
        <div className="w-[450px] h-[450px] rounded-full bg-white/[0.03] absolute -top-[100px] -right-[100px] pointer-events-none" />
        <div className="w-[350px] h-[350px] rounded-full bg-white/[0.03] absolute -bottom-[50px] -left-[50px] pointer-events-none" />

        <div className="max-w-[420px] text-center relative z-10 space-y-7">
          <div className="w-[90px] h-[90px] rounded-[24px] bg-white/10 flex items-center justify-center mx-auto shadow-lg">
            <ShieldCheck className="w-12 h-12 text-white" />
          </div>

          <h2 className="text-[30px] font-bold">ROFOOF Dashboard</h2>
          <p className="text-[15px] text-white/75 leading-[1.7]">
            Complete grocery &amp; delivery management platform. Manage orders, products, drivers, and analytics in one place.
          </p>

          <div className="flex items-center justify-center gap-8 pt-4">
            <div className="text-center">
              <div className="text-[30px] font-bold">12K+</div>
              <div className="text-[13px] text-white/60 mt-0.5">Orders</div>
            </div>
            <div className="text-center">
              <div className="text-[30px] font-bold">500+</div>
              <div className="text-[13px] text-white/60 mt-0.5">Products</div>
            </div>
            <div className="text-center">
              <div className="text-[30px] font-bold">50+</div>
              <div className="text-[13px] text-white/60 mt-0.5">Drivers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
