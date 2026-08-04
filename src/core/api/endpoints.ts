/**
 * Single Registry for All API Endpoints Across the Application
 * Never hardcode URLs anywhere else in the project.
 */
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  DASHBOARD: {
    STATS: '/dashboard/stats',
    REVENUE: '/dashboard/revenue',
    ACTIVITY: '/dashboard/activity',
  },
  ORDERS: {
    LIST: '/orders',
    DETAIL: (id: string) => `/orders/${id}`,
    CREATE: '/orders',
    UPDATE_STATUS: (id: string) => `/orders/${id}/status`,
  },
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (id: string) => `/products/${id}`,
    CREATE: '/products',
    UPDATE: (id: string) => `/products/${id}`,
    DELETE: (id: string) => `/products/${id}`,
    CATEGORIES: '/products/categories',
  },
  INVENTORY: {
    OVERVIEW: '/inventory/overview',
    LOW_STOCK: '/inventory/low-stock',
    UPDATE_STOCK: (id: string) => `/inventory/${id}/stock`,
  },
  CUSTOMERS: {
    LIST: '/customers',
    DETAIL: (id: string) => `/customers/${id}`,
  },
  DRIVERS: {
    LIST: '/drivers',
    DETAIL: (id: string) => `/drivers/${id}`,
    CREATE: '/drivers',
    LOCATION: (id: string) => `/drivers/${id}/location`,
  },
  DISPATCH: {
    BOARD: '/dispatch/board',
    QUEUE: '/dispatch/queue',
    ASSIGN: '/dispatch/assign',
  },
  MARKETING: {
    OFFERS: '/marketing/offers',
    NOTIFICATIONS: '/marketing/notifications',
  },
  ANALYTICS: {
    SALES: '/analytics/sales',
    CATEGORIES: '/analytics/categories',
  },
  SETTINGS: {
    GET: '/settings',
    UPDATE: '/settings',
  },
  EXPORT: {
    DATA: '/export',
  },
} as const;
