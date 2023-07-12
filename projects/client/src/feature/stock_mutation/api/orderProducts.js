import { axiosInstance } from "../slice/OrderProductSlice";

export const getOrderProducts = async (dataInput) => {
  try {
    const { offset, limit, page, id_warehouse, status_order } = dataInput;
    const response = await axiosInstance.get(
      `?offset=${offset}&limit=${limit}&page=${page}&id_warehouse=${id_warehouse}&status_order=${status_order}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
