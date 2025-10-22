export interface LotteryImage {
  attachmentKey: string;
  url: string;
  expiresIn: number;
}

export interface LotteryOrganizator {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface LotteryMetadata {
  barrelCount: number;
  barrelLimit: number;
}

export interface Lottery {
  id: number;
  name: string;
  description: string;
  image: LotteryImage;
  amount: number;
  startAt: string; // ISO string
  endAt: string; // ISO string
  organizator: LotteryOrganizator;
  metadata: LotteryMetadata;
  status: 'draft' | 'active' | 'completed';
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  seedHash: string;
  drandRound: number;
}

export interface LotteryPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface LotteryListResponse {
  data: Lottery[];
  pagination: LotteryPagination;
}

export interface GetLotteriesRequest {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'draft' | 'active' | 'completed';
  organizatorId?: number;
}

export interface UpdateLotteryRequest {
  name?: string;
  description?: string;
  startAt?: string;
  endAt?: string;
  barrelCount?: number;
  barrelLimit?: number;
  amount?: number;
  file?: File;
}

