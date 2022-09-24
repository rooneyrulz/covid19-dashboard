import React from "react";
import { Drawer } from "antd";
import { useAppDispatch, useAppSelector } from "~/store";
import Stats from "~/common/Stats";
import Chart from "~/common/Chart";
import { getChartData, getGroupedChartData } from "~/utils/chart";
import { setChartStats } from "~/store/features/chart";

interface ChartData {
  labels: string[];
  datasets: [
    {
      data: (string | number)[];
      backgroundColor: string[];
      hoverBackgroundColor: string[];
    }
  ];
}

type Props = {
  isOpen: boolean;
  country: string | null;
  close: () => void;
};

const CountryModal: React.FC<Props> = ({ isOpen, country, close }) => {
  const countries = useAppSelector((state) => state.countries);
  const globalChart = useAppSelector((state) => state.chart.globalChart);
  const countryChart = useAppSelector((state) => state.chart.countryChart);

  const dispatch = useAppDispatch();

  const [doughnutData, setDoughnutData] = React.useState<ChartData>({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
      },
    ],
  });

  const [barChartData, setBarChartData] = React.useState<any>({
    options: {},
    data: {
      labels: [],
      datasets: [],
    },
  });

  React.useEffect(() => {
    const stat = countries.stat;
    setDoughnutData({
      labels: ["Cases", "Recovered", "Deaths", "Active"],
      datasets: [
        {
          data: [stat?.cases, stat?.recovered, stat?.deaths, stat?.active],
          backgroundColor: [
            "rgba(30, 72, 120, 0.9)",
            "rgba(13, 89, 48, 0.9)",
            "rgba(176, 19, 16, 0.9)",
            "rgba(33, 191, 56, 0.9)",
          ],
          hoverBackgroundColor: [
            "rgba(30, 72, 120)",
            "rgba(13, 89, 48)",
            "rgba(176, 19, 16)",
            "rgba(33, 191, 56)",
          ],
        },
      ],
    });
  }, [countries.stat]);

  React.useEffect(() => {
    if (Boolean(Object.keys(countryChart.data || {}).length)) {
      const { cases, deaths, recovered } = getGroupedChartData(
        countryChart.data
      );
      setBarChartData({
        ...barChartData,
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
  }, [countryChart]);

  React.useEffect(() => {
    dispatch(setChartStats(globalChart.data));
  }, []);

  return (
    <Drawer
      title='Country Statistics'
      placement='right'
      onClose={close}
      open={isOpen}
      width={500}
    >
      <h2>{country}</h2>
      <section>
        <Stats
          stats={countries.stat}
          loading={countries.loading}
          error={countries.error}
        />
      </section>
      <section>
        <Chart
          loading={countries.loading}
          data={doughnutData}
          error={countries.error}
          chartType='DOUGHNUT'
        />
      </section>
      <section>
        <Chart
          loading={countryChart.loading}
          data={barChartData?.data}
          options={barChartData?.options}
          error={countryChart.error}
          chartType='BAR'
        />
      </section>
    </Drawer>
  );
};

export default CountryModal;
