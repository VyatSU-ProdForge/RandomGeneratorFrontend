import { useMemo } from 'react';

import { AxiosHttpClient } from '@/data/api/http/axios-http-client';
import { ApiAuthRepository } from '@/data/api/repositories/auth-repository';
import { LotteryRepository } from '@/data/api/repositories/lottery-repository';
import { API_CONFIG } from '@/core/config'
import { AuthService } from '@/services/auth';
import { LotteryService } from '@/services/lottery/lottery.service';
import { useStorages } from './use-storages';
import { ApiAlgorithmRepository } from '@/data/api/repositories/algorithm-repository';
import { AlgorithmService } from '../algorithm';
import { AuditService } from '../audit';
import { ApiAuditRepository } from '@/data/api/repositories/audit-repository';

export function useServices() {
	const { authStorage } = useStorages();

	const httpClient = useMemo(() => new AxiosHttpClient(API_CONFIG.BASE_URL, () => authStorage.getToken()), [authStorage]);

	const authRepository = useMemo(() => new ApiAuthRepository(httpClient), [httpClient]);
	const algorithmRepository = useMemo(() => new ApiAlgorithmRepository(httpClient), [httpClient]);
	const auditRepository = useMemo(() => new ApiAuditRepository(httpClient), [httpClient]);
	
	const authService = useMemo(() => new AuthService(authRepository, authStorage), [authRepository, authStorage]);
		const algorithmService = useMemo(() => new AlgorithmService(algorithmRepository), [algorithmRepository]);
	const auditService = useMemo(() => new AuditService(auditRepository), [auditRepository]);

	const lotteryRepository = useMemo(() => new LotteryRepository(httpClient), [httpClient]);
	const lotteryService = useMemo(() => new LotteryService(lotteryRepository), [lotteryRepository]);

	return { authService, lotteryService, algorithmService, auditService};
}


