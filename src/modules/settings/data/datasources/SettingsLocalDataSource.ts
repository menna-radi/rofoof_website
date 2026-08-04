import { STORAGE_KEYS } from '@/core/constants/appConstants';
import {
  SettingsEntity,
  AppearanceSettingsEntity,
  ProfileSettingsEntity,
  SecuritySettingsEntity,
  NotificationSettingsEntity,
} from '../../domain/entities/SettingsEntity';

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

export interface ISettingsLocalDataSource {
  getSettings(): Promise<SettingsEntity>;
  updateProfile(profile: Partial<ProfileSettingsEntity>): Promise<ProfileSettingsEntity>;
  updateAppearance(appearance: Partial<AppearanceSettingsEntity>): Promise<AppearanceSettingsEntity>;
  updateSecurity(security: Partial<SecuritySettingsEntity>): Promise<SecuritySettingsEntity>;
  updateNotifications(notifications: Partial<NotificationSettingsEntity>): Promise<NotificationSettingsEntity>;
  getTheme(): string | null;
  setTheme(theme: string): void;
  getLanguage(): string | null;
  setLanguage(lang: string): void;
}

export class SettingsLocalDataSourceImpl implements ISettingsLocalDataSource {
  private settings: SettingsEntity = { ...DEFAULT_SETTINGS };

  getTheme(): string | null {
    try { return localStorage.getItem(STORAGE_KEYS.THEME_MODE); } catch { return null; }
  }

  setTheme(theme: string): void {
    try { localStorage.setItem(STORAGE_KEYS.THEME_MODE, theme); } catch {}
  }

  getLanguage(): string | null {
    try { return localStorage.getItem(STORAGE_KEYS.LANGUAGE); } catch { return null; }
  }

  setLanguage(lang: string): void {
    try { localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang); } catch {}
  }

  async getSettings(): Promise<SettingsEntity> {
    const theme = this.getTheme();
    if (theme) {
      this.settings.appearance.theme = theme as AppearanceSettingsEntity['theme'];
    }
    return Promise.resolve({ ...this.settings });
  }

  async updateProfile(profile: Partial<ProfileSettingsEntity>): Promise<ProfileSettingsEntity> {
    this.settings.profile = { ...this.settings.profile, ...profile };
    return Promise.resolve(this.settings.profile);
  }

  async updateAppearance(appearance: Partial<AppearanceSettingsEntity>): Promise<AppearanceSettingsEntity> {
    this.settings.appearance = { ...this.settings.appearance, ...appearance };
    if (appearance.theme) this.setTheme(appearance.theme);
    if (appearance.language) this.setLanguage(appearance.language);
    return Promise.resolve(this.settings.appearance);
  }

  async updateSecurity(security: Partial<SecuritySettingsEntity>): Promise<SecuritySettingsEntity> {
    this.settings.security = { ...this.settings.security, ...security };
    return Promise.resolve(this.settings.security);
  }

  async updateNotifications(notifications: Partial<NotificationSettingsEntity>): Promise<NotificationSettingsEntity> {
    this.settings.notifications = { ...this.settings.notifications, ...notifications };
    return Promise.resolve(this.settings.notifications);
  }
}

export const settingsLocalDataSource = new SettingsLocalDataSourceImpl();
