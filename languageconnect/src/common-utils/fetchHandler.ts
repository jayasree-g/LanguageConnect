export interface FetchOptions {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  additionalHeaders?: { [key: string]: any };
  body?: any;
  actionType: string;
  params?: any;
}

const fetchHandler = (
  { url, method, body, actionType, additionalHeaders }: FetchOptions,
  successHandler?: (response: any, status?: number) => void,
  errorHandler?: (response: any, status?: number) => void
) => {
  return async (dispatch: any) => {
    let headers: { [key: string]: any } = {};

    headers["Accept"] = "application/json";
    headers["Content-Type"] = "application/json";

    if (
      process.env.NODE_ENV === "development" &&
      process.env.DEVELOPER_API_KEY
    ) {
      console.log(`[Time.Dev] [REDUX FETCH // DEV] [${method}] ${url}`);
      headers["Authorization"] = `Bearer ${process.env.DEVELOPER_API_KEY}`;
    }

    headers = { ...headers, ...additionalHeaders };

    const triggerSuccessHandler = (payload: any, status?: number) => {
      dispatch({ type: actionType, payload: payload });
      successHandler && successHandler(payload, status);
    };

    const triggerErrorHandler = (error: any, status?: number) => {
      dispatch({ type: actionType, payload: error });
      errorHandler && errorHandler(error, status);
    };

    const fetchData = async () => {
      try {
        const request = await fetch(url, {
          credentials: "include",
          method: method,
          body: body,
          headers: { ...headers },
        });

        const status = request.status;
        const response = await request.json();

        if (status && status > 399) {
          triggerErrorHandler(response, status);
        } else {
          triggerSuccessHandler(response, status);
        }

        return request;
      } catch (error) {
        const errorObj = {
          error: {
            statusCode: "FETCH_FAILED",
            message: `${error}`,
          },
        };
        triggerErrorHandler(errorObj);
      }
    };

    return {
      type: actionType,
      payload: await fetchData(),
    };
  };
};

export default fetchHandler;
