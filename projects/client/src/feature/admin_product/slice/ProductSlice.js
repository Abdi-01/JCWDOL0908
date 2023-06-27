import axios from "axios";
const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const axiosInstance = axios.create({ baseURL: `${REACT_APP_API_BASE_URL}/product` });
export const axiosInstanceStockUpdate = axios.create({
  baseURL: `${REACT_APP_API_BASE_URL}/product/products-stocks`,
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
});
