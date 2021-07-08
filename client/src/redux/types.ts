import { Inventory } from "../types/Inventory";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: M[Key] };
};

export enum Action {
  AddMinInventories = "ADD_MIN_INVENTORY",
  AddMaxInventories = "ADD_MAX_INVENTORY",
  AddWarningAlerts = "ADD_WARNING_ALERTS",
  AddDangerAlerts = "ADD_DANGER_ALERTS",
}

type ActionPayloads = {
  [Action.AddMinInventories]: Inventory[];
  [Action.AddMaxInventories]: Inventory[];
  [Action.AddWarningAlerts]: Inventory[];
  [Action.AddDangerAlerts]: Inventory[];
};

export type StoreActions =
  ActionMap<ActionPayloads>[keyof ActionMap<ActionPayloads>];

export type StoreState = {
  minInventories: Inventory[];
  maxInventories: Inventory[];
  warningAlerts: Inventory[];
  dangerAlerts: Inventory[];
};
