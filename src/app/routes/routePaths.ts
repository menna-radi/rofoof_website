/**
 * Centralized Route Paths Registry
 * Single place for all route URL definitions.
 */
export const ROUTE_PATHS = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  ORDERS: '/orders',
  PRODUCTS: '/products',
  CATEGORIES: '/categories',
  STOCK_OVERVIEW: '/stock-overview',
  CUSTOMERS: '/customers',
  DRIVERS: '/drivers',
  LIVE_TRACKING: '/live-tracking',
  DISPATCH_BOARD: '/dispatch-board',
  MARKETING_OFFERS: '/marketing/offers',
  MARKETING_NOTIFICATIONS: '/marketing/notifications',
  ANALYTICS: '/analytics',
  SETTINGS: '/settings',
} as const;
