import { OfferDTO, PushNotificationDTO } from '../dtos/MarketingDTO';

export interface IMarketingLocalDataSource {
  getCachedOffers(): OfferDTO[];
  cacheOffers(offers: OfferDTO[]): void;
}

export class MarketingLocalDataSourceImpl implements IMarketingLocalDataSource {
  private cache: OfferDTO[] = [];

  getCachedOffers(): OfferDTO[] {
    return this.cache;
  }

  cacheOffers(offers: OfferDTO[]): void {
    this.cache = offers;
  }
}

export const marketingLocalDataSource = new MarketingLocalDataSourceImpl();
