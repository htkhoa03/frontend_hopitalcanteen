import { createSlice} from "@reduxjs/toolkit";



// Slice
const patientSlice = createSlice({
  name: "patient",
  initialState: {
    patient: null,
    patientBalance: null, 
    loading: false,
    error: null,
  },
  reducers: {
    setBalance(state, action) {
      state.balance = action.payload;
    },
    //patient
    setPatients(state,action) {
      console.log(action.payload)
      state.patient = action.payload;
    },
    removePatient(state, action){
      const patientId = action.payload;
    
      // Kiểm tra xem itemId có tồn tại không
      if (state.patient.some((pa) => pa.patientId === patientId)) {
        state.patient = state.patient.filter((pa) => pa.patientId !== patientId);
      } else {
        console.warn(`Item with ID ${patientId} not found in cart.`);
      }
    }
  },
  
});

export const { setBalance, removePatient, setPatients } =
  patientSlice.actions;

export default patientSlice.reducer;
