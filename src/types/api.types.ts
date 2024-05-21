/* eslint-disable no-unused-vars */
import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

export interface ApiResponse<T = unknown, E = unknown> {
  data: T | null;
  message?: string;
  error?: E | null | undefined;
}

export interface IApiPagination<T = unknown> {
  count: number;
  next: number;
  previous: number;
  results: T;
}

export interface ILookup {
  id: number;
  label: string;
}

export type IQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData
> = Omit<
  UseQueryOptions<TQueryFnData, TError, TData>,
  'onSucess' | 'queryKey' | 'onError'
> & {
  onSucess: (res: TData) => void;
  onError: (res: unknown) => void;
  queryKey: QueryKey;
};

export type IMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
> = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>;
