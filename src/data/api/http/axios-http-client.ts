import axios, { 
	AxiosError, AxiosHeaders
} from 'axios';

import type { 
	AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig 
} from 'axios';

import { ApiError } from '@/data/errors';
import type { BaseResponse } from '@/data/api/interfaces';
import type { IHttpClient, RequestConfig } from "@/core/interfaces/http-client/index";
import { API_CONFIG } from '@/core/config/constants';

export type TokenProvider = () => string | null;

export class AxiosHttpClient implements IHttpClient {
	private client: AxiosInstance;
  
	constructor(baseURL: string, private getToken?: TokenProvider) {
		this.client = axios.create({
			baseURL,
			timeout: API_CONFIG.TIMEOUTS.DEFAULT,
		});

		this.client.interceptors.request.use(this._requestInterceptor);
		this.client.interceptors.response.use(
			(response) => response,
			this._errorResponseInterceptor
		);
	}
  
	async get<T>(url: string, config?: RequestConfig): Promise<T> {
		const response = await this.client.get<T>(url, this._transformConfig(config));

		return response.data;
	}
  
	async post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
		const response = await this.client.post<T>(url, data, this._transformConfig(config));
    	
		return response.data;
	}

	async patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
		const response = await this.client.patch<T>(url, data, this._transformConfig(config));
		
		return response.data;
	}

	async delete<T>(url: string, config?: RequestConfig): Promise<T> {
		const response = await this.client.delete<T>(url, this._transformConfig(config));
		
		return response.data;
	}

	private _transformConfig(config?: RequestConfig): AxiosRequestConfig {
		return {
			headers: config?.headers,
			timeout: config?.timeout,
			params: config?.params,
		};
	}

	private _requestInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
		const token = this.getToken?.();

		if (!config.headers) {
			config.headers = new AxiosHeaders();
		}

		if (token) {
			config.headers.set?.("Authorization", `JWT ${token}`);
		}
		
		if (!config.headers.has('Content-Type')) {
			config.headers.set?.("Content-Type", API_CONFIG.DEFAULT_CONTENT_TYPE);
		}

		return config;
	}

	private _errorResponseInterceptor(error: AxiosError<BaseResponse>) {
		if (error?.config?.url?.includes('logout')) {
			return;
		}

		if (!error.response) {
			throw new ApiError("Сервер недоступен");
		}
		
		const status = error.response.status;
		const details = error.response.data;

		throw new ApiError(`Ошибка API: ${status}`, status, details);
	}
}
  