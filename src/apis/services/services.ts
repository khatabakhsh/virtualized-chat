import { Api, createAxiosInstance } from './create/createService';
import { SERVICE_TYPE } from './create/createService.types';

// Chat Service
export const chatService = new Api(
  createAxiosInstance(
    process.env.NEXT_PUBLIC_VENDOR_BASE_URL || '',
    SERVICE_TYPE.CHAT
  )
);
