import { QueryKey, useQuery } from "@tanstack/react-query";
import { getContactsApi } from "./getContactsApi";
import { UseGetContactsApi } from "./getContactsApi.types";

export const GET_CONTACTS_QK: QueryKey = ["getContacts"];

// ===> Method: GET
export const useGetContactsApi: UseGetContactsApi = (props) => {
  return useQuery({
    queryKey: GET_CONTACTS_QK,
    queryFn: () => getContactsApi(),
    ...props,
  });
};
