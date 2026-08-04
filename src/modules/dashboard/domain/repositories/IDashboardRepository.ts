import { DashboardSummaryEntity } from '../entities/DashboardEntity';

export interface IDashboardRepository {
  getSummary(): Promise<DashboardSummaryEntity>;
}
