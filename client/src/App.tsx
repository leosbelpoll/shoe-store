import { useReducer } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Layout } from "antd";
import { QueryClient, QueryClientProvider } from "react-query";
import { reducer } from "./redux/reducer";
import { initialState, ReduxContext } from "./redux/store";
import { Routes } from "./components/Routes";
import { Header } from "./components/Header";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
    },
  },
});

const { Content } = Layout;

function App() {
  const [store, dispatch] = useReducer(reducer, initialState);

  return (
    <ReduxContext.Provider value={[store, dispatch]}>
      <QueryClientProvider client={queryClient}>
        <ReactNotification />
        <Router>
          <Header />
          <Layout className="layout">
            <Content style={{ padding: "50px" }}>
              <Routes />
            </Content>
          </Layout>
        </Router>
      </QueryClientProvider>
    </ReduxContext.Provider>
  );
}

export default App;
