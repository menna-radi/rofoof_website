/**
 * DTOs for Dashboard API responses — raw server payloads.
 * Never exposed directly to the presentation layer.
 */
export interface DashboardStatDTO {
  stat_id: string;
  stat_label: string;
  stat_value: string;
  pct_change: string;
  change_direction: 'positive' | 'negative' | 'neutral';
  sub_label: string;
  color_code: string;
  icon_name: string;
}

export interface RevenuePointDTO {
  period_label: string;
  retail_amount: number;
  wholesale_amount: number;
}

export interface CategoryPerformanceDTO {
  category_name: string;
  percentage: number;
  color_hex: string;
  total_revenue: string;
}

export interface RecentActivityDTO {
  activity_id: string;
  activity_title: string;
  activity_subtitle: string;
  time_ago: string;
  activity_type: 'order' | 'product' | 'driver' | 'customer' | 'system';
}

export interface DashboardSummaryDTO {
  main_stats: DashboardStatDTO[];
  operational_stats: DashboardStatDTO[];
  revenue_chart: RevenuePointDTO[];
  category_breakdown: CategoryPerformanceDTO[];
  activity_log: RecentActivityDTO[];
}
