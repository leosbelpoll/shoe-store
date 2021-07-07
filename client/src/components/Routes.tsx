import { Switch, Route } from "react-router-dom";

export function Routes() {
  return (
    <Switch>
      <Route path="*">
        <Error status={404} />
      </Route>
    </Switch>
  );
}
