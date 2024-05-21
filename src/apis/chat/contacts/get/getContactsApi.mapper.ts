import {
  GetContactsApiResponse,
  GetContactsApiReturn,
} from "./getContactsApi.types";

// Response
const getResponse = (
  response: GetContactsApiResponse
): GetContactsApiReturn => {
  const data = response.data;
  const error = response.error;

  if (data) {
    return {
      data,
      error,
    };
  }

  return {
    data: null,
    error,
  };
};

export const getResponseApiMapper = {
  response: getResponse,
};
