import type { User, AuthSession } from '@/core/entities/auth';
import type { IStorage } from '@/core/interfaces/storage';

export class AuthStorage {
	constructor(private storage: IStorage) {}

	// Token management
	setToken(token: string): void {
		this.storage.set('auth_token', token);
	}

	getToken(): string | null {
		return this.storage.get<string>('auth_token');
	}

	removeToken(): void {
		this.storage.remove('auth_token');
	}

	// User management
	setUser(user: User): void {
		this.storage.set('auth_user', user);
	}

	getUser(): User | null {
		return this.storage.get<User>('auth_user');
	}

	removeUser(): void {
		this.storage.remove('auth_user');
	}

	// Session management
	setSession(session: AuthSession): void {
		this.setToken(session.token);
		this.setUser(session.user);
	}

	getSession(): AuthSession | null {
		const token = this.getToken();
		const user = this.getUser();
		
		if (!token || !user) return null;
		
		return { token, user };
	}

	clearSession(): void {
		this.removeToken();
		this.removeUser();
	}

	// Auth state
	isAuthenticated(): boolean {
		return this.getToken() !== null && this.getUser() !== null;
	}
}
