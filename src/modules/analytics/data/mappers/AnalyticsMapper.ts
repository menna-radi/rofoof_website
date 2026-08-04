import { AnalyticsSummaryDTO, AnalyticsStatDTO, SalesPointDTO, TopProductDTO } from '../dtos/AnalyticsDTO';
import { AnalyticsSummaryEntity, AnalyticsStatEntity, SalesDataPoint, TopProductEntity } from '../../domain/entities/AnalyticsEntity';

export class AnalyticsMapper {
  static toStatEntity(dto: AnalyticsStatDTO): AnalyticsStatEntity {
    return {
      id: dto.metric_id,
      label: dto.metric_name,
      value: dto.metric_val,
      change: dto.variance_pct,
      changeType: dto.variance_type,
    };
  }

  static toSalesPoint(dto: SalesPointDTO): SalesDataPoint {
    return {
      month: dto.time_period,
      sales: dto.gross_sales,
      orders: dto.total_orders_count,
    };
  }

  static toTopProduct(dto: TopProductDTO): TopProductEntity {
    return {
      id: dto.prod_id,
      name: dto.prod_name,
      category: dto.cat_name,
      revenue: dto.total_revenue,
      units: dto.units_sold,
      growth: dto.growth_pct,
      growthType: dto.growth_dir,
    };
  }

  static toSummaryEntity(dto: AnalyticsSummaryDTO): AnalyticsSummaryEntity {
    return {
      stats: dto.metrics.map(AnalyticsMapper.toStatEntity),
      salesData: dto.sales_trend.map(AnalyticsMapper.toSalesPoint),
      topProducts: dto.best_sellers.map(AnalyticsMapper.toTopProduct),
    };
  }
}
