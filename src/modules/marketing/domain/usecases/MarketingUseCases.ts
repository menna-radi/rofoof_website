import { marketingRepository } from '../../data/repositories/MarketingRepositoryImpl';
import { OfferEntity, PushNotificationEntity } from '../entities/MarketingEntity';

/** GetOffersUseCase — retrieves all marketing offers */
export class GetOffersUseCase {
  async execute(): Promise<OfferEntity[]> {
    return marketingRepository.getOffers();
  }
}

/** GetNotificationsUseCase — retrieves push notifications */
export class GetNotificationsUseCase {
  async execute(): Promise<PushNotificationEntity[]> {
    return marketingRepository.getNotifications();
  }
}

/** SendNotificationUseCase — sends a new push notification */
export class SendNotificationUseCase {
  async execute(notification: Partial<PushNotificationEntity>): Promise<PushNotificationEntity> {
    return marketingRepository.sendNotification(notification);
  }
}

export const getOffersUseCase = new GetOffersUseCase();
export const getNotificationsUseCase = new GetNotificationsUseCase();
export const sendNotificationUseCase = new SendNotificationUseCase();
