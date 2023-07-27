import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { languageTypes } from "../types";

interface languageState {
  TypingItems?: any;
}

const initialState: languageState = {};

export default createReducer(initialState, (builder) => {
  builder.addCase(
    languageTypes.ACTION.TRANSLATE,
    (state, action: PayloadAction<any>) => {
      if (action.payload.data)
        return { ...state, TypingItems: action.payload.data };
      return { ...state, error: action.payload.message };
    }
  );
});
