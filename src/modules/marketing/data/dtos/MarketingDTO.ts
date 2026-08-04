export interface OfferDTO {
  campaign_id: string;
  campaign_title: string;
  campaign_type: string;
  audience_reach: string;
  generated_revenue: string;
  conversion_rate: string;
  cvr_color_class: string;
  campaign_status: string;
  badge_bg_class: string;
  badge_text_class: string;
  icon_bg_class: string;
  icon_color_class: string;
}

export interface PushNotificationDTO {
  notification_id: string;
  header_title: string;
  body_text: string;
  timestamp_sent: string;
  targeted_users_count: number;
  open_rate_pct: string;
  delivery_status: string;
}
