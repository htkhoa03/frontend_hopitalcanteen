import axios from "./axios";

export const getAllProductsService = () => {
  return axios.get("/products");
};
