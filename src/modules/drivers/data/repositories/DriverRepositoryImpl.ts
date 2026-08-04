import { IDriverRepository } from '../../domain/repositories/IDriverRepository';
import { DriverEntity } from '../../domain/entities/DriverEntity';
import { ENV } from '@/core/api/environment';
import { driverLocalDataSource } from '../datasources/DriverLocalDataSource';
import { driverRemoteDataSource } from '../datasources/DriverRemoteDataSource';
import { DriverMapper } from '../mappers/DriverMapper';

export class DriverRepositoryImpl implements IDriverRepository {
  async getDrivers(): Promise<DriverEntity[]> {
    if (ENV.USE_MOCK) return driverLocalDataSource.getDrivers();
    const dtos = await driverRemoteDataSource.getDrivers();
    return dtos.map(DriverMapper.toEntity);
  }

  async getDriverById(id: string): Promise<DriverEntity | null> {
    if (ENV.USE_MOCK) return driverLocalDataSource.getDriverById(id);
    const dto = await driverRemoteDataSource.getDriverById(id);
    return dto ? DriverMapper.toEntity(dto) : null;
  }

  async createDriver(driver: Partial<DriverEntity>): Promise<DriverEntity> {
    if (ENV.USE_MOCK) return driverLocalDataSource.createDriver(driver);
    const dto = await driverRemoteDataSource.createDriver(driver as any);
    return DriverMapper.toEntity(dto);
  }

  async deleteDriver(id: string): Promise<boolean> {
    if (ENV.USE_MOCK) return driverLocalDataSource.deleteDriver(id);
    return driverRemoteDataSource.deleteDriver(id);
  }
}

export const driverRepository = new DriverRepositoryImpl();
