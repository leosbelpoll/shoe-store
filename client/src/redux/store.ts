import React, { Dispatch } from "react";
import { StoreActions, StoreState } from "./types";

export const initialState: StoreState = {
  minInventories: [],
  maxInventories: [],
  warningAlerts: [],
  dangerAlerts: [],
};

export const ReduxContext = React.createContext<
  [StoreState, Dispatch<StoreActions>]
>([initialState, () => null]);
