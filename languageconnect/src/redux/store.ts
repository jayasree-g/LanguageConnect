import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { createLogger } from "redux-logger";

import allReducers from "./reducers";

// Combining all the reducers
const rootReducer = combineReducers(allReducers);

// Store Configuration
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV === "development") {
      // Redux Logger Middleware
      const logger = createLogger({
        collapsed: true,
      });
      return getDefaultMiddleware().concat(logger);
    }
    return getDefaultMiddleware();
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
