import { ENV } from './environment';

export const API_CONFIG = {
  baseUrl: ENV.BASE_URL,
  timeout: ENV.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};
