import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./moviesSlice";
import gptReducer from "./gptSlice";
import configReducer from "./configSlice";
import trailerReducer from "./cardSlice"

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies:movieReducer,
    gpt: gptReducer,
    config: configReducer,
    trailer : trailerReducer,
  },
});

export default appStore;