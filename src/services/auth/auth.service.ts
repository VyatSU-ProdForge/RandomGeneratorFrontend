import type { AuthRepository, RegistrationRequest, LoginRequest } from '@/data/api/repositories/auth-repository';
import type { AuthStorage } from './auth.storage';
import type { User, AuthSession } from '@/core/entities/auth';

export class AuthService {
	constructor(
		private authRepository: AuthRepository,
		private authStorage: AuthStorage
	) {}

	async registration(registrationRequest: RegistrationRequest): Promise<AuthSession> {
		const response = await this.authRepository.registration(registrationRequest);
		
		// Store session data
		this.authStorage.setSession(response);
		
		return response;
	}

	async login(loginRequest: LoginRequest): Promise<AuthSession> {
		const response = await this.authRepository.login(loginRequest);

		this.authStorage.setSession(response);
		
		return response;
	}

	async logout(): Promise<void> {
		// Clear local session
		this.authStorage.clearSession();
		
		// Note: If you need to call server logout endpoint, add it here
		// await this.authRepository.logout();
	}

	// Get current user
	getCurrentUser(): User | null {
		return this.authStorage.getUser();
	}

	// Get current token
	getToken(): string | null {
		return this.authStorage.getToken();
	}

	// Get current session
	getSession(): AuthSession | null {
		return this.authStorage.getSession();
	}

	// Check if user is authenticated
	isAuthenticated(): boolean {
		return this.authStorage.isAuthenticated();
	}

	// Check if user has specific role
	hasRole(roleKey: string): boolean {
		const user = this.getCurrentUser();
		if (!user) return false;
		
		return user.roles.some(role => role.keyWord === roleKey);
	}

	// Check if user has any of the specified roles
	hasAnyRole(roleKeys: string[]): boolean {
		const user = this.getCurrentUser();
		if (!user) return false;
		
		return user.roles.some(role => roleKeys.includes(role.keyWord));
	}
}
