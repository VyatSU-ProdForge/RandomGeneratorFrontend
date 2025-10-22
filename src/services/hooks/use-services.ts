import { useMemo } from 'react';

import { AxiosHttpClient } from '@/data/api/http/axios-http-client';
import { ApiAuthRepository } from '@/data/api/repositories/auth-repository';
import { API_CONFIG } from '@/core/config';

import { AuthService } from '@/services/auth';
import { useStorages } from './use-storages';

export function useServices() {
	const { authStorage } = useStorages();

	const httpClient = useMemo(() => new AxiosHttpClient("http://91.186.196.211:3001", () => authStorage.getToken()), [authStorage]);
	const authRepository = useMemo(() => new ApiAuthRepository(httpClient), [httpClient]);
	const authService = useMemo(() => new AuthService(authRepository, authStorage), [authRepository, authStorage]);

	return { authService };
}


