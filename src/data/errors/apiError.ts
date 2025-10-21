import type { BaseResponse } from "@/data/api/interfaces";

export class ApiError extends Error {
	public status?: number;
	public details?: BaseResponse;

	constructor(message: string, status?: number, details?: BaseResponse) {
		super(message);
		this.name = "ApiError";
		this.status = status;
		this.details = details;
	}
}