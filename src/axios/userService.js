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
// add 
export const addUser = async () =>{
    const res = await axios.post("/users/create-user");
    return res.data.data;
}
// update 
export const updateUser = async (userId) =>{
    const res = await axios.put(`/users/${userId}/update-user`);
    return res.data.data;
}
// delete
export const deleteUser = async (userId) =>{
    const res = await axios.delete(`/users/${userId}/delete-user`);
    return res.data.data;
}