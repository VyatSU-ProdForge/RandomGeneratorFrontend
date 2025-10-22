import { createContext, useContext, type ReactNode } from 'react';
import { useStorages } from '@/services/hooks/use-storages';

type StoragesContextType = ReturnType<typeof useStorages>;

const StoragesContext = createContext<StoragesContextType | null>(null);

export function StoragesProvider({ children }: { children: ReactNode }) {
	const storages = useStorages();
	
	return (
		<StoragesContext.Provider value={storages}>
			{children}
		</StoragesContext.Provider>
	);
}

export function useStoragesContext() {
	const context = useContext(StoragesContext);
	if (!context) {
		throw new Error('useStoragesContext must be used within a StoragesProvider');
	}
	return context;
}
