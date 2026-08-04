/**
 * Single Configuration File for Environment & Mock Toggle
 * Switch USE_MOCK to false when connecting to the real backend.
 */
export const ENV = {
  IS_PRODUCTION: import.meta.env.PROD,
  MODE: import.meta.env.MODE || 'development',
  
  // SINGLE MOCK TOGGLE SWITCH (Set to false for real backend API)
  USE_MOCK: true,
  
  // API Configuration
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.rofoof.com/v1',
  TIMEOUT: 15000,
};
