import type { AuthSession } from '@/core/entities/auth';

export type RegistrationRequest = {
	email: string;
	firstName: string;
	lastName: string;
	middleName: string;
	password: string;
};

export type LoginRequest = {
	email: string;
	password: string;
};

export type AuthResponse = AuthSession;

export interface AuthRepository {
	registration(payload: RegistrationRequest): Promise<AuthResponse>;
	login(payload: LoginRequest): Promise<AuthResponse>;
}


