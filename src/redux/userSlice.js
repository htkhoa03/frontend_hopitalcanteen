import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    info: null,
    loading: false,
    error: null,
    userId:null,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setUserInfo(state, action) {
      state.info = action.payload;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setUserInfo, setError } = userSlice.actions;

// Async actions
export const fetchMyInfo = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get("/users/my-info");
    dispatch(setUserInfo(response.data.data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const createUser = (userData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await axios.post("/users/create-user", userData);
    alert("User created successfully!");
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateUser = (id, userData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await axios.put(`/users/${id}/update-user`, userData);
    alert("User updated successfully!");
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const selectUserInfo = (state) => state.user.info;
export const selectLoading = (state) => state.user.loading;

export default userSlice.reducer;
