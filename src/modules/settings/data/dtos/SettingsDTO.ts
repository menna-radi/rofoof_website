/**
 * DTOs for Settings API responses — never exposed to UI.
 */
export interface SettingsDTO {
  profile: {
    full_name: string;
    email: string;
    phone: string;
    role: string;
    avatar_initials: string;
  };
  security: {
    two_fa_enabled: boolean;
    session_timeout: number;
    last_password_change: string;
  };
  appearance: {
    theme: string;
    density: string;
    language: string;
  };
  notifications: {
    email_alerts: boolean;
    push_notifications: boolean;
    order_updates: boolean;
    low_stock_alerts: boolean;
    driver_alerts: boolean;
  };
}
