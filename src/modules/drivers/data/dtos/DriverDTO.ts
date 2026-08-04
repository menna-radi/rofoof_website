export interface DriverDTO {
  driver_id: string;
  driver_name: string;
  user_handle: string;
  name_initials: string;
  mobile_phone: string;
  national_id_num: string;
  vehicle_category: string;
  vehicle_icon_emoji: string;
  license_plate_no: string;
  current_status: 'Online' | 'Offline' | 'Busy';
  rating_score: number;
  completed_trips: number;
  active_deliveries: number;
  today_earnings: string;
  avatar_gradient: string;
}
