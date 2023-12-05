import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "trailer",
  initialState: null,
  reducers: {
    addTrailer: (state, action) => {
      return action.payload;
    },
    removeTrailer: (state, action) => {
      return null;
    },
  },
});

export const { addTrailer, removeTrailer } = cardSlice.actions;

export default cardSlice.reducer;