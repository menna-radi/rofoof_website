import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/api/endpoints';
import { AnalyticsSummaryDTO } from '../dtos/AnalyticsDTO';

export interface IAnalyticsRemoteDataSource {
  getSummary(period?: string): Promise<AnalyticsSummaryDTO>;
}

export class AnalyticsRemoteDataSourceImpl implements IAnalyticsRemoteDataSource {
  async getSummary(_period?: string): Promise<AnalyticsSummaryDTO> {
    const res = await apiClient.get<AnalyticsSummaryDTO>(ENDPOINTS.ANALYTICS.SALES);
    return res.data;
  }
}

export const analyticsRemoteDataSource = new AnalyticsRemoteDataSourceImpl();
