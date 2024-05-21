import { IDelayProps } from './delay.types';

const delay = <T>({ ms = 2000, data }: IDelayProps<T>): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

export default delay;
