export interface DispatchOrderDTO {
  dispatch_id: string;
  order_ref_num: string;
  client_name: string;
  destination_address: string;
  urgency_level: 'high' | 'normal' | 'low';
  dispatch_status: 'queued' | 'assigned' | 'en_route' | 'delivered';
  assigned_driver_name?: string;
  eta_mins?: string;
  queue_duration?: string;
}

export interface DispatchBoardDTO {
  unassigned_queue: DispatchOrderDTO[];
  active_dispatches: DispatchOrderDTO[];
  fulfilled_today_count: number;
  average_dispatch_duration: string;
}
