import type { RequestConfig } from "@/core/interfaces/httpClient.types";

export interface HttpClient {
	get<T>(url: string, config?: RequestConfig): Promise<T>;
	post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T>;
	patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T>;
	delete<T>(url: string, config?: RequestConfig): Promise<T>;
}