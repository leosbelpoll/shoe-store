import { Col, Row, Skeleton } from "antd";

interface LoadingProps {
  loading?: boolean;
}

export function Loading({ loading = true }: LoadingProps) {
  if (loading)
    return (
      <Row>
        <Col xs={11} offset={1}>
          <Skeleton active />
        </Col>
        <Col xs={11} offset={1}>
          <Skeleton active />
        </Col>
      </Row>
    );

  return null;
}
