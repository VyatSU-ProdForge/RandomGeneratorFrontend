import { useState, useEffect, useCallback } from "react";
import type { AuthService } from '@/services/auth/auth.service';
import type { User, AuthSession } from '@/core/entities/auth';
import type { RegistrationRequest, LoginRequest } from '@/data/api/repositories/auth-repository';

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    session: AuthSession | null;
    isLoading: boolean;
    error: string | null;
}

interface AuthActions {
    login: (loginRequest: LoginRequest) => Promise<void>;
    register: (registrationRequest: RegistrationRequest) => Promise<void>;
    clearError: () => void;
}

export function useAuth(authService: AuthService): AuthState & AuthActions {
    const [state, setState] = useState<AuthState>({
        isAuthenticated: false,
        user: null,
        token: null,
        session: null,
        isLoading: false,
        error: null
    });

    // Initialize auth state on mount
    useEffect(() => {
        const initializeAuth = () => {
            const isAuth = authService.isAuthenticated();
            const user = authService.getCurrentUser();
            const token = authService.getToken();
            const session = authService.getSession();

            setState(prev => ({
                ...prev,
                isAuthenticated: isAuth,
                user,
                token,
                session
            }));
        };

        initializeAuth();
    }, [authService]);

    const login = useCallback(async (loginRequest: LoginRequest) => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        
        try {
            const session = await authService.login(loginRequest);
            
            setState(prev => ({
                ...prev,
                isAuthenticated: true,
                user: session.user,
                token: session.token,
                session,
                isLoading: false,
                error: null
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: error instanceof Error ? error.message : 'Login failed'
            }));
        }
    }, [authService]);

    const register = useCallback(async (registrationRequest: RegistrationRequest) => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        
        try {
            const session = await authService.registration(registrationRequest);
            
            setState(prev => ({
                ...prev,
                isAuthenticated: true,
                user: session.user,
                token: session.token,
                session,
                isLoading: false,
                error: null
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: error instanceof Error ? error.message : 'Registration failed'
            }));
        }
    }, [authService]);

    const clearError = useCallback(() => {
        setState(prev => ({ ...prev, error: null }));
    }, []);

    return {
        ...state,
        login,
        register,
        clearError
    };
}