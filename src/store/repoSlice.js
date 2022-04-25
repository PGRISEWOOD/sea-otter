/* eslint-disable no-param-reassign */ // RTK uses immer ti mutate draft state
import { createSlice } from "@reduxjs/toolkit";

const reposSlice = createSlice({
  name: "repos",
  initialState: {
    items: [],
    totalCount: 0,
    incompleteResults: false,
  },
  reducers: {
    appendRepos: (state, action) => {
      const {
        incomplete_results: incompleteResults,
        total_count: totalCount,
        items,
      } = action.payload;

      state.items = [...state.items, ...items];
      state.totalCount = totalCount;
      state.incompleteResults = incompleteResults;
    },
    setRepos: (state, action) => {
      const {
        incomplete_results: incompleteResults,
        total_count: totalCount,
        items,
      } = action.payload;

      state.items = items;
      state.totalCount = totalCount;
      state.incompleteResults = incompleteResults;
    },
  },
});

// Action creators are generated for each case reducer function
const { appendRepos, setRepos } = reposSlice.actions;

export { reposSlice, appendRepos, setRepos };
