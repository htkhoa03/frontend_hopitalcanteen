import { createSlice } from "@reduxjs/toolkit";
import { dataUser, employees } from "../utils/data";

const initialState = {
  login: false,
  username: null,
  role: null,
  phone: null,
  department: null,
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
      const { username, password } = action.payload;
      const user = employees.find(
        (emp) => emp.username === username && emp.password === password
      );

      if (user) {
        Object.assign(state, {
          login: true,
          username: user.username,
          role: user.role,
          phone: user.phone,
          department: user.department,
          name: user.name,
          room: null,
          balance: null,
          customerCode: null,
        });
      } else {
        console.error("Invalid username or password.");
        state.login = false;
      }
    },

    loginWithCustomerCode: (state, action) => {
      const { customerCode } = action.payload;
      const customer = dataUser.find(
        (cust) => cust.customerCode === customerCode
      );

      if (customer) {
        Object.assign(state, {
          login: true,
          customerCode: customer.customerCode,
          role: null,
          phone: customer.phone,
          room: customer.room,
          balance: customer.balance,
          name: customer.name,
          username: null,
        });
      } else {
        console.error("Customer code not found");
        state.login = false;
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

export const selectUser = (state) => state.user;

export default userSlice.reducer;
