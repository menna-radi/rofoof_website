import { API_CONFIG } from './apiConfig';
import { tokenStorage } from '@/core/services/TokenStorageService';

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
  success: boolean;
}

type OnUnauthorizedCallback = () => void;

class ApiClient {
  private baseUrl: string;
  private onUnauthorized: OnUnauthorizedCallback | null = null;

  constructor() {
    this.baseUrl = API_CONFIG.baseUrl;
  }

  /** Register a callback to call on 401 Unauthorized (e.g., trigger logout) */
  setOnUnauthorized(cb: OnUnauthorizedCallback): void {
    this.onUnauthorized = cb;
  }

  private buildHeaders(extra?: Record<string, string>): Record<string, string> {
    const token = tokenStorage.getAccessToken();
    const headers: Record<string, string> = {
      ...API_CONFIG.headers,
      ...(extra || {}),
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = this.buildHeaders(options.headers as Record<string, string>);

    try {
      const response = await fetch(url, { ...options, headers });

      if (response.status === 401) {
        tokenStorage.clearAll();
        this.onUnauthorized?.();
        return { data: null as any, status: 401, message: 'Unauthorized', success: false };
      }

      const data = await response.json();

      if (!response.ok) {
        return {
          data: null as any,
          status: response.status,
          message: data.message || `HTTP error ${response.status}`,
          success: false,
        };
      }

      return { data, status: response.status, success: true };
    } catch (error: any) {
      return {
        data: null as any,
        status: 0,
        message: error.message || 'Network error',
        success: false,
      };
    }
  }

  get<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', headers });
  }

  post<T>(endpoint: string, body: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body: JSON.stringify(body), headers });
  }

  put<T>(endpoint: string, body: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PUT', body: JSON.stringify(body), headers });
  }

  delete<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE', headers });
  }
}

export const apiClient = new ApiClient();
