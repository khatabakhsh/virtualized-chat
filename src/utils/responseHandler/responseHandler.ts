import delay from '../delay/delay';
import { IResponseHandlerProps, SERVICE_MODE } from './responseHandler.type';

const responseHandler = async <T>({
  callback,
  mock,
  isMock = false,
}: IResponseHandlerProps<T>): Promise<T> => {
  const serviceMode = process.env.NEXT_PUBLIC_SERVICE_MODE as SERVICE_MODE;

  if (serviceMode === SERVICE_MODE.MOCK || isMock)
    return await delay<T>({ data: mock });

  return (await callback())?.data;
};

export default responseHandler;
