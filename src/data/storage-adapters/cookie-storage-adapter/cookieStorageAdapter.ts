import type { IStorage } from '@core/interfaces/storage';
import type { CookieOptions } from '@/data/storage-adapters/cookie-storage-adapter/cookieOptions';

export class CookieStorage implements IStorage {
	get<T = string>(key: string): T | null {
		const cookies = document.cookie.split(';');

		for (const cookie of cookies) {
			const [cookieKey, ...cookieValueParts] = cookie.trim().split('=');
			const cookieValue = cookieValueParts.join('=');
			
			if (cookieKey === key) {
				try {
					return JSON.parse(decodeURIComponent(cookieValue)) as T;
				} catch {
					return decodeURIComponent(cookieValue) as unknown as T;
				}
			}
		}

		return null;
	}

	set<T = string>(key: string, value: T, options: CookieOptions = {}): void {
		const stringValue = typeof value === 'string' 
		 ? value 
		 : JSON.stringify(value);

		let cookie = `${key}=${encodeURIComponent(stringValue)}`;

		if (options.maxAge) cookie += `; max-age=${options.maxAge}`;
		if (options.expires) cookie += `; expires=${options.expires.toUTCString()}`;
		if (options.path) cookie += `; path=${options.path}`;
		if (options.domain) cookie += `; domain=${options.domain}`;
		if (options.secure) cookie += '; secure';
		if (options.sameSite) cookie += `; samesite=${options.sameSite}`;

		document.cookie = cookie;
	}

	remove(key: string, options: Omit<CookieOptions, 'maxAge' | 'expires'> = {}): void {
		this.set(key, '', { ...options, maxAge: -1 });
	}

	clear(): void {
		const cookies = document.cookie.split(';');

		for (const cookie of cookies) {
			const key = cookie.split('=')[0].trim();
			this.remove(key);
		}
	}

	has(key: string): boolean {
		return this.get(key) !== null;
	}

	keys(): string[] {
		return document.cookie
			.split(';')
			.map(cookie => cookie.split('=')[0].trim())
			.filter(Boolean);
	}

	length(): number {
		return this.keys().length;
	}
}