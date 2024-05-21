export const setInCookie = (key: string, value: unknown): void => {
  document.cookie = `${key}=${JSON.stringify(value)}`;
};
