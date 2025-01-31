import { configureStore } from "@reduxjs/toolkit";
import UserInfoSlice from "./Slice/UserInfoSlice";
import AllOrderList from "./Slice/AllOrdersSlice";

const store = configureStore({
  reducer: {
    UserInfo: UserInfoSlice,
    AllOrders: AllOrderList,
  },
});

export default store;
