import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    data: [],
  },
  reducers: {
    addFormElements: (state, action) => {
      state.data = [...state.data, action.payload];
    },
    removeFormElement: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    addUploadedElements: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { addFormElements, removeFormElement, addUploadedElements } =
  formSlice.actions;
export default formSlice.reducer;
