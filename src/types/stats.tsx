export type AllStats = {
  updated: number | string;
  country: string;
  continent: string;
  countryInfo: any;
  cases: number | string;
  todayCases: number | string;
  deaths: number | string;
  todayDeaths: number | string;
  recovered: number | string;
  todayRecovered: number | string;
  active: number | string;
  critical: number | string;
  casesPerOneMillion: number | string;
  deathsPerOneMillion: number | string;
  tests: number | string;
  testsPerOneMillion: number | string;
  population: number | string;
  oneCasePerPeople: number | string;
  oneDeathPerPeople: number | string;
  oneTestPerPeople: number | string;
  activePerOneMillion: number | string;
  recoveredPerOneMillion: number | string;
  criticalPerOneMillion: number | string;
  affectedCountries: number | string;
};

export type AllGlobalStats = Omit<
  AllStats,
  "Country" | "CountryInfo" | "Continent"
>;

export type AllCountryStats = Omit<AllStats, "affectedCountries">;

export type GlobalStats = Pick<
  AllGlobalStats,
  "cases" | "deaths" | "active" | "recovered" | "critical"
>;

export type CountryStats = Pick<
  AllCountryStats,
  | "updated"
  | "country"
  | "countryInfo"
  | "cases"
  | "todayCases"
  | "deaths"
  | "todayDeaths"
  | "recovered"
  | "todayRecovered"
  | "active"
  | "critical"
>;
