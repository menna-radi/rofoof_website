import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/api/endpoints';
import { DispatchBoardDTO, DispatchOrderDTO } from '../dtos/DispatchDTO';

export interface IDispatchRemoteDataSource {
  getBoard(): Promise<DispatchBoardDTO>;
  assignDriver(orderId: string, driverId: string): Promise<DispatchOrderDTO>;
}

export class DispatchRemoteDataSourceImpl implements IDispatchRemoteDataSource {
  async getBoard(): Promise<DispatchBoardDTO> {
    const res = await apiClient.get<DispatchBoardDTO>(ENDPOINTS.DISPATCH.BOARD);
    return res.data;
  }

  async assignDriver(orderId: string, driverId: string): Promise<DispatchOrderDTO> {
    const res = await apiClient.post<DispatchOrderDTO>(ENDPOINTS.DISPATCH.ASSIGN, { orderId, driverId });
    return res.data;
  }
}

export const dispatchRemoteDataSource = new DispatchRemoteDataSourceImpl();
