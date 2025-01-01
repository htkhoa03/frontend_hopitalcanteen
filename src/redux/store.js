import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";
import patientSlice from "./patientSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["login"],
};

const patientPersistConfig = {
  key: "patient",
  storage,
  whitelist: ["login", "cardNumber"],
};

const cartPersistConfig = {
  key: "cart",
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userSlice);
const persistedCartReducer = persistReducer(cartPersistConfig, cartSlice);
const persistedPatientReducer = persistReducer(
  patientPersistConfig,
  patientSlice
);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    patient: persistedPatientReducer,
    cart: persistedCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
