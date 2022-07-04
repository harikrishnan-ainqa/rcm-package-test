import { configureStore } from "@reduxjs/toolkit";
import { rootReducer as reducer } from "frequencyscreen_v_dbinder";

export const store = configureStore({
  reducer
});
