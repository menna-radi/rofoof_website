export interface DashboardStatEntity {
  id: string;
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  subLabel: string;
  color: string;
  icon: string;
}

export interface RevenueDataPoint {
  label: string;
  retail: number;
  wholesale: number;
}

export interface CategoryPerformanceEntity {
  name: string;
  pct: number;
  color: string;
  revenue: string;
}

export interface RecentActivityEntity {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  type: 'order' | 'product' | 'driver' | 'customer' | 'system';
}

export interface DashboardSummaryEntity {
  stats: DashboardStatEntity[];
  operationalStats: DashboardStatEntity[];
  revenueData: RevenueDataPoint[];
  categoryPerformance: CategoryPerformanceEntity[];
  recentActivity: RecentActivityEntity[];
}
