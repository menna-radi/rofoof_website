import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/api/endpoints';
import { DashboardSummaryDTO } from '../dtos/DashboardDTO';

export interface IDashboardRemoteDataSource {
  getSummary(): Promise<DashboardSummaryDTO>;
}

export class DashboardRemoteDataSourceImpl implements IDashboardRemoteDataSource {
  async getSummary(): Promise<DashboardSummaryDTO> {
    const res = await apiClient.get<DashboardSummaryDTO>(ENDPOINTS.DASHBOARD.STATS);
    return res.data;
  }
}

export const dashboardRemoteDataSource = new DashboardRemoteDataSourceImpl();
