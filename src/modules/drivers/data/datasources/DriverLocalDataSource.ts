import { DriverEntity } from '../../domain/entities/DriverEntity';

const MOCK_DRIVERS: DriverEntity[] = [
  { id: '1', name: 'Ahmed Khalil', handle: '@ahmed.khalil', initials: 'AK', phone: '+20 100 234 5678', nationalId: '28901234500012', vehicleType: 'Motorcycle', vehicleIcon: '🏍️', licensePlate: 'ABC-1234', status: 'Online', rating: 4.9, totalTrips: 1842, activeOrders: 3, earnings: '184.50 EGP', avatarBg: 'from-[#384E85] to-[#6B8ED4]' },
  { id: '2', name: 'Mohamed Hassan', handle: '@mohamed.h', initials: 'MH', phone: '+20 111 345 6789', nationalId: '29002345600023', vehicleType: 'Delivery Van', vehicleIcon: '🚐', licensePlate: 'XYZ-5678', status: 'Busy', rating: 4.8, totalTrips: 2150, activeOrders: 1, earnings: '240.00 EGP', avatarBg: 'from-[#10B981] to-[#059669]' },
  { id: '3', name: 'Tarek Mahmoud', handle: '@tarek.m', initials: 'TM', phone: '+20 122 456 7890', nationalId: '29103456700034', vehicleType: 'Delivery Car', vehicleIcon: '🚗', licensePlate: 'DEF-9012', status: 'Online', rating: 4.7, totalTrips: 940, activeOrders: 2, earnings: '120.00 EGP', avatarBg: 'from-[#F59E0B] to-[#D97706]' },
  { id: '4', name: 'Mahmoud Elsayed', handle: '@mahmoud.e', initials: 'ME', phone: '+20 100 789 0123', nationalId: '28804567800045', vehicleType: 'Motorcycle', vehicleIcon: '🏍️', licensePlate: 'GHI-3456', status: 'Offline', rating: 4.6, totalTrips: 1200, activeOrders: 0, earnings: '0.00 EGP', avatarBg: 'from-[#6B7280] to-[#4B5563]' },
];

export interface IDriverLocalDataSource {
  getDrivers(): Promise<DriverEntity[]>;
  getDriverById(id: string): Promise<DriverEntity | null>;
  createDriver(driver: Partial<DriverEntity>): Promise<DriverEntity>;
  deleteDriver(id: string): Promise<boolean>;
}

export class DriverLocalDataSourceImpl implements IDriverLocalDataSource {
  private drivers = [...MOCK_DRIVERS];

  async getDrivers(): Promise<DriverEntity[]> {
    return Promise.resolve(this.drivers);
  }

  async getDriverById(id: string): Promise<DriverEntity | null> {
    return Promise.resolve(this.drivers.find((d) => d.id === id) || null);
  }

  async createDriver(driver: Partial<DriverEntity>): Promise<DriverEntity> {
    const initials = (driver.name || 'ND').split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
    const newDriver: DriverEntity = {
      id: String(Date.now()),
      name: driver.name || 'New Driver',
      handle: `@${(driver.name || 'driver').toLowerCase().replace(/\s+/g, '.')}`,
      initials,
      phone: driver.phone || '+20 100 000 0000',
      nationalId: driver.nationalId || '29000000000000',
      vehicleType: driver.vehicleType || 'Motorcycle',
      vehicleIcon: driver.vehicleIcon || '🏍️',
      licensePlate: driver.licensePlate || 'ABC-0000',
      status: 'Online',
      rating: 5.0,
      totalTrips: 0,
      activeOrders: 0,
      earnings: '0.00 EGP',
      avatarBg: 'from-[#384E85] to-[#6B8ED4]',
      ...driver,
    };
    this.drivers = [newDriver, ...this.drivers];
    return Promise.resolve(newDriver);
  }

  async deleteDriver(id: string): Promise<boolean> {
    this.drivers = this.drivers.filter((d) => d.id !== id);
    return Promise.resolve(true);
  }
}

export const driverLocalDataSource = new DriverLocalDataSourceImpl();
