import { settingsRepository } from '../../data/repositories/SettingsRepositoryImpl';
import { SettingsEntity } from '../entities/SettingsEntity';

/** GetSettingsUseCase — loads all app settings */
export class GetSettingsUseCase {
  async execute(): Promise<SettingsEntity> {
    return settingsRepository.getSettings();
  }
}

export const getSettingsUseCase = new GetSettingsUseCase();
