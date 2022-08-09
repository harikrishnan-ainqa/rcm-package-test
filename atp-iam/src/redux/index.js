import { configureStore } from "@reduxjs/toolkit";
import { rootReducer as reducer } from "atp-iam-binder";

export const store = configureStore({
  reducer,
});
