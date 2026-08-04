/**
 * Token Storage Service - Single source of truth for auth token management.
 * Never access localStorage/sessionStorage directly from UI or other services.
 */
import { STORAGE_KEYS } from '@/core/constants/appConstants';

class TokenStorageService {
  private getStorage(rememberMe: boolean): Storage {
    return rememberMe ? localStorage : sessionStorage;
  }

  saveTokens(accessToken: string, rememberMe: boolean = false): void {
    const storage = this.getStorage(rememberMe);
    storage.setItem(STORAGE_KEYS.AUTH_TOKEN, accessToken);
    // Save rememberMe preference so we know where to look later
    localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, String(rememberMe));
  }

  getAccessToken(): string | null {
    const rememberMe = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true';
    return this.getStorage(rememberMe).getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  getUserData(): string | null {
    const rememberMe = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true';
    const raw = this.getStorage(rememberMe).getItem(STORAGE_KEYS.USER_DATA);
    return raw;
  }

  saveUserData(userData: object, rememberMe: boolean = false): void {
    const storage = this.getStorage(rememberMe);
    storage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
  }

  clearAll(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
    sessionStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.USER_DATA);
    // Legacy key cleanup
    sessionStorage.removeItem('rofoof_logged_in');
  }

  isAuthenticated(): boolean {
    return this.getAccessToken() !== null;
  }
}

export const tokenStorage = new TokenStorageService();
