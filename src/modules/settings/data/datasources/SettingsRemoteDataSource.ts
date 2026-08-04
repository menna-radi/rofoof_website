import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/api/endpoints';
import { SettingsDTO } from '../dtos/SettingsDTO';

export interface ISettingsRemoteDataSource {
  getSettings(): Promise<SettingsDTO>;
  updateSettings(settings: Partial<SettingsDTO>): Promise<SettingsDTO>;
}

export class SettingsRemoteDataSourceImpl implements ISettingsRemoteDataSource {
  async getSettings(): Promise<SettingsDTO> {
    const res = await apiClient.get<SettingsDTO>(ENDPOINTS.SETTINGS.GET);
    return res.data;
  }

  async updateSettings(settings: Partial<SettingsDTO>): Promise<SettingsDTO> {
    const res = await apiClient.put<SettingsDTO>(ENDPOINTS.SETTINGS.UPDATE, settings);
    return res.data;
  }
}

export const settingsRemoteDataSource = new SettingsRemoteDataSourceImpl();
