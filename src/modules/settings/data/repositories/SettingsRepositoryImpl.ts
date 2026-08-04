import { ISettingsRepository } from '../../domain/repositories/ISettingsRepository';
import {
  SettingsEntity,
  AppearanceSettingsEntity,
  ProfileSettingsEntity,
  SecuritySettingsEntity,
  NotificationSettingsEntity,
} from '../../domain/entities/SettingsEntity';
import { ENV } from '@/core/api/environment';
import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/api/endpoints';
import { settingsLocalDataSource } from '../datasources/SettingsLocalDataSource';

const DEFAULT_SETTINGS: SettingsEntity = {
  profile: {
    fullName: 'Admin User',
    email: 'admin@grocerERP.com',
    phone: '+20 100 000 0000',
    role: 'Super Admin',
    avatarInitials: 'AK',
  },
  security: {
    twoFaEnabled: false,
    sessionTimeout: 30,
    lastPasswordChange: '3 months ago',
  },
  appearance: {
    theme: 'light',
    density: 'comfortable',
    language: 'en',
  },
  notifications: {
    emailAlerts: true,
    pushNotifications: true,
    orderUpdates: true,
    lowStockAlerts: true,
    driverAlerts: false,
  },
};

export class SettingsRepositoryImpl implements ISettingsRepository {
  private settings: SettingsEntity = { ...DEFAULT_SETTINGS };

  private loadFromStorage(): void {
    const theme = settingsLocalDataSource.getTheme();
    if (theme) {
      this.settings.appearance.theme = theme as AppearanceSettingsEntity['theme'];
    }
  }

  private saveAppearanceToStorage(appearance: AppearanceSettingsEntity): void {
    settingsLocalDataSource.setTheme(appearance.theme);
    settingsLocalDataSource.setLanguage(appearance.language);
  }

  async getSettings(): Promise<SettingsEntity> {
    this.loadFromStorage();
    if (ENV.USE_MOCK) return Promise.resolve({ ...this.settings });
    const res = await apiClient.get<SettingsEntity>(ENDPOINTS.SETTINGS.GET);
    if (res.success) this.settings = res.data;
    return this.settings;
  }

  async updateProfile(profile: Partial<ProfileSettingsEntity>): Promise<ProfileSettingsEntity> {
    this.settings.profile = { ...this.settings.profile, ...profile };
    if (!ENV.USE_MOCK) {
      await apiClient.put(ENDPOINTS.SETTINGS.UPDATE, { profile: this.settings.profile });
    }
    return Promise.resolve(this.settings.profile);
  }

  async updateAppearance(appearance: Partial<AppearanceSettingsEntity>): Promise<AppearanceSettingsEntity> {
    this.settings.appearance = { ...this.settings.appearance, ...appearance };
    this.saveAppearanceToStorage(this.settings.appearance);
    if (!ENV.USE_MOCK) {
      await apiClient.put(ENDPOINTS.SETTINGS.UPDATE, { appearance: this.settings.appearance });
    }
    return Promise.resolve(this.settings.appearance);
  }

  async updateSecurity(security: Partial<SecuritySettingsEntity>): Promise<SecuritySettingsEntity> {
    this.settings.security = { ...this.settings.security, ...security };
    if (!ENV.USE_MOCK) {
      await apiClient.put(ENDPOINTS.SETTINGS.UPDATE, { security: this.settings.security });
    }
    return Promise.resolve(this.settings.security);
  }

  async updateNotifications(notifications: Partial<NotificationSettingsEntity>): Promise<NotificationSettingsEntity> {
    this.settings.notifications = { ...this.settings.notifications, ...notifications };
    if (!ENV.USE_MOCK) {
      await apiClient.put(ENDPOINTS.SETTINGS.UPDATE, { notifications: this.settings.notifications });
    }
    return Promise.resolve(this.settings.notifications);
  }
}

export const settingsRepository = new SettingsRepositoryImpl();
