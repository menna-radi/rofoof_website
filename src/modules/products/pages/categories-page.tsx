import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Grid, 
  List, 
  Edit3, 
  Check, 
  X, 
  Boxes,
  Package
} from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';

interface Category {
  id: string;
  name: string;
  desc: string;
  icon: string;
  count: number;
  active: boolean;
  color: string;
  bg: string;
}

export const CategoriesPage: React.FC = () => {
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [search, setSearch] = useState('');
  const [editCat, setEditCat] = useState<Category | null>(null);

  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editActive, setEditActive] = useState(true);

  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Fresh Produce', desc: 'Fruits, vegetables, and fresh herbs', icon: '🥦', count: 54, active: true, color: 'text-[#10B981]', bg: 'bg-[#ECFDF5]' },
    { id: '2', name: 'Dairy & Eggs', desc: 'Milk, cheese, yogurt, and eggs', icon: '🥛', count: 42, active: true, color: 'text-[#384E85]', bg: 'bg-[#EEF1F8]' },
    { id: '3', name: 'Meat & Poultry', desc: 'Fresh chicken, beef, lamb, and seafood', icon: '🥩', count: 38, active: true, color: 'text-[#F59E0B]', bg: 'bg-[#FFFBEB]' },
    { id: '4', name: 'Bakery', desc: 'Artisan bread, rolls, cakes, and pastries', icon: '🍞', count: 28, active: true, color: 'text-[#8B5CF6]', bg: 'bg-[#F5F3FF]' },
    { id: '5', name: 'Beverages', desc: 'Juices, water, soft drinks, and tea/coffee', icon: '🧃', count: 35, active: true, color: 'text-[#06B6D4]', bg: 'bg-[#ECFEFF]' },
    { id: '6', name: 'Snacks', desc: 'Chips, nuts, chocolates, and granola', icon: '🍿', count: 31, active: true, color: 'text-[#F97316]', bg: 'bg-[#FFF7ED]' },
    { id: '7', name: 'Pantry & Grains', desc: 'Rice, pasta, flour, oils, and spices', icon: '🌾', count: 24, active: true, color: 'text-[#10B981]', bg: 'bg-[#ECFDF5]' },
    { id: '8', name: 'Frozen Foods', desc: 'Ice cream, frozen meals, and vegetables', icon: '🧊', count: 14, active: true, color: 'text-[#384E85]', bg: 'bg-[#EEF1F8]' },
    { id: '9', name: 'Seasonal & Offers', desc: 'Special promotions and holiday items', icon: '🎁', count: 0, active: false, color: 'text-gray-400', bg: 'bg-gray-100' },
  ]);

  const filtered = categories.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === 'active') return c.active;
    if (filter === 'inactive') return !c.active;
    return true;
  });

  const totalProducts = categories.reduce((sum, c) => sum + c.count, 0);

  const openEditModal = (c: Category) => {
    setEditCat(c);
    setEditName(c.name);
    setEditDesc(c.desc);
    setEditActive(c.active);
  };

  const handleSave = () => {
    if (!editCat) return;
    setCategories(prev => prev.map(c => c.id === editCat.id ? { ...c, name: editName, desc: editDesc, active: editActive } : c));
    setEditCat(null);
  };

  return (
    <div className="space-y-6 select-none pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-extrabold text-[#0F1629] tracking-tight">Product Categories</h1>
          <p className="text-[13px] text-[#7A8299] mt-0.5">{categories.length} categories · <span className="font-semibold text-[#10B981]">{totalProducts} total products</span></p>
        </div>
        <button className="h-[38px] px-4 rounded-[12px] bg-gradient-to-r from-[#384E85] to-[#2A3A65] text-white text-[13px] font-bold flex items-center gap-2 shadow-[0px_4px_14px_rgba(56,78,133,0.3)] hover:opacity-95 transition cursor-pointer border-none">
          <Plus className="w-4 h-4" />
          <span>New Category</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 bg-white border border-[#384E85]/8 rounded-[16px] shadow-xs">
          <div className="text-[22px] font-extrabold text-[#0F1629]">{categories.length}</div>
          <div className="text-[11px] font-semibold text-[#7A8299] uppercase tracking-[0.5px]">Total Categories</div>
        </Card>
        <Card className="p-4 bg-white border border-[#384E85]/8 rounded-[16px] shadow-xs">
          <div className="text-[22px] font-extrabold text-[#10B981]">{categories.filter(c => c.active).length}</div>
          <div className="text-[11px] font-semibold text-[#7A8299] uppercase tracking-[0.5px]">Active Categories</div>
        </Card>
        <Card className="p-4 bg-white border border-[#384E85]/8 rounded-[16px] shadow-xs">
          <div className="text-[22px] font-extrabold text-[#EF4444]">{categories.filter(c => !c.active).length}</div>
          <div className="text-[11px] font-semibold text-[#7A8299] uppercase tracking-[0.5px]">Inactive</div>
        </Card>
        <Card className="p-4 bg-white border border-[#384E85]/8 rounded-[16px] shadow-xs">
          <div className="text-[22px] font-extrabold text-[#384E85]">{totalProducts}</div>
          <div className="text-[11px] font-semibold text-[#7A8299] uppercase tracking-[0.5px]">Total Items</div>
        </Card>
      </div>

      {/* Controls: Search, Filter Tabs, View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A8299]" />
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-8 pr-3 bg-[#F4F5F8] border border-transparent rounded-[10px] text-[12.5px] text-[#0F1629] outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#F4F5F8] p-1 rounded-[12px] flex items-center gap-1">
            {(['all', 'active', 'inactive'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-3 py-1 rounded-[9px] text-[12px] font-semibold capitalize transition cursor-pointer border-none ${
                  filter === t ? 'bg-[#384E85] text-white shadow-xs' : 'text-[#7A8299] hover:text-[#0F1629]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="bg-[#F4F5F8] p-1 rounded-[12px] flex items-center gap-1">
            <button
              onClick={() => setView('grid')}
              className={`p-1.5 rounded-[9px] cursor-pointer border-none ${view === 'grid' ? 'bg-[#384E85] text-white' : 'text-[#7A8299]'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('table')}
              className={`p-1.5 rounded-[9px] cursor-pointer border-none ${view === 'table' ? 'bg-[#384E85] text-white' : 'text-[#7A8299]'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* GRID VIEW */}
      {view === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((c) => (
            <Card key={c.id} className="p-5 bg-white border border-[#384E85]/8 rounded-[20px] shadow-[0px_8px_24px_rgba(0,0,0,0.05)] hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-11 h-11 rounded-[14px] ${c.bg} flex items-center justify-center text-[22px] shrink-0`}>
                    {c.icon}
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-bold ${
                    c.active ? 'bg-[#ECFDF5] text-[#10B981]' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {c.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <h3 className="text-[16px] font-extrabold text-[#0F1629]">{c.name}</h3>
                <p className="text-[12px] text-[#7A8299] mt-1 leading-snug">{c.desc}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#F3F4F6] flex items-center justify-between">
                <span className="text-[12.5px] font-bold text-[#384E85]">{c.count} Products</span>
                <button
                  onClick={() => openEditModal(c)}
                  className="w-8 h-8 rounded-[8px] bg-[#EEF1F8] hover:bg-[#E2E7F3] text-[#384E85] flex items-center justify-center cursor-pointer transition border-none"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* TABLE VIEW */}
      {view === 'table' && (
        <Card className="p-0 overflow-hidden bg-white border border-[#384E85]/8 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#FAFAFA] border-b border-[#384E85]/8 text-[#7A8299] font-bold uppercase tracking-[0.5px] text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Description</th>
                  <th className="py-3.5 px-4">Products</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#384E85]/6">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-[#FAFAFA] transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[20px]">{c.icon}</span>
                        <span className="font-bold text-[#0F1629]">{c.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[#7A8299] max-w-sm truncate">{c.desc}</td>
                    <td className="py-3.5 px-4 font-bold text-[#384E85]">{c.count} items</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        c.active ? 'bg-[#ECFDF5] text-[#10B981]' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {c.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => openEditModal(c)}
                        className="w-8 h-8 rounded-[8px] bg-[#EEF1F8] hover:bg-[#E2E7F3] text-[#384E85] flex items-center justify-center cursor-pointer transition border-none ml-auto"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* EDIT CATEGORY MODAL */}
      {editCat && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[480px] overflow-hidden flex flex-col animate-fadeIn border-none">
            <div className="px-6 py-4 bg-[#EEF1F8] border-b border-[#384E85]/12 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[24px]">{editCat.icon}</span>
                <div>
                  <h3 className="text-[15px] font-bold text-[#0F1629]">Edit Category</h3>
                  <p className="text-[11px] text-[#7A8299]">Configure category details &amp; visibility</p>
                </div>
              </div>
              <button onClick={() => setEditCat(null)} className="w-7 h-7 rounded-full hover:bg-[#384E85]/10 text-[#7A8299] flex items-center justify-center border-none cursor-pointer">
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-[12.5px]">
              <div>
                <label className="block text-[11px] font-bold text-[#0F1629] mb-1">Category Name*</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full h-9 px-3 bg-[#F4F5F8] border border-[#384E85]/10 rounded-[8px] outline-none font-semibold text-[#0F1629]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#0F1629] mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full p-3 bg-[#F4F5F8] border border-[#384E85]/10 rounded-[8px] outline-none font-medium text-[#0F1629]"
                />
              </div>

              <div className="p-3.5 bg-[#FAFAFA] border border-gray-200 rounded-[12px] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#0F1629]">Active Status</div>
                  <div className="text-[11px] text-[#7A8299]">Show in customer catalog and filter lists</div>
                </div>
                <input
                  type="checkbox"
                  checked={editActive}
                  onChange={(e) => setEditActive(e.target.checked)}
                  className="w-4 h-4 accent-[#10B981] cursor-pointer"
                />
              </div>
            </div>

            <div className="px-6 py-3.5 bg-[#FAFAFA] border-t border-gray-100 flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => setEditCat(null)}>Cancel</Button>
              <button
                onClick={handleSave}
                className="h-9 px-4 rounded-[12px] bg-[#384E85] hover:bg-[#2A3A65] text-white text-[12.5px] font-bold flex items-center gap-1.5 transition cursor-pointer border-none"
              >
                <Check className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
