export type DriverStatus = 'Online' | 'Busy' | 'Offline' | 'Suspended';

export interface DriverEntity {
  id: string;
  name: string;
  handle: string;
  initials: string;
  phone: string;
  nationalId: string;
  vehicleType: string;
  vehicleIcon: string;
  licensePlate: string;
  status: DriverStatus;
  rating: number;
  totalTrips: number;
  activeOrders: number;
  earnings: string;
  avatarBg: string;
}
