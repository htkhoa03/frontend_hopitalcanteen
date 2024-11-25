import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "vi", // Ngôn ngữ mặc định là tiếng Việt
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload; // Cập nhật ngôn ngữ
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
