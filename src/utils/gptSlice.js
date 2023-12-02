import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieResults: null,
    movieNames: null,
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovieResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
    removeGptMovieResult: (state) =>{
      state.movieResults = null;
      state.movieNames = null;
      state.showGptSearch = false;
    },
    removeOnToggleResult: (state,action) =>{
      state.movieResults = null;
      state.movieNames = null;
    }
  },
});

export const { toggleGptSearchView, addGptMovieResult,removeGptMovieResult,removeOnToggleResult } = gptSlice.actions;

export default gptSlice.reducer;