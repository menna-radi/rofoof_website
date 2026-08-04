import { AuthCredentials, AuthSession, AuthUserEntity } from '../entities/AuthEntity';

export interface IAuthRepository {
  login(credentials: AuthCredentials): Promise<AuthSession>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<AuthUserEntity | null>;
  isAuthenticated(): boolean;
}
