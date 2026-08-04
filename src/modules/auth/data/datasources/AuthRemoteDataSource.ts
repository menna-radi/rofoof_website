import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/api/endpoints';
import { AuthUserDTO, LoginResponseDTO } from '../dtos/AuthDTO';
import { AuthCredentials } from '../../domain/entities/AuthEntity';

export interface IAuthRemoteDataSource {
  login(credentials: AuthCredentials): Promise<LoginResponseDTO>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<AuthUserDTO>;
}

export class AuthRemoteDataSourceImpl implements IAuthRemoteDataSource {
  async login(credentials: AuthCredentials): Promise<LoginResponseDTO> {
    const res = await apiClient.post<LoginResponseDTO>(ENDPOINTS.AUTH.LOGIN, credentials);
    if (!res.success) throw new Error(res.message || 'Login failed');
    return res.data;
  }

  async logout(): Promise<void> {
    await apiClient.post(ENDPOINTS.AUTH.LOGOUT, {});
  }

  async getCurrentUser(): Promise<AuthUserDTO> {
    const res = await apiClient.get<AuthUserDTO>(ENDPOINTS.AUTH.ME);
    if (!res.success) throw new Error(res.message || 'Failed to fetch user');
    return res.data;
  }
}

export const authRemoteDataSource = new AuthRemoteDataSourceImpl();
