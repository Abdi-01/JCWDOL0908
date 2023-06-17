import { configureStore } from "@reduxjs/toolkit";
import AdminReducer from "../feature/admin/slice/AdminSlice";
import AdminLogInReducer from "../feature/admin_auth/slice/AdminLogInSlice";

export default configureStore({
  reducer: {
    admin: AdminReducer,
    adminLogin: AdminLogInReducer,
  },
});
