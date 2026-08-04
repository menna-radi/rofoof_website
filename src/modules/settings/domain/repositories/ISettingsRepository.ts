import { SettingsEntity, AppearanceSettingsEntity, ProfileSettingsEntity, SecuritySettingsEntity, NotificationSettingsEntity } from '../entities/SettingsEntity';

export interface ISettingsRepository {
  getSettings(): Promise<SettingsEntity>;
  updateProfile(profile: Partial<ProfileSettingsEntity>): Promise<ProfileSettingsEntity>;
  updateAppearance(appearance: Partial<AppearanceSettingsEntity>): Promise<AppearanceSettingsEntity>;
  updateSecurity(security: Partial<SecuritySettingsEntity>): Promise<SecuritySettingsEntity>;
  updateNotifications(notifications: Partial<NotificationSettingsEntity>): Promise<NotificationSettingsEntity>;
}
