import { DashboardSummaryDTO, DashboardStatDTO, RevenuePointDTO, CategoryPerformanceDTO, RecentActivityDTO } from '../dtos/DashboardDTO';
import { DashboardSummaryEntity, DashboardStatEntity, RevenueDataPoint, CategoryPerformanceEntity, RecentActivityEntity } from '../../domain/entities/DashboardEntity';

/**
 * DashboardMapper — Converts API DTOs → Domain Entities.
 */
export class DashboardMapper {
  static toStatEntity(dto: DashboardStatDTO): DashboardStatEntity {
    return {
      id: dto.stat_id,
      label: dto.stat_label,
      value: dto.stat_value,
      change: dto.pct_change,
      changeType: dto.change_direction,
      subLabel: dto.sub_label,
      color: dto.color_code,
      icon: dto.icon_name,
    };
  }

  static toRevenuePoint(dto: RevenuePointDTO): RevenueDataPoint {
    return {
      label: dto.period_label,
      retail: dto.retail_amount,
      wholesale: dto.wholesale_amount,
    };
  }

  static toCategoryEntity(dto: CategoryPerformanceDTO): CategoryPerformanceEntity {
    return {
      name: dto.category_name,
      pct: dto.percentage,
      color: dto.color_hex,
      revenue: dto.total_revenue,
    };
  }

  static toActivityEntity(dto: RecentActivityDTO): RecentActivityEntity {
    return {
      id: dto.activity_id,
      title: dto.activity_title,
      subtitle: dto.activity_subtitle,
      time: dto.time_ago,
      type: dto.activity_type,
    };
  }

  static toSummaryEntity(dto: DashboardSummaryDTO): DashboardSummaryEntity {
    return {
      stats: dto.main_stats.map(DashboardMapper.toStatEntity),
      operationalStats: dto.operational_stats.map(DashboardMapper.toStatEntity),
      revenueData: dto.revenue_chart.map(DashboardMapper.toRevenuePoint),
      categoryPerformance: dto.category_breakdown.map(DashboardMapper.toCategoryEntity),
      recentActivity: dto.activity_log.map(DashboardMapper.toActivityEntity),
    };
  }
}
