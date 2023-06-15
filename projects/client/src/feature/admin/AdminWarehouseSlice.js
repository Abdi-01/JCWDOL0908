import axios from "axios";

const API_ADMIN_WAREHOUSE = process.env.REACT_APP_ADMIN_WAREHOUSE_URL;
const axiosInstance = axios.create({ baseURL: API_ADMIN_WAREHOUSE });

export const getWarehouses = async (page) => {
  const TOKEN = localStorage.getItem("admin_token");
  try {
    const response = await axiosInstance.get(`?limit=9&page=${page}&offset=9`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    const result = response.data.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const deleteWarehouse = async (id_warehouse) => {
  const TOKEN = localStorage.getItem("admin_token");
  try {
    const result = await axiosInstance.patch(
      `/delete/${id_warehouse}`,
      {},
      { headers: { Authorization: `Bearer ${TOKEN}` } },
    );
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getProvinces = async () => {
  try {
    const response = await axiosInstance.get("/provinces");
    return response.data.result;
  } catch (error) {
    alert(error.response.data.result.message);
  }
};

export const getCitiesByProvinces = async (id_province) => {
  try {
    const response = await axiosInstance.get(`/provinces/cities?id_province=${id_province}`);
    return response.data.result;
  } catch (error) {
    alert(error.response.data.result.message);
  }
};

export const createNewWarehouse = async (data) => {
  const TOKEN = localStorage.getItem("admin_token");
  try {
    const response = await axiosInstance.post("new", { ...data }, { headers: { Authorization: `Bearer ${TOKEN}` } });
    return response;
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const editWarehouse = async (data) => {
  const TOKEN = localStorage.getItem("admin_token");
  try {
    const response = await axiosInstance.patch("/", { ...data }, { headers: { Authorization: `Bearer ${TOKEN}` } });
    return response;
  } catch (error) {
    alert(error.response.data.message);
  }
};
