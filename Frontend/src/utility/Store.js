import { configureStore } from "@reduxjs/toolkit";
import UserInfoSlice from "./Slice/UserInfoSlice";
import AllOrderList from "./Slice/AllOrdersSlice";
import AllAppointmentsSlice from "./Slice/AllAppointmentsSlice";

const store = configureStore({
  reducer: {
    UserInfo: UserInfoSlice,
    AllOrders: AllOrderList,
    AllAppointments: AllAppointmentsSlice,
  },
});

export default store;
