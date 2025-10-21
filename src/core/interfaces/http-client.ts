// HTTP Client Interface
// Абстракция для HTTP клиента

export interface IHttpClient {
  get<T>(url: string, config?: IRequestConfig): Promise<IHttpResponse<T>>;
  post<T>(url: string, data?: unknown, config?: IRequestConfig): Promise<IHttpResponse<T>>;
  put<T>(url: string, data?: unknown, config?: IRequestConfig): Promise<IHttpResponse<T>>;
  patch<T>(url: string, data?: unknown, config?: IRequestConfig): Promise<IHttpResponse<T>>;
  delete<T>(url: string, config?: IRequestConfig): Promise<IHttpResponse<T>>;
}

export interface IRequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  timeout?: number;
  signal?: AbortSignal;
}

export interface IHttpResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface IHttpError {
  message: string;
  status?: number;
  statusText?: string;
  data?: unknown;
}

