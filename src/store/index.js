import { combineReducers, configureStore } from "@reduxjs/toolkit";
import formSlice from "./formSlice";

const rootReducer = combineReducers({
  form: formSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
