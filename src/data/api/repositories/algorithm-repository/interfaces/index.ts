import type { AlgorithmData } from '@/core/entities/algortihm';

export type RegistrationRequest = {
	email: string;
	firstName: string;
	lastName: string;
	middleName: string;
	password: string;
};


export type AlgorithmResponse = {
	data: AlgorithmData;
	statusCode: number
};

export interface AlgorithmRepository {
	getAlgorithm(): Promise<AlgorithmResponse>
};


