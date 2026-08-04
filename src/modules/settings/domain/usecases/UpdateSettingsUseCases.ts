import { settingsRepository } from '../../data/repositories/SettingsRepositoryImpl';
import { ProfileSettingsEntity, AppearanceSettingsEntity, SecuritySettingsEntity, NotificationSettingsEntity } from '../entities/SettingsEntity';

export class UpdateProfileUseCase {
  async execute(profile: Partial<ProfileSettingsEntity>): Promise<ProfileSettingsEntity> {
    return settingsRepository.updateProfile(profile);
  }
}

export class UpdateAppearanceUseCase {
  async execute(appearance: Partial<AppearanceSettingsEntity>): Promise<AppearanceSettingsEntity> {
    return settingsRepository.updateAppearance(appearance);
  }
}

export class UpdateSecurityUseCase {
  async execute(security: Partial<SecuritySettingsEntity>): Promise<SecuritySettingsEntity> {
    return settingsRepository.updateSecurity(security);
  }
}

export class UpdateNotificationsUseCase {
  async execute(notifications: Partial<NotificationSettingsEntity>): Promise<NotificationSettingsEntity> {
    return settingsRepository.updateNotifications(notifications);
  }
}

export const updateProfileUseCase = new UpdateProfileUseCase();
export const updateAppearanceUseCase = new UpdateAppearanceUseCase();
export const updateSecurityUseCase = new UpdateSecurityUseCase();
export const updateNotificationsUseCase = new UpdateNotificationsUseCase();
