import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGlobalHistoricalData, getCountryHistoricalData } from "~/services";

export const getGlobalChartStats = createAsyncThunk(
  "chart/getGlobalChartStats",
  async (_, thunkAPI) => {
    try {
      const res = await getGlobalHistoricalData();
      return thunkAPI.fulfillWithValue(res);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getCountryChartStats = createAsyncThunk(
  "chart/getCountryChartStats",
  async (country: string, thunkAPI) => {
    try {
      const res = await getCountryHistoricalData(country);
      return thunkAPI.fulfillWithValue(res);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
