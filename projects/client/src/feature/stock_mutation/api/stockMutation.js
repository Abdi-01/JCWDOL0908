import { axiosInstance } from "../slice/StockMutationSlice";

export const createNewMutationRequest = async (data) => {
  try {
    const response = await axiosInstance.post("/", data);
    return response.data;
  } catch (error) {
    console.log(error.response?.data);
    return error.response?.data;
  }
};
