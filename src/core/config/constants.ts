// Global Constants
// Глобальные константы приложения (только инфраструктурные)

import { ENV } from './env';

// API Configuration
export const API_CONFIG = {
  BASE_URL: ENV.API_URL,
  TIMEOUT: 30000, // 30 секунд
  RETRY_ATTEMPTS: 3,
} as const;

// Breakpoints (синхронизированы с SCSS)
export const BREAKPOINTS = {
  MOBILE: 320,
  TABLET: 768,
  DESKTOP: 1280,
  WIDE: 1920,
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
} as const;

// Routes будут в src/app/navigation/routes.ts

