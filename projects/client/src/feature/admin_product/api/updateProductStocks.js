import { axiosInstanceStockUpdate } from "../slice/ProductSlice";

export const getProductsStocks = async (offset, limit, page, name_search, id_category, id_warehouse) => {
  name_search = name_search ? name_search : "null";
  id_category = id_category ? id_category : "null";
  id_warehouse = id_warehouse ? id_warehouse : "null";
  try {
    const response = await axiosInstanceStockUpdate.get(
      `?offset=${offset}&limit=${limit}&page=${page}&name_search=${name_search}&id_category=${id_category}&id_warehouse=${id_warehouse}`,
    );
    return response.data;
  } catch (error) {
    console.log(error.response?.data);
    return error.response?.data;
  }
};
