import type { AlgorithmData } from '@/core/entities/algortihm';
import type { AlgorithmRepository } from '@/data/api/repositories/algorithm-repository';

export class AlgorithmService {
	constructor(
		private algorithmRepository: AlgorithmRepository,
	) {}

	async getAlgorithm(): Promise<AlgorithmData> {
		const response = await this.algorithmRepository.getAlgorithm();
		
		return response.data;
	}
}
