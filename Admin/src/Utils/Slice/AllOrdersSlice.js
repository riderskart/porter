import { createSlice } from "@reduxjs/toolkit";

const AllOrderList = createSlice({
  name: "AllOrderList",
  initialState: {
    allOrders: [],
  },
  reducers: {
    addAllOrders: (state, action) => {
      state.allOrders = action.payload;
    },
    clearAllOrderList: (state, action) => {
      state.allOrders = [];
    },
  },
});

export const { addAllOrders, clearAllOrderList } = AllOrderList.actions;

export default AllOrderList.reducer;
