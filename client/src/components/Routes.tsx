import { Switch, Route } from "react-router-dom";
import { Error } from "./Error";
import { InventoryMonitor } from "./InventoryMonitor";

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact>
        <InventoryMonitor />
      </Route>
      <Route path="*">
        <Error status={404} />
      </Route>
    </Switch>
  );
}
