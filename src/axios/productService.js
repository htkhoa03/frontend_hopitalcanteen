import axios from "./axios";

export const getAllProductsService = () => {
  return axios.get("/products");
};
export const getProductsByCategoryService = async (category, page = 0, size = 12, sortOrder = 'asc') => {
  try {
    const response = await axios.get(`/products/category/${category}/all`, {
      params: {
        page,
        size,
        sortBy: 'price', 
        sortDirection: sortOrder,
      },
    });
    return response.data.data.content; 
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};