import { AxiosResponse } from 'axios';

/* eslint-disable no-unused-vars */
export enum SERVICE_MODE {
  MOCK = 'mock',
  MAIN = 'main',
}

export interface IResponseHandlerProps<T> {
  mock: T;
  isMock?: boolean;
  callback: () => Promise<AxiosResponse<T>>;
}
