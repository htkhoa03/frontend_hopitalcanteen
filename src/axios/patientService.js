import axios from "./axios";

export const getDataPatients = () => {
  return axios.get("/patients/my-info");
};
export const getAllPatientService = async (page = 0, size = 10, sortBy = "fullName", sortDirection = "asc") => {
  const res = await axios.get("/patients/all", {
    params: { page, size, sortBy, sortDirection },
  });
  return res.data.data;
};


// add patient
const addPatient = async (newPatient) => {
  try {
    const response = await axios.post("/patients/add", newPatient);
    return response.data.data.content;
  } catch (error) {
    console.error("Error adding patient:", error);
    throw error;
  }
};

// update patients
export const updatePatientAPI = async (patientId, updatePatient) => {
  try {
    const response = await axios.put(`/patients/${patientId}/update`, updatePatient);
    return response.data.data.content; 
  } catch (error) {
    console.error("Error updating patient:", error);
    throw error; 
  }
};

export const deletePatientAPI = async (patientId, deletePatient) => {
  try {
    const response = await axios.delete(`/patients/${patientId}/delete`, deletePatient);
    return response.data.data; 
  } catch (error) {
    console.error("Error delete patient:", error);
    throw error; 
  }
};


export default addPatient;

