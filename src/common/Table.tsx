import { Table, Tag, Space } from "antd";
import React from "react";
import { AllCountryStats, CountryStats } from "~/types/stats";

interface Column {
  title: string;
  dataIndex: string;
  key: string;
  render?: (a: any, b: any) => JSX.Element;
}

type Props = {
  data: CountryStats[];
  openDrawer: (c: string) => void;
};

const App: React.FC<Props> = ({ data, openDrawer }) => {
  const [columns, setColumns] = React.useState<Column[]>([]);
  const [dataSource, setDataSource] = React.useState<
    Partial<AllCountryStats>[]
  >([]);

  const onCountryClick = (c: string) => {
    openDrawer(c);
  };

  const mapTableData = (data: CountryStats[]) => {
    const columns = Object.keys(data[0])
      ?.filter((key) => key !== "updated" && key !== "countryInfo")
      ?.map((value, index) => ({
        title: value,
        dataIndex: value,
        key: value,
      }))
      .map((column) =>
        column.title === "country"
          ? {
              ...column,
              render: (_: any, row: any) => {
                return (
                  <a onClick={(e) => onCountryClick(row.country)}>
                    {row.country}
                  </a>
                );
              },
            }
          : column.title === "todayCases"
          ? {
              ...column,
              render: (_: any, row: any) => {
                return Boolean(row.todayCases) ? (
                  <Tag color='yellow'>{`+ ${row.todayCases.toLocaleString(
                    "en-US"
                  )}`}</Tag>
                ) : (
                  <></>
                );
              },
            }
          : column.title === "todayDeaths"
          ? {
              ...column,
              render: (_: any, row: any) => {
                return Boolean(row.todayDeaths) ? (
                  <Tag
                    style={{}}
                    color='red'
                  >{`+ ${row.todayDeaths.toLocaleString("en-US")}`}</Tag>
                ) : (
                  <></>
                );
              },
            }
          : column.title === "todayRecovered"
          ? {
              ...column,
              render: (_: any, row: any) => {
                return Boolean(row.todayRecovered) ? (
                  <Tag color='green'>{`+ ${row.todayRecovered.toLocaleString(
                    "en-US"
                  )}`}</Tag>
                ) : (
                  <></>
                );
              },
            }
          : { ...column }
      );

    const dataSource = data?.map((stat, index) => ({
      key: index,
      country: stat.country,
      cases: stat.cases?.toLocaleString("en-US"),
      recovered: stat.recovered?.toLocaleString("en-US"),
      active: stat.active?.toLocaleString("en-US"),
      deaths: stat.deaths?.toLocaleString("en-US"),
      critical: stat.critical?.toLocaleString("en-US"),
      todayCases: stat.todayCases,
      todayDeaths: stat.todayDeaths,
      todayRecovered: stat.todayRecovered,
    }));

    return {
      columns,
      data: dataSource,
    };
  };

  React.useEffect(() => {
    setColumns(mapTableData(data)?.columns);
    setDataSource(mapTableData(data)?.data);
  }, [data]);

  return <Table columns={columns} dataSource={dataSource} />;
};

export default App;
