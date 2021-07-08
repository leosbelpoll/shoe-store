import { Switch, Route } from "react-router-dom";
import { Error } from "./Error";
import { InventoryMonitor } from "./InventoryMonitor";
import { StoreDetails } from "./StoreDetails";
import { ModelDetails } from "./ModelDetails";
import { StoreList } from "./StoreList";
import { ModelList } from "./ModelList";
import { Search } from "./Search";

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact>
        <InventoryMonitor />
      </Route>
      <Route path="/stores" exact>
        <StoreList />
      </Route>
      <Route path="/stores/:id" exact>
        <StoreDetails />
      </Route>
      <Route path="/models" exact>
        <ModelList />
      </Route>
      <Route path="/models/:id" exact>
        <ModelDetails />
      </Route>
      <Route path="/search" exact>
        <Search />
      </Route>
      <Route path="*">
        <Error status={404} />
      </Route>
    </Switch>
  );
}
