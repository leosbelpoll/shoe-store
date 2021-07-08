import { Action, StoreActions, StoreState } from "./types";

export const reducer = (
  state: StoreState,
  action: StoreActions
): StoreState => {
  const { type, payload } = action;

  switch (type) {
    case Action.AddMinInventories: {
      return {
        ...state,
        minInventories: payload.map((item) => ({
          ...item,
          isNew: !state.minInventories.find((inv) => inv.id === item.id),
        })),
      };
    }
    case Action.AddMaxInventories: {
      return {
        ...state,
        maxInventories: payload.map((item) => ({
          ...item,
          isNew: !state.maxInventories.find((inv) => inv.id === item.id),
        })),
      };
    }
    case Action.AddWarningAlerts: {
      return {
        ...state,
        warningAlerts: payload,
      };
    }
    case Action.AddDangerAlerts: {
      return {
        ...state,
        dangerAlerts: payload,
      };
    }
    default: {
      throw new Error("Action not recognized");
    }
  }
};
