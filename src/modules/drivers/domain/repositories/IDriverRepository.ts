import { DriverEntity } from '../entities/DriverEntity';

export interface IDriverRepository {
  getDrivers(): Promise<DriverEntity[]>;
  getDriverById(id: string): Promise<DriverEntity | null>;
  createDriver(driver: Partial<DriverEntity>): Promise<DriverEntity>;
  deleteDriver(id: string): Promise<boolean>;
}
