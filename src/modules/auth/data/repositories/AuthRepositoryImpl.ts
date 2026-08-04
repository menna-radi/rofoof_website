import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { AuthCredentials, AuthSession, AuthUserEntity } from '../../domain/entities/AuthEntity';
import { ENV } from '@/core/api/environment';
import { authLocalDataSource } from '../datasources/AuthLocalDataSource';
import { authRemoteDataSource } from '../datasources/AuthRemoteDataSource';
import { AuthMapper } from '../mappers/AuthMapper';

export class AuthRepositoryImpl implements IAuthRepository {
  async login(credentials: AuthCredentials): Promise<AuthSession> {
    if (ENV.USE_MOCK) {
      return authLocalDataSource.loginMock(credentials);
    }
    const responseDto = await authRemoteDataSource.login(credentials);
    const session = AuthMapper.toSession(responseDto);
    authLocalDataSource.saveSession(session.accessToken, session.user, credentials.rememberMe ?? false);
    return session;
  }

  async logout(): Promise<void> {
    if (!ENV.USE_MOCK) {
      await authRemoteDataSource.logout();
    }
    authLocalDataSource.clearSession();
  }

  async getCurrentUser(): Promise<AuthUserEntity | null> {
    if (ENV.USE_MOCK) {
      return authLocalDataSource.getUser();
    }
    const dto = await authRemoteDataSource.getCurrentUser();
    return dto ? AuthMapper.toUserEntity(dto) : null;
  }

  isAuthenticated(): boolean {
    return authLocalDataSource.isAuthenticated();
  }
}

export const authRepository = new AuthRepositoryImpl();
