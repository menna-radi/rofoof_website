import { DriverDTO } from '../dtos/DriverDTO';

export interface IDriverLocalDataSource {
  getCachedDrivers(): DriverDTO[];
  cacheDrivers(drivers: DriverDTO[]): void;
}

export class DriverLocalDataSourceImpl implements IDriverLocalDataSource {
  private cache: DriverDTO[] = [];

  getCachedDrivers(): DriverDTO[] {
    return this.cache;
  }

  cacheDrivers(drivers: DriverDTO[]): void {
    this.cache = drivers;
  }
}

export const driverLocalDataSource = new DriverLocalDataSourceImpl();
