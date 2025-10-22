import { useMemo } from 'react';

import { LocalStorageAdapter } from '@/data/storage-adapters/local-storage-adapter';
import { AuthStorage } from '@/services/auth';

export function useStorages() {
	const localStorageAdapter = useMemo(() => new LocalStorageAdapter(), []);
	const authStorage = useMemo(() => new AuthStorage(localStorageAdapter), [localStorageAdapter]);

	return { authStorage };
}


