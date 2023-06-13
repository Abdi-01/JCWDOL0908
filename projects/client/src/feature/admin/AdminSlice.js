import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_ADMIN = process.env.REACT_APP_ADMIN_URL;

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    singleUser: {},
    allAdmin: [],
    singleAdminWarehouse: {},
  },
  reducers: {
    setSingleUser: (state, action) => {
      state.singleUser = action.payload;
    },
    setAllAdmin: (state, action) => {
      state.allAdmin = action.payload;
    },
    setSingleAdminWarehouse: (state, action) => {
      state.singleAdminWarehouse = { ...state.singleAdminWarehouse, ...action.payload };
    },
  },
});

const axiosInstance = axios.create({ baseURL: API_ADMIN });
export default adminSlice.reducer;
export const { setSingleUser, setAllAdmin, setSingleAdminWarehouse, setLoggedInAdminData } = adminSlice.actions;

export function getAllUserData(page) {
  return async (dispatch) => {
    const TOKEN = localStorage.getItem("admin_token");
    try {
      const response = await axiosInstance.get(`/users?limit=8&page=${page}&offset=8`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      const data = response.data.result;
      return data;
    } catch (error) {
      alert(error.response.data.message);
    }
  };
}

export function getSingleUser(id, isAdmin, idRole) {
  return async (dispatch) => {
    const TOKEN = localStorage.getItem("admin_token");
    try {
      const response = await axiosInstance.get(`/user/${id}?isAdmin=${isAdmin}&idRole=${idRole}`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      dispatch(setSingleUser(response.data.result));
    } catch (error) {
      alert(error.response.data.message);
    }
  };
}

export function getAllAdmin(page) {
  return async (dispatch) => {
    const TOKEN = localStorage.getItem("admin_token");
    try {
      const response = await axiosInstance.get(`?limit=7&page=${page}&offset=7`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      dispatch(setAllAdmin(response.data.result));
    } catch (error) {
      alert(error.response.data.message);
    }
  };
}

export function getSingleWarehouseAdmin(id) {
  return async (dispatch) => {
    const TOKEN = localStorage.getItem("admin_token");
    try {
      const response = await axiosInstance.get(`/admin-warehouse/${id}`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      dispatch(setSingleAdminWarehouse(response.data.result));
    } catch (error) {
      alert(error.response.data.message);
    }
  };
}

export const getWarehouseCities = async () => {
  try {
    const TOKEN = localStorage.getItem("admin_token");
    const response = await axiosInstance.get(`/warehouse/cities`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    return response.data.result;
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const getWarehouses = async (id_city) => {
  try {
    const TOKEN = localStorage.getItem("admin_token");
    const response = await axiosInstance.get(`/warehouse/city/${id_city}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    return response.data.result;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const updateAdminWarehouse = async (data) => {
  try {
    const TOKEN = localStorage.getItem("admin_token");
    const response = await axiosInstance.patch(
      "/",
      { ...data },
      {
        headers: { Authorization: `Bearer ${TOKEN}` },
      },
    );
    return response.data;
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const deleteUserData = async (id_user) => {
  try {
    const TOKEN = localStorage.getItem("admin_token");
    const response = await axiosInstance.patch(
      `/user/${id_user}`,
      {},
      {
        headers: { Authorization: `Bearer ${TOKEN}` },
      },
    );
    return response.data;
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const createNewAdmin = async (data) => {
  try {
    const TOKEN = localStorage.getItem("admin_token");
    const response = await axiosInstance.post(
      "/",
      { ...data },
      {
        headers: { Authorization: `Bearer ${TOKEN}` },
      },
    );
    return response.data;
  } catch (error) {
    alert(error.response.data.message);
  }
};
