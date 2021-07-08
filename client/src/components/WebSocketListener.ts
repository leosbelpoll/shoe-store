import { useContext } from "react";
import { IMessageEvent, w3cwebsocket } from "websocket";
import { ReduxContext } from "../redux/store";
import { Action } from "../redux/types";
import { Inventory } from "../types/Inventory";
import { getEnv } from "../utils/env";
import { WEBSOCKETS_URL } from "../configs";
import {
  showErrorNotification,
  showWarningNotification,
} from "../utils/notification";

const client = new w3cwebsocket(getEnv(WEBSOCKETS_URL));

interface WebsocketMessage {
  type: string;
  items: Inventory[];
}

export function WebSocketListener() {
  const [, dispatch] = useContext(ReduxContext);

  client.onopen = () => {
    const subscribeString = JSON.stringify({
      command: "subscribe",
      identifier: JSON.stringify({ channel: "InventoriesChannel" }),
    });
    client.send(subscribeString);
    console.log("✅ WebSocket Client Connected");
  };

  client.onmessage = (message: IMessageEvent) => {
    const { data: dataString } = message;
    const {
      identifier,
      message: innerMessage,
    }: { identifier: string; message: WebsocketMessage } = JSON.parse(
      dataString.toString()
    );

    if (identifier && innerMessage) {
      const { type, items } = innerMessage;

      switch (type) {
        case "min": {
          dispatch({ type: Action.AddMinInventories, payload: items });
          break;
        }
        case "max": {
          dispatch({ type: Action.AddMaxInventories, payload: items });
          break;
        }
        case "warning": {
          dispatch({ type: Action.AddWarningAlerts, payload: items });
          for (const { store, model, inventory } of items) {
            showWarningNotification(
              `Inventory below min limit. Store: ${store.name}, Model: ${model.name}, Inventory: ${inventory}`
            );
          }
          break;
        }
        case "danger": {
          dispatch({ type: Action.AddDangerAlerts, payload: items });
          for (const { store, model, inventory } of items) {
            showErrorNotification(
              `No inventory! Store: ${store.name}, Model: ${model.name}, Inventory: ${inventory}`
            );
          }
          break;
        }
        default: {
          break;
        }
      }
    }
  };

  client.onclose = () => {
    console.log("❌ WebSocket Client Disconnected");
  };

  return null;
}
