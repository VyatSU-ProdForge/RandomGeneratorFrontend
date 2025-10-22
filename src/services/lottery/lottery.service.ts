import type { 
  LotteryRepository, 
  GetLotteriesRequest, 
  LotteryListResponse,
  Lottery,
  UpdateLotteryRequest 
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
}

