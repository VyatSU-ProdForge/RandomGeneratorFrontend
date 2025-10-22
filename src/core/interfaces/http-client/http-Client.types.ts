export type RequestConfig = {
	headers?: Record<string, string>;
	timeout?: number;
	params?: Record<string, string | number>;
}