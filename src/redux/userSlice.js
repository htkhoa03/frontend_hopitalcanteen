import { createSlice } from "@reduxjs/toolkit";

// Sample customer data (can be replaced with real data or an API call)
const customerData = [
  {
    customerCode: "C001",
    name: "Nguyen Thi B",
    phone: "0123456781",
    room: "B301",
    balance: "2,000,000",
    role: "Patient",
  },
  {
    customerCode: "C002",
    name: "Tran Thi C",
    phone: "0123456782",
    room: "B302",
    balance: "1,500,000",
    role: "Patient",
  },
];

const initialState = {
  login: false,
  username: "Nhân viên bán hàng",
  role: "Admin",
  phone: "034712321",
  room: "A301",
  balance: "5,000,000",
  customerCode: "",
  name: "Nguyễn Văn A",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginWithUsername: (state, action) => {
      const { username, phone, room, balance, role, name } = action.payload;
      state.login = true;
      state.username = username;
      state.phone = phone;
      state.room = room;
      state.balance = balance;
      state.role = role;
      state.name = name;
      state.customerCode = "";
    },

    loginWithCustomerCode: (state, action) => {
      const customerCode = action.payload.customerCode;
      const customer = customerData.find(
        (cust) => cust.customerCode === customerCode
      );

      if (customer) {
        state.login = true;
        state.customerCode = customer.customerCode;
        state.phone = customer.phone;
        state.room = customer.room;
        state.balance = customer.balance;
        state.name = customer.name;
        state.role = customer.role;
        state.username = ""; // Ensure no username is set when logging in with customerCode
      } else {
        console.error("Customer code not found");
        state.login = false; // If customer not found, set login to false
      }
    },

    logout: (state) => {
      state.login = false;
      Object.assign(state, {
        username: "",
        role: "",
        phone: "",
        room: "",
        balance: "",
        customerCode: "",
        name: "",
      });
    },
  },
});

export const { loginWithUsername, loginWithCustomerCode, logout } =
  userSlice.actions;

export default userSlice.reducer;
