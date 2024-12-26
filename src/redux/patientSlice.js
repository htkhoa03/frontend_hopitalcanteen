import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
  patientId:null,
  cardNumber: null,
  fullName: null,
  email: null,
  phoneNumber: null,
  address: null,
  cart: null, // Thông tin giỏ hàng
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setPatientInfo: (state, action) => {
      const { cardNumber, fullName, email, phoneNumber, address, cart } = action.payload;
      Object.assign(state, {
        login: true,
        cardNumber,
        fullName,
        email,
        phoneNumber,
        address,
        cart,
      });
    },

    logout: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setPatientInfo, logout } = patientSlice.actions;

export const selectPatient = (state) => state.patient;

export default patientSlice.reducer;
