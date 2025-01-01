import axios from "./axios";


//get balance info
export const getBalance = async () =>{
    const res= await axios.get("/balance/my-balance");
    return res.data.data;
}

// get balance by id
export const getBalanceById = async (patientId) =>{
    const res= await axios.get(`/balance/${patientId}`);
    return res.data.data;
}

//nạp tiền bệnh nhân
export const topUpBalance = async (patientId) =>{
    const res = await axios.put(`/balance/${patientId}/top-up`);
    return res.data.data
}

// rút tiền bệnh nhân 
export const withDrawBalance = async (patientId) =>{
    const res = await axios.put(`/balance/${patientId}/withdraw`);
    return res.data.data
}