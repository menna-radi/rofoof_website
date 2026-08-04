import { tokenStorage } from '@/core/services/TokenStorageService';
import { AuthUserEntity, AuthCredentials, AuthSession } from '../../domain/entities/AuthEntity';
import { AUTH_DEMO } from '@/core/constants/appConstants';

const MOCK_ADMIN: AuthUserEntity = {
  id: 'admin-001',
  name: 'Admin User',
  email: 'admin@rofoof.com',
  role: 'Super Admin',
  avatarInitials: 'AK',
  avatarBg: 'bg-[#384E85]',
  lastLogin: '2 hours ago',
};

export interface IAuthLocalDataSource {
  loginMock(credentials: AuthCredentials): Promise<AuthSession>;
  saveSession(token: string, user: AuthUserEntity, rememberMe: boolean): void;
  clearSession(): void;
  getUser(): AuthUserEntity | null;
  getToken(): string | null;
  isAuthenticated(): boolean;
}

export class AuthLocalDataSourceImpl implements IAuthLocalDataSource {
  async loginMock(credentials: AuthCredentials): Promise<AuthSession> {
    await new Promise((res) => setTimeout(res, 400));
    if (
      credentials.email === AUTH_DEMO.EMAIL &&
      credentials.password === AUTH_DEMO.PASSWORD
    ) {
      const session: AuthSession = { user: MOCK_ADMIN, accessToken: AUTH_DEMO.MOCK_TOKEN };
      this.saveSession(session.accessToken, session.user, credentials.rememberMe ?? false);
      return session;
    }
    throw new Error('Invalid email or password');
  }

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

  isAuthenticated(): boolean {
    return tokenStorage.isAuthenticated();
  }
}

export const authLocalDataSource = new AuthLocalDataSourceImpl();
