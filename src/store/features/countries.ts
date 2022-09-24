import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CountryStats } from "~/types/stats";
import { getCountryStats } from "../actions/countries";

interface InitialState {
  loading: boolean;
  stats: CountryStats[];
  stat: CountryStats;
  error: string | null;
}

const initialState: InitialState = {
  loading: false,
  stats: [] as CountryStats[],
  stat: {} as CountryStats,
  error: null,
};

const countriesSlice = createSlice({
  name: "countryStats",
  initialState,
  reducers: {
    setCountryStats: (state, action) => {
      state.stat = action.payload
    }
  },
  extraReducers: {
    [getCountryStats.pending.toString()]: (state: InitialState) => {
      state.loading = true;
    },
    [getCountryStats.fulfilled.toString()]: (
      state: InitialState,
      action: PayloadAction<CountryStats[]>
    ) => {
      state.loading = false;
      state.stats = action.payload;
    },
    [getCountryStats.rejected.toString()]: (
      state: InitialState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.stats = [];
      state.error = action.payload;
    },
  },
});

export const { setCountryStats } = countriesSlice.actions;
export default countriesSlice.reducer;
