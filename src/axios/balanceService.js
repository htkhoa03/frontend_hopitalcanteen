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
export const topUpBalanceAPI = async (patientId,balance) =>{
    const res = await axios.put(`/balance/${patientId}/top-up`,balance);
    return res.data.data.content;
}

// rút tiền bệnh nhân 
export const withDrawBalanceAPI = async (patientId,balance) =>{
    const res = await axios.put(`/balance/${patientId}/withdraw`, balance);
    return res.data.data.content;
}