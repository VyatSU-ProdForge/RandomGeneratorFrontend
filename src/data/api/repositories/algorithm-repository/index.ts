import type { IHttpClient } from "@core/interfaces/http-client";
import { API_CONFIG } from "@core/config";

import type {
	AlgorithmRepository,
	AlgorithmResponse,
} from "./interfaces";

export class ApiAlgorithmRepository implements AlgorithmRepository {
	private _route: string = '/api/story/v1';

	constructor(private httpClient: IHttpClient) {}

	async getAlgorithm(): Promise<AlgorithmResponse> {
		const endpoint = "/algorithm";

		const response = await this.httpClient.get<AlgorithmResponse>(
			`${this._route}${endpoint}`,
			{ timeout: API_CONFIG.TIMEOUTS.DEFAULT }
		);

		return response;
	}

}

export type { AlgorithmRepository, AlgorithmResponse } from './interfaces';