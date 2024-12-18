import axios from "./axios";

export const getAllCategoriesService = async () => {
  try {
    const response = await axios.get("/categories/all");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
