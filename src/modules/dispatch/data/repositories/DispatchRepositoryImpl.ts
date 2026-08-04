import { IDispatchRepository } from '../../domain/repositories/IDispatchRepository';
import { DispatchBoardEntity, DispatchOrderEntity } from '../../domain/entities/DispatchEntity';
import { ENV } from '@/core/api/environment';
import { dispatchLocalDataSource } from '../datasources/DispatchLocalDataSource';
import { dispatchRemoteDataSource } from '../datasources/DispatchRemoteDataSource';
import { DispatchMapper } from '../mappers/DispatchMapper';

export class DispatchRepositoryImpl implements IDispatchRepository {
  async getBoard(): Promise<DispatchBoardEntity> {
    if (ENV.USE_MOCK) return dispatchLocalDataSource.getBoard();
    const dto = await dispatchRemoteDataSource.getBoard();
    return DispatchMapper.toBoardEntity(dto);
  }

  async assignDriver(orderId: string, driverId: string): Promise<DispatchOrderEntity> {
    if (ENV.USE_MOCK) return dispatchLocalDataSource.assignDriver(orderId, driverId);
    const dto = await dispatchRemoteDataSource.assignDriver(orderId, driverId);
    return DispatchMapper.toOrderEntity(dto);
  }
}

export const dispatchRepository = new DispatchRepositoryImpl();
