import { createSlice } from "@reduxjs/toolkit";

// Sample customer data
// const customerData = [
//   {
//     customerCode: "C001",
//     name: "Nguyen Thi B",
//     phone: "0123456781",
//     room: "B301",
//     balance: "2,000,000",
//     role: "Patient",
//   },
//   {
//     customerCode: "C002",
//     name: "Tran Thi C",
//     phone: "0123456782",
//     room: "B302",
//     balance: "1,500,000",
//     role: "Patient",
//   },
//   {
//     customerCode: "",
//     name: "Nguyễn Văn A",
//     phone: "0123456781",
//     room: "A301",
//     balance: "2,000,000",
//     role: "Admin",
//   },
//   {
//     customerCode: "67890",
//     name: "Tien",
//     phone: "0123456781",
//     room: "B312321301",
//     balance: "2,000,000",
//     role: "Patient",
//   },
// ];

const initialState = {
  login: false,
  username: null,
  role: null,
  phone: null,
  room: null,
  balance: null,
  customerCode: null,
  name: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginWithUsername: (state, action) => {
      const { username, phone, room, balance, role, name } = action.payload;
      Object.assign(state, {
        login: true,
        username,
        phone,
        room,
        balance,
        role,
        name,
        customerCode: null,
      });
    },

    loginWithCustomerCode: (state, action) => {
      const { customerCode, customerData } = action.payload;
      const customer = customerData.find(
        (cust) => cust.customerCode === customerCode
      );

      if (customer) {
        Object.assign(state, {
          login: true,
          customerCode: customer.customerCode,
          phone: customer.phone,
          room: customer.room,
          balance: customer.balance,
          name: customer.name,
          role: customer.role,
          username: null, // Clear username when logging in with customerCode
        });
      } else {
        console.error("Customer code not found");
        state.login = false; // Ensure login is false if no customer matches
      }
    },

    logout: (state) => {
      Object.assign(state, {
        login: false,
        username: null,
        role: null,
        phone: null,
        room: null,
        balance: null,
        customerCode: null,
        name: null,
      });
    },
  },
});

export const { loginWithUsername, loginWithCustomerCode, logout } =
  userSlice.actions;

// Selector to retrieve the entire user state
export const selectUser = (state) => ({
  login: state.user.login,
  username: state.user.username,
  role: state.user.role,
  phone: state.user.phone,
  room: state.user.room,
  balance: state.user.balance,
  customerCode: state.user.customerCode,
  name: state.user.name,
});

export default userSlice.reducer;
