import type { AuditResult } from '@/core/entities/audit';

export type AuditRequest = {
	lotteryId: number;
	seed: string;
	drandRandomness: string;
	playerEntropies: string[];
	barrelLimit: number;
	barrelCount: number;
}

export type AuditResponse = AuditResult;

export interface AuditRepository {
	getAuditResult(payload: AuditRequest): Promise<AuditResponse>;
}


