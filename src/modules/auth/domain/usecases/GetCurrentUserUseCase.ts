import { authRepository } from '../../data/repositories/AuthRepositoryImpl';
import { AuthUserEntity } from '../entities/AuthEntity';

/** GetCurrentUserUseCase — fetches the currently authenticated user */
export class GetCurrentUserUseCase {
  async execute(): Promise<AuthUserEntity | null> {
    if (!authRepository.isAuthenticated()) return null;
    return authRepository.getCurrentUser();
  }
}

export const getCurrentUserUseCase = new GetCurrentUserUseCase();
