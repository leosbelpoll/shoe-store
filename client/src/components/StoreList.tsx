import { getData } from "../utils/api";
import { Link } from "react-router-dom";
import { Typography, Table } from "antd";
import { Store } from "../types/Store";
import { Error } from "./Error";
import { Loading } from "./Loading";
import { useQuery } from "react-query";

const { Title } = Typography;

export function StoreList() {
  const {
    isLoading,
    error,
    data: stores,
  } = useQuery<Store[], Error>("getStores", () => {
    return getData("stores");
  });

  if (isLoading) return <Loading />;

  if (error) return <Error />;

  const dataSource = stores?.map((store) => ({
    key: store.id,
    store,
  }));

  const columns = [
    {
      title: "Name",
      dataIndex: "store",
      key: "name",
      render: (store: Store) => (
        <Link to={`/stores/${store.id}`}>{store.name}</Link>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Store list</Title>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ position: ["bottomCenter"] }}
      />
    </div>
  );
}
