import type { IStorage} from '@/core/interfaces/storage';

export class LocalStorageAdapter implements IStorage {
	get<T = string>(key: string): T | null {
		const item = localStorage.getItem(key);
		
		if (!item) {
			return null;
		}

		try {
			return JSON.parse(item) as T;
		} catch {
			return item as unknown as T;
		}
	}

	set<T = string>(key: string, value: T): void {
		const stringValue = typeof value === 'string'
		 ? value
		 : JSON.stringify(value);

		localStorage.setItem(key, stringValue);
	}

	remove(key: string): void {
		localStorage.removeItem(key);
	}

	clear(): void {
		localStorage.clear();
	}

	has(key: string): boolean {
		return localStorage.getItem(key) !== null;
	}

	keys(): string[] {
		const keys: string[] = [];
		
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
            
			if (key) {
                keys.push(key);  
            }
		}

		return keys;
	}

	length(): number {
		return localStorage.length;
	}
}
