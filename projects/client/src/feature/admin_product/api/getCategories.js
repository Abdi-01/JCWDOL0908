import { axiosInstance } from "../slice/CategorySlice";

export const getCategories = async (page) => {
  try {
    let response;
    if (page) {
      response = await axiosInstance(`?limit=4&page=${page}&offset=4`);
    } else {
      response = await axiosInstance("/");
    }
    const result = response.data.result;
    return result;
  } catch (error) {
    console.log(error);
  }
};
