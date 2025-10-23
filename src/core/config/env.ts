// Environment Variables Configuration
// Валидация и типизация environment переменных

interface IEnvConfig {
  readonly API_URL: string;
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
}

function validateEnv(): IEnvConfig {
  const apiUrl = import.meta.env.VITE_API_URL;
  const mode = import.meta.env.MODE || 'development';
  const isDev = import.meta.env.DEV;
  const isProd = import.meta.env.PROD;

  return {
    API_URL: apiUrl,
    MODE: mode,
    DEV: isDev,
    PROD: isProd,
  };
}

export const ENV: IEnvConfig = validateEnv();

