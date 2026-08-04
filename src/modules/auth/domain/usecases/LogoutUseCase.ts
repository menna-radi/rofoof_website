import { authRepository } from '../../data/repositories/AuthRepositoryImpl';

/** LogoutUseCase — clears session and redirects */
export class LogoutUseCase {
  async execute(): Promise<void> {
    return authRepository.logout();
  }
}

export const logoutUseCase = new LogoutUseCase();
