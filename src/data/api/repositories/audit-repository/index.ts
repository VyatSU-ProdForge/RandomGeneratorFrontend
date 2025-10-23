import type { IHttpClient } from "@core/interfaces/http-client";
import { API_CONFIG } from "@core/config";

import type {
	AuditRepository,
	AuditRequest,
	AuditResponse
} from "./interfaces";

export class ApiAuditRepository implements AuditRepository {
	private _route: string = '/api/lottery/v1'; // Замена

	constructor(private httpClient: IHttpClient) {}

	async getAuditResult(request: AuditRequest): Promise<AuditResponse> {
		const endpoint = "/calculate-verification";

		const response = await this.httpClient.post<AuditResponse>(
			`${this._route}${endpoint}`,
			request,
			{ timeout: 5000 }
		);
		
		return response;
	}
}

export type { AuditRepository, AuditRequest, AuditResponse } from './interfaces';