import fetchHandler, { FetchOptions } from "../../common-utils/fetchHandler";
import { languageTypes } from "../types";

const OPEN_AI_API_KEY = "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";
const TRANSLATE_API_KEY = "32748087e4msha5690ce89dbd6b6p188a7ajsn5a8f50c1f3aa";

export const translate = (
  payload: { text: string },
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
      target: "en",
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
    url: "http://localhost:8000/openAi",
    method: "POST",
    actionType: languageTypes.ACTION.TRANSLATE,
    additionalHeaders: {
      Authorization: `Bearer ${OPEN_AI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: payload.text }],
      temperature: 0.7,
    }),
  };

  return fetchHandler(fetchOptions, successHandler, errorHandler);
};
