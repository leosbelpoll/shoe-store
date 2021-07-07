import { Result, Button } from "antd";
import { Link } from "react-router-dom";

type Status = 404 | 500;

interface ErrorProps {
  status?: Status;
}

export function Error({ status = 500 }: ErrorProps) {
  return (
    <Result
      status={status}
      title="Error"
      subTitle="Sorry, something went wrong."
      extra={
        <Link to="/">
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  );
}
