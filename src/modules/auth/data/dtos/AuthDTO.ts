/**
 * DTOs for Auth API responses — never exposed to UI.
 */
export interface LoginResponseDTO {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: AuthUserDTO;
}

export interface AuthUserDTO {
  id: string;
  full_name: string;
  email: string;
  role: string;
  avatar_url?: string;
  last_login: string;
}
