import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { authTypes } from "../types";

interface authState {
  user?: any;
}

const initialState: authState = {};

export default createReducer(initialState, (builder) => {
  builder.addCase(
    authTypes.ACTION.AUTH,
    (state, action: PayloadAction<any>) => {
      if (action.payload.data) return { ...state, user: action.payload.data };
      return { ...state, error: action.payload.message };
    }
  );
});
