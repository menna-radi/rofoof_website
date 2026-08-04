import { AuthUserDTO, LoginResponseDTO } from '../dtos/AuthDTO';
import { AuthSession, AuthUserEntity } from '../../domain/entities/AuthEntity';

/**
 * AuthMapper — Converts API DTOs → Domain Entities.
 * Ensures DTOs never leak into the UI layer.
 */
export class AuthMapper {
  static toUserEntity(dto: AuthUserDTO): AuthUserEntity {
    const initials = dto.full_name
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase();

    return {
      id: dto.id,
      name: dto.full_name,
      email: dto.email,
      role: dto.role,
      avatarInitials: initials,
      avatarBg: 'bg-[#384E85]',
      lastLogin: dto.last_login,
    };
  }

  static toSession(dto: LoginResponseDTO): AuthSession {
    return {
      user: AuthMapper.toUserEntity(dto.user),
      accessToken: dto.access_token,
    };
  }
}
