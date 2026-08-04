import { DispatchBoardDTO, DispatchOrderDTO } from '../dtos/DispatchDTO';
import { DispatchBoardEntity, DispatchOrderEntity } from '../../domain/entities/DispatchEntity';

export class DispatchMapper {
  static toOrderEntity(dto: DispatchOrderDTO): DispatchOrderEntity {
    return {
      id: dto.dispatch_id,
      orderNumber: dto.order_ref_num,
      customer: dto.client_name,
      address: dto.destination_address,
      priority: dto.urgency_level,
      status: dto.dispatch_status,
      driverName: dto.assigned_driver_name,
      estimatedTime: dto.eta_mins,
      timeInQueue: dto.queue_duration,
    };
  }

  static toBoardEntity(dto: DispatchBoardDTO): DispatchBoardEntity {
    return {
      pendingOrders: dto.unassigned_queue.map(DispatchMapper.toOrderEntity),
      assignedOrders: dto.active_dispatches.map(DispatchMapper.toOrderEntity),
      completedToday: dto.fulfilled_today_count,
      avgDispatchTime: dto.average_dispatch_duration,
    };
  }
}
