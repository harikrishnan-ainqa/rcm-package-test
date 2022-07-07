import { configureStore } from "@reduxjs/toolkit";
import { rootReducer as reducer } from "atp-login-binder";

export const store = configureStore({
  reducer
});
