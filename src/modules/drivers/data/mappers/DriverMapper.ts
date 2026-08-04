import { DriverDTO } from '../dtos/DriverDTO';
import { DriverEntity } from '../../domain/entities/DriverEntity';

export class DriverMapper {
  static toEntity(dto: DriverDTO): DriverEntity {
    return {
      id: dto.driver_id,
      name: dto.driver_name,
      handle: dto.user_handle,
      initials: dto.name_initials,
      phone: dto.mobile_phone,
      nationalId: dto.national_id_num,
      vehicleType: dto.vehicle_category,
      vehicleIcon: dto.vehicle_icon_emoji,
      licensePlate: dto.license_plate_no,
      status: dto.current_status,
      rating: dto.rating_score,
      totalTrips: dto.completed_trips,
      activeOrders: dto.active_deliveries,
      earnings: dto.today_earnings,
      avatarBg: dto.avatar_gradient,
    };
  }
}
