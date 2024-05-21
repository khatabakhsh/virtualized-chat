import { ApiResponse } from "@/types/api.types";
import { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type ContactMessage = {
  id: number;
  avatar: string;
  name: string;
  message: string;
};

export type Contact = {
  id: number;
  avatar: string;
  messages: ContactMessage[];
  name: string;
};

// ===> Response - Return API call
export type GetContactsApiResponse = ApiResponse<Contact[]>;

// ===> Response - Return Function
export type GetContactsApiReturn = ApiResponse<Contact[]>;

// ===> Function
export type GetContactsApi = () => Promise<GetContactsApiReturn>;

// Hook
export type UseGetContactsApi = (
  props?: UseQueryOptions<
    GetContactsApiReturn,
    AxiosError<ApiResponse>,
    GetContactsApiReturn
  >
) => UseQueryResult<GetContactsApiReturn, AxiosError<ApiResponse>>;
