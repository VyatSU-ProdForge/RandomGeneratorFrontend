import { createContext, useContext, type ReactNode } from 'react';
import { useAuth } from '@/services/hooks/use-auth';
import { useServicesContext } from './use-services-context';

type AuthContextType = ReturnType<typeof useAuth>;

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const { authService } = useServicesContext();
	const auth = useAuth(authService);
	
	return (
		<AuthContext.Provider value={auth}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuthContext must be used within an AuthProvider');
	}
	return context;
}
