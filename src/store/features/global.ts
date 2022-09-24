import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllGlobalStats } from "~/types/stats";
import { getGlobalStats } from "../actions/global";

interface InitialState {
  loading: boolean;
  stats: AllGlobalStats;
  error: string | null;
}

const initialState: InitialState = {
  loading: false,
  stats: {} as AllGlobalStats,
  error: null,
};

const globalSlice = createSlice({
  name: "globalStats",
  initialState,
  reducers: {},
  extraReducers: {
    [getGlobalStats.pending.toString()]: (state: InitialState) => {
      state.loading = true;
    },
    [getGlobalStats.fulfilled.toString()]: (
      state: InitialState,
      action: PayloadAction<AllGlobalStats>
    ) => {
      state.loading = false;
      state.stats = action.payload;
    },
    [getGlobalStats.rejected.toString()]: (
      state: InitialState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.stats = {} as AllGlobalStats;
      state.error = action.payload;
    },
  },
});

export const {} = globalSlice.actions;
export default globalSlice.reducer;
