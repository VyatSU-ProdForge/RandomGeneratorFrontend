import type { RequestConfig } from "@core/interfaces/http-client/http-Client.types"

export interface IHttpClient {
	get<T>(url: string, config?: RequestConfig): Promise<T>;
	post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T>;
	patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T>;
	delete<T>(url: string, config?: RequestConfig): Promise<T>;
}