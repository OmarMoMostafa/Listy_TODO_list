import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  txt: "",
  show: false,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      return (state = action.payload);
    },
  },
});

// // Action creators are generated for each case reducer function
export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
