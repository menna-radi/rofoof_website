import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DollarSign, 
  ShoppingBag, 
  Truck, 
  TrendingDown, 
  Users, 
  Boxes, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  AlertTriangle,
  Zap,
  Star,
  RefreshCw,
  ArrowRight,
  Download,
  Package,
  UserPlus,
  Edit,
  Check,
  User,
  XCircle,
  UserCheck,
  ListOrdered,
  ShoppingCart
} from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { ExportDataModal } from '@/shared/components/modals/ExportDataModal';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');
  const [exportOpen, setExportOpen] = useState(false);

  // Top 8 Stat Cards Data
  const stats = [
    { label: 'Total Revenue', value: '$2.84M', change: '+18.4%', up: true, detail: 'vs last month', color: 'text-[#384E85]', iconBg: 'bg-[#EEF1F8]', icon: DollarSign, sparkline: [40, 55, 48, 65, 58, 72, 65, 78, 70, 82, 75, 88], hex: '#384E85' },
    { label: "Today's Orders", value: '3,247', change: '+12.1%', up: true, detail: 'vs yesterday', color: 'text-[#10B981]', iconBg: 'bg-[#ECFDF5]', icon: ShoppingBag, sparkline: [30, 45, 38, 55, 48, 62, 55, 70, 60, 72, 65, 80], hex: '#10B981' },
    { label: 'Active Deliveries', value: '184', change: '+5.3%', up: true, detail: 'drivers on route', color: 'text-[#D97706]', iconBg: 'bg-[#FFFBEB]', icon: Truck, sparkline: [20, 35, 28, 42, 35, 48, 40, 52, 45, 55, 48, 60], hex: '#D97706' },
    { label: 'Wholesale Revenue', value: '$892K', change: '+24.7%', up: true, detail: 'B2B accounts', color: 'text-[#7C3AED]', iconBg: 'bg-[#F5F3FF]', icon: DollarSign, sparkline: [25, 40, 32, 50, 42, 55, 48, 62, 55, 68, 60, 75], hex: '#7C3AED' },
    { label: 'Avg Order Value', value: '$67.40', change: '-2.1%', up: false, detail: 'retail avg', color: 'text-[#0891B2]', iconBg: 'bg-[#ECFEFF]', icon: Star, sparkline: [60, 55, 58, 52, 56, 50, 54, 48, 52, 46, 50, 44], hex: '#0891B2' },
    { label: 'Inventory Value', value: '$14.2M', change: '+3.8%', up: true, detail: 'total stock', color: 'text-[#F97316]', iconBg: 'bg-[#FFF7ED]', icon: Boxes, sparkline: [35, 38, 36, 40, 38, 42, 40, 43, 41, 44, 42, 45], hex: '#F97316' },
    { label: 'Customer Growth', value: '42,891', change: '+8.9%', up: true, detail: 'new this month', color: 'text-[#DB2777]', iconBg: 'bg-[#FDF2F8]', icon: Users, sparkline: [30, 38, 34, 42, 38, 46, 42, 50, 46, 54, 50, 58], hex: '#DB2777' },
    { label: 'Driver Performance', value: '94.2%', change: '+1.4%', up: true, detail: 'on-time delivery', color: 'text-[#384E85]', iconBg: 'bg-[#EEF1F8]', icon: Activity, sparkline: [80, 82, 85, 83, 87, 85, 88, 86, 89, 87, 90, 88], hex: '#384E85' },
  ];

  // 6 Operational Mini Stats with Sparklines
  const miniStats = [
    { label: 'Online Drivers', value: '38', change: '+4', detail: 'vs 1 hour ago', color: 'text-[#10B981]', iconBg: 'bg-[#ECFDF5]', icon: Zap, sparkline: [20, 26, 24, 30, 28, 38], hex: '#10B981' },
    { label: 'Available Drivers', value: '14', change: '-2', detail: 'ready to dispatch', color: 'text-[#384E85]', iconBg: 'bg-[#EEF1F8]', icon: Truck, sparkline: [18, 17, 15, 16, 15, 14], hex: '#384E85' },
    { label: 'Busy Drivers', value: '24', change: '+6', detail: 'on active routes', color: 'text-[#D97706]', iconBg: 'bg-[#FFFBEB]', icon: Truck, sparkline: [14, 17, 19, 21, 20, 24], hex: '#D97706' },
    { label: 'Awaiting Assign', value: '7', change: '+3', detail: 'pending dispatch', color: 'text-[#EF4444]', iconBg: 'bg-[#FEF2F2]', icon: Clock, sparkline: [3, 4, 5, 4, 6, 7], hex: '#EF4444' },
    { label: 'Low Stock Items', value: '12', change: '+5', detail: 'need reorder', color: 'text-[#F97316]', iconBg: 'bg-[#FFF7ED]', icon: AlertTriangle, sparkline: [6, 7, 9, 8, 10, 12], hex: '#F97316' },
    { label: "Today's Profit", value: '$18,420', change: '+22.3%', detail: 'net margin 28%', color: 'text-[#7C3AED]', iconBg: 'bg-[#F5F3FF]', icon: DollarSign, sparkline: [12, 14, 13, 16, 15, 18], hex: '#7C3AED' },
  ];

  // Recent Orders List matching exact design colors & status pills
  const recentOrders = [
    { id: '#8831', customer: 'Metro Grocers Ltd', amount: '$1,240', time: '10:14', status: 'On The Way', iconBg: 'bg-[#ECFDF5]', iconColor: 'text-[#065F46]', badgeBg: 'bg-[#ECFDF5]', badgeColor: 'text-[#065F46]', dotColor: 'bg-[#10B981]' },
    { id: '#8830', customer: 'Sarah Mitchell', amount: '$85', time: '10:32', status: 'Preparing', iconBg: 'bg-[#FFFBEB]', iconColor: 'text-[#D97706]', badgeBg: 'bg-[#FFFBEB]', badgeColor: 'text-[#D97706]', dotColor: 'bg-[#F59E0B]' },
    { id: '#8829', customer: 'Sunrise Wholesale', amount: '$3,480', time: '09:55', status: 'Picked Up', iconBg: 'bg-[#ECFEFF]', iconColor: 'text-[#0891B2]', badgeBg: 'bg-[#ECFEFF]', badgeColor: 'text-[#0891B2]', dotColor: 'bg-[#06B6D4]' },
    { id: '#8828', customer: 'David Kumar', amount: '$127', time: '10:48', status: 'Placed', iconBg: 'bg-[#EEF1F8]', iconColor: 'text-[#384E85]', badgeBg: 'bg-[#EEF1F8]', badgeColor: 'text-[#384E85]', dotColor: 'bg-[#384E85]' },
    { id: '#8827', customer: 'City Foods Co.', amount: '$890', time: '09:30', status: 'Confirmed', iconBg: 'bg-[#F5F3FF]', iconColor: 'text-[#7C3AED]', badgeBg: 'bg-[#F5F3FF]', badgeColor: 'text-[#7C3AED]', dotColor: 'bg-[#8B5CF6]' },
    { id: '#8826', customer: 'QuickBite Café', amount: '$340', time: '09:12', status: 'Delivered', iconBg: 'bg-[#ECFDF5]', iconColor: 'text-[#065F46]', badgeBg: 'bg-[#ECFDF5]', badgeColor: 'text-[#065F46]', dotColor: 'bg-[#10B981]' },
    { id: '#8825', customer: 'Layla Hassan', amount: '$142', time: '09:02', status: 'Ready', iconBg: 'bg-[#F5F3FF]', iconColor: 'text-[#7C3AED]', badgeBg: 'bg-[#F5F3FF]', badgeColor: 'text-[#7C3AED]', dotColor: 'bg-[#8B5CF6]' },
  ];

  // Driver Activity Feed with colored timeline connectors
  const driverActivity = [
    { initials: 'AK', name: 'Ahmed Khalil', action: 'picked up', order: '#8829', time: '10:34', bg: 'bg-[#EEF1F8]', color: 'text-[#384E85]', lineColor: 'bg-[#384E85]/20' },
    { initials: 'RM', name: 'Reza Moradi', action: 'completed', order: '#8820', time: '10:22', bg: 'bg-[#ECFDF5]', color: 'text-[#065F46]', lineColor: 'bg-[#10B981]/20' },
    { initials: 'MS', name: 'Maria Santos', action: 'is preparing', order: '#8830', time: '10:18', bg: 'bg-[#FFFBEB]', color: 'text-[#D97706]', lineColor: 'bg-[#F59E0B]/20' },
    { initials: 'TW', name: 'Tom Wilson', action: 'started route for', order: '#8826', time: '10:05', bg: 'bg-[#EEF1F8]', color: 'text-[#384E85]', lineColor: 'bg-[#384E85]/20' },
    { initials: 'JR', name: 'James Roberts', action: 'completed', order: '#8815', time: '09:58', bg: 'bg-[#ECFDF5]', color: 'text-[#065F46]', lineColor: 'bg-[#10B981]/20' },
    { initials: 'AK', name: 'Ahmed Khalil', action: 'picked up', order: '#8818', time: '09:44', bg: 'bg-[#EEF1F8]', color: 'text-[#384E85]', lineColor: 'bg-[#384E85]/20' },
    { initials: 'RM', name: 'Reza Moradi', action: 'is delivering', order: '#8824', time: '09:30', bg: 'bg-[#FFFBEB]', color: 'text-[#D97706]', lineColor: 'bg-transparent' },
  ];

  // Dispatch Queue Items
  const dispatchQueue = [
    { order: '#8831', urgent: true, customer: 'Metro Grocers Ltd', price: '$1,240', wait: 'Wait: 4 min' },
    { order: '#8828', urgent: false, customer: 'David Kumar', price: '$127', wait: 'Wait: 8 min' },
    { order: '#8827', urgent: false, customer: 'Omar Khalid', price: '$58', wait: 'Wait: 12 min' },
  ];

  // Low Stock Items with product icons
  const lowStockItems = [
    { name: 'Organic Whole Milk 2L', cat: 'Dairy', stock: 8, min: 50, status: 'Critical', color: 'bg-red-500', tag: 'bg-[#FEF2F2] text-[#EF4444]', iconBg: 'bg-[#FEF2F2] text-[#EF4444]' },
    { name: 'Cooking Oil 1L', cat: 'Pantry', stock: 5, min: 40, status: 'Critical', color: 'bg-red-500', tag: 'bg-[#FEF2F2] text-[#EF4444]', iconBg: 'bg-[#FEF2F2] text-[#EF4444]' },
    { name: 'Basmati Rice 5kg', cat: 'Grains', stock: 12, min: 60, status: 'Low Stock', color: 'bg-amber-500', tag: 'bg-[#FFFBEB] text-[#D97706]', iconBg: 'bg-[#FFF7ED] text-[#F97316]' },
    { name: 'Chicken Breast 1kg', cat: 'Meat', stock: 5, min: 80, status: 'Critical', color: 'bg-red-500', tag: 'bg-[#FEF2F2] text-[#EF4444]', iconBg: 'bg-[#FEF2F2] text-[#EF4444]' },
    { name: 'Sourdough Bread 500g', cat: 'Bakery', stock: 18, min: 60, status: 'Low Stock', color: 'bg-amber-500', tag: 'bg-[#FFFBEB] text-[#D97706]', iconBg: 'bg-[#FFF7ED] text-[#F97316]' },
    { name: 'Avocados (net 6)', cat: 'Produce', stock: 0, min: 30, status: 'Out of Stock', color: 'bg-gray-400', tag: 'bg-gray-100 text-gray-600', iconBg: 'bg-gray-100 text-gray-500' },
  ];

  // Online Drivers Status
  const onlineDrivers = [
    { initials: 'AK', name: 'Ahmed Khalil', rating: '4.9', location: 'Downtown', status: 'Busy', orders: '3 orders', dot: 'bg-amber-500', bg: 'bg-[#EEF1F8]', color: 'text-[#384E85]' },
    { initials: 'RM', name: 'Reza Moradi', rating: '5.0', location: 'City Centre', status: 'Busy', orders: '4 orders', dot: 'bg-amber-500', bg: 'bg-[#EEF1F8]', color: 'text-[#384E85]' },
    { initials: 'MS', name: 'Maria Santos', rating: '4.8', location: 'North', status: 'Available', orders: '1 orders', dot: 'bg-emerald-500', bg: 'bg-[#ECFDF5]', color: 'text-[#065F46]' },
    { initials: 'TW', name: 'Tom Wilson', rating: '4.7', location: 'South', status: 'Available', orders: '1 orders', dot: 'bg-emerald-500', bg: 'bg-[#ECFDF5]', color: 'text-[#065F46]' },
    { initials: 'JR', name: 'James Roberts', rating: '4.6', location: 'East Side', status: 'Busy', orders: '3 orders', dot: 'bg-amber-500', bg: 'bg-[#EEF1F8]', color: 'text-[#384E85]' },
    { initials: 'LP', name: 'Lisa Park', rating: '4.5', location: 'West', status: 'Available', orders: '0 orders', dot: 'bg-emerald-500', bg: 'bg-[#ECFDF5]', color: 'text-[#065F46]' },
  ];

  // Timeline Activity Feed
  const recentActivities = [
    { icon: ShoppingBag, iconBg: 'bg-[#EEF1F8] text-[#384E85]', title: 'New order placed', desc: 'ORD-8821 — Metro Grocers Ltd — $1,240', time: 'Just now' },
    { icon: Edit, iconBg: 'bg-[#F5F3FF] text-[#7C3AED]', title: 'Product updated', desc: 'Organic Bananas — price set to $1.20/kg', time: '3 min ago' },
    { icon: Truck, iconBg: 'bg-[#ECFDF5] text-[#10B981]', title: 'Delivery completed', desc: 'Ahmed K. completed 12 orders today', time: '8 min ago' },
    { icon: UserPlus, iconBg: 'bg-[#ECFEFF] text-[#0891B2]', title: 'New customer registered', desc: 'QuickBite Café — Wholesale account', time: '14 min ago' },
    { icon: AlertTriangle, iconBg: 'bg-[#FFF7ED] text-[#F97316]', title: 'Low stock alert', desc: 'Whole Milk 2L — 12 units remaining', time: '20 min ago' },
    { icon: Check, iconBg: 'bg-[#ECFDF5] text-[#10B981]', title: 'Order delivered', desc: 'ORD-8817 — FreshMart HQ — $6,200', time: '32 min ago' },
    { icon: Package, iconBg: 'bg-[#F5F3FF] text-[#7C3AED]', title: 'New product added', desc: 'Keto Granola 400g — added to Snacks', time: '45 min ago' },
    { icon: Truck, iconBg: 'bg-[#FFFBEB] text-[#D97706]', title: 'Driver on break', desc: 'James R. — paused deliveries · 30 min', time: '52 min ago' },
    { icon: AlertTriangle, iconBg: 'bg-[#FEF2F2] text-[#EF4444]', title: 'Out of stock', desc: 'Avocados (net 6) — 0 units remaining', time: '1h ago' },
    { icon: UserPlus, iconBg: 'bg-[#ECFEFF] text-[#0891B2]', title: 'Wholesale account upgraded', desc: 'Sunrise Wholesale → Gold tier', time: '1.5h ago' },
  ];

  // Helper SVG sparkline generator
  const renderSparkline = (data: number[], colorHex: string, height = 36) => {
    const w = 200, h = height;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 4) - 2}`).join(' ');
    const bottom = data.map((v, i) => `${(i / (data.length - 1)) * w},${h}`).reverse().join(' ');
    const gradId = `spark_${colorHex.replace(/[^a-zA-Z0-9]/g, '')}_${Math.random().toString(36).substring(2, 5)}`;

    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colorHex} stopOpacity="0.28" />
            <stop offset="100%" stopColor={colorHex} stopOpacity="0.01" />
          </linearGradient>
        </defs>
        <polygon points={`${pts} ${bottom}`} fill={`url(#${gradId})`} />
        <polyline fill="none" stroke={colorHex} strokeWidth="1.8" points={pts} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  // Revenue Trend Dynamic Data per Time Filter (Strictly bounded Y: 32 - 160)
  const revenueTrendData = {
    daily: {
      yLabels: ['$20K', '$15K', '$10K', '$5K', '$0K'],
      xLabels: ['12 AM', '3 AM', '6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM', '11 PM'],
      retailPath: "M 50 140 C 90 155, 130 120, 174 130 C 210 140, 260 80, 298 70 C 330 60, 390 90, 421 45 C 450 35, 510 30, 545 55",
      retailPolygon: "50,164 50,140 C 90 155, 130 120, 174 130 C 210 140, 260 80, 298 70 C 330 60, 390 90, 421 45 C 450 35, 510 30, 545 55 L 545,164",
      wholesalePath: "M 50 155 C 90 160, 130 150, 174 148 C 210 145, 260 100, 298 95 C 330 90, 390 75, 421 115 C 450 125, 510 145, 545 150",
      wholesalePolygon: "50,164 50,155 C 90 160, 130 150, 174 148 C 210 145, 260 100, 298 95 C 330 90, 390 75, 421 115 C 450 125, 510 145, 545 150 L 545,164",
      retailTotal: '$58.4K',
      wholesaleTotal: '$24.2K'
    },
    weekly: {
      yLabels: ['$150K', '$112K', '$75K', '$37K', '$0K'],
      xLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      retailPath: "M 50 130 C 90 125, 170 120, 215 110 C 260 100, 340 80, 380 55 C 420 40, 500 30, 545 45",
      retailPolygon: "50,164 50,130 C 90 125, 170 120, 215 110 C 260 100, 340 80, 380 55 C 420 40, 500 30, 545 45 L 545,164",
      wholesalePath: "M 50 145 C 90 140, 170 130, 215 125 C 260 120, 340 95, 380 85 C 420 75, 500 120, 545 135",
      wholesalePolygon: "50,164 50,145 C 90 140, 170 130, 215 125 C 260 120, 340 95, 380 85 C 420 75, 500 120, 545 135 L 545,164",
      retailTotal: '$412K',
      wholesaleTotal: '$185K'
    },
    monthly: {
      yLabels: ['$1200K', '$900K', '$600K', '$300K', '$0K'],
      xLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      retailPath: "M 50 125 C 72 122, 117 110, 140 105 C 162 100, 207 105, 230 95 C 252 85, 297 80, 320 75 C 342 70, 387 68, 410 70 C 432 72, 477 48, 500 42 C 522 36, 535 34, 545 32",
      retailPolygon: "50,164 50,125 C 72 122, 117 110, 140 105 C 162 100, 207 105, 230 95 C 252 85, 297 80, 320 75 C 342 70, 387 68, 410 70 C 432 72, 477 48, 500 42 C 522 36, 535 34, 545 32 L 545,164",
      wholesalePath: "M 50 142 C 72 140, 117 132, 140 128 C 162 124, 207 118, 230 112 C 252 106, 297 100, 320 96 C 342 92, 387 85, 410 82 C 432 78, 477 68, 500 64 C 522 60, 535 56, 545 54",
      wholesalePolygon: "50,164 50,142 C 72 140, 117 132, 140 128 C 162 124, 207 118, 230 112 C 252 106, 297 100, 320 96 C 342 92, 387 85, 410 82 C 432 78, 477 68, 500 64 C 522 60, 535 56, 545 54 L 545,164",
      retailTotal: '$1.95M',
      wholesaleTotal: '$892K'
    },
    yearly: {
      yLabels: ['$15M', '$11M', '$8M', '$4M', '$0K'],
      xLabels: ['2021', '2022', '2023', '2024', '2025', '2026'],
      retailPath: "M 50 145 C 99 135, 198 115, 248 105 C 297 95, 396 68, 446 55 C 495 42, 520 38, 545 35",
      retailPolygon: "50,164 50,145 C 99 135, 198 115, 248 105 C 297 95, 396 68, 446 55 C 495 42, 520 38, 545 35 L 545,164",
      wholesalePath: "M 50 155 C 99 148, 198 135, 248 128 C 297 118, 396 95, 446 85 C 495 75, 520 68, 545 62",
      wholesalePolygon: "50,164 50,155 C 99 148, 198 135, 248 128 C 297 118, 396 95, 446 85 C 495 75, 520 68, 545 62 L 545,164",
      retailTotal: '$18.4M',
      wholesaleTotal: '$8.2M'
    }
  };

  const currentTrend = revenueTrendData[timeFilter];

  return (
    <div className="space-y-7 pb-10 select-none">
      {/* ---------------------------------------------------- */}
      {/* 1. TOP 8 STAT CARDS GRID                             */}
      {/* ---------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <Card key={idx} className="p-5 relative overflow-hidden bg-white border border-[#384E85]/7 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0px_12px_36px_rgba(0,0,0,0.1)] transition-all">
              <div className="text-[12px] font-semibold text-[#7A8299] mb-1">{s.label}</div>
              <div className="text-[26px] font-extrabold text-[#0F1629] leading-[29px] tracking-tight">{s.value}</div>
              
              <div className="flex items-center gap-1.5 mt-2">
                <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  s.up ? 'bg-[#ECFDF5] text-[#10B981]' : 'bg-[#FEF2F2] text-[#EF4444]'
                }`}>
                  {s.up ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                  {s.change}
                </span>
                <span className="text-[11px] text-[#7A8299]">{s.detail}</span>
              </div>

              <div className="h-[34px] mt-3">
                {renderSparkline(s.sparkline, s.hex, 34)}
              </div>

              <div className={`absolute top-5 right-5 w-8 h-8 rounded-[10px] ${s.iconBg} flex items-center justify-center ${s.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </Card>
          );
        })}
      </div>

      {/* ---------------------------------------------------- */}
      {/* SECTION DIVIDER: OPERATIONAL                         */}
      {/* ---------------------------------------------------- */}
      <div className="flex items-center gap-4">
        <span className="text-[11px] font-bold text-[#7A8299] uppercase tracking-[0.8px]">Operational</span>
        <div className="flex-1 h-[1px] bg-[#384E85]/8" />
      </div>

      {/* ---------------------------------------------------- */}
      {/* 2. OPERATIONAL 6 MINI STATS GRID                     */}
      {/* ---------------------------------------------------- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {miniStats.map((ms, idx) => {
          const Icon = ms.icon;
          return (
            <Card key={idx} className="p-4 relative bg-white border border-[#384E85]/7 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11.5px] font-semibold text-[#7A8299] truncate">{ms.label}</span>
                <div className={`w-7 h-7 rounded-[9px] ${ms.iconBg} ${ms.color} flex items-center justify-center shrink-0`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <div className="text-[22px] font-extrabold text-[#0F1629] leading-tight">{ms.value}</div>
                
                {/* Sparkline inside mini stat card */}
                <div className="h-[24px] my-1">
                  {renderSparkline(ms.sparkline, ms.hex, 24)}
                </div>

                <div className="flex items-center gap-1 text-[10.5px]">
                  <span className={`inline-flex items-center font-bold px-1.5 py-0.2 rounded-full ${
                    ms.change.startsWith('+') ? 'bg-[#ECFDF5] text-[#10B981]' : 'bg-[#FEF2F2] text-[#EF4444]'
                  }`}>
                    {ms.change}
                  </span>
                  <span className="text-[#7A8299] truncate text-[10px]">{ms.detail}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* ---------------------------------------------------- */}
      {/* 3. BUSINESS OVERVIEW SECTION                         */}
      {/* ---------------------------------------------------- */}
      <div className="space-y-4">
        <div>
          <h2 className="text-[18px] font-extrabold text-[#0F1629] tracking-tight">Business Overview</h2>
          <p className="text-[12px] text-[#7A8299]">Revenue analytics, order distribution, and category performance</p>
        </div>

        {/* Two Column Grid: Revenue Trend + Order Status */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Revenue Trend Line Chart (3/5 width) */}
          <Card className="lg:col-span-3 p-6 bg-white border border-[#384E85]/7 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)] flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-[15px] font-bold text-[#0F1629]">Revenue Trend</h3>
                  <p className="text-[12px] text-[#7A8299]">Retail vs Wholesale comparison</p>
                </div>

                {/* Daily, Weekly, Monthly, Yearly Time Filter Tabs inside Revenue Trend */}
                <div className="bg-[#F4F5F8] p-1 rounded-[12px] flex items-center gap-1 shrink-0 self-start sm:self-auto">
                  {(['daily', 'weekly', 'monthly', 'yearly'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTimeFilter(t)}
                      className={`px-3 py-1.5 rounded-[9px] text-[12px] font-semibold capitalize transition cursor-pointer border-none ${
                        timeFilter === t
                          ? 'bg-[#384E85] text-white shadow-xs'
                          : 'text-[#7A8299] hover:text-[#0F1629]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Chart SVG based on active timeFilter */}
              <div className="h-[220px] w-full relative">
                <svg viewBox="0 0 600 200" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="retailGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#384E85" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#384E85" stopOpacity="0.01" />
                    </linearGradient>
                    <linearGradient id="wholesaleGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0.01" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines & Y Axis Labels */}
                  {currentTrend.yLabels.map((lbl, idx) => {
                    const y = 20 + idx * 36;
                    return (
                      <g key={idx}>
                        <line x1="45" y1={y} x2="590" y2={y} stroke="#F3F4F6" strokeWidth="1" />
                        <text x="40" y={y + 3} textAnchor="end" fill="#9CA3AF" fontSize="9" fontFamily="sans-serif">{lbl}</text>
                      </g>
                    );
                  })}

                  {/* Retail Line & Area */}
                  <polygon points={currentTrend.retailPolygon} fill="url(#retailGrad)" />
                  <path d={currentTrend.retailPath} fill="none" stroke="#384E85" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Wholesale Line (Dashed) & Area */}
                  <polygon points={currentTrend.wholesalePolygon} fill="url(#wholesaleGrad)" />
                  <path d={currentTrend.wholesalePath} fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round" />

                  {/* Dynamic X Axis Labels */}
                  {currentTrend.xLabels.map((lbl, i) => {
                    const step = (590 - 50) / Math.max(currentTrend.xLabels.length - 1, 1);
                    const x = 50 + i * step;
                    return (
                      <text key={i} x={x} y="186" textAnchor="middle" fill="#9CA3AF" fontSize="9" fontFamily="sans-serif">{lbl}</text>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Legend Footer */}
            <div className="flex items-center gap-6 pt-3 border-t border-[#F3F4F6] text-[12px]">
              <div className="flex items-center gap-2">
                <span className="w-5 h-[3px] rounded-full bg-[#384E85]" />
                <span className="text-[#7A8299]">Retail</span>
                <span className="font-bold text-[#0F1629]">{currentTrend.retailTotal}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-[2px] rounded-full bg-[#10B981] border-b border-dashed border-[#10B981]" />
                <span className="text-[#7A8299]">Wholesale</span>
                <span className="font-bold text-[#0F1629]">{currentTrend.wholesaleTotal}</span>
              </div>
            </div>
          </Card>

          {/* Order Status Donut Chart (2/5 width) */}
          <Card className="lg:col-span-2 p-6 bg-white border border-[#384E85]/7 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)] flex flex-col justify-between">
            <div>
              <h3 className="text-[15px] font-bold text-[#0F1629]">Order Status</h3>
              <p className="text-[12px] text-[#7A8299] mb-4">3,249 total orders today</p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
                {/* SVG Donut */}
                <div className="relative w-[150px] h-[150px] shrink-0">
                  <svg width="150" height="150" viewBox="0 0 160 160" className="transform -rotate-90">
                    <circle cx="80" cy="80" r="65" fill="none" stroke="#F3F4F6" strokeWidth="18" />
                    {/* Delivered 58% */}
                    <circle cx="80" cy="80" r="65" fill="none" stroke="#10B981" strokeWidth="18" strokeDasharray="236 408" strokeDashoffset="0" strokeLinecap="round" />
                    {/* On The Way 18% */}
                    <circle cx="80" cy="80" r="65" fill="none" stroke="#384E85" strokeWidth="18" strokeDasharray="73 408" strokeDashoffset="-242" strokeLinecap="round" />
                    {/* Preparing 14% */}
                    <circle cx="80" cy="80" r="65" fill="none" stroke="#F59E0B" strokeWidth="18" strokeDasharray="57 408" strokeDashoffset="-320" strokeLinecap="round" />
                    {/* Cancelled 10% */}
                    <circle cx="80" cy="80" r="65" fill="none" stroke="#EF4444" strokeWidth="18" strokeDasharray="40 408" strokeDashoffset="-382" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-[22px] font-extrabold text-[#0F1629] leading-none">3,249</span>
                    <span className="text-[10px] font-bold text-[#7A8299] uppercase tracking-wider mt-1">ORDERS</span>
                  </div>
                </div>

                {/* Donut Legend */}
                <div className="flex-1 w-full space-y-2.5 text-[12.5px]">
                  {[
                    { label: 'Delivered', count: '1,884', pct: '58%', color: 'bg-[#10B981]', textColor: 'text-[#10B981]' },
                    { label: 'On The Way', count: '585', pct: '18%', color: 'bg-[#384E85]', textColor: 'text-[#384E85]' },
                    { label: 'Preparing', count: '455', pct: '14%', color: 'bg-[#F59E0B]', textColor: 'text-[#F59E0B]' },
                    { label: 'Cancelled', count: '325', pct: '10%', color: 'bg-[#EF4444]', textColor: 'text-[#EF4444]' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                        <span className="text-[#0F1629] font-medium">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#0F1629]">{item.count}</span>
                        <span className={`text-[11px] font-bold ${item.textColor} min-w-[28px] text-right`}>{item.pct}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Top Categories Card */}
        <Card className="p-6 bg-white border border-[#384E85]/7 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)]">
          <div className="mb-4">
            <h3 className="text-[15px] font-bold text-[#0F1629]">Top Categories</h3>
            <p className="text-[12px] text-[#7A8299]">Sales distribution by product category</p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Category Multi-color Donut */}
            <div className="relative w-[130px] h-[130px] shrink-0">
              <svg width="130" height="130" viewBox="0 0 160 160" className="transform -rotate-90">
                <circle cx="80" cy="80" r="65" fill="none" stroke="#10B981" strokeWidth="22" strokeDasharray="130 408" strokeDashoffset="0" strokeLinecap="round" />
                <circle cx="80" cy="80" r="65" fill="none" stroke="#384E85" strokeWidth="22" strokeDasharray="73 408" strokeDashoffset="-135" strokeLinecap="round" />
                <circle cx="80" cy="80" r="65" fill="none" stroke="#F59E0B" strokeWidth="22" strokeDasharray="90 408" strokeDashoffset="-213" strokeLinecap="round" />
                <circle cx="80" cy="80" r="65" fill="none" stroke="#8B5CF6" strokeWidth="22" strokeDasharray="45 408" strokeDashoffset="-308" strokeLinecap="round" />
                <circle cx="80" cy="80" r="65" fill="none" stroke="#06B6D4" strokeWidth="22" strokeDasharray="37 408" strokeDashoffset="-358" strokeLinecap="round" />
                <circle cx="80" cy="80" r="65" fill="none" stroke="#F97316" strokeWidth="22" strokeDasharray="32 408" strokeDashoffset="-400" strokeLinecap="round" />
              </svg>
            </div>

            {/* Category Pills Grid */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full">
              {[
                { name: 'Fresh Produce', pct: '32%', color: 'bg-[#10B981]', textColor: 'text-[#10B981]' },
                { name: 'Dairy & Eggs', pct: '18%', color: 'bg-[#384E85]', textColor: 'text-[#384E85]' },
                { name: 'Meat & Poultry', pct: '22%', color: 'bg-[#F59E0B]', textColor: 'text-[#F59E0B]' },
                { name: 'Bakery', pct: '11%', color: 'bg-[#8B5CF6]', textColor: 'text-[#8B5CF6]' },
                { name: 'Beverages', pct: '9%', color: 'bg-[#06B6D4]', textColor: 'text-[#06B6D4]' },
                { name: 'Snacks', pct: '8%', color: 'bg-[#F97316]', textColor: 'text-[#F97316]' },
              ].map((c, idx) => (
                <div key={idx} className="p-3 bg-[#FAFAFA] border border-[#384E85]/6 rounded-[12px] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${c.color}`} />
                    <span className="text-[12.5px] font-semibold text-[#0F1629]">{c.name}</span>
                  </div>
                  <span className={`text-[13px] font-extrabold ${c.textColor}`}>{c.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 4. LIVE OPERATIONS SECTION                           */}
      {/* ---------------------------------------------------- */}
      <div className="space-y-4">
        <div>
          <h2 className="text-[18px] font-extrabold text-[#0F1629] tracking-tight">Live Operations</h2>
          <p className="text-[12px] text-[#7A8299]">Real-time order and driver activity</p>
        </div>

        {/* Row 1: Recent Orders + Driver Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Recent Orders List (2/3 width) */}
          <Card className="lg:col-span-2 p-6 bg-white border border-[#384E85]/7 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-[15px] font-bold text-[#0F1629]">Recent Orders</h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ECFDF5] text-[#10B981]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" /> Live
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/orders')} className="text-[12px] text-[#384E85] font-semibold">
                View All
              </Button>
            </div>

            <div className="divide-y divide-[#384E85]/6">
              {recentOrders.map((o) => (
                <div key={o.id} className="py-3 flex items-center justify-between hover:bg-[#FAFAFA] transition rounded-lg px-2">
                  <div className="flex items-center gap-3">
                    {/* Exact Shopping Bag Icon inside rounded square */}
                    <div className={`w-8 h-8 rounded-[8px] ${o.iconBg} ${o.iconColor} flex items-center justify-center font-bold text-xs shrink-0`}>
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-[#384E85]">{o.id}</div>
                      <div className="text-[12px] text-[#0F1629] font-medium">{o.customer}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-[13px] font-extrabold text-[#0F1629]">{o.amount}</div>
                      <div className="text-[11px] text-[#7A8299]">{o.time}</div>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${o.badgeBg} ${o.badgeColor}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${o.dotColor}`} />
                      {o.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Driver Activity Timeline (1/3 width) with colored timeline line segments */}
          <Card className="p-6 bg-white border border-[#384E85]/7 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)]">
            <h3 className="text-[15px] font-bold text-[#0F1629]">Driver Activity</h3>
            <p className="text-[12px] text-[#7A8299] mb-5">Live field operations feed</p>

            <div className="space-y-4">
              {driverActivity.map((d, idx) => (
                <div key={idx} className="flex items-start gap-3 relative">
                  {/* Per-segment colored timeline connector line */}
                  {idx < driverActivity.length - 1 && (
                    <div className={`absolute left-[15px] top-8 bottom-0 w-[2px] ${d.lineColor}`} />
                  )}

                  <div className={`w-8 h-8 rounded-full ${d.bg} ${d.color} flex items-center justify-center font-bold text-[11px] shrink-0 shadow-xs border-2 border-white relative z-10`}>
                    {d.initials}
                  </div>
                  <div className="flex-1 text-[12px] pt-0.5">
                    <span className="font-bold text-[#0F1629]">{d.name}</span> <span className="text-[#7A8299]">{d.action}</span> <span className="font-bold text-[#384E85]">{d.order}</span>
                    <div className="text-[10.5px] text-[#7A8299] mt-0.5">{d.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Row 2: 3-Column Operations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Column 1: Dispatch Center */}
          <Card className="p-5 bg-white border border-[#384E85]/7 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-[15px] font-bold text-[#0F1629]">Dispatch Center</h3>
                  <p className="text-[11.5px] text-[#7A8299]">Logistics operations overview</p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF2F2] text-[#EF4444]">
                  7 need action
                </span>
              </div>

              {/* 2x2 Mini Status Cards */}
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                <div className="p-3 bg-[#FFFBEB] border border-[#F59E0B]/20 rounded-[14px] flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1">
                    <Clock className="w-3.5 h-3.5 text-[#D97706]" />
                  </div>
                  <div>
                    <div className="text-[20px] font-extrabold text-[#D97706]">7</div>
                    <div className="text-[10px] font-bold text-[#D97706]">Waiting Assignment</div>
                  </div>
                </div>

                <div className="p-3 bg-[#EEF1F8] border border-[#384E85]/20 rounded-[14px] flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1">
                    <Truck className="w-3.5 h-3.5 text-[#384E85]" />
                  </div>
                  <div>
                    <div className="text-[20px] font-extrabold text-[#384E85]">24</div>
                    <div className="text-[10px] font-bold text-[#384E85]">Assigned</div>
                  </div>
                </div>

                <div className="p-3 bg-[#FEF2F2] border border-[#EF4444]/20 rounded-[14px] flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1">
                    <XCircle className="w-3.5 h-3.5 text-[#EF4444]" />
                  </div>
                  <div>
                    <div className="text-[20px] font-extrabold text-[#EF4444]">3</div>
                    <div className="text-[10px] font-bold text-[#EF4444]">Driver Rejected</div>
                  </div>
                </div>

                <div className="p-3 bg-[#F4F5F8] border border-[#7A8299]/20 rounded-[14px] flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1">
                    <User className="w-3.5 h-3.5 text-[#7A8299]" />
                  </div>
                  <div>
                    <div className="text-[20px] font-extrabold text-[#7A8299]">2</div>
                    <div className="text-[10px] font-bold text-[#7A8299]">No Driver Available</div>
                  </div>
                </div>
              </div>

              {/* Awaiting Assignment Section */}
              <div className="space-y-2 mb-4">
                <div className="text-[10px] font-bold text-[#7A8299] uppercase tracking-[0.5px]">Awaiting Assignment</div>
                {dispatchQueue.map((item, idx) => (
                  <div key={idx} className="p-2.5 bg-[#FAFAFA] border border-[#384E85]/6 rounded-[12px] flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[12px] text-[#384E85]">{item.order}</span>
                        {item.urgent && <span className="px-1.5 py-0.2 text-[9px] font-bold bg-[#EF4444] text-white rounded">URGENT</span>}
                      </div>
                      <div className="text-[11px] text-[#7A8299]">{item.customer}</div>
                    </div>
                    <div className="flex items-center gap-2 text-right">
                      <div>
                        <div className="text-[12px] font-extrabold text-[#0F1629]">{item.price}</div>
                        <div className="text-[10px] text-[#D97706] font-semibold">{item.wait}</div>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-[#EEF1F8] text-[#384E85] flex items-center justify-center cursor-pointer">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons with icons */}
            <div className="space-y-2 pt-2 border-t border-[#F3F4F6]">
              <button onClick={() => navigate('/dispatch-board?tab=queue')} className="w-full h-8 px-3 bg-[#EEF1F8] hover:bg-[#E2E7F3] text-[#384E85] text-[11.5px] font-bold rounded-[10px] flex items-center justify-between cursor-pointer transition border-none">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Assign Driver</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => navigate('/dispatch-board?tab=rejected')} className="w-full h-8 px-3 bg-[#FFFBEB] hover:bg-[#FEF3C7] text-[#D97706] text-[11.5px] font-bold rounded-[10px] flex items-center justify-between cursor-pointer transition border-none">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reassign Driver</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => navigate('/dispatch-board?tab=queue')} className="w-full h-8 px-3 bg-[#ECFDF5] hover:bg-[#D1FAE5] text-[#10B981] text-[11.5px] font-bold rounded-[10px] flex items-center justify-between cursor-pointer transition border-none">
                <div className="flex items-center gap-2">
                  <ListOrdered className="w-3.5 h-3.5" />
                  <span>View Dispatch Queue</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </Card>

          {/* Column 2: Low Stock Alerts */}
          <Card className="p-5 bg-white border border-[#384E85]/7 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#FEF2F2] text-[#EF4444] flex items-center justify-center">
                    <AlertTriangle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#0F1629]">Low Stock Alerts</h3>
                    <p className="text-[11px] text-[#7A8299]"><span className="font-semibold text-[#EF4444]">3 critical</span> · 1 out of stock</p>
                  </div>
                </div>
                <button className="h-7 px-2.5 bg-[#EEF1F8] hover:bg-[#E2E7F3] text-[#384E85] text-[11px] font-bold rounded-[8px] flex items-center gap-1 transition cursor-pointer border-none">
                  <RefreshCw className="w-3 h-3" /> Reorder All
                </button>
              </div>

              {/* Item List with Product Icons and Progress Bars */}
              <div className="space-y-3 my-2">
                {lowStockItems.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-[12px]">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-[7px] ${item.iconBg} flex items-center justify-center shrink-0`}>
                          <Package className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="font-bold text-[#0F1629] block leading-tight">{item.name}</span>
                          <span className="text-[10px] text-[#7A8299]">{item.cat}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-mono font-bold text-[#0F1629]">{item.stock}</span>
                        <span className={`block text-[9.5px] font-bold px-1.5 py-0.2 rounded ${item.tag}`}>{item.status}</span>
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-[#F4F5F8] rounded-full overflow-hidden ml-[36px] max-w-[calc(100%-36px)]">
                      <div className={`h-full ${item.color}`} style={{ width: `${Math.min(100, (item.stock / item.min) * 100)}%` }} />
                    </div>
                    <div className="flex justify-between text-[9.5px] text-[#7A8299] ml-[36px] max-w-[calc(100%-36px)]">
                      <span>Min: {item.min} units</span>
                      <span>{item.stock} left</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* View Full Inventory Button */}
            <button onClick={() => navigate('/stock-overview')} className="w-full h-9 mt-3 bg-[#FAFAFA] hover:bg-[#F4F5F8] text-[#384E85] text-[12px] font-bold rounded-[12px] border border-[#384E85]/10 flex items-center justify-center gap-1.5 transition cursor-pointer">
              <span>View Full Inventory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Card>

          {/* Column 3: Online Drivers */}
          <Card className="p-5 bg-white border border-[#384E85]/7 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-[15px] font-bold text-[#0F1629]">Online Drivers</h3>
                  <p className="text-[11.5px] text-[#7A8299]">Real-time driver status</p>
                </div>
                <div className="flex gap-1">
                  <span className="px-1.5 py-0.5 rounded-full text-[9.5px] font-bold bg-[#ECFDF5] text-[#10B981]">6 Online</span>
                  <span className="px-1.5 py-0.5 rounded-full text-[9.5px] font-bold bg-[#EEF1F8] text-[#384E85]">3 Free</span>
                  <span className="px-1.5 py-0.5 rounded-full text-[9.5px] font-bold bg-[#FFFBEB] text-[#D97706]">3 Busy</span>
                </div>
              </div>

              {/* 3 Driver Summary Cards */}
              <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                <div className="p-2 bg-[#ECFDF5] rounded-[10px]">
                  <div className="text-[16px] font-extrabold text-[#10B981]">6</div>
                  <div className="text-[9.5px] text-[#10B981]">Total Online</div>
                </div>
                <div className="p-2 bg-[#EEF1F8] rounded-[10px]">
                  <div className="text-[16px] font-extrabold text-[#384E85]">3</div>
                  <div className="text-[9.5px] text-[#384E85]">Available</div>
                </div>
                <div className="p-2 bg-[#FFFBEB] rounded-[10px]">
                  <div className="text-[16px] font-extrabold text-[#D97706]">3</div>
                  <div className="text-[9.5px] text-[#D97706]">Busy</div>
                </div>
              </div>

              {/* Driver List */}
              <div className="space-y-2">
                {onlineDrivers.map((d, idx) => (
                  <div key={idx} className="p-2.5 bg-[#FAFAFA] border border-[#384E85]/6 rounded-[12px] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <div className={`w-8 h-8 rounded-[9px] ${d.bg} ${d.color} flex items-center justify-center font-bold text-[11px]`}>
                          {d.initials}
                        </div>
                        <span className={`w-2 h-2 rounded-full ${d.dot} border border-white absolute -bottom-0.5 -right-0.5`} />
                      </div>
                      <div>
                        <div className="text-[12px] font-bold text-[#0F1629]">{d.name}</div>
                        <div className="text-[10px] text-[#7A8299] flex items-center gap-1">
                          <span>⭐ {d.rating}</span>
                          <span>📍 {d.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded ${
                        d.status === 'Available' ? 'bg-[#ECFDF5] text-[#10B981]' : 'bg-[#FFFBEB] text-[#D97706]'
                      }`}>
                        {d.status}
                      </span>
                      <div className="text-[10px] text-[#7A8299] mt-0.5">{d.orders}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 5. INVENTORY HEALTH & RECENT ACTIVITY SECTION        */}
      {/* ---------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Inventory Health Card (2/5 width) */}
        <Card className="lg:col-span-2 p-6 bg-white border border-[#384E85]/7 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-[10px] bg-[#EEF1F8] text-[#384E85] flex items-center justify-center font-bold">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-[#0F1629]">Inventory Health</h3>
                <p className="text-[12px] text-[#7A8299]">Overall stock performance</p>
              </div>
            </div>

            {/* Large Donut / Gauge Container */}
            <div className="bg-gradient-to-br from-[#EEF1F8]/60 to-[#E8EDF8]/40 border border-[#384E85]/10 rounded-[18px] p-5 flex items-center gap-5 mb-5">
              <div className="relative w-[90px] h-[90px] shrink-0">
                <svg width="90" height="90" viewBox="0 0 90 90" className="transform -rotate-90">
                  <circle cx="45" cy="45" r="38" fill="none" stroke="#E5E7EB" strokeWidth="7" />
                  <circle cx="45" cy="45" r="38" fill="none" stroke="url(#healthGrad)" strokeWidth="7" strokeDasharray="200 238" strokeDashoffset="0" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="healthGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#384E85" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[20px] font-extrabold text-[#0F1629] leading-none">84</span>
                  <span className="text-[9px] text-[#7A8299] font-bold">/100</span>
                </div>
              </div>

              <div>
                <div className="text-[15px] font-extrabold text-[#0F1629]">Good Health</div>
                <p className="text-[11.5px] text-[#7A8299] leading-snug mt-1">
                  Stock levels are adequate. 3 items need immediate attention.
                </p>
                <div className="flex gap-1 mt-2.5">
                  <span className="w-6 h-1.5 rounded-full bg-[#10B981]" />
                  <span className="w-4 h-1.5 rounded-full bg-[#F59E0B]" />
                  <span className="w-2 h-1.5 rounded-full bg-[#EF4444]" />
                </div>
              </div>
            </div>

            {/* 4 Metric Sub-Cards Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-[#EEF1F8] border border-[#384E85]/10 rounded-[14px]">
                <div className="text-[11px] text-[#384E85] font-semibold">Inventory Value</div>
                <div className="text-[18px] font-extrabold text-[#384E85] mt-1">$14.2M</div>
                <div className="text-[10px] text-[#10B981] font-bold mt-0.5">+3.8% this month</div>
              </div>

              <div className="p-3.5 bg-[#ECFDF5] border border-[#10B981]/15 rounded-[14px]">
                <div className="text-[11px] text-[#10B981] font-semibold">In Stock</div>
                <div className="text-[18px] font-extrabold text-[#065F46] mt-1">2,847</div>
                <div className="text-[10px] text-[#065F46] font-bold mt-0.5">Active SKUs</div>
              </div>

              <div className="p-3.5 bg-[#FFFBEB] border border-[#F59E0B]/15 rounded-[14px]">
                <div className="text-[11px] text-[#D97706] font-semibold">Low Stock</div>
                <div className="text-[18px] font-extrabold text-[#D97706] mt-1">12</div>
                <div className="text-[10px] text-[#D97706] font-bold mt-0.5">Need reorder</div>
              </div>

              <div className="p-3.5 bg-[#FEF2F2] border border-[#EF4444]/15 rounded-[14px]">
                <div className="text-[11px] text-[#EF4444] font-semibold">Out of Stock</div>
                <div className="text-[18px] font-extrabold text-[#EF4444] mt-1">3</div>
                <div className="text-[10px] text-[#EF4444] font-bold mt-0.5">Urgent</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Activity Timeline Feed (3/5 width) */}
        <Card className="lg:col-span-3 p-6 bg-white border border-[#384E85]/7 rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-[15px] font-bold text-[#0F1629]">Recent Activity</h3>
              <p className="text-[12px] text-[#7A8299]">Orders, inventory, drivers, and customer events</p>
            </div>
            <Button variant="ghost" size="sm" className="text-[12px] text-[#384E85] font-semibold">
              View All
            </Button>
          </div>

          <div className="space-y-3 relative">
            {/* Vertical timeline line */}
            <div className="absolute left-[17px] top-3 bottom-3 w-[2px] bg-[#384E85]/8" />

            {recentActivities.map((act, idx) => {
              const Icon = act.icon;
              return (
                <div key={idx} className="flex items-center justify-between relative z-10 py-1 hover:bg-[#FAFAFA] px-2 rounded-lg transition">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-[10px] ${act.iconBg} flex items-center justify-center font-bold shrink-0 border-2 border-white shadow-xs`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[12.5px] font-bold text-[#0F1629]">{act.title}</div>
                      <div className="text-[11.5px] text-[#7A8299]">{act.desc}</div>
                    </div>
                  </div>

                  <div className="text-[11px] text-[#7A8299] shrink-0 pl-2">
                    {act.time}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* ---------------------------------------------------- */}
      {/* BOTTOM ACTION: EXPORT DATA                           */}
      {/* ---------------------------------------------------- */}
      <div className="flex justify-start">
        <Button variant="outline" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />} onClick={() => setExportOpen(true)}>
          Export Data
        </Button>
      </div>

      <ExportDataModal isOpen={exportOpen} onClose={() => setExportOpen(false)} pageName="Dashboard" />
    </div>
  );
};
