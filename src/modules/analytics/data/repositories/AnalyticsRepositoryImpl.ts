import { IAnalyticsRepository } from '../../domain/repositories/IAnalyticsRepository';
import { AnalyticsSummaryEntity } from '../../domain/entities/AnalyticsEntity';
import { ENV } from '@/core/api/environment';
import { analyticsLocalDataSource } from '../datasources/AnalyticsLocalDataSource';
import { analyticsRemoteDataSource } from '../datasources/AnalyticsRemoteDataSource';
import { AnalyticsMapper } from '../mappers/AnalyticsMapper';

export class AnalyticsRepositoryImpl implements IAnalyticsRepository {
  async getSummary(period?: string): Promise<AnalyticsSummaryEntity> {
    if (ENV.USE_MOCK) return analyticsLocalDataSource.getSummary(period);
    const dto = await analyticsRemoteDataSource.getSummary(period);
    return AnalyticsMapper.toSummaryEntity(dto);
  }
}

export const analyticsRepository = new AnalyticsRepositoryImpl();
