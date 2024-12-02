import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import languageSlice from "./languageSlice";

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["login", "username", "user"],
};

const languagePersistConfig = {
  key: "language",
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userSlice);
const persistedLanguageReducer = persistReducer(
  languagePersistConfig,
  languageSlice
);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    language: persistedLanguageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
