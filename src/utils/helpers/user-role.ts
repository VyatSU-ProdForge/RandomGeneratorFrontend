import { type User } from '@/core/entities/auth';

export function isAdmin(user: User | null): boolean {
  if (!user || !user.roles) return false;
  return user.roles.some(role => role.keyWord === 'admin');
}

export function getUserRole(user: User | null): 'admin' | 'user' | null {
  if (!user || !user.roles || user.roles.length === 0) return null;
  
  // Приоритет у роли admin
  if (user.roles.some(role => role.keyWord === 'admin')) {
    return 'admin';
  }
  
  return 'user';
}

