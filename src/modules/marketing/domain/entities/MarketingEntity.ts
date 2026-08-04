export interface OfferEntity {
  id: string;
  title: string;
  type: string;
  reach: string;
  revenue: string;
  cvr: string;
  cvrColor: string;
  status: 'Active' | 'Ending Soon';
  badgeBg: string;
  badgeText: string;
  iconBg: string;
  iconColor: string;
}

export interface PushNotificationEntity {
  id: string;
  title: string;
  message: string;
  sentAt: string;
  recipientsCount: number;
  openRate: string;
  status: 'Sent' | 'Scheduled';
}
