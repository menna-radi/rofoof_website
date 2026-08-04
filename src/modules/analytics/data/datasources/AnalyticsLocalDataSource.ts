import { AnalyticsSummaryDTO } from '../dtos/AnalyticsDTO';

export interface IAnalyticsLocalDataSource {
  getCachedSummary(): AnalyticsSummaryDTO | null;
  cacheSummary(data: AnalyticsSummaryDTO): void;
}

export class AnalyticsLocalDataSourceImpl implements IAnalyticsLocalDataSource {
  private cache: AnalyticsSummaryDTO | null = null;

  getCachedSummary(): AnalyticsSummaryDTO | null {
    return this.cache;
  }

  cacheSummary(data: AnalyticsSummaryDTO): void {
    this.cache = data;
  }
}

export const analyticsLocalDataSource = new AnalyticsLocalDataSourceImpl();
