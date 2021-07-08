import { useContext } from "react";
import { Link } from "react-router-dom";
import { ReduxContext } from "../redux/store";
import { Table, Row, Col, Typography } from "antd";
import { Inventory } from "../types/Inventory";
import { Store } from "antd/lib/form/interface";
import { Model } from "../types/Model";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { Title, Text } = Typography;

export function InventoryMonitor() {
  const [store] = useContext(ReduxContext);
  const { minInventories, maxInventories } = store;

  const getDataSource = (inventories: Inventory[]) =>
    inventories.map(({ id, inventory, store, model, isNew }) => ({
      key: id,
      inventory,
      store,
      model,
      isNew,
    }));

  const maxInventoryDataSource = getDataSource(
    maxInventories.sort((a, b) => (a.inventory < b.inventory ? 1 : -1))
  );
  const minInventoryDataSource = getDataSource(
    minInventories.sort((a, b) => (a.inventory > b.inventory ? 1 : -1))
  );

  const columns = [
    {
      title: "",
      dataIndex: "isNew",
      key: "isNew",
      render: (isNew: boolean) =>
        isNew ? (
          <ExclamationCircleFilled
            style={{ fontSize: "16px", color: "#08c" }}
          />
        ) : null,
    },
    {
      title: "Store",
      dataIndex: "store",
      key: "store",
      render: (store: Store) => (
        <Link to={`/stores/${store.id}`}>{store.name}</Link>
      ),
    },
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
  ];

  return (
    <>
      <Row>
        <Col xs={11}>
          <Title level={2}>
            <Text type="success">Max 10 inventories</Text>
          </Title>
          <Table
            dataSource={maxInventoryDataSource}
            columns={columns}
            size="small"
            pagination={false}
          />
        </Col>
        <Col xs={11} offset={2}>
          <Title level={2}>
            <Text type="danger">Min 10 inventories</Text>
          </Title>
          <Table
            dataSource={minInventoryDataSource}
            columns={columns}
            size="small"
            pagination={false}
          />
        </Col>
      </Row>
    </>
  );
}
