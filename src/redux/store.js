import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["login", "username", "user"],
};

const persistedUserReducer = persistReducer(userPersistConfig, userSlice);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
