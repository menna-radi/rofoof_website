import { authRepository } from '../../data/repositories/AuthRepositoryImpl';
import { AuthCredentials, AuthSession } from '../entities/AuthEntity';

/** LoginUseCase — encapsulates login business logic */
export class LoginUseCase {
  async execute(credentials: AuthCredentials): Promise<AuthSession> {
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required');
    }
    return authRepository.login(credentials);
  }
}

export const loginUseCase = new LoginUseCase();
