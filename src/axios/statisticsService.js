import axios from "./axios"

export const getStatisticsDashboard = async ()=>{
    const res = await axios.get("/statistics/dashboard");
    return res.data.data;
}