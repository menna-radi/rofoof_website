import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/api/endpoints';
import { DriverDTO } from '../dtos/DriverDTO';

export interface IDriverRemoteDataSource {
  getDrivers(): Promise<DriverDTO[]>;
  getDriverById(id: string): Promise<DriverDTO>;
  createDriver(driver: Partial<DriverDTO>): Promise<DriverDTO>;
  deleteDriver(id: string): Promise<boolean>;
}

export class DriverRemoteDataSourceImpl implements IDriverRemoteDataSource {
  async getDrivers(): Promise<DriverDTO[]> {
    const res = await apiClient.get<DriverDTO[]>(ENDPOINTS.DRIVERS.LIST);
    return res.data;
  }

  async getDriverById(id: string): Promise<DriverDTO> {
    const res = await apiClient.get<DriverDTO>(ENDPOINTS.DRIVERS.DETAIL(id));
    return res.data;
  }

  async createDriver(driver: Partial<DriverDTO>): Promise<DriverDTO> {
    const res = await apiClient.post<DriverDTO>(ENDPOINTS.DRIVERS.CREATE, driver);
    return res.data;
  }

  async deleteDriver(id: string): Promise<boolean> {
    const res = await apiClient.delete(ENDPOINTS.DRIVERS.DETAIL(id));
    return res.success;
  }
}

export const driverRemoteDataSource = new DriverRemoteDataSourceImpl();
