import { IApiResponse } from './api-response';

export interface IListApiResponse<T = any> {
  items: T[];
  pagination: IPagination;
}

export interface IPagination {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}
