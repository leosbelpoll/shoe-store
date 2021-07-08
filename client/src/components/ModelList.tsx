import { getData } from "../utils/api";
import { Link } from "react-router-dom";
import { Typography, Table } from "antd";
import { Model } from "../types/Model";
import { Error } from "./Error";
import { useQuery } from "react-query";
import { Loading } from "./Loading";

const { Title } = Typography;

export function ModelList() {
  const {
    isLoading,
    error,
    data: models,
  } = useQuery<Model[], Error>("getModels", () => {
    return getData("models");
  });

  if (isLoading) return <Loading />;

  if (error) return <Error />;

  const dataSource = models?.map((model) => ({
    key: model.id,
    model,
  }));

  const columns = [
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
    <div>
      <Title level={2}>Model list</Title>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ position: ["bottomCenter"] }}
      />
    </div>
  );
}
