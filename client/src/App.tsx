import { BrowserRouter as Router } from "react-router-dom";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Layout } from "antd";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes } from "./components/Routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
    },
  },
});

const { Content } = Layout;

function App() {

  return (
      <QueryClientProvider client={queryClient}>
        <ReactNotification />
        <Router>
          <Layout className="layout">
            <Content style={{ padding: "50px" }}>
              <Routes />
            </Content>
          </Layout>
        </Router>
      </QueryClientProvider>
  );
}

export default App;
