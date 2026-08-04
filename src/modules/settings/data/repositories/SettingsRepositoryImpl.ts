import { ISettingsRepository } from '../../domain/repositories/ISettingsRepository';
import {
  SettingsEntity,
  AppearanceSettingsEntity,
  ProfileSettingsEntity,
  SecuritySettingsEntity,
  NotificationSettingsEntity,
} from '../../domain/entities/SettingsEntity';
import { ENV } from '@/core/api/environment';
import { settingsLocalDataSource } from '../datasources/SettingsLocalDataSource';
import { settingsRemoteDataSource } from '../datasources/SettingsRemoteDataSource';
import { SettingsMapper } from '../mappers/SettingsMapper';

export class SettingsRepositoryImpl implements ISettingsRepository {
  async getSettings(): Promise<SettingsEntity> {
    if (ENV.USE_MOCK) return settingsLocalDataSource.getSettings();
    const dto = await settingsRemoteDataSource.getSettings();
    return SettingsMapper.toEntity(dto);
  }

  async updateProfile(profile: Partial<ProfileSettingsEntity>): Promise<ProfileSettingsEntity> {
    if (ENV.USE_MOCK) return settingsLocalDataSource.updateProfile(profile);
    await settingsRemoteDataSource.updateSettings({ profile: profile as any });
    return profile as ProfileSettingsEntity;
  }

  async updateAppearance(appearance: Partial<AppearanceSettingsEntity>): Promise<AppearanceSettingsEntity> {
    if (ENV.USE_MOCK) return settingsLocalDataSource.updateAppearance(appearance);
    await settingsRemoteDataSource.updateSettings({ appearance: appearance as any });
    return appearance as AppearanceSettingsEntity;
  }

  async updateSecurity(security: Partial<SecuritySettingsEntity>): Promise<SecuritySettingsEntity> {
    if (ENV.USE_MOCK) return settingsLocalDataSource.updateSecurity(security);
    await settingsRemoteDataSource.updateSettings({ security: security as any });
    return security as SecuritySettingsEntity;
  }

  async updateNotifications(notifications: Partial<NotificationSettingsEntity>): Promise<NotificationSettingsEntity> {
    if (ENV.USE_MOCK) return settingsLocalDataSource.updateNotifications(notifications);
    await settingsRemoteDataSource.updateSettings({ notifications: notifications as any });
    return notifications as NotificationSettingsEntity;
  }
}

export const settingsRepository = new SettingsRepositoryImpl();
