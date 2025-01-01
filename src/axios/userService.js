import axios from "./axios";

export const getDataUsers = () =>{
    return axios.get("/users/my-info");
}
export const getAllUsers = async (page=0, size=12, sortBy="id", sortDirection="asc") =>{
    const res = await axios.get("/users/all",{
        params:{page, size, sortBy, sortDirection}
    })
    return res.data.data.content;
}