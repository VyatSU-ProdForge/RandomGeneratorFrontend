import type { IHttpClient } from '@core/interfaces/http-client';
import { API_CONFIG } from '@core/config';
import axios from 'axios';
import type {
  Lottery,
  LotteryListResponse,
  GetLotteriesRequest,
  UpdateLotteryRequest,
  RegisterInLotteryRequest,
  RegisterInLotteryResponse,
  CalculateLotteryWinnersRequest,
  CalculateLotteryWinnersResponse,
  UserLotteryResults,
} from './interfaces';

export * from './interfaces';

interface ApiLotteryListResponse {
  data: LotteryListResponse;
  statusCode: number;
}

interface ApiLotteryResponse {
  data: Lottery;
  statusCode: number;
}

export class LotteryRepository {
  private _route: string = '/api/lottery/v1';

  constructor(private httpClient: IHttpClient) {}

  async getLotteries(params?: GetLotteriesRequest): Promise<LotteryListResponse> {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.organizatorId) queryParams.append('organizatorId', params.organizatorId.toString());

    const queryString = queryParams.toString();
    const endpoint = queryString ? `?${queryString}` : '';

    const response = await this.httpClient.get<ApiLotteryListResponse>(
      `${this._route}${endpoint}`,
      { timeout: API_CONFIG.TIMEOUTS.DEFAULT }
    );
    
    // Сервер возвращает { data: { data: [...], pagination: {...} }, statusCode: 200 }
    // Извлекаем вложенный data
    return response.data;
  }

  async getLotteryById(id: number): Promise<Lottery> {
    const endpoint = `/${id}`;
    
    const response = await this.httpClient.get<ApiLotteryResponse>(
      `${this._route}${endpoint}`,
      { timeout: API_CONFIG.TIMEOUTS.DEFAULT }
    );
    
    // Сервер возвращает { data: {...}, statusCode: 200 }
    return response.data;
  }

  async updateLottery(id: number, data: UpdateLotteryRequest): Promise<Lottery> {
    const formData = new FormData();
    
    if (data.name) formData.append('name', data.name);
    if (data.description) formData.append('description', data.description);
    if (data.startAt) formData.append('startAt', data.startAt);
    if (data.endAt) formData.append('endAt', data.endAt);
    if (data.barrelCount) formData.append('barrelCount', data.barrelCount.toString());
    if (data.barrelLimit) formData.append('barrelLimit', data.barrelLimit.toString());
    if (data.amount) formData.append('amount', data.amount.toString());
    if (data.file) formData.append('file', data.file);

    const endpoint = `/${id}`;
    
    const response = await this.httpClient.patch<ApiLotteryResponse>(
      `${this._route}${endpoint}`,
      formData,
      { timeout: API_CONFIG.TIMEOUTS.DEFAULT }
    );

    return response.data;
  }

  async registerInLottery(data: RegisterInLotteryRequest): Promise<RegisterInLotteryResponse> {
    const formData = new FormData();
    
    formData.append('file', data.file);
    formData.append('lotteryId', data.lotteryId.toString());
    
    // Отправляем массив как JSON-строку
    formData.append('barrelsNumber', JSON.stringify(data.barrelsNumber));

    // Используем нативный axios напрямую для правильной работы с FormData
    const token = localStorage.getItem('auth_token'); // Правильный ключ токена
    const baseURL = 'http://91.186.196.211:3001';
    
    try {
      const response = await axios.post(
        `${baseURL}${this._route}/register`,
        formData,
        {
          headers: {
            ...(token ? { 'Authorization': `JWT ${token}` } : {}),
            // НЕ устанавливаем Content-Type - axios сделает это автоматически
          },
          timeout: API_CONFIG.TIMEOUTS.DEFAULT
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Ошибка регистрации:', error.response?.data || error.message);
      throw error;
    }
  }

  async calculateLotteryWinners(data: CalculateLotteryWinnersRequest): Promise<CalculateLotteryWinnersResponse> {
    const response = await this.httpClient.post<CalculateLotteryWinnersResponse>(
      `${this._route}/calculateLotteryWinners`,
      data,
      { timeout: API_CONFIG.TIMEOUTS.DEFAULT }
    );

    return response;
  }

  async getUserLotteryResults(lotteryId: number): Promise<UserLotteryResults> {
    const endpoint = `/${lotteryId}/getUserLotteryResults`;
    
    const response = await this.httpClient.get<{ data: UserLotteryResults; statusCode: number }>(
      `${this._route}${endpoint}`,
      { timeout: API_CONFIG.TIMEOUTS.DEFAULT }
    );
    
    return response.data;
  }
}

