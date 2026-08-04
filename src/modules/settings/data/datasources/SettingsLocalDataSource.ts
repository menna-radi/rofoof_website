import { STORAGE_KEYS } from '@/core/constants/appConstants';

export interface ISettingsLocalDataSource {
  getTheme(): string | null;
  setTheme(theme: string): void;
  getLanguage(): string | null;
  setLanguage(lang: string): void;
}

export class SettingsLocalDataSourceImpl implements ISettingsLocalDataSource {
  getTheme(): string | null {
    try { return localStorage.getItem(STORAGE_KEYS.THEME_MODE); } catch { return null; }
  }

  setTheme(theme: string): void {
    try { localStorage.setItem(STORAGE_KEYS.THEME_MODE, theme); } catch {}
  }

  getLanguage(): string | null {
    try { return localStorage.getItem(STORAGE_KEYS.LANGUAGE); } catch { return null; }
  }

  setLanguage(lang: string): void {
    try { localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang); } catch {}
  }
}

export const settingsLocalDataSource = new SettingsLocalDataSourceImpl();
