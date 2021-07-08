import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import { Typography, Table, DatePicker } from "antd";
import { Model } from "../types/Model";
import { getData } from "../utils/api";
import { Inventory } from "../types/Inventory";
import { Error } from "./Error";
import { CandleChart } from "../types/CandleChart";
import moment from "moment";
import { getEnv } from "../utils/env";
import { DATE_FORMAT } from "../configs";
import { useQuery } from "react-query";
import { Loading } from "./Loading";

const { Title } = Typography;
const { RangePicker } = DatePicker;

export function StoreDetails() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const { id }: { id: string } = useParams();

  const url =
    fromDate && toDate
      ? `stores/${id}?from=${fromDate}&to=${toDate}`
      : `stores/${id}`;
  const { isLoading, error, data } = useQuery(["getStore", fromDate, toDate], () => {
    return getData(url);
  });

  if (isLoading) return <Loading />;

  if (error) return <Error />;

  const {
    name,
    inventories,
    candle_chart: candleChartData,
  }: { name: string, inventories: Inventory[]; candle_chart: CandleChart[] } = data;

  const options = {
    chart: {
      height: 350,
    },
    title: {
      text: "CandleStick Chart",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  const series = [
    {
      data: candleChartData.map(({ date, open, high, low, close }) => ({
        x: moment(date).format(getEnv(DATE_FORMAT)),
        y: [open, high, low, close],
      })),
    },
  ];

  const dataSource = inventories.map((inventory) => ({
    key: inventory.id,
    inventory: inventory.inventory,
    model: inventory.model,
  }));

  const columns = [
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      render: (model: Model) => (
        <Link to={`/models/${model.id}`}>{model.name}</Link>
      ),
    },
    {
      title: "Inventory",
      dataIndex: "inventory",
      key: "inventory",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => moment(date).format(getEnv(DATE_FORMAT)),
    },
  ];

  const onDateRangeChange = (_: any, datesString: [string, string]) => {
    setFromDate(datesString[0]);
    setToDate(datesString[1]);
  };

  return (
    <>
      <Title level={2}>Store "{name}" details</Title>
      <RangePicker onChange={onDateRangeChange} format="DD-MM-YYYY" />
      <ReactApexChart
        style={{ marginTop: "50px" }}
        options={options}
        series={series}
        type={"candlestick"}
        height={350}
      />
      <Table
        style={{ marginTop: "50px" }}
        dataSource={dataSource}
        columns={columns}
        pagination={{ position: ["bottomCenter"] }}
      />
    </>
  );
}
