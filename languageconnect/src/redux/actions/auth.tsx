import fetchHandler, { FetchOptions } from "../../common-utils/fetchHandler";
import { authTypes } from "../types";

export const auth = (
  successHandler?: (response: any) => void,
  errorHandler?: (response: any) => void
) => {
  const fetchOptions: FetchOptions = {
    url: "http://localhost:8000/auth",
    method: "GET",
    actionType: authTypes.ACTION.AUTH,
  };

  return fetchHandler(fetchOptions, successHandler, errorHandler);
};
