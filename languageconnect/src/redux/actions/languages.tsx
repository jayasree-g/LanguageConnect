import fetchHandler, { FetchOptions } from "../../common-utils/fetchHandler";
import { languageTypes } from "../types";
import { config } from "./config";

const TRANSLATE_API_KEY = config.TRANSLATE_API_KEY;

export const translate = (
  payload: { text: string; key: string },
  successHandler?: (response: any) => void,
  errorHandler?: (response: any) => void
) => {
  const fetchOptions: FetchOptions = {
    url: "https://opentranslator.p.rapidapi.com/translate",
    method: "POST",
    actionType: languageTypes.ACTION.TRANSLATE,
    additionalHeaders: {
      "X-RapidAPI-Key": TRANSLATE_API_KEY,
      "X-RapidAPI-Host": "opentranslator.p.rapidapi.com",
    },
    body: JSON.stringify({
      text: payload.text,
      target: payload.key,
    }),
  };

  return fetchHandler(fetchOptions, successHandler, errorHandler);
};

export const getResponse = (
  payload: { text: string },
  successHandler?: (response: any) => void,
  errorHandler?: (response: any) => void
) => {
  const fetchOptions: FetchOptions = {
    method: "POST",
    url: "http://localhost:8000/chat",
    body: JSON.stringify({
      text: payload.text,
    }),
    additionalHeaders: {
      "X-RapidAPI-Key": TRANSLATE_API_KEY,
      "X-RapidAPI-Host": "ai-chatbot.p.rapidapi.com",
    },
    actionType: languageTypes.ACTION.GET_RESPONSE,
  };

  return fetchHandler(fetchOptions, successHandler, errorHandler);
};
