import axios from "axios";

const API_ADMIN_WAREHOUSE = process.env.REACT_APP_ADMIN_WAREHOUSE_URL;
const axiosInstance = axios.create({ baseURL: API_ADMIN_WAREHOUSE });

export const getWarehouses = async (page) => {
  const TOKEN = localStorage.getItem("admin_token");
  try {
    const response = await axiosInstance.get("/", { headers: { Authorization: `Bearer ${TOKEN}` } });
    const result = response.data.result;
    return result;
  } catch (error) {
    console.log(error);
  }
};
