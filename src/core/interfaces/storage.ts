// Storage Interface
// Абстракция для работы с хранилищами (localStorage, cookies, etc.)

export interface IStorageAdapter {
  getItem<T>(key: string): T | null;
  setItem<T>(key: string, value: T): void;
  removeItem(key: string): void;
  clear(): void;
  hasItem(key: string): boolean;
}

