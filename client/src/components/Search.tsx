import { Model } from "../types/Model";
import { Store } from "../types/Store";
import { Link, useLocation } from "react-router-dom";
import { getData } from "../utils/api";
import { Typography, Table, Row, Col } from "antd";
import { useQueries } from "react-query";
import { Loading } from "./Loading";
import { Error } from "./Error";

const { Title, Text } = Typography;

export function Search() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const q = params.get("q");

  const [
    { isLoading: storesAreLoading, error: storesError, data: storesData },
    { isLoading: modelsAreLoading, error: modelsError, data: modelsData },
  ] = useQueries([
    {
      queryKey: ["stores", q],
      queryFn: () => getData(`stores?q=${q}`),
    },
    {
      queryKey: ["models", q],
      queryFn: () => getData(`models?q=${q}`),
    },
  ]);

  if (storesAreLoading || modelsAreLoading) return <Loading />;

  if (storesError || modelsError) return <Error />;

  const stores = storesData as Store[];
  const models = modelsData as Model[];

  const storesDataSource = stores?.map((store: Store) => ({
    key: store.id,
    store,
  }));

  const modelsDataSource = models?.map((model: Model) => ({
    key: model.id,
    model,
  }));

  const storesColumns = [
    {
      title: "Name",
      dataIndex: "store",
      key: "name",
      render: (store: Store) => (
        <Link to={`/stores/${store.id}`}>{store.name}</Link>
      ),
    },
  ];

  const modelsColumns = [
    {
      title: "Name",
      dataIndex: "model",
      key: "name",
      render: (model: Model) => (
        <Link to={`/models/${model.id}`}>{model.name}</Link>
      ),
    },
  ];

  return (
    <>
      <Title level={3}>
        <Text type="secondary">Search: {q}</Text>
      </Title>
      <Row>
        <Col xs={11}>
          <Title level={2}>Stores filtered</Title>
          <Table
            dataSource={storesDataSource}
            columns={storesColumns}
            pagination={{ position: ["bottomCenter"] }}
          />
        </Col>
        <Col xs={11} offset={2}>
          <Title level={2}>Models filtered</Title>
          <Table
            dataSource={modelsDataSource}
            columns={modelsColumns}
            pagination={{ position: ["bottomCenter"] }}
          />
        </Col>
      </Row>
    </>
  );
}
