import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Tag, 
  Plus, 
  Search, 
  Calendar, 
  Percent, 
  TrendingUp, 
  DollarSign, 
  Users, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Edit3, 
  Trash2, 
  Eye, 
  Copy, 
  Image as ImageIcon,
  Check,
  AlertCircle
} from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';

interface Offer {
  id: string;
  code: string;
  title: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  usageLimit: number;
  usedCount: number;
  status: 'active' | 'scheduled' | 'expired' | 'draft';
  startDate: string;
  endDate: string;
  category?: string;
  iconBg: string;
}

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  imageBg: string;
  status: 'active' | 'inactive';
  clicks: number;
}

export const OffersDealsPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'scheduled' | 'expired' | 'banners'>('all');
  const [search, setSearch] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newValue, setNewValue] = useState(15);
  const [newType, setNewType] = useState<'percentage' | 'fixed'>('percentage');
  const [newMinOrder, setNewMinOrder] = useState(100);
  const [newCategory, setNewCategory] = useState('All Categories');

  const [offers, setOffers] = useState<Offer[]>([
    {
      id: '1',
      code: 'WEEKEND30',
      title: 'Weekend Mega Grocery Deals',
      discountType: 'percentage',
      discountValue: 30,
      minOrderValue: 200,
      usageLimit: 1000,
      usedCount: 742,
      status: 'active',
      startDate: '2026-07-28',
      endDate: '2026-08-04',
      category: 'Fresh Produce',
      iconBg: 'bg-[#ECFDF5] text-[#10B981]'
    },
    {
      id: '2',
      code: 'FREESHIP50',
      title: 'Free Shipping on First 3 Orders',
      discountType: 'fixed',
      discountValue: 50,
      minOrderValue: 150,
      usageLimit: 500,
      usedCount: 489,
      status: 'active',
      startDate: '2026-07-15',
      endDate: '2026-08-15',
      category: 'Delivery',
      iconBg: 'bg-[#EEF1F8] text-[#384E85]'
    },
    {
      id: '3',
      code: 'SUMMERVIBES',
      title: 'Summer Beverage Discount',
      discountType: 'percentage',
      discountValue: 20,
      minOrderValue: 120,
      usageLimit: 300,
      usedCount: 300,
      status: 'expired',
      startDate: '2026-07-01',
      endDate: '2026-07-25',
      category: 'Beverages',
      iconBg: 'bg-[#FEF2F2] text-[#EF4444]'
    },
    {
      id: '4',
      code: 'BACK2SCHOOL',
      title: 'Back to School Snacks Bundle',
      discountType: 'percentage',
      discountValue: 25,
      minOrderValue: 250,
      usageLimit: 2000,
      usedCount: 0,
      status: 'scheduled',
      startDate: '2026-08-10',
      endDate: '2026-08-31',
      category: 'Snacks & Bakery',
      iconBg: 'bg-[#FFFBEB] text-[#D97706]'
    },
    {
      id: '5',
      code: 'DAIRY20',
      title: 'Organic Dairy Special Offer',
      discountType: 'percentage',
      discountValue: 20,
      minOrderValue: 100,
      usageLimit: 800,
      usedCount: 612,
      status: 'active',
      startDate: '2026-07-20',
      endDate: '2026-08-05',
      category: 'Dairy & Eggs',
      iconBg: 'bg-[#F5F3FF] text-[#8B5CF6]'
    }
  ]);

  const [banners, setBanners] = useState<Banner[]>([
    {
      id: 'b1',
      title: 'Organic Farm Fresh Veggies 40% Off',
      subtitle: 'Direct from local Egyptian farms to your doorstep',
      badge: 'HOT DEAL',
      imageBg: 'from-[#10B981] to-[#047857]',
      status: 'active',
      clicks: 4210
    },
    {
      id: 'b2',
      title: 'Express 15-Minute Grocery Delivery',
      subtitle: 'Free delivery on all orders above 200 EGP',
      badge: 'EXPRESS',
      imageBg: 'from-[#384E85] to-[#1E293B]',
      status: 'active',
      clicks: 8930
    },
    {
      id: 'b3',
      title: 'Wholesale Bulk Buying Discount',
      subtitle: 'Exclusive business pricing for restaurants & supermarkets',
      badge: 'B2B SPECIAL',
      imageBg: 'from-[#F59E0B] to-[#D97706]',
      status: 'active',
      clicks: 2150
    }
  ]);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleToggleOfferStatus = (id: string) => {
    setOffers(prev => prev.map(o => {
      if (o.id === id) {
        const nextStatus = o.status === 'active' ? 'expired' : 'active';
        return { ...o, status: nextStatus };
      }
      return o;
    }));
  };

  const handleCreateOffer = () => {
    if (!newCode || !newTitle) return;
    const newOffer: Offer = {
      id: Date.now().toString(),
      code: newCode.toUpperCase(),
      title: newTitle,
      discountType: newType,
      discountValue: newValue,
      minOrderValue: newMinOrder,
      usageLimit: 500,
      usedCount: 0,
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-09-01',
      category: newCategory,
      iconBg: 'bg-[#EEF1F8] text-[#384E85]'
    };
    setOffers([newOffer, ...offers]);
    setIsCreateModalOpen(false);
    setNewCode('');
    setNewTitle('');
  };

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.code.toLowerCase().includes(search.toLowerCase()) || 
                          offer.title.toLowerCase().includes(search.toLowerCase()) ||
                          (offer.category && offer.category.toLowerCase().includes(search.toLowerCase()));
    if (!matchesSearch) return false;
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return offer.status === 'active';
    if (activeTab === 'scheduled') return offer.status === 'scheduled';
    if (activeTab === 'expired') return offer.status === 'expired';
    return true;
  });

  return (
    <div className="space-y-6 select-none pb-12">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F1629] tracking-tight">Offers &amp; Deals</h1>
          <p className="text-sm text-[#7A8299] mt-0.5">Manage promotional campaigns, coupon codes, and homepage banners</p>
        </div>
        <Button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-gradient-to-r from-[#2A3A65] to-[#384E85] text-white hover:opacity-95 font-semibold shadow-md gap-2 h-10 px-4 rounded-xl cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create Offer</span>
        </Button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 bg-white border border-[#384E85]/8 shadow-sm rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[#7A8299]">Active Campaigns</p>
              <h3 className="text-2xl font-bold text-[#0F1629] mt-1">3</h3>
              <div className="flex items-center gap-1 text-xs text-[#10B981] font-semibold mt-2">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+2 new this week</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] text-[#10B981] flex items-center justify-center font-bold">
              <Tag className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-white border border-[#384E85]/8 shadow-sm rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[#7A8299]">Promo Sales Revenue</p>
              <h3 className="text-2xl font-bold text-[#0F1629] mt-1">$142,500</h3>
              <div className="flex items-center gap-1 text-xs text-[#10B981] font-semibold mt-2">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+18.5% conversion</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#EEF1F8] text-[#384E85] flex items-center justify-center font-bold">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-white border border-[#384E85]/8 shadow-sm rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[#7A8299]">Total Redemptions</p>
              <h3 className="text-2xl font-bold text-[#0F1629] mt-1">2,143</h3>
              <div className="flex items-center gap-1 text-xs text-[#384E85] font-semibold mt-2">
                <Users className="w-3.5 h-3.5" />
                <span>85% limit reached</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#FFFBEB] text-[#D97706] flex items-center justify-center font-bold">
              <Percent className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-white border border-[#384E85]/8 shadow-sm rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[#7A8299]">Avg. Order Lift</p>
              <h3 className="text-2xl font-bold text-[#0F1629] mt-1">+24.2%</h3>
              <div className="flex items-center gap-1 text-xs text-[#10B981] font-semibold mt-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Higher basket value</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#F5F3FF] text-[#8B5CF6] flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs & Search Bar */}
      <div className="bg-white border border-[#384E85]/8 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-[#FAFAFA] p-1 rounded-xl w-full md:w-auto border border-[#384E85]/6">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'all' ? 'bg-white text-[#384E85] shadow-xs' : 'text-[#7A8299] hover:text-[#0F1629]'
            }`}
          >
            All Offers ({offers.length})
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'active' ? 'bg-white text-[#10B981] shadow-xs' : 'text-[#7A8299] hover:text-[#0F1629]'
            }`}
          >
            Active ({offers.filter(o => o.status === 'active').length})
          </button>
          <button
            onClick={() => setActiveTab('scheduled')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'scheduled' ? 'bg-white text-[#D97706] shadow-xs' : 'text-[#7A8299] hover:text-[#0F1629]'
            }`}
          >
            Scheduled ({offers.filter(o => o.status === 'scheduled').length})
          </button>
          <button
            onClick={() => setActiveTab('expired')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'expired' ? 'bg-white text-[#EF4444] shadow-xs' : 'text-[#7A8299] hover:text-[#0F1629]'
            }`}
          >
            Expired ({offers.filter(o => o.status === 'expired').length})
          </button>
          <button
            onClick={() => setActiveTab('banners')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'banners' ? 'bg-white text-[#8B5CF6] shadow-xs' : 'text-[#7A8299] hover:text-[#0F1629]'
            }`}
          >
            Hero Banners ({banners.length})
          </button>
        </div>

        {/* Search Field */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#7A8299] absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search promo code or title..."
            className="w-full h-10 pl-9 pr-4 bg-[#FAFAFA] border border-[#384E85]/10 rounded-xl text-xs text-[#0F1629] placeholder-[#7A8299] focus:outline-none focus:border-[#384E85] transition"
          />
        </div>
      </div>

      {/* Render Main Content based on Tab */}
      {activeTab === 'banners' ? (
        /* Banners Grid */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <Card key={banner.id} className="overflow-hidden border border-[#384E85]/8 shadow-sm rounded-2xl bg-white flex flex-col justify-between">
              <div className={`p-6 bg-gradient-to-br ${banner.imageBg} text-white space-y-3 relative`}>
                <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase">
                  {banner.badge}
                </span>
                <h3 className="text-lg font-bold leading-tight">{banner.title}</h3>
                <p className="text-xs text-white/80">{banner.subtitle}</p>
              </div>
              <div className="p-4 bg-white flex items-center justify-between border-t border-[#384E85]/6">
                <div className="text-xs">
                  <span className="text-[#7A8299]">Total Clicks: </span>
                  <span className="font-bold text-[#0F1629]">{banner.clicks.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#ECFDF5] text-[#10B981]">
                    {banner.status.toUpperCase()}
                  </span>
                  <button className="p-1.5 hover:bg-[#EEF1F8] rounded-lg text-[#384E85] transition cursor-pointer">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        /* Offers Table */
        <Card className="bg-white border border-[#384E85]/8 shadow-sm rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAFAFA] border-b border-[#384E85]/8 text-[11px] font-bold text-[#7A8299] uppercase tracking-wider">
                  <th className="py-3.5 px-5">Coupon Code</th>
                  <th className="py-3.5 px-5">Campaign Name</th>
                  <th className="py-3.5 px-5">Discount</th>
                  <th className="py-3.5 px-5">Min Spend</th>
                  <th className="py-3.5 px-5">Usage Progress</th>
                  <th className="py-3.5 px-5">Validity</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#384E85]/6 text-xs text-[#0F1629]">
                {filteredOffers.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-10 text-[#7A8299]">
                      <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      No promotional offers found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredOffers.map((offer) => (
                    <tr key={offer.id} className="hover:bg-[#EEF1F8]/30 transition">
                      {/* Code */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold bg-[#EEF1F8] text-[#384E85] px-2.5 py-1 rounded-lg text-xs tracking-wide">
                            {offer.code}
                          </span>
                          <button
                            onClick={() => handleCopy(offer.code)}
                            className="p-1 text-[#7A8299] hover:text-[#384E85] transition cursor-pointer"
                            title="Copy Code"
                          >
                            {copiedCode === offer.code ? (
                              <Check className="w-3.5 h-3.5 text-[#10B981]" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* Title */}
                      <td className="py-4 px-5">
                        <div className="font-bold text-[#0F1629]">{offer.title}</div>
                        <div className="text-[10.5px] text-[#7A8299] mt-0.5">{offer.category || 'General'}</div>
                      </td>

                      {/* Discount */}
                      <td className="py-4 px-5 font-bold text-[#384E85]">
                        {offer.discountType === 'percentage' ? `${offer.discountValue}% OFF` : `$${offer.discountValue} FLAT OFF`}
                      </td>

                      {/* Min Spend */}
                      <td className="py-4 px-5 text-[#7A8299]">
                        ${offer.minOrderValue}
                      </td>

                      {/* Usage */}
                      <td className="py-4 px-5">
                        <div className="w-36">
                          <div className="flex justify-between text-[10px] font-semibold text-[#7A8299] mb-1">
                            <span>{offer.usedCount} used</span>
                            <span>{Math.round((offer.usedCount / offer.usageLimit) * 100)}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-[#EEF1F8] rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#384E85] to-[#10B981] rounded-full transition-all"
                              style={{ width: `${Math.min((offer.usedCount / offer.usageLimit) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Validity */}
                      <td className="py-4 px-5 text-[#7A8299] text-[11px]">
                        <div>{offer.startDate}</div>
                        <div className="text-[10px] text-[#A0AEC0]">to {offer.endDate}</div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-5">
                        {offer.status === 'active' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#ECFDF5] text-[#10B981]">
                            <CheckCircle2 className="w-3 h-3" /> Active
                          </span>
                        )}
                        {offer.status === 'scheduled' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#FFFBEB] text-[#D97706]">
                            <Clock className="w-3 h-3" /> Scheduled
                          </span>
                        )}
                        {offer.status === 'expired' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#FEF2F2] text-[#EF4444]">
                            <XCircle className="w-3 h-3" /> Expired
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleToggleOfferStatus(offer.id)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                              offer.status === 'active'
                                ? 'bg-[#FEF2F2] text-[#EF4444] hover:bg-[#FEE2E2]'
                                : 'bg-[#ECFDF5] text-[#10B981] hover:bg-[#D1FAE5]'
                            }`}
                          >
                            {offer.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                          <button className="p-1.5 hover:bg-[#EEF1F8] rounded-lg text-[#384E85] transition cursor-pointer">
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Create Offer Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-[#384E85]/10 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="p-5 border-b border-[#384E85]/8 flex items-center justify-between bg-[#FAFAFA]">
              <div className="flex items-center gap-2 text-[#384E85]">
                <Tag className="w-5 h-5" />
                <h3 className="font-bold text-base text-[#0F1629]">Create Promotional Offer</h3>
              </div>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="text-[#7A8299] hover:text-[#0F1629] p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-[#0F1629]">
              <div>
                <label className="font-semibold block mb-1">Coupon Code</label>
                <input
                  type="text"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                  placeholder="e.g. FLASH50"
                  className="w-full h-10 px-3 border border-[#384E85]/15 rounded-xl font-mono uppercase font-bold text-[#384E85] focus:outline-none focus:border-[#384E85]"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Campaign Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Weekend Flash Sale"
                  className="w-full h-10 px-3 border border-[#384E85]/15 rounded-xl focus:outline-none focus:border-[#384E85]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-1">Discount Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full h-10 px-3 border border-[#384E85]/15 rounded-xl focus:outline-none focus:border-[#384E85] bg-white"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount ($)</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold block mb-1">Value ({newType === 'percentage' ? '%' : '$'})</label>
                  <input
                    type="number"
                    value={newValue}
                    onChange={(e) => setNewValue(Number(e.target.value))}
                    className="w-full h-10 px-3 border border-[#384E85]/15 rounded-xl focus:outline-none focus:border-[#384E85]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-1">Min Order Spend ($)</label>
                  <input
                    type="number"
                    value={newMinOrder}
                    onChange={(e) => setNewMinOrder(Number(e.target.value))}
                    className="w-full h-10 px-3 border border-[#384E85]/15 rounded-xl focus:outline-none focus:border-[#384E85]"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Target Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full h-10 px-3 border border-[#384E85]/15 rounded-xl focus:outline-none focus:border-[#384E85] bg-white"
                  >
                    <option value="All Categories">All Categories</option>
                    <option value="Fresh Produce">Fresh Produce</option>
                    <option value="Dairy & Eggs">Dairy & Eggs</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Snacks & Bakery">Snacks & Bakery</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#FAFAFA] border-t border-[#384E85]/8 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setIsCreateModalOpen(false)}
                className="h-10 px-4 text-xs font-semibold rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateOffer}
                className="h-10 px-5 text-xs font-semibold rounded-xl bg-gradient-to-r from-[#2A3A65] to-[#384E85] text-white hover:opacity-95 cursor-pointer"
              >
                Save &amp; Activate Offer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
