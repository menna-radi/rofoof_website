export interface AnalyticsStatDTO {
  metric_id: string;
  metric_name: string;
  metric_val: string;
  variance_pct: string;
  variance_type: 'positive' | 'negative' | 'neutral';
}

export interface SalesPointDTO {
  time_period: string;
  gross_sales: number;
  total_orders_count: number;
}

export interface TopProductDTO {
  prod_id: string;
  prod_name: string;
  cat_name: string;
  total_revenue: string;
  units_sold: number;
  growth_pct: string;
  growth_dir: 'positive' | 'negative';
}

export interface AnalyticsSummaryDTO {
  metrics: AnalyticsStatDTO[];
  sales_trend: SalesPointDTO[];
  best_sellers: TopProductDTO[];
}
