import { IDashboardRepository } from '../../domain/repositories/IDashboardRepository';
import { DashboardSummaryEntity } from '../../domain/entities/DashboardEntity';
import { ENV } from '@/core/api/environment';
import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/api/endpoints';

const MOCK_SUMMARY: DashboardSummaryEntity = {
  stats: [
    { id: 'revenue', label: 'Total Revenue', value: '$2.84M', change: '+18.4%', changeType: 'positive', subLabel: 'vs last month', color: '#384E85', icon: '$' },
    { id: 'orders', label: "Today's Orders", value: '3,247', change: '+12.1%', changeType: 'positive', subLabel: 'vs yesterday', color: '#10B981', icon: '🛒' },
    { id: 'deliveries', label: 'Active Deliveries', value: '184', change: '+5.3%', changeType: 'positive', subLabel: 'drivers on route', color: '#F59E0B', icon: '🚚' },
    { id: 'wholesale', label: 'Wholesale Revenue', value: '$892K', change: '+24.7%', changeType: 'positive', subLabel: 'B2B accounts', color: '#8B5CF6', icon: '$' },
    { id: 'avg_order', label: 'Avg Order Value', value: '$67.40', change: '-2.1%', changeType: 'negative', subLabel: 'retail avg', color: '#06B6D4', icon: '⭐' },
    { id: 'inventory', label: 'Inventory Value', value: '$14.2M', change: '+3.8%', changeType: 'positive', subLabel: 'total stock', color: '#F97316', icon: '📦' },
    { id: 'customer_growth', label: 'Customer Growth', value: '42,891', change: '+8.9%', changeType: 'positive', subLabel: 'new this month', color: '#EC4899', icon: '👥' },
    { id: 'driver_perf', label: 'Driver Performance', value: '94.2%', change: '+1.4%', changeType: 'positive', subLabel: 'on-time delivery', color: '#6366F1', icon: '📈' },
  ],
  operationalStats: [
    { id: 'online_drivers', label: 'Online Drivers', value: '38', change: '+4', changeType: 'positive', subLabel: 'vs 1 hour ago', color: '#384E85', icon: '🟢' },
    { id: 'available_drivers', label: 'Available Drivers', value: '14', change: '-2', changeType: 'negative', subLabel: 'ready to dispatch', color: '#10B981', icon: '✅' },
    { id: 'busy_drivers', label: 'Busy Drivers', value: '24', change: '+6', changeType: 'positive', subLabel: 'on active routes', color: '#F59E0B', icon: '🔄' },
    { id: 'awaiting_assign', label: 'Awaiting Assign', value: '7', change: '+3', changeType: 'negative', subLabel: 'pending dispatch', color: '#EF4444', icon: '⏳' },
    { id: 'low_stock', label: 'Low Stock Items', value: '12', change: '+5', changeType: 'negative', subLabel: 'need reorder', color: '#D97706', icon: '⚠️' },
    { id: 'daily_profit', label: "Today's Profit", value: '$18,420', change: '+22.3%', changeType: 'positive', subLabel: 'net margin 28%', color: '#8B5CF6', icon: '$' },
  ],
  revenueData: [
    { label: 'Jan', retail: 180000, wholesale: 220000 },
    { label: 'Feb', retail: 195000, wholesale: 250000 },
    { label: 'Mar', retail: 220000, wholesale: 280000 },
    { label: 'Apr', retail: 240000, wholesale: 310000 },
    { label: 'May', retail: 260000, wholesale: 340000 },
    { label: 'Jun', retail: 290000, wholesale: 380000 },
    { label: 'Jul', retail: 310000, wholesale: 420000 },
  ],
  categoryPerformance: [
    { name: 'Produce & Fruits', pct: 34, color: '#384E85', revenue: '$965K' },
    { name: "Dairy & Eggs", pct: 24, color: '#10B981', revenue: '$681K' },
    { name: 'Meat & Poultry', pct: 18, color: '#F59E0B', revenue: '$511K' },
    { name: 'Beverages', pct: 14, color: '#8B5CF6', revenue: '$397K' },
    { name: 'Pantry', pct: 10, color: '#EC4899', revenue: '$284K' },
  ],
  recentActivity: [
    { id: 'a1', title: 'New order placed', subtitle: 'Order #8821 — Metro Grocers Ltd', time: '2 min ago', type: 'order' },
    { id: 'a2', title: 'Driver assigned', subtitle: 'Ahmed Khalil → Order #8820', time: '8 min ago', type: 'driver' },
    { id: 'a3', title: 'Low stock alert', subtitle: 'Whole Milk 2L — Only 12 units left', time: '15 min ago', type: 'product' },
    { id: 'a4', title: 'New customer registered', subtitle: 'Wholesale — Nile Hypermarket', time: '32 min ago', type: 'customer' },
    { id: 'a5', title: 'Order delivered', subtitle: 'Order #8815 — Sarah Ahmed', time: '45 min ago', type: 'order' },
  ],
};

export class DashboardRepositoryImpl implements IDashboardRepository {
  async getSummary(): Promise<DashboardSummaryEntity> {
    if (ENV.USE_MOCK) return Promise.resolve(MOCK_SUMMARY);
    const res = await apiClient.get<DashboardSummaryEntity>(ENDPOINTS.DASHBOARD.STATS);
    return res.data;
  }
}

export const dashboardRepository = new DashboardRepositoryImpl();
