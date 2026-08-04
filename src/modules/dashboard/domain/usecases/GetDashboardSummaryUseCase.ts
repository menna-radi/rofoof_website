import { dashboardRepository } from '../../data/repositories/DashboardRepositoryImpl';
import { DashboardSummaryEntity } from '../entities/DashboardEntity';

/** GetDashboardSummaryUseCase — retrieves the complete dashboard stats */
export class GetDashboardSummaryUseCase {
  async execute(): Promise<DashboardSummaryEntity> {
    return dashboardRepository.getSummary();
  }
}

export const getDashboardSummaryUseCase = new GetDashboardSummaryUseCase();
