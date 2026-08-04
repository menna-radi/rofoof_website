export interface AuthUserEntity {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarInitials: string;
  avatarBg: string;
  lastLogin: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthSession {
  user: AuthUserEntity;
  accessToken: string;
}
