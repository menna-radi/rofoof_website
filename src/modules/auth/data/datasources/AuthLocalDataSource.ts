import { tokenStorage } from '@/core/services/TokenStorageService';
import { AuthUserEntity } from '../../domain/entities/AuthEntity';

export interface IAuthLocalDataSource {
  saveSession(token: string, user: AuthUserEntity, rememberMe: boolean): void;
  clearSession(): void;
  getUser(): AuthUserEntity | null;
  getToken(): string | null;
}

export class AuthLocalDataSourceImpl implements IAuthLocalDataSource {
  saveSession(token: string, user: AuthUserEntity, rememberMe: boolean): void {
    tokenStorage.saveTokens(token, rememberMe);
    tokenStorage.saveUserData(user, rememberMe);
  }

  clearSession(): void {
    tokenStorage.clearAll();
  }

  getUser(): AuthUserEntity | null {
    const raw = tokenStorage.getUserData();
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUserEntity;
    } catch {
      return null;
    }
  }

  getToken(): string | null {
    return tokenStorage.getAccessToken();
  }
}

export const authLocalDataSource = new AuthLocalDataSourceImpl();
