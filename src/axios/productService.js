import axios from "./axios";

export const getAllProductsService = async (params) => {
  // Make sure all query parameters are properly included
  const { page, size, sortBy, sortDirection } = params;
  return axios.get("/products", {
    params: {
      page,
      size,
      sortBy,
      sortDirection
    }
  });
};

export const getProductsByCategoryService = async (category, page, size, sortBy, sortDirection) => {
  return axios.get(`/products/category/${category}/all`, {
    params: {
      page,
      size,
      sortBy,
      sortDirection
    }
  });
};