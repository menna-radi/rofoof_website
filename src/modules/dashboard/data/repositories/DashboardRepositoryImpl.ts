import { IDashboardRepository } from '../../domain/repositories/IDashboardRepository';
import { DashboardSummaryEntity } from '../../domain/entities/DashboardEntity';
import { ENV } from '@/core/api/environment';
import { dashboardLocalDataSource } from '../datasources/DashboardLocalDataSource';
import { dashboardRemoteDataSource } from '../datasources/DashboardRemoteDataSource';
import { DashboardMapper } from '../mappers/DashboardMapper';

export class DashboardRepositoryImpl implements IDashboardRepository {
  async getSummary(): Promise<DashboardSummaryEntity> {
    if (ENV.USE_MOCK) {
      return dashboardLocalDataSource.getSummary();
    }
    const dto = await dashboardRemoteDataSource.getSummary();
    return DashboardMapper.toSummaryEntity(dto);
  }
}

export const dashboardRepository = new DashboardRepositoryImpl();
