import { Link, useHistory, useLocation } from "react-router-dom";
import { Menu, Layout, Input } from "antd";

const { Header: HeaderAnt } = Layout;
const { Search } = Input;

export function Header() {
  const history = useHistory();
  const location = useLocation();

  const onSearch = (value: string) => {
    history.push(`/search?q=${value}`);
  };

  let activeMenu: string[] | undefined = ["1"];
  if (location.pathname === "/") {
    activeMenu = ["1"];
  } else if (location.pathname.includes("stores")) {
    activeMenu = ["2"];
  } else if (location.pathname.includes("models")) {
    activeMenu = ["3"];
  } else {
    activeMenu = undefined;
  }

  return (
    <>
      <HeaderAnt>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" selectedKeys={activeMenu}>
          <Menu.Item key={1}>
            <Link to="/">Inventory monitor</Link>
          </Menu.Item>
          <Menu.Item key={2}>
            <Link to="/stores">Stores</Link>
          </Menu.Item>
          <Menu.Item key={3}>
            <Link to="/models">Models</Link>
          </Menu.Item>
        </Menu>
      </HeaderAnt>
      <Search
        placeholder="Search store or model"
        onSearch={onSearch}
        enterButton
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "300px",
          margin: "15px",
        }}
      />
    </>
  );
}
