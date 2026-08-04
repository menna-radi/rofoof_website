import { analyticsRepository } from '../../data/repositories/AnalyticsRepositoryImpl';
import { AnalyticsSummaryEntity } from '../entities/AnalyticsEntity';

/** GetAnalyticsSummaryUseCase — retrieves analytics stats for the given period */
export class GetAnalyticsSummaryUseCase {
  async execute(period?: string): Promise<AnalyticsSummaryEntity> {
    return analyticsRepository.getSummary(period);
  }
}

export const getAnalyticsSummaryUseCase = new GetAnalyticsSummaryUseCase();
