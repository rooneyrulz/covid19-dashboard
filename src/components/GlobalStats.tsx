import React from "react";

import { useAppSelector, useAppDispatch } from "~/store";
import { getGlobalStats } from "~/store/actions/global";
import { getGlobalChartStats } from "~/store/actions/chart";

import Stats from "~/common/Stats";
import Chart from "~/common/Chart";
import { getChartData, getGroupedChartData } from "~/utils/chart";

const GlobalStats = () => {
  const dispatch = useAppDispatch();
  const global = useAppSelector((state) => state.global);
  const globalChart = useAppSelector((state) => state.chart.globalChart);

  const [lineChartData, setLineChartData] = React.useState<any>({
    options: {},
    data: {
      labels: [],
      datasets: [],
    },
  });

  React.useEffect(() => {
    dispatch(getGlobalStats());
  }, []);

  React.useEffect(() => {
    dispatch(getGlobalChartStats());
  }, []);

  React.useEffect(() => {
    if (Boolean(Object.keys(globalChart.data || {}).length)) {
      const { cases, deaths, recovered } = getGroupedChartData(
        globalChart.data
      );
      setLineChartData({
        ...lineChartData,
        options: {
          plugins: {
            title: {
              display: true,
              text: "Last Six Days",
            },
          },
          responsive: true,
          interaction: {
            mode: "index" as const,
            intersect: false,
          },
        },
        data: {
          labels: Object.keys(cases),
          datasets: [
            {
              label: "Cases",
              data: Object.values(cases),
              backgroundColor: "rgba(30, 72, 120, 0.9)",
            },
            {
              label: "Deaths",
              data: Object.values(deaths),
              backgroundColor: "rgba(176, 19, 16, 0.9)",
            },
            {
              label: "Recovered",
              data: Object.values(recovered),
              backgroundColor: "rgba(13, 89, 48, 0.9)",
            },
          ],
        },
      });
    }
  }, [globalChart]);

  return (
    <>
      <section className='global-stats'>
        <Stats
          stats={global.stats}
          loading={global.loading}
          error={global.error}
        />
      </section>
      <section className='global-chart'>
        <Chart
          loading={globalChart.loading}
          data={lineChartData?.data}
          options={lineChartData?.options}
          error={globalChart.error}
          chartType='LINE'
        />
      </section>
    </>
  );
};

export default GlobalStats;
