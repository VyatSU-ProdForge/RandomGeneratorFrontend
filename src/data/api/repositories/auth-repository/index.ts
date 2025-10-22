import type { IHttpClient } from "@core/interfaces/http-client";
import { API_CONFIG } from "@core/config";

import type {
	AuthRepository,
	AuthResponse,
	RegistrationRequest,
	LoginRequest,
} from "./interfaces";

export class ApiAuthRepository implements AuthRepository {
	private _route: string = '/api/auth/v1';

	constructor(private httpClient: IHttpClient) {}

	async registration(registrationRequest: RegistrationRequest): Promise<AuthResponse> {
		const endpoint = "/registration";

		const response = await this.httpClient.post<AuthResponse>(
			`${this._route}${endpoint}`,
			registrationRequest,
			{ timeout: API_CONFIG.TIMEOUTS.DEFAULT }
		);

		return response;
	}

	async login(loginRequest: LoginRequest): Promise<AuthResponse> {
		const endpoint = "/login";
		console.log(`${API_CONFIG.BASE_URL}${this._route}${endpoint}`)
		const response = await this.httpClient.post<AuthResponse>(
			`${this._route}${endpoint}`,
			loginRequest,
			{ timeout: API_CONFIG.TIMEOUTS.DEFAULT }
		);
		
		console.log(`${response}`)
		return response;
	}
}

export type { AuthRepository, RegistrationRequest, LoginRequest, AuthResponse } from './interfaces';