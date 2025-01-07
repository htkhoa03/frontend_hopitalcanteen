import axios from "./axios"

export const getStatisticsDashboard = async ()=>{
    const res = await axios.get("/statistics/dashboard");
    return res.data.data;
}

export const getOverviewStatistics = async () => {
    try {
      const response = await axios.get("/statistics/sale-product");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching statistics data", error);
      throw error;
    }
  };


  export const getStatisticsByUser = async () => {
    try {
      const response = await axios.get("/statistics//staff-sale-statistics");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching statistics data", error);
      throw error;
    }
  };