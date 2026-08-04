import { driverRepository } from '../../data/repositories/DriverRepositoryImpl';
import { DriverEntity } from '../entities/DriverEntity';

/** GetDriversUseCase — retrieves all drivers */
export class GetDriversUseCase {
  async execute(): Promise<DriverEntity[]> {
    return driverRepository.getDrivers();
  }
}

/** CreateDriverUseCase — adds a new driver */
export class CreateDriverUseCase {
  async execute(driver: Partial<DriverEntity>): Promise<DriverEntity> {
    return driverRepository.createDriver(driver);
  }
}

/** DeleteDriverUseCase — removes a driver */
export class DeleteDriverUseCase {
  async execute(id: string): Promise<boolean> {
    return driverRepository.deleteDriver(id);
  }
}

export const getDriversUseCase = new GetDriversUseCase();
export const createDriverUseCase = new CreateDriverUseCase();
export const deleteDriverUseCase = new DeleteDriverUseCase();
