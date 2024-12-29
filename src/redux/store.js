import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";
import patientSlice from "./patientsSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["login", "username", "user"],
};

const patientPersistConfig = {
  key: "patient",
  storage,
  whilelist: ["login", "cardNumber"],
};
const cartPersistConfig = {
  key: "cart",
  storage,
  whilelist: ["cartId"],
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
