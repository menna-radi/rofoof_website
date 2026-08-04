import { OfferEntity, PushNotificationEntity } from '../../domain/entities/MarketingEntity';

const MOCK_OFFERS: OfferEntity[] = [
  { id: 'c1', title: 'Summer Freshness Sale', type: 'Flash Deal', reach: '12.4K reach', revenue: '48.2K EGP', cvr: '+18.4% CVR', cvrColor: 'text-[#10B981]', status: 'Active', badgeBg: 'bg-[#ECFDF5]', badgeText: 'text-[#10B981]', iconBg: 'bg-[#ECFDF5]', iconColor: 'text-[#10B981]' },
  { id: 'c2', title: 'Weekend Grocery Rush', type: 'Discount Code', reach: '8.1K reach', revenue: '31.5K EGP', cvr: '+12.1% CVR', cvrColor: 'text-[#10B981]', status: 'Active', badgeBg: 'bg-[#ECFDF5]', badgeText: 'text-[#10B981]', iconBg: 'bg-[#EEF1F8]', iconColor: 'text-[#384E85]' },
  { id: 'c3', title: 'VIP Wholesale Discount', type: 'B2B Offer', reach: '1.2K reach', revenue: '94.0K EGP', cvr: '+24.7% CVR', cvrColor: 'text-[#10B981]', status: 'Ending Soon', badgeBg: 'bg-[#FFFBEB]', badgeText: 'text-[#D97706]', iconBg: 'bg-[#FFFBEB]', iconColor: 'text-[#D97706]' },
];

const MOCK_NOTIFICATIONS: PushNotificationEntity[] = [
  { id: 'n1', title: '⚡ Flash Sale 30% Off Fruits!', message: 'Get 30% off on all organic fruits for the next 4 hours.', sentAt: 'Today, 10:00 AM', recipientsCount: 14200, openRate: '42.8%', status: 'Sent' },
  { id: 'n2', title: '🥛 Fresh Dairy Products Restocked', message: 'Your favorite milk and cheese brands are back in stock.', sentAt: 'Yesterday, 04:30 PM', recipientsCount: 8900, openRate: '38.5%', status: 'Sent' },
];

export interface IMarketingLocalDataSource {
  getOffers(): Promise<OfferEntity[]>;
  createOffer(offer: Partial<OfferEntity>): Promise<OfferEntity>;
  getNotifications(): Promise<PushNotificationEntity[]>;
  sendNotification(notification: Partial<PushNotificationEntity>): Promise<PushNotificationEntity>;
}

export class MarketingLocalDataSourceImpl implements IMarketingLocalDataSource {
  private offers = [...MOCK_OFFERS];
  private notifications = [...MOCK_NOTIFICATIONS];

  async getOffers(): Promise<OfferEntity[]> {
    return Promise.resolve(this.offers);
  }

  async createOffer(offer: Partial<OfferEntity>): Promise<OfferEntity> {
    const newOffer: OfferEntity = {
      id: String(Date.now()),
      title: offer.title || 'New Promotion',
      type: offer.type || 'Discount',
      reach: '0 reach',
      revenue: '0 EGP',
      cvr: '+0% CVR',
      cvrColor: 'text-[#10B981]',
      status: 'Active',
      badgeBg: 'bg-[#ECFDF5]',
      badgeText: 'text-[#10B981]',
      iconBg: 'bg-[#ECFDF5]',
      iconColor: 'text-[#10B981]',
      ...offer,
    };
    this.offers = [newOffer, ...this.offers];
    return Promise.resolve(newOffer);
  }

  async getNotifications(): Promise<PushNotificationEntity[]> {
    return Promise.resolve(this.notifications);
  }

  async sendNotification(notification: Partial<PushNotificationEntity>): Promise<PushNotificationEntity> {
    const newNotif: PushNotificationEntity = {
      id: String(Date.now()),
      title: notification.title || 'Notification',
      message: notification.message || '',
      sentAt: 'Just now',
      recipientsCount: 12500,
      openRate: '0%',
      status: 'Sent',
      ...notification,
    };
    this.notifications = [newNotif, ...this.notifications];
    return Promise.resolve(newNotif);
  }
}

export const marketingLocalDataSource = new MarketingLocalDataSourceImpl();
