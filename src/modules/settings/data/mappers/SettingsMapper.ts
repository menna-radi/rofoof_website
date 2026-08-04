import { SettingsDTO } from '../dtos/SettingsDTO';
import { SettingsEntity } from '../../domain/entities/SettingsEntity';

/**
 * SettingsMapper — Converts API DTOs → Domain Entities.
 */
export class SettingsMapper {
  static toEntity(dto: SettingsDTO): SettingsEntity {
    return {
      profile: {
        fullName: dto.profile.full_name,
        email: dto.profile.email,
        phone: dto.profile.phone,
        role: dto.profile.role,
        avatarInitials: dto.profile.avatar_initials,
      },
      security: {
        twoFaEnabled: dto.security.two_fa_enabled,
        sessionTimeout: dto.security.session_timeout,
        lastPasswordChange: dto.security.last_password_change,
      },
      appearance: {
        theme: dto.appearance.theme as SettingsEntity['appearance']['theme'],
        density: dto.appearance.density as SettingsEntity['appearance']['density'],
        language: dto.appearance.language,
      },
      notifications: {
        emailAlerts: dto.notifications.email_alerts,
        pushNotifications: dto.notifications.push_notifications,
        orderUpdates: dto.notifications.order_updates,
        lowStockAlerts: dto.notifications.low_stock_alerts,
        driverAlerts: dto.notifications.driver_alerts,
      },
    };
  }
}
