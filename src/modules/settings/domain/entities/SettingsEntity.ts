export type ThemeMode = 'light' | 'dark' | 'system';
export type DensityMode = 'compact' | 'comfortable' | 'spacious';

export interface ProfileSettingsEntity {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  avatarInitials: string;
}

export interface SecuritySettingsEntity {
  twoFaEnabled: boolean;
  sessionTimeout: number; // minutes
  lastPasswordChange: string;
}

export interface AppearanceSettingsEntity {
  theme: ThemeMode;
  density: DensityMode;
  language: string;
}

export interface NotificationSettingsEntity {
  emailAlerts: boolean;
  pushNotifications: boolean;
  orderUpdates: boolean;
  lowStockAlerts: boolean;
  driverAlerts: boolean;
}

export interface SettingsEntity {
  profile: ProfileSettingsEntity;
  security: SecuritySettingsEntity;
  appearance: AppearanceSettingsEntity;
  notifications: NotificationSettingsEntity;
}
