import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Grid as GridIcon, 
  List as ListIcon, 
  Edit3, 
  Check, 
  X, 
  Package, 
  Trash2,
  FolderTree,
  Check as CheckIcon
} from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';

interface SubCategory {
  id: string;
  name: string;
  slug: string;
  productCount: number;
  active: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  desc: string;
  icon: string;
  imageUrl: string;
  productCount: number;
  displayOrder: number;
  active: boolean;
  color: string;
  bg: string;
  subcategories: SubCategory[];
}

export const CategoriesPage: React.FC = () => {
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [search, setSearch] = useState('');
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editCat, setEditCat] = useState<Category | null>(null);
  const [viewSubCat, setViewSubCat] = useState<Category | null>(null);
  const [deleteCat, setDeleteCat] = useState<Category | null>(null);

  // Edit Category Form State (Figma 1:43956)
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editIcon, setEditIcon] = useState('');
  const [editSelectedImage, setEditSelectedImage] = useState<string | null>(
    'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&auto=format&fit=crop&q=60'
  );
  const [editImageCategory, setEditImageCategory] = useState('all');
  const [editColor, setEditColor] = useState('#10B981');
  const [editActive, setEditActive] = useState(true);

  // Subcategory Addition State
  const [newSubName, setNewSubName] = useState('');

  const galleryImages = [
    { id: '1', title: 'Fresh Produce', category: 'fresh-produce', url: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&auto=format&fit=crop&q=60' },
    { id: '2', title: 'Vegetables', category: 'fresh-produce', url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60' },
    { id: '3', title: 'Mixed Veggies', category: 'fresh-produce', url: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=500&auto=format&fit=crop&q=60' },
    { id: '4', title: 'Apples', category: 'fresh-produce', url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&auto=format&fit=crop&q=60' },
    { id: '5', title: 'Dairy Milk', category: 'dairy-eggs', url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=60' },
    { id: '6', title: 'Eggs', category: 'dairy-eggs', url: 'https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?w=500&auto=format&fit=crop&q=60' },
    { id: '7', title: 'Chicken Breast', category: 'meat-poultry', url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&auto=format&fit=crop&q=60' },
    { id: '8', title: 'Steak & Meat', category: 'meat-poultry', url: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=500&auto=format&fit=crop&q=60' },
    { id: '9', title: 'Bread Bakery', category: 'bakery', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60' },
    { id: '10', title: 'Juices & Beverages', category: 'beverages', url: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500&auto=format&fit=crop&q=60' },
    { id: '11', title: 'Snacks & Chips', category: 'snacks', url: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&auto=format&fit=crop&q=60' },
    { id: '12', title: 'Coffee & Jars', category: 'beverages', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=60' }
  ];

  const colorOptions = [
    { hex: '#10B981', label: 'Green' },
    { hex: '#384E85', label: 'Blue' },
    { hex: '#F59E0B', label: 'Amber' },
    { hex: '#EF4444', label: 'Red' },
    { hex: '#8B5CF6', label: 'Purple' },
    { hex: '#06B6D4', label: 'Cyan' },
    { hex: '#F97316', label: 'Orange' },
    { hex: '#EC4899', label: 'Pink' }
  ];

  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Fresh Produce',
      slug: 'fresh-produce',
      desc: 'Fruits, vegetables, and fresh herbs',
      icon: '🥦',
      imageUrl: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&auto=format&fit=crop&q=60',
      productCount: 48,
      displayOrder: 1,
      active: true,
      color: 'text-[#10B981]',
      bg: 'bg-[#ECFDF5]',
      subcategories: [
        { id: '1-1', name: 'Fresh Fruits', slug: 'fresh-fruits', productCount: 22, active: true },
        { id: '1-2', name: 'Vegetables', slug: 'vegetables', productCount: 20, active: true },
        { id: '1-3', name: 'Organic Herbs', slug: 'organic-herbs', productCount: 6, active: true }
      ]
    },
    {
      id: '2',
      name: 'Dairy & Eggs',
      slug: 'dairy-eggs',
      desc: 'Milk, cheese, yogurt, and eggs',
      icon: '🥛',
      imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=60',
      productCount: 32,
      displayOrder: 2,
      active: true,
      color: 'text-[#384E85]',
      bg: 'bg-[#EEF1F8]',
      subcategories: [
        { id: '2-1', name: 'Fresh Milk', slug: 'fresh-milk', productCount: 15, active: true },
        { id: '2-2', name: 'Cheeses', slug: 'cheeses', productCount: 17, active: true }
      ]
    },
    {
      id: '3',
      name: 'Meat & Poultry',
      slug: 'meat-poultry',
      desc: 'Chicken, beef, fish, and seafood',
      icon: '🥩',
      imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&auto=format&fit=crop&q=60',
      productCount: 27,
      displayOrder: 3,
      active: true,
      color: 'text-[#EF4444]',
      bg: 'bg-[#FEF2F2]',
      subcategories: [
        { id: '3-1', name: 'Poultry & Chicken', slug: 'poultry-chicken', productCount: 16, active: true },
        { id: '3-2', name: 'Beef & Lamb', slug: 'beef-lamb', productCount: 11, active: true }
      ]
    },
    {
      id: '4',
      name: 'Bakery',
      slug: 'bakery',
      desc: 'Bread, pastries, and baked goods',
      icon: '🍞',
      imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60',
      productCount: 21,
      displayOrder: 4,
      active: true,
      color: 'text-[#D97706]',
      bg: 'bg-[#FFFBEB]',
      subcategories: [
        { id: '4-1', name: 'Bread & Buns', slug: 'bread-buns', productCount: 12, active: true },
        { id: '4-2', name: 'Pastries & Cakes', slug: 'pastries-cakes', productCount: 9, active: true }
      ]
    },
    {
      id: '5',
      name: 'Beverages',
      slug: 'beverages',
      desc: 'Juices, water, sodas, and drinks',
      icon: '🧃',
      imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500&auto=format&fit=crop&q=60',
      productCount: 39,
      displayOrder: 5,
      active: true,
      color: 'text-[#0891B2]',
      bg: 'bg-[#ECFEFF]',
      subcategories: [
        { id: '5-1', name: 'Soft Drinks & Water', slug: 'soft-drinks-water', productCount: 22, active: true },
        { id: '5-2', name: 'Juices & Smoothies', slug: 'juices-smoothies', productCount: 17, active: true }
      ]
    },
    {
      id: '6',
      name: 'Snacks',
      slug: 'snacks',
      desc: 'Chips, nuts, chocolates, and granola',
      icon: '🍿',
      imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&auto=format&fit=crop&q=60',
      productCount: 55,
      displayOrder: 6,
      active: true,
      color: 'text-[#7C3AED]',
      bg: 'bg-[#F5F3FF]',
      subcategories: [
        { id: '6-1', name: 'Chips & Nuts', slug: 'chips-nuts', productCount: 30, active: true },
        { id: '6-2', name: 'Chocolates & Sweets', slug: 'chocolates-sweets', productCount: 25, active: true }
      ]
    },
    {
      id: '7',
      name: 'Household & Care',
      slug: 'household-care',
      desc: 'Cleaning supplies, detergents, and hygiene',
      icon: '🧴',
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60',
      productCount: 22,
      displayOrder: 7,
      active: true,
      color: 'text-[#06B6D4]',
      bg: 'bg-[#ECFEFF]',
      subcategories: []
    },
    {
      id: '8',
      name: 'Personal Care',
      slug: 'personal-care',
      desc: 'Skincare, haircare, and grooming products',
      icon: '✨',
      imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=60',
      productCount: 46,
      displayOrder: 8,
      active: true,
      color: 'text-[#EC4899]',
      bg: 'bg-[#FDF2F8]',
      subcategories: []
    },
    {
      id: '9',
      name: 'Seasonal & Offers',
      slug: 'seasonal-offers',
      desc: 'Special promotions and holiday packages',
      icon: '🎁',
      imageUrl: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&auto=format&fit=crop&q=60',
      productCount: 0,
      displayOrder: 9,
      active: false,
      color: 'text-gray-400',
      bg: 'bg-gray-100',
      subcategories: []
    }
  ]);

  const toggleCategoryStatus = (id: string) => {
    setCategories(prev => prev.map(c => {
      if (c.id !== id) return c;
      return { ...c, active: !c.active };
    }));
  };

  const filteredCategories = categories.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                          c.slug.toLowerCase().includes(search.toLowerCase()) ||
                          c.desc.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === 'active') return c.active;
    if (filter === 'inactive') return !c.active;
    return true;
  });

  const totalProducts = categories.reduce((sum, c) => sum + c.productCount, 0);

  const openEditModal = (c: Category) => {
    setEditCat(c);
    setEditName(c.name);
    setEditDesc(c.desc);
    setEditIcon(c.icon);
    setEditSelectedImage(c.imageUrl || galleryImages[0].url);
    setEditColor('#10B981');
    setEditActive(c.active);
  };

  const handleEditCategorySubmit = () => {
    if (!editCat) return;
    setCategories(prev => prev.map(c => c.id === editCat.id ? {
      ...c,
      name: editName,
      desc: editDesc,
      icon: editIcon,
      imageUrl: editSelectedImage || c.imageUrl,
      active: editActive
    } : c));
    setEditCat(null);
  };

  const handleAddSubcategorySubmit = () => {
    if (!viewSubCat || !newSubName) return;
    const newSub: SubCategory = {
      id: `${viewSubCat.id}-${Date.now()}`,
      name: newSubName,
      slug: newSubName.toLowerCase().replace(/\s+/g, '-'),
      productCount: 0,
      active: true
    };
    const updatedSubcats = [...viewSubCat.subcategories, newSub];
    setCategories(prev => prev.map(c => c.id === viewSubCat.id ? { ...c, subcategories: updatedSubcats } : c));
    setViewSubCat({ ...viewSubCat, subcategories: updatedSubcats });
    setNewSubName('');
  };

  const handleDeleteConfirm = () => {
    if (!deleteCat) return;
    setCategories(prev => prev.filter(c => c.id !== deleteCat.id));
    setDeleteCat(null);
  };

  const filteredGallery = editImageCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(g => g.category === editImageCategory);

  return (
    <div className="space-y-5 select-none pb-10">
      
      {/* Header (Figma 1:31230) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[20px] font-extrabold text-[#0F1629] tracking-tight">Product Categories</h1>
          <p className="text-[13px] text-[#7A8299] mt-0.5">{categories.length} categories · {totalProducts} total products</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="h-[38px] px-4 rounded-[12px] bg-gradient-to-r from-[#384E85] to-[#2A3A65] text-white text-[13px] font-bold flex items-center gap-2 shadow-[0px_4px_14px_rgba(56,78,133,0.3)] hover:opacity-95 transition cursor-pointer border-none"
        >
          <Plus className="w-4 h-4" />
          <span>New Category</span>
        </button>
      </div>

      {/* 4 Summary Metric Cards (Figma 1:31242) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-[17px] bg-white border border-[rgba(56,78,133,0.07)] rounded-[16px] shadow-[0px_4px_8px_rgba(0,0,0,0.05)]">
          <div className="text-[22px] font-extrabold text-[#384E85] leading-tight">{categories.length}</div>
          <div className="text-[11px] font-normal text-[#7A8299] mt-1">Total Categories</div>
        </Card>

        <Card className="p-[17px] bg-white border border-[rgba(56,78,133,0.07)] rounded-[16px] shadow-[0px_4px_8px_rgba(0,0,0,0.05)]">
          <div className="text-[22px] font-extrabold text-[#10B981] leading-tight">{categories.filter(c => c.active).length}</div>
          <div className="text-[11px] font-normal text-[#7A8299] mt-1">Active</div>
        </Card>

        <Card className="p-[17px] bg-white border border-[rgba(56,78,133,0.07)] rounded-[16px] shadow-[0px_4px_8px_rgba(0,0,0,0.05)]">
          <div className="text-[22px] font-extrabold text-[#7A8299] leading-tight">{categories.filter(c => !c.active).length}</div>
          <div className="text-[11px] font-normal text-[#7A8299] mt-1">Inactive</div>
        </Card>

        <Card className="p-[17px] bg-white border border-[rgba(56,78,133,0.07)] rounded-[16px] shadow-[0px_4px_8px_rgba(0,0,0,0.05)]">
          <div className="text-[22px] font-extrabold text-[#8B5CF6] leading-tight">{totalProducts}</div>
          <div className="text-[11px] font-normal text-[#7A8299] mt-1">Total Products</div>
        </Card>
      </div>

      {/* Main Container Card (Figma 1:31264) */}
      <Card className="p-0 overflow-hidden bg-white border border-[rgba(56,78,133,0.07)] rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)]">
        
        {/* Control Bar (Figma 1:31265) */}
        <div className="p-4 border-b border-[rgba(56,78,133,0.07)] flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-xl">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A8299]" />
            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-[37.5px] pl-10 pr-3 bg-[#F4F5F8] border border-transparent rounded-[10px] text-[13px] text-[#0F1629] placeholder-[rgba(15,22,41,0.5)] outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Filter Tabs */}
            <div className="bg-[#F4F5F8] p-[3px] rounded-[9px] flex items-center gap-[3px]">
              {[
                { id: 'all', label: 'all' },
                { id: 'active', label: 'active' },
                { id: 'inactive', label: 'inactive' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setFilter(t.id as any)}
                  className={`px-3 py-[5px] rounded-[7px] text-[12px] capitalize transition cursor-pointer border-none ${
                    filter === t.id
                      ? 'bg-[#384E85] text-white font-bold'
                      : 'text-[#7A8299] font-medium hover:text-[#0F1629] bg-transparent'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* View Switcher */}
            <div className="bg-[#F4F5F8] p-[3px] rounded-[9px] flex items-center gap-[3px]">
              <button
                onClick={() => setView('grid')}
                className={`px-3 py-[5px] rounded-[7px] text-[12px] capitalize transition cursor-pointer border-none flex items-center gap-1.5 ${
                  view === 'grid'
                    ? 'bg-[#384E85] text-white font-bold'
                    : 'text-[#7A8299] font-medium hover:text-[#0F1629] bg-transparent'
                }`}
              >
                <GridIcon className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
              <button
                onClick={() => setView('table')}
                className={`px-3 py-[5px] rounded-[7px] text-[12px] capitalize transition cursor-pointer border-none flex items-center gap-1.5 ${
                  view === 'table'
                    ? 'bg-[#384E85] text-white font-bold'
                    : 'text-[#7A8299] font-medium hover:text-[#0F1629] bg-transparent'
                }`}
              >
                <ListIcon className="w-3.5 h-3.5" />
                <span>Table</span>
              </button>
            </div>
          </div>
        </div>

        {/* GRID VIEW (EXACT MATCH FIGMA NODE 1:31583) */}
        {view === 'grid' && (
          <div className="p-[18px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
            {filteredCategories.map((c) => (
              <div 
                key={c.id} 
                className="bg-white border border-[rgba(56,78,133,0.08)] rounded-[16px] shadow-[0px_4px_16px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col justify-between hover:shadow-lg transition group"
              >
                {/* Top Cover Image Banner (Figma Node 1:31880) */}
                <div className="h-[140px] relative w-full overflow-hidden bg-[#EEF1F8]">
                  <img 
                    src={c.imageUrl} 
                    alt={c.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  {/* Bottom Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                  {/* Top Right Status Pill (Figma Node 1:31884) */}
                  <div className="absolute top-[10px] right-[10px]">
                    <button
                      onClick={() => toggleCategoryStatus(c.id)}
                      className={`px-[10px] py-[3px] rounded-[20px] text-[10px] font-bold shadow-xs transition cursor-pointer border-none flex items-center gap-1 ${
                        c.active 
                          ? 'bg-white/92 text-[#10B981]' 
                          : 'bg-white/92 text-gray-500'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${c.active ? 'bg-[#10B981]' : 'bg-gray-400'}`} />
                      <span>{c.active ? 'Active' : 'Inactive'}</span>
                    </button>
                  </div>

                  {/* Bottom Left Products Count Pill (Figma Node 1:31887) */}
                  <div className="absolute bottom-[10px] left-[12px]">
                    <span className="px-[9px] py-[3px] rounded-[20px] bg-black/45 backdrop-blur-xs text-white text-[11px] font-bold">
                      {c.productCount} products
                    </span>
                  </div>
                </div>

                {/* Bottom Details Section (Figma Node 1:31889) */}
                <div className="p-[14px] pt-[12px] space-y-[4px]">
                  
                  {/* Title & Action Buttons Row */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-[14px] font-bold text-[#0F1629] leading-[21px] truncate">{c.name}</h3>
                    
                    <div className="flex items-center gap-[4px] shrink-0">
                      <button
                        onClick={() => openEditModal(c)}
                        className="w-[28px] h-[28px] rounded-[8px] bg-[#EEF1F8] hover:bg-[#E2E7F3] text-[#384E85] flex items-center justify-center cursor-pointer transition border-none"
                        title="Edit Category"
                      >
                        <Edit3 className="w-[12px] h-[12px]" />
                      </button>
                      <button
                        onClick={() => setDeleteCat(c)}
                        className="w-[28px] h-[28px] rounded-[8px] bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#EF4444] flex items-center justify-center cursor-pointer transition border-none"
                        title="Delete Category"
                      >
                        <Trash2 className="w-[12px] h-[12px]" />
                      </button>
                    </div>
                  </div>

                  {/* Description Row */}
                  <p className="text-[11px] text-[#7A8299] leading-[16.5px] truncate">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TABLE VIEW (Figma Node 1:31283) */}
        {view === 'table' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#FAFAFA] border-b border-[rgba(56,78,133,0.07)] text-[#7A8299] font-bold uppercase tracking-[0.5px] text-[11px]">
                <tr>
                  <th className="py-3 px-4">CATEGORY</th>
                  <th className="py-3 px-4">DESCRIPTION</th>
                  <th className="py-3 px-4">PRODUCTS</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#384E85]/6">
                {filteredCategories.map((c) => (
                  <tr key={c.id} className="hover:bg-[#FAFAFA] transition">
                    
                    {/* Category Thumbnail & Title */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-[48px] h-[48px] rounded-[13px] ${c.bg} border border-[#10B981]/14 shadow-[0px_2px_8px_rgba(16,185,129,0.13)] flex items-center justify-center text-[22px] shrink-0 overflow-hidden`}>
                          {c.imageUrl ? (
                            <img src={c.imageUrl} alt={c.name} className="w-full h-full object-cover" />
                          ) : (
                            c.icon
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-[#0F1629] text-[14px]">{c.name}</div>
                        </div>
                      </div>
                    </td>

                    {/* Description */}
                    <td className="py-3.5 px-4 text-[#7A8299] text-[13px] max-w-sm truncate">{c.desc}</td>

                    {/* Products Count */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-[8px] ${c.bg} flex items-center justify-center text-[13px]`}>
                          📦
                        </div>
                        <span className="font-bold text-[#0F1629] text-[14px]">{c.productCount}</span>
                      </div>
                    </td>

                    {/* Active Status Badge + Inline Switch Toggle */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-[20px] text-[11px] font-bold ${
                          c.active ? 'bg-[#ECFDF5] text-[#10B981]' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {c.active ? 'Active' : 'Inactive'}
                        </span>
                        <button
                          onClick={() => toggleCategoryStatus(c.id)}
                          className={`w-[34px] h-[20px] rounded-[10px] p-0.5 transition duration-200 cursor-pointer border-none ${
                            c.active ? 'bg-[#10B981]' : 'bg-[#CBD5E0]'
                          }`}
                        >
                          <div className={`w-[14px] h-[14px] rounded-[7px] bg-white transition-transform ${
                            c.active ? 'translate-x-[14px]' : 'translate-x-0'
                          }`} />
                        </button>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setViewSubCat(c)}
                          className="w-7 h-7 rounded-[8px] bg-[#EEF1F8] hover:bg-[#E2E7F3] text-[#384E85] flex items-center justify-center cursor-pointer transition border-none"
                          title="Subcategories"
                        >
                          <FolderTree className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => openEditModal(c)}
                          className="w-7 h-7 rounded-[8px] bg-[#EEF1F8] hover:bg-[#E2E7F3] text-[#384E85] flex items-center justify-center cursor-pointer transition border-none"
                          title="Edit Category"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteCat(c)}
                          className="w-7 h-7 rounded-[8px] bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#EF4444] flex items-center justify-center cursor-pointer transition border-none"
                          title="Delete Category"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </Card>

      {/* EDIT CATEGORY MODAL (Figma Node 1:43956) */}
      {editCat && (
        <div className="fixed inset-0 z-50 bg-[rgba(15,22,41,0.5)] backdrop-blur-xs flex items-center justify-center p-4 select-none">
          <div className="bg-white rounded-[20px] shadow-[0px_40px_80px_0px_rgba(0,0,0,0.18)] w-full max-w-[520px] max-h-[92vh] overflow-hidden flex flex-col animate-fadeIn border-none">
            
            {/* Header */}
            <div 
              className="px-[22px] py-[18px] text-white flex items-center justify-between shrink-0"
              style={{ backgroundImage: "linear-gradient(171.9deg, rgb(56, 78, 133) 0%, rgb(42, 58, 101) 100%)" }}
            >
              <div className="flex items-center gap-[10px]">
                <div className="w-[34px] h-[34px] rounded-[10px] bg-white/15 text-white flex items-center justify-center text-[17px] shrink-0">
                  {editCat.icon}
                </div>
                <div>
                  <h3 className="text-[15px] font-extrabold text-white leading-[22.5px]">Edit Category</h3>
                  <p className="text-[11px] text-white/70 leading-[16.5px]">Configure category details</p>
                </div>
              </div>
              <button 
                onClick={() => setEditCat(null)} 
                className="w-[30px] h-[30px] rounded-[9px] bg-white/15 hover:bg-white/25 text-white flex items-center justify-center border-none cursor-pointer transition"
              >
                <X className="w-[15px] h-[15px]" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-[22px] overflow-y-auto space-y-[18px] text-[12.5px] flex-1">
              
              {/* Category Summary Banner Card */}
              <div className="bg-[#ECFDF5] border border-[#10B981]/20 rounded-[14px] p-[15px] flex items-center gap-[12px]">
                <div className="w-[48px] h-[48px] rounded-[12px] bg-[#ECFDF5] flex items-center justify-center text-[26px] shrink-0 overflow-hidden border border-[#10B981]/20">
                  {editSelectedImage ? (
                    <img src={editSelectedImage} alt="" className="w-full h-full object-cover" />
                  ) : (
                    editCat.icon
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-bold text-[#10B981] truncate">{editName || editCat.name}</div>
                  <div className="text-[11px] text-[#7A8299] truncate">{editDesc || editCat.desc}</div>
                </div>
                <span className="px-[10px] py-[3px] rounded-[20px] bg-[#10B981]/13 text-[#10B981] font-bold text-[10px]">
                  Active
                </span>
              </div>

              {/* Category Name Input */}
              <div>
                <label className="block text-[12px] font-semibold text-[#4A5568] mb-[6px]">
                  Category Name <span className="text-[#EF4444]">*</span>
                </label>
                <div className="bg-[#F4F5F8] border border-transparent rounded-[12px] overflow-hidden">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full h-[41.5px] px-[13px] bg-transparent text-[13px] text-[#0F1629] outline-none"
                  />
                </div>
              </div>

              {/* Description Textarea */}
              <div>
                <label className="block text-[12px] font-semibold text-[#4A5568] mb-[6px]">Description</label>
                <div className="bg-[#F4F5F8] border border-transparent rounded-[12px] overflow-hidden">
                  <textarea
                    rows={2}
                    placeholder="Brief description of this category..."
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    className="w-full p-[13px] bg-transparent text-[13px] text-[#0F1629] outline-none resize-none"
                  />
                </div>
              </div>

              {/* Category Image Gallery Picker */}
              <div className="space-y-[10px]">
                <label className="block text-[12px] font-semibold text-[#4A5568]">Category Image</label>
                
                {/* Selected Cover Box */}
                <div className="bg-[#ECFDF5] border border-[#10B981]/25 rounded-[14px] h-[120px] relative overflow-hidden flex flex-col justify-between p-[12px]">
                  {editSelectedImage ? (
                    <img src={editSelectedImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 bg-[#ECFDF5] flex items-center justify-center text-[40px]">
                      {editIcon}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  <div className="relative z-10 flex items-center justify-between w-full">
                    <span className="text-[11px] font-semibold text-white bg-black/30 px-2 py-0.5 rounded-[6px] backdrop-blur-xs">
                      ✓ Image selected
                    </span>
                    <button
                      type="button"
                      onClick={() => setEditSelectedImage(null)}
                      className="px-[10px] py-[4px] rounded-[8px] bg-[#EF4444]/90 text-white font-bold text-[11px] hover:bg-[#EF4444] transition border-none cursor-pointer"
                    >
                      ✕ Remove
                    </button>
                  </div>
                </div>

                {/* Filter Pills */}
                <div className="flex gap-[4px] overflow-x-auto pb-[4px] scrollbar-none">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'fresh-produce', label: 'Fresh Produce' },
                    { id: 'dairy-eggs', label: 'Dairy & Eggs' },
                    { id: 'meat-poultry', label: 'Meat & Poultry' },
                    { id: 'bakery', label: 'Bakery' },
                    { id: 'beverages', label: 'Beverages' },
                    { id: 'snacks', label: 'Snacks' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setEditImageCategory(cat.id)}
                      className={`px-[10px] py-[4px] rounded-[20px] text-[11px] font-semibold whitespace-nowrap transition cursor-pointer border-none ${
                        editImageCategory === cat.id
                          ? 'bg-[#384E85] text-white shadow-xs'
                          : 'bg-[#F4F5F8] text-[#7A8299] hover:text-[#0F1629]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-4 gap-[10px] max-h-[180px] overflow-y-auto pr-1">
                  {filteredGallery.map((img) => (
                    <button
                      key={img.id}
                      type="button"
                      onClick={() => setEditSelectedImage(img.url)}
                      className={`relative h-[75px] rounded-[12px] overflow-hidden border-2 transition cursor-pointer ${
                        editSelectedImage === img.url
                          ? 'border-[#384E85] shadow-md scale-95'
                          : 'border-transparent hover:opacity-90'
                      }`}
                    >
                      <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                      {editSelectedImage === img.url && (
                        <div className="absolute inset-0 bg-[#384E85]/40 flex items-center justify-center">
                          <CheckIcon className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Swatch Picker */}
              <div>
                <label className="block text-[12px] font-semibold text-[#4A5568] mb-[8px]">Color</label>
                <div className="flex items-center gap-[8px]">
                  {colorOptions.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => setEditColor(c.hex)}
                      className={`w-[32px] h-[32px] rounded-[16px] transition cursor-pointer border-3 ${
                        editColor === c.hex
                          ? 'border-[#0F1629] scale-110 shadow-xs'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>

              {/* Category Status Card */}
              <div className="bg-[#F4F5F8] p-[14px] rounded-[12px] flex items-center justify-between">
                <div>
                  <div className="text-[13px] font-semibold text-[#0F1629]">Category Status</div>
                  <div className="text-[11px] text-[#7A8299]">Visible to customers and admins</div>
                </div>

                <button
                  type="button"
                  onClick={() => setEditActive(!editActive)}
                  className={`w-[42px] h-[24px] rounded-[12px] p-[3px] transition duration-200 cursor-pointer border-none ${
                    editActive ? 'bg-[#384E85]' : 'bg-[#CBD5E0]'
                  }`}
                >
                  <div className={`w-[18px] h-[18px] rounded-[9px] bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.2)] transition-transform ${
                    editActive ? 'translate-x-[18px]' : 'translate-x-0'
                  }`} />
                </button>
              </div>

            </div>

            {/* Footer */}
            <div className="px-[22px] py-[15px] bg-[#FAFAFA] border-t border-[#384E85]/8 flex items-center justify-end gap-[10px] shrink-0">
              <button
                type="button"
                onClick={() => setEditCat(null)}
                className="px-[19px] py-[10px] rounded-[12px] border border-[#384E85]/18 text-[#4A5568] text-[13px] font-semibold hover:bg-gray-100 transition cursor-pointer bg-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleEditCategorySubmit}
                className="h-[40px] px-[22px] py-[9px] rounded-[12px] text-white text-[13px] font-bold shadow-[0px_4px_14px_rgba(56,78,133,0.3)] flex items-center gap-[6px] hover:opacity-95 transition cursor-pointer border-none"
                style={{ backgroundImage: "linear-gradient(165.7deg, rgb(56, 78, 133) 0%, rgb(42, 58, 101) 100%)" }}
              >
                <Check className="w-[14px] h-[14px]" /> Save Changes
              </button>
            </div>

          </div>
        </div>
      )}

      {/* VIEW SUBCATEGORIES MODAL */}
      {viewSubCat && (
        <div className="fixed inset-0 z-50 bg-[#0F1629]/50 backdrop-blur-xs flex items-center justify-center p-4 select-none">
          <div className="bg-white rounded-[22px] shadow-2xl w-full max-w-[560px] overflow-hidden flex flex-col animate-fadeIn border-none">
            
            {/* Header */}
            <div className="px-6 py-4.5 bg-gradient-to-r from-[#384E85] to-[#2A3A65] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[12px] bg-white/15 text-white flex items-center justify-center text-[22px] shrink-0">
                  {viewSubCat.icon}
                </div>
                <div>
                  <h3 className="text-[16px] font-extrabold">{viewSubCat.name}</h3>
                  <p className="text-[11px] text-white/70 font-mono">{viewSubCat.subcategories.length} subcategories · {viewSubCat.productCount} products</p>
                </div>
              </div>
              <button 
                onClick={() => setViewSubCat(null)} 
                className="w-8 h-8 rounded-[10px] bg-white/15 hover:bg-white/25 text-white flex items-center justify-center border-none cursor-pointer transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-[13px]">
              
              {/* Add New Subcategory Input Bar */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="New subcategory name..."
                  value={newSubName}
                  onChange={(e) => setNewSubName(e.target.value)}
                  className="flex-1 h-9 px-3 bg-[#F4F5F8] border border-transparent rounded-[10px] text-[12.5px] text-[#0F1629] outline-none focus:border-[#384E85]/30 transition"
                />
                <button
                  onClick={handleAddSubcategorySubmit}
                  className="h-9 px-3.5 rounded-[10px] bg-[#384E85] text-white text-[12px] font-bold flex items-center gap-1 hover:bg-[#2A3A65] transition cursor-pointer border-none"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Subcategory</span>
                </button>
              </div>

              {/* Subcategories List */}
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {viewSubCat.subcategories.map((sub) => (
                  <div key={sub.id} className="p-3 bg-[#FAFAFA] border border-[#384E85]/8 rounded-[14px] flex items-center justify-between hover:bg-[#EEF1F8]/30 transition">
                    <div className="flex items-center gap-2.5">
                      <FolderTree className="w-4 h-4 text-[#384E85]" />
                      <div>
                        <div className="font-bold text-[#0F1629] text-[13px]">{sub.name}</div>
                        <div className="text-[10.5px] font-mono text-[#7A8299]">{sub.slug}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded-[8px] bg-[#EEF1F8] text-[#384E85] font-bold text-[11px]">
                        {sub.productCount} items
                      </span>
                      <button
                        onClick={() => {
                          const updated = viewSubCat.subcategories.filter(s => s.id !== sub.id);
                          setCategories(prev => prev.map(c => c.id === viewSubCat.id ? { ...c, subcategories: updated } : c));
                          setViewSubCat({ ...viewSubCat, subcategories: updated });
                        }}
                        className="w-7 h-7 rounded-[7px] bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#EF4444] flex items-center justify-center cursor-pointer transition border-none"
                        title="Remove Subcategory"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Footer */}
            <div className="px-6 py-3.5 bg-[#FAFAFA] border-t border-[#384E85]/8 flex items-center justify-end">
              <Button variant="ghost" size="sm" onClick={() => setViewSubCat(null)}>Done</Button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteCat && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 select-none">
          <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[440px] overflow-hidden flex flex-col border-none">
            <div className="px-6 py-4 bg-[#FEF2F2] border-b border-[#EF4444]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#EF4444] text-white flex items-center justify-center">
                  <X className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#991B1B]">Delete Category</h3>
                  <p className="text-[11px] text-[#991B1B]/80">{deleteCat.name}</p>
                </div>
              </div>
              <button onClick={() => setDeleteCat(null)} className="w-7 h-7 rounded-full bg-[#EF4444]/10 text-[#991B1B] flex items-center justify-center border-none cursor-pointer">
                ✕
              </button>
            </div>

            <div className="p-6 space-y-2 text-[13px]">
              <p className="text-[#4A5568]">Are you sure you want to delete category <strong>{deleteCat.name}</strong>? All associated product links will be unassigned.</p>
            </div>

            <div className="px-6 py-3.5 bg-[#FAFAFA] border-t border-gray-100 flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => setDeleteCat(null)}>Cancel</Button>
              <button
                onClick={handleDeleteConfirm}
                className="h-9 px-4 rounded-[12px] bg-[#EF4444] hover:bg-[#DC2626] text-white text-[12.5px] font-bold flex items-center gap-1.5 transition cursor-pointer border-none"
              >
                <Trash2 className="w-4 h-4" /> Delete Category
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
