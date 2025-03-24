import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FiltersState {
  selectedFilters: string[];
}

const initialState: FiltersState = {
  selectedFilters: [],
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<string>) => {
      if (state.selectedFilters.includes(action.payload)) {
        state.selectedFilters.splice(state.selectedFilters.indexOf(action.payload), 1); // toggle if exists
        return;
      }
      state.selectedFilters.push(action.payload);
    },

    addSingleFilter: (state, action: PayloadAction<string>) => {
      state.selectedFilters = []; // clear all filters
      state.selectedFilters.push(action.payload);
    },

    removeFilter: (state, action: PayloadAction<string>) => {
      state.selectedFilters = state.selectedFilters.filter((filter) => filter !== action.payload);
    },

    clearFilters: (state) => {
      state.selectedFilters = [];
    }
  },
});

export const { addFilter, addSingleFilter, removeFilter, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;
