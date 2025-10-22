import { useMemo } from 'react';

import { AxiosHttpClient } from '@/data/api/http/axios-http-client';
import { ApiAuthRepository } from '@/data/api/repositories/auth-repository';
import { LotteryRepository } from '@/data/api/repositories/lottery-repository';

import { AuthService } from '@/services/auth';
import { LotteryService } from '@/services/lottery/lottery.service';
import { useStorages } from './use-storages';

export function useServices() {
	const { authStorage } = useStorages();

	const httpClient = useMemo(() => new AxiosHttpClient("http://91.186.196.211:3001", () => authStorage.getToken()), [authStorage]);
	const authRepository = useMemo(() => new ApiAuthRepository(httpClient), [httpClient]);
	const authService = useMemo(() => new AuthService(authRepository, authStorage), [authRepository, authStorage]);
	
	const lotteryRepository = useMemo(() => new LotteryRepository(httpClient), [httpClient]);
	const lotteryService = useMemo(() => new LotteryService(lotteryRepository), [lotteryRepository]);

	return { authService, lotteryService };
}


