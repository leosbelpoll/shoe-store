import { Switch, Route } from "react-router-dom";
import { Error } from "./Error";

export function Routes() {
  return (
    <Switch>
      <Route path="*">
        <Error status={404} />
      </Route>
    </Switch>
  );
}
