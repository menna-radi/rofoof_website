import { useState, useEffect } from 'react';
import { getSettingsUseCase } from '../../domain/usecases/GetSettingsUseCase';
import {
  updateProfileUseCase,
  updateAppearanceUseCase,
  updateSecurityUseCase,
  updateNotificationsUseCase,
} from '../../domain/usecases/UpdateSettingsUseCases';
import {
  SettingsEntity,
  ProfileSettingsEntity,
  AppearanceSettingsEntity,
  SecuritySettingsEntity,
  NotificationSettingsEntity,
} from '../../domain/entities/SettingsEntity';

export const useSettingsController = () => {
  const [settings, setSettings] = useState<SettingsEntity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSettingsUseCase
      .execute()
      .then(setSettings)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const updateProfile = async (profile: Partial<ProfileSettingsEntity>) => {
    try {
      const updated = await updateProfileUseCase.execute(profile);
      setSettings((prev) => (prev ? { ...prev, profile: updated } : null));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const updateAppearance = async (appearance: Partial<AppearanceSettingsEntity>) => {
    try {
      const updated = await updateAppearanceUseCase.execute(appearance);
      setSettings((prev) => (prev ? { ...prev, appearance: updated } : null));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const updateSecurity = async (security: Partial<SecuritySettingsEntity>) => {
    try {
      const updated = await updateSecurityUseCase.execute(security);
      setSettings((prev) => (prev ? { ...prev, security: updated } : null));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const updateNotifications = async (notifications: Partial<NotificationSettingsEntity>) => {
    try {
      const updated = await updateNotificationsUseCase.execute(notifications);
      setSettings((prev) => (prev ? { ...prev, notifications: updated } : null));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    settings,
    isLoading,
    error,
    updateProfile,
    updateAppearance,
    updateSecurity,
    updateNotifications,
  };
};
