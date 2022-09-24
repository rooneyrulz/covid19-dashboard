import http from "~/config/http";

export const getAll = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await http.get("/all");
      return resolve(res.data);
    } catch (error: any) {
      return reject(
        error?.response?.data?.message ?? "Oops, Something went wrong!"
      );
    }
  });
};

export const getCountries = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await http.get("/countries");
      return resolve(res.data);
    } catch (error: any) {
      return reject(
        error?.response?.data?.message ?? "Oops, Something went wrong!"
      );
    }
  });
};

export const getGlobalHistoricalData = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await http.get("/historical/all?lastdays=360");
      return resolve(res.data);
    } catch (error: any) {
      return reject(
        error?.response?.data?.message ?? "Oops, No historical data available!"
      );
    }
  });
};

export const getCountryHistoricalData = async (country: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await http.get(`/historical/${country}?lastdays=180`);
      return resolve(res.data);
    } catch (error: any) {
      return reject(
        error?.response?.data?.message ?? "Oops, No historical data available!"
      );
    }
  });
};
