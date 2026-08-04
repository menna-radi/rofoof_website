import { AnalyticsSummaryEntity } from '../entities/AnalyticsEntity';

export interface IAnalyticsRepository {
  getSummary(period?: string): Promise<AnalyticsSummaryEntity>;
}
