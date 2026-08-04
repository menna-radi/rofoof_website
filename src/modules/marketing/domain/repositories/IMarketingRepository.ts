import { OfferEntity, PushNotificationEntity } from '../entities/MarketingEntity';

export interface IMarketingRepository {
  getOffers(): Promise<OfferEntity[]>;
  createOffer(offer: Partial<OfferEntity>): Promise<OfferEntity>;
  getNotifications(): Promise<PushNotificationEntity[]>;
  sendNotification(notification: Partial<PushNotificationEntity>): Promise<PushNotificationEntity>;
}
