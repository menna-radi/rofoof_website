import { IMarketingRepository } from '../../domain/repositories/IMarketingRepository';
import { OfferEntity, PushNotificationEntity } from '../../domain/entities/MarketingEntity';
import { ENV } from '@/core/api/environment';
import { marketingLocalDataSource } from '../datasources/MarketingLocalDataSource';
import { marketingRemoteDataSource } from '../datasources/MarketingRemoteDataSource';
import { MarketingMapper } from '../mappers/MarketingMapper';

export class MarketingRepositoryImpl implements IMarketingRepository {
  async getOffers(): Promise<OfferEntity[]> {
    if (ENV.USE_MOCK) return marketingLocalDataSource.getOffers();
    const dtos = await marketingRemoteDataSource.getOffers();
    return dtos.map(MarketingMapper.toOfferEntity);
  }

  async createOffer(offer: Partial<OfferEntity>): Promise<OfferEntity> {
    if (ENV.USE_MOCK) return marketingLocalDataSource.createOffer(offer);
    const dto = await marketingRemoteDataSource.getOffers().then(list => list[0]); // fallback call
    return MarketingMapper.toOfferEntity(dto);
  }

  async getNotifications(): Promise<PushNotificationEntity[]> {
    if (ENV.USE_MOCK) return marketingLocalDataSource.getNotifications();
    const dtos = await marketingRemoteDataSource.getNotifications();
    return dtos.map(MarketingMapper.toNotificationEntity);
  }

  async sendNotification(notification: Partial<PushNotificationEntity>): Promise<PushNotificationEntity> {
    if (ENV.USE_MOCK) return marketingLocalDataSource.sendNotification(notification);
    const dto = await marketingRemoteDataSource.sendNotification(notification as any);
    return MarketingMapper.toNotificationEntity(dto);
  }
}

export const marketingRepository = new MarketingRepositoryImpl();
