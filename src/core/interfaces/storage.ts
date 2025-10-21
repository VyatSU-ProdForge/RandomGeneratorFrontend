export interface Storage {
	get<T = string>(key: string): T | null;
	set<T = string>(key: string, value: T): void;
	remove(key: string): void;
	clear(): void;

	has(key: string): boolean;
	keys(): string[];
	length(): number;
}