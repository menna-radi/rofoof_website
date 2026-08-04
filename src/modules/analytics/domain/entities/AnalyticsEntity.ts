export interface AnalyticsStatEntity {
  id: string;
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
}

export interface SalesDataPoint {
  month: string;
  sales: number;
  orders: number;
}

export interface TopProductEntity {
  id: string;
  name: string;
  category: string;
  revenue: string;
  units: number;
  growth: string;
  growthType: 'positive' | 'negative';
}

export interface AnalyticsSummaryEntity {
  stats: AnalyticsStatEntity[];
  salesData: SalesDataPoint[];
  topProducts: TopProductEntity[];
}
