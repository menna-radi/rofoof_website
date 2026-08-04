import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authRepository } from '../../data/repositories/AuthRepositoryImpl';
import { AuthUserEntity, AuthCredentials } from '../../domain/entities/AuthEntity';
import { ROUTE_PATHS } from '@/app/routes/routePaths';
import { apiClient } from '@/core/api/apiClient';

interface AuthState {
  user: AuthUserEntity | null;
  isLoading: boolean;
  error: string | null;
}

export const useAuthController = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: false,
    error: null,
  });

  const login = useCallback(async (credentials: AuthCredentials) => {
    setState((s) => ({ ...s, isLoading: true, error: null }));
    try {
      const session = await authRepository.login(credentials);
      setState({ user: session.user, isLoading: false, error: null });
      navigate(ROUTE_PATHS.DASHBOARD, { replace: true });
    } catch (err: any) {
      setState((s) => ({ ...s, isLoading: false, error: err.message }));
    }
  }, [navigate]);

  const logout = useCallback(async () => {
    await authRepository.logout();
    setState({ user: null, isLoading: false, error: null });
    navigate(ROUTE_PATHS.LOGIN, { replace: true });
  }, [navigate]);

  const clearError = useCallback(() => {
    setState((s) => ({ ...s, error: null }));
  }, []);

  // Register global 401 handler on mount
  const initGlobalUnauthorizedHandler = useCallback(() => {
    apiClient.setOnUnauthorized(() => {
      authRepository.logout().then(() => {
        navigate(ROUTE_PATHS.LOGIN, { replace: true });
      });
    });
  }, [navigate]);

  return {
    user: state.user,
    isLoading: state.isLoading,
    error: state.error,
    login,
    logout,
    clearError,
    isAuthenticated: authRepository.isAuthenticated(),
    initGlobalUnauthorizedHandler,
  };
};
