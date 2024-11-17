import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
  username: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.login = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLogin } = userSlice.actions;

export default userSlice.reducer;
