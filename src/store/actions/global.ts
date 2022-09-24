import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAll } from "~/services/index";

export const getGlobalStats = createAsyncThunk(
  "global/getGlobalStats",
  async (_, thunkAPI) => {
    try {
      const res = await getAll();
      return thunkAPI.fulfillWithValue(res);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
