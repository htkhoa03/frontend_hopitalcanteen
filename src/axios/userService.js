import axios from "./axios";

export const getDataUsers = () =>{
    return axios.get("/users/my-info");
}
export const getAllUsers = async () =>{
    const res = await axios.get("/users/all")
    return res.data.data;
}