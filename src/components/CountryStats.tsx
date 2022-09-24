import React from "react";
import { Row, Col, Input } from "antd";
import { useAppSelector, useAppDispatch } from "~/store";

import { getCountryChartStats } from "~/store/actions/chart";
import { getCountryStats } from "~/store/actions/countries";
import { clearCountryChartStats, setChartStats } from "~/store/features/chart";
import { setCountryStats } from "~/store/features/countries";

import CountryModal from "./CountryModal";
import Table from "../common/Table";
import Wrapper from "~/layouts/Wrapper";

const { Search } = Input;

const Countries = () => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.countries);
  const globalStats = useAppSelector((state) => state.global.stats);
  const globalChart = useAppSelector((state) => state.chart.globalChart);

  const [open, setOpen] = React.useState<boolean>(false);
  const [country, setCountry] = React.useState<string | null>(null);
  const [searchParam, setSearchParam] = React.useState<string>("");

  const showDrawer = (c: string) => {
    setOpen(true);
    setCountry(c);

    if (c.toLowerCase() === "world") {
      dispatch(setCountryStats(globalStats));
      dispatch(setChartStats(globalChart.data));
    } else {
      const countryStats = countries.stats.find(
        (stat) => stat.country.toLowerCase() === c.toLowerCase()
      );
      dispatch(setCountryStats(countryStats));
      dispatch(getCountryChartStats(c.toLowerCase()));
    }
  };

  const onClose = () => {
    setOpen(false);
    dispatch(setCountryStats({}));
    dispatch(clearCountryChartStats());
  };

  const onSearch = (value: string) => setSearchParam(value);

  React.useEffect(() => {
    dispatch(getCountryStats());
  }, []);

  const tableData = React.useMemo(() => {
    let tableData = countries.stats.map((stat) => ({
      updated: stat.updated,
      country: stat.country,
      countryInfo: stat.countryInfo,
      cases: stat.cases,
      todayCases: stat.todayCases,
      deaths: stat.deaths,
      todayDeaths: stat.todayDeaths,
      recovered: stat.recovered,
      todayRecovered: stat.todayRecovered,
      active: stat.active,
      critical: stat.critical,
    }));

    tableData = [
      {
        updated: globalStats.updated,
        country: "World",
        countryInfo: "World",
        cases: globalStats.cases,
        todayCases: globalStats.todayCases,
        deaths: globalStats.deaths,
        todayDeaths: globalStats.todayDeaths,
        recovered: globalStats.recovered,
        todayRecovered: globalStats.todayRecovered,
        active: globalStats.active,
        critical: globalStats.critical,
      },
      ...tableData,
    ];

    let filteredData = tableData.filter((stat) =>
      stat.country.toLowerCase().includes(searchParam.toLowerCase())
    );

    return Boolean(filteredData.length) ? filteredData : tableData;
  }, [countries, searchParam]);

  return (
    <section className='countries'>
      <Row justify='center' align='middle' gutter={16}>
        <Wrapper loading={countries.loading} error={countries.error}>
          <>
            <Col span={12} style={{ textAlign: "left" }}>
              <h2>All affected countries</h2>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <Search
                placeholder='Search by country'
                onSearch={onSearch}
                enterButton
              />
            </Col>
            <Table data={tableData} openDrawer={showDrawer} />
          </>
        </Wrapper>
      </Row>
      <CountryModal isOpen={open} close={onClose} country={country} />
    </section>
  );
};

export default Countries;
