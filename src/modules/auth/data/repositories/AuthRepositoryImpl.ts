import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { AuthCredentials, AuthSession, AuthUserEntity } from '../../domain/entities/AuthEntity';
import { ENV } from '@/core/api/environment';
import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/api/endpoints';
import { AUTH_DEMO } from '@/core/constants/appConstants';
import { tokenStorage } from '@/core/services/TokenStorageService';

const MOCK_ADMIN: AuthUserEntity = {
  id: 'admin-001',
  name: 'Admin User',
  email: 'admin@rofoof.com',
  role: 'Super Admin',
  avatarInitials: 'AK',
  avatarBg: 'bg-[#384E85]',
  lastLogin: '2 hours ago',
};

export class AuthRepositoryImpl implements IAuthRepository {
  async login(credentials: AuthCredentials): Promise<AuthSession> {
    if (ENV.USE_MOCK) {
      await new Promise((res) => setTimeout(res, 400)); // simulate latency
      if (
        credentials.email === AUTH_DEMO.EMAIL &&
        credentials.password === AUTH_DEMO.PASSWORD
      ) {
        const session: AuthSession = { user: MOCK_ADMIN, accessToken: AUTH_DEMO.MOCK_TOKEN };
        tokenStorage.saveTokens(session.accessToken, credentials.rememberMe ?? false);
        tokenStorage.saveUserData(session.user, credentials.rememberMe ?? false);
        return session;
      }
      throw new Error('Invalid email or password');
    }

    const res = await apiClient.post<AuthSession>(ENDPOINTS.AUTH.LOGIN, credentials);
    if (!res.success) throw new Error(res.message || 'Login failed');
    tokenStorage.saveTokens(res.data.accessToken, credentials.rememberMe ?? false);
    tokenStorage.saveUserData(res.data.user, credentials.rememberMe ?? false);
    return res.data;
  }

  async logout(): Promise<void> {
    if (!ENV.USE_MOCK) {
      await apiClient.post(ENDPOINTS.AUTH.LOGOUT, {});
    }
    tokenStorage.clearAll();
  }

  async getCurrentUser(): Promise<AuthUserEntity | null> {
    if (ENV.USE_MOCK) {
      const raw = tokenStorage.getUserData();
      if (!raw) return null;
      try { return JSON.parse(raw) as AuthUserEntity; } catch { return null; }
    }
    const res = await apiClient.get<AuthUserEntity>(ENDPOINTS.AUTH.ME);
    return res.success ? res.data : null;
  }

  isAuthenticated(): boolean {
    return tokenStorage.isAuthenticated();
  }
}

export const authRepository = new AuthRepositoryImpl();
