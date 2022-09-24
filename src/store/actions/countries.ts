import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCountries } from "~/services";

export const getCountryStats = createAsyncThunk(
    "countries/getCountryStats",
    async (_, thunkAPI) => {
      try {
        const res = await getCountries();
        return thunkAPI.fulfillWithValue(res);
      } catch (err) {
        return thunkAPI.rejectWithValue(err);
      }
    }
  );