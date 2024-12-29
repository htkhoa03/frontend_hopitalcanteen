
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDataPatients } from "../axios/patientService"; 

export const fetchPatient = createAsyncThunk(
  "patients/fetchPatient",
  async (patientId) => {
    const response = await getDataPatients(patientId); 
    return response.data.data; 
  }
);

const patientsSlice = createSlice({
  name: "patients",
  initialState: {
    patient: null, 
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.patient = action.payload; // Lưu dữ liệu JSON vào state
      })
      .addCase(fetchPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default patientsSlice.reducer;
