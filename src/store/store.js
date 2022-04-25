import { configureStore } from "@reduxjs/toolkit";
import { reposSlice } from "./repoSlice";

const store = configureStore({
  reducer: {
    repos: reposSlice.reducer,
  },
});

export { store };
