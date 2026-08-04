import { useState, useEffect } from 'react';
import { getOffersUseCase, getNotificationsUseCase, sendNotificationUseCase } from '../../domain/usecases/MarketingUseCases';
import { OfferEntity, PushNotificationEntity } from '../../domain/entities/MarketingEntity';

export const useMarketingController = () => {
  const [offers, setOffers] = useState<OfferEntity[]>([]);
  const [notifications, setNotifications] = useState<PushNotificationEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getOffersUseCase.execute(), getNotificationsUseCase.execute()])
      .then(([offs, notifs]) => {
        setOffers(offs);
        setNotifications(notifs);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const sendNotification = async (notification: Partial<PushNotificationEntity>) => {
    try {
      const created = await sendNotificationUseCase.execute(notification);
      setNotifications((prev) => [created, ...prev]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { offers, notifications, isLoading, error, sendNotification };
};
