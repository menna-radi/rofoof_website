import { OfferDTO, PushNotificationDTO } from '../dtos/MarketingDTO';
import { OfferEntity, PushNotificationEntity } from '../../domain/entities/MarketingEntity';

export class MarketingMapper {
  static toOfferEntity(dto: OfferDTO): OfferEntity {
    return {
      id: dto.campaign_id,
      title: dto.campaign_title,
      type: dto.campaign_type,
      reach: dto.audience_reach,
      revenue: dto.generated_revenue,
      cvr: dto.conversion_rate,
      cvrColor: dto.cvr_color_class,
      status: dto.campaign_status as OfferEntity['status'],
      badgeBg: dto.badge_bg_class,
      badgeText: dto.badge_text_class,
      iconBg: dto.icon_bg_class,
      iconColor: dto.icon_color_class,
    };
  }

  static toNotificationEntity(dto: PushNotificationDTO): PushNotificationEntity {
    return {
      id: dto.notification_id,
      title: dto.header_title,
      message: dto.body_text,
      sentAt: dto.timestamp_sent,
      recipientsCount: dto.targeted_users_count,
      openRate: dto.open_rate_pct,
      status: dto.delivery_status as PushNotificationEntity['status'],
    };
  }
}
