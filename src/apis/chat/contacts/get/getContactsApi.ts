import { chatService } from "@/apis/services/services";
import responseHandler from "@/utils/responseHandler/responseHandler";
import { getResponseApiMapper as mapper } from "./getContactsApi.mapper";
import { messagesMockGet as mock } from "./getContactsApi.mock";
import { GetContactsApi, GetContactsApiResponse } from "./getContactsApi.types";

export const getContactsApi: GetContactsApi = async () => {
  const response = await responseHandler<GetContactsApiResponse>({
    callback: async () => await chatService.get("/contacts"),
    mock,
    isMock: true,
  });

  return mapper.response(response);
};
