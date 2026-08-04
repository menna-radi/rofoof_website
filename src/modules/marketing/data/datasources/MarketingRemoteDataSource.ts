import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/api/endpoints';
import { OfferDTO, PushNotificationDTO } from '../dtos/MarketingDTO';

export interface IMarketingRemoteDataSource {
  getOffers(): Promise<OfferDTO[]>;
  getNotifications(): Promise<PushNotificationDTO[]>;
  sendNotification(notification: Partial<PushNotificationDTO>): Promise<PushNotificationDTO>;
}

export class MarketingRemoteDataSourceImpl implements IMarketingRemoteDataSource {
  async getOffers(): Promise<OfferDTO[]> {
    const res = await apiClient.get<OfferDTO[]>(ENDPOINTS.MARKETING.OFFERS);
    return res.data;
  }

  async getNotifications(): Promise<PushNotificationDTO[]> {
    const res = await apiClient.get<PushNotificationDTO[]>(ENDPOINTS.MARKETING.NOTIFICATIONS);
    return res.data;
  }

  async sendNotification(notification: Partial<PushNotificationDTO>): Promise<PushNotificationDTO> {
    const res = await apiClient.post<PushNotificationDTO>(ENDPOINTS.MARKETING.NOTIFICATIONS, notification);
    return res.data;
  }
}

export const marketingRemoteDataSource = new MarketingRemoteDataSourceImpl();
