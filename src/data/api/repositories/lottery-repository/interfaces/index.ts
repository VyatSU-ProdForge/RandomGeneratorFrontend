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
  status: 'draft' | 'inProgress' | 'finished';
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
  status?: 'draft' | 'inProgress' | 'finished';
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

export interface RegisterInLotteryRequest {
  lotteryId: number;
  barrelsNumber: number[];
  file: File;
}

export interface LotteryAssignment {
  userId: number;
  lotteryId: number;
  entropy: string;
  status: string;
  registeredAt: string;
}

export interface RegisterInLotteryResponse {
  message: string;
  assignment: LotteryAssignment;
  lottery: {
    id: number;
    name: string;
    startAt: string;
    endAt: string;
  };
}

export interface CalculateLotteryWinnersRequest {
  lotteryId: number;
  drandRandomness: string;
}

export interface LotteryWinner {
  userId: number;
  entropy: string;
  playerBarrels: number[];
  matchCount: number;
}

export interface LotteryResult {
  placement: number;
  userId: number;
  matchCount: number;
  status: string;
}

export interface CalculateLotteryWinnersResponse {
  message: string;
  lottery: {
    id: number;
    name: string;
    status: string;
  };
  calculation: {
    secretSeed: string;
    seedHash: string;
    drandRandomness: string;
    drandRound: number;
    finalSeed: string;
    winningBarrels: number[];
    totalParticipants: number;
    barrelLimit: number;
    barrelCount: number;
    playerEntropies: string[];
  };
  winners: LotteryWinner[];
  results: LotteryResult[];
  audit: {
    verification_url: string;
    can_verify: boolean;
    verification_data: any;
  };
}

export interface UserLotteryResults {
  lottery: {
    id: number;
    name: string;
    status: string;
    winningBarrels: number[];
    totalParticipants: number;
    winnersCount: number;
  };
  userResult: {
    userId: number;
    placement: number;
    isWinner: boolean;
    playerBarrels: number[];
    matchCount: number;
    entropy: string;
  };
  barrels: {
    player: number[];
    winning: number[];
    matched: number[];
  };
  topParticipants: Array<{
    userId: number;
    placement: number;
    matchCount: number;
    isWinner: boolean;
  }>;
  calculation: {
    secretSeed: string;
    seedHash: string;
    drandRandomness: string;
    drandRound: number;
    finalSeed: string;
    winningBarrels: number[];
    totalParticipants: number;
    barrelLimit: number;
    barrelCount: number;
    playerEntropies: string[];
  };
  verification: {
    entropy: string;
    secretSeed: string;
    drandRandomness: string;
    finalSeed: string;
    seedHash: string;
  };
  leaderboard: Array<{
    userId: number;
    placement: number;
    matchCount: number;
    status: string;
    isCurrentUser: boolean;
  }>;
  audit: {
    verification_url: string;
    can_verify: boolean;
    calculation: {
      secretSeed: string;
      seedHash: string;
      drandRandomness: string;
      finalSeed: string;
      winningBarrels: number[];
      totalParticipants: number;
      barrelLimit: number;
      barrelCount: number;
      playerEntropies: string[];
    };
    verification_data: {
      lotteryId: number;
      seed: string;
      drandRandomness: string;
      playerEntropies: string[];
      barrelLimit: number;
      barrelCount: number;
    };
  };
}

