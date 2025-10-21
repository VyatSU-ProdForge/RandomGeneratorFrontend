export type CookieOptions = {
	maxAge?: number;        // В секундах
	expires?: Date;         // Дата экспирации
	path?: string;          // Путь (по умолчанию '/')
	domain?: string;        // Домен
	secure?: boolean;       // Только HTTPS
	sameSite?: 'Strict' | 'Lax' | 'None'; // Защита от CSRF
}