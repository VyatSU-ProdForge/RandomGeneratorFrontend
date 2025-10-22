import { createContext, useContext, type ReactNode } from 'react';
import { useServices } from '@/services/hooks/use-services';

type ServicesContextType = ReturnType<typeof useServices>;

const ServicesContext = createContext<ServicesContextType | null>(null);

export function ServicesProvider({ children }: { children: ReactNode }) {
	const services = useServices();
	
	return (
		<ServicesContext.Provider value={services}>
			{children}
		</ServicesContext.Provider>
	);
}

export function useServicesContext() {
	const context = useContext(ServicesContext);
	if (!context) {
		throw new Error('useServicesContext must be used within a ServicesProvider');
	}
	return context;
}
