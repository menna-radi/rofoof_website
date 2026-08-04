import { AnalyticsSummaryEntity } from '../../domain/entities/AnalyticsEntity';

const MOCK_SUMMARY: AnalyticsSummaryEntity = {
  stats: [
    { id: 'revenue', label: 'Total Revenue', value: '$2.84M', change: '+18.4%', changeType: 'positive' },
    { id: 'orders', label: 'Total Orders', value: '38,291', change: '+12.1%', changeType: 'positive' },
    { id: 'avg_order', label: 'Avg Order Value', value: '$74.10', change: '+5.2%', changeType: 'positive' },
    { id: 'conversion', label: 'Conversion Rate', value: '68.4%', change: '-1.2%', changeType: 'negative' },
  ],
  salesData: [
    { month: 'Jan', sales: 180000, orders: 4200 },
    { month: 'Feb', sales: 195000, orders: 4600 },
    { month: 'Mar', sales: 220000, orders: 5100 },
    { month: 'Apr', sales: 240000, orders: 5500 },
    { month: 'May', sales: 260000, orders: 6000 },
    { month: 'Jun', sales: 290000, orders: 6600 },
    { month: 'Jul', sales: 310000, orders: 7200 },
  ],
  topProducts: [
    { id: 'p1', name: 'Fresh Organic Bananas', category: 'Produce', revenue: '$48,200', units: 19280, growth: '+22.3%', growthType: 'positive' },
    { id: 'p2', name: 'Whole Milk 2L', category: 'Dairy', revenue: '$31,500', units: 15750, growth: '+14.8%', growthType: 'positive' },
    { id: 'p3', name: 'Chicken Breast 1kg', category: 'Meat', revenue: '$27,800', units: 6950, growth: '+8.4%', growthType: 'positive' },
    { id: 'p4', name: 'Egyptian Honey 500g', category: 'Pantry', revenue: '$22,100', units: 2600, growth: '-3.2%', growthType: 'negative' },
  ],
};

export interface IAnalyticsLocalDataSource {
  getSummary(period?: string): Promise<AnalyticsSummaryEntity>;
}

export class AnalyticsLocalDataSourceImpl implements IAnalyticsLocalDataSource {
  async getSummary(_period?: string): Promise<AnalyticsSummaryEntity> {
    return Promise.resolve(MOCK_SUMMARY);
  }
}

export const analyticsLocalDataSource = new AnalyticsLocalDataSourceImpl();
