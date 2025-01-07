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
export const addUser = async (userData) =>{
    const res = await axios.post("/users/create-user", userData);
    return res.data.data.content;
}
// update 
export const updateUserAPI = async (userId, updateUser) =>{
    const res = await axios.put(`/users/${userId}/update-user`,updateUser);
    return res.data.data.content;
}
// delete
export const deleteUserAPI = async (userId, deleteUser) =>{
    const res = await axios.delete(`/users/${userId}/delete-user`, deleteUser);
    return res.data.data.content;
}