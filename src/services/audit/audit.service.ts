import type { AuditResult } from '@/core/entities/audit';
import type { AuditRepository, AuditRequest } from '@/data/api/repositories/audit-repository';

export class AuditService {
	constructor(
		private auditRepository: AuditRepository,
	) {}

	async getAuditService(auditRequest: AuditRequest): Promise<AuditResult> {
		const response = await this.auditRepository.getAuditResult(auditRequest);
		
		return response;
	}
}
