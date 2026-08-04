import { DashboardSummaryDTO } from '../dtos/DashboardDTO';

export interface IDashboardLocalDataSource {
  getCachedSummary(): DashboardSummaryDTO | null;
  cacheSummary(data: DashboardSummaryDTO): void;
}

export class DashboardLocalDataSourceImpl implements IDashboardLocalDataSource {
  private cache: DashboardSummaryDTO | null = null;

  getCachedSummary(): DashboardSummaryDTO | null {
    return this.cache;
  }

  cacheSummary(data: DashboardSummaryDTO): void {
    this.cache = data;
  }
}

export const dashboardLocalDataSource = new DashboardLocalDataSourceImpl();
