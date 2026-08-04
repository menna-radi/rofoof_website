import { DispatchBoardEntity, DispatchOrderEntity } from '../entities/DispatchEntity';

export interface IDispatchRepository {
  getBoard(): Promise<DispatchBoardEntity>;
  assignDriver(orderId: string, driverId: string): Promise<DispatchOrderEntity>;
}
