import { dispatchRepository } from '../../data/repositories/DispatchRepositoryImpl';
import { DispatchBoardEntity, DispatchOrderEntity } from '../entities/DispatchEntity';

/** GetDispatchBoardUseCase — retrieves the dispatch board state */
export class GetDispatchBoardUseCase {
  async execute(): Promise<DispatchBoardEntity> {
    return dispatchRepository.getBoard();
  }
}

/** AssignDriverToOrderUseCase — assigns a driver to a queued order */
export class AssignDriverToOrderUseCase {
  async execute(orderId: string, driverId: string): Promise<DispatchOrderEntity> {
    return dispatchRepository.assignDriver(orderId, driverId);
  }
}

export const getDispatchBoardUseCase = new GetDispatchBoardUseCase();
export const assignDriverToOrderUseCase = new AssignDriverToOrderUseCase();
