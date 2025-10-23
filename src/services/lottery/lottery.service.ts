import type { 
  LotteryRepository, 
  GetLotteriesRequest, 
  LotteryListResponse,
  Lottery,
  UpdateLotteryRequest,
  RegisterInLotteryRequest,
  RegisterInLotteryResponse,
  CalculateLotteryWinnersRequest,
  CalculateLotteryWinnersResponse,
  UserLotteryResults 
} from '@/data/api/repositories/lottery-repository';

export class LotteryService {
  constructor(private lotteryRepository: LotteryRepository) {}

  async getLotteries(params?: GetLotteriesRequest): Promise<LotteryListResponse> {
    return this.lotteryRepository.getLotteries(params);
  }

  async getLotteryById(id: number): Promise<Lottery> {
    return this.lotteryRepository.getLotteryById(id);
  }

  async updateLottery(id: number, data: UpdateLotteryRequest): Promise<Lottery> {
    return this.lotteryRepository.updateLottery(id, data);
  }

  async registerInLottery(data: RegisterInLotteryRequest): Promise<RegisterInLotteryResponse> {
    return this.lotteryRepository.registerInLottery(data);
  }

  async calculateLotteryWinners(data: CalculateLotteryWinnersRequest): Promise<CalculateLotteryWinnersResponse> {
    return this.lotteryRepository.calculateLotteryWinners(data);
  }

  async getUserLotteryResults(lotteryId: number): Promise<UserLotteryResults> {
    return this.lotteryRepository.getUserLotteryResults(lotteryId);
  }

  // Получение drandRandomness из Drand API
  async getDrandRandomness(round: number): Promise<string> {
    try {
      const response = await fetch(`https://drand.cloudflare.com/public/${round}`);
      const data = await response.json();
      return data.randomness;
    } catch (error) {
      console.error('Ошибка получения drandRandomness:', error);
      throw error;
    }
  }
}

