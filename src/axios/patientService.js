import axios from "./axios";

export const getDataPatients = () => {
  return axios.get("/patients/my-info");
};
export const getAllPatientService = async () => {
  const res = await axios.get("/patients/all");
  return res.data.data;
};
