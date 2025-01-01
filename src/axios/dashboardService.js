import axios from "./axios";

export const getDashboard = async (params) => {
  const {startDate, endDate} = params
  const res = await axios.get("/statistics/dashboard",{
    params: {
      startDate,
      endDate
    }
  });
  return res.data.data
};