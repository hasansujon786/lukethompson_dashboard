import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./features/auth/authSlice";
import { uiReducer } from "./slices/uiSlice";
import { api } from "./features/api/apiSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Only persist auth state
};

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  [api.reducerPath]: api.reducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);