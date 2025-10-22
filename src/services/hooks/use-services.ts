import { useMemo } from 'react';

import { AxiosHttpClient } from '@/data/api/http/axios-http-client';
import { ApiAuthRepository } from '@/data/api/repositories/auth-repository';
import { API_CONFIG } from '@/core/config';

import { AuthService } from '@/services/auth';
import { useStorages } from './use-storages';

export function useServices() {
	const { authStorage } = useStorages();

	const httpClient = useMemo(() => new AxiosHttpClient(API_CONFIG.BASE_URL, () => authStorage.getToken()), [authStorage]);
	const authRepository = useMemo(() => new ApiAuthRepository(httpClient), [httpClient]);
	const authService = useMemo(() => new AuthService(authRepository, authStorage), [authRepository, authStorage]);

	return { authService };
}


