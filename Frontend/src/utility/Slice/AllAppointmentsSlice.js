import { createSlice } from "@reduxjs/toolkit";

const AllAppointments = createSlice({
  name: "AllAppointments",
  initialState: {
    allAppointments: null,
  },
  reducers: {
    addAllAppointment: (state, action) => {
      state.allAppointments = action.payload;
    },
    clearAllAppointments: (state, action) => {
      state.allAppointments = null;
    },
  },
});

export const { addAllAppointment, clearAllAppointments } =
  AllAppointments.actions;

export default AllAppointments.reducer;
