import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getGlobalChartStats, getCountryChartStats } from "../actions/chart";

interface InitialState {
  globalChart: {
    loading: boolean;
    data: any;
    error: string | null;
  };
  countryChart: {
    loading: boolean;
    data: any;
    error: string | null;
  };
}

const initialState: InitialState = {
  globalChart: {
    loading: false,
    data: {},
    error: null,
  },
  countryChart: {
    loading: false,
    data: {},
    error: null,
  },
};

const chartSlice = createSlice({
  name: "chartStats",
  initialState,
  reducers: {
    setChartStats: (state, action) => {
      state.countryChart.data = action.payload;
    },
    clearCountryChartStats: (state) => {
      state.countryChart.error = null;
      state.countryChart.data = {};
    },
  },
  extraReducers: {
    [getGlobalChartStats.pending.toString()]: (state: InitialState) => {
      state.globalChart.loading = true;
    },
    [getGlobalChartStats.fulfilled.toString()]: (
      state: InitialState,
      action: PayloadAction<any>
    ) => {
      state.globalChart.loading = false;
      state.globalChart.error = null;
      state.globalChart.data = action.payload;
    },
    [getGlobalChartStats.rejected.toString()]: (
      state: InitialState,
      action: PayloadAction<string>
    ) => {
      state.globalChart.loading = false;
      state.globalChart.data = {};
      state.globalChart.error = action.payload;
    },
    [getCountryChartStats.pending.toString()]: (state: InitialState) => {
      state.countryChart.loading = true;
    },
    [getCountryChartStats.fulfilled.toString()]: (
      state: InitialState,
      action: PayloadAction<any>
    ) => {
      state.countryChart.loading = false;
      state.countryChart.error = null;
      state.countryChart.data = action.payload.timeline;
    },
    [getCountryChartStats.rejected.toString()]: (
      state: InitialState,
      action: PayloadAction<string>
    ) => {
      state.countryChart.loading = false;
      state.countryChart.data = {};
      state.countryChart.error = action.payload;
    },
  },
});

export const { setChartStats, clearCountryChartStats } = chartSlice.actions;
export default chartSlice.reducer;
