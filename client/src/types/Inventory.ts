import { Model } from "./Model";
import { Store } from "./Store";

export interface Inventory {
  id: number;
  store: Store;
  model: Model;
  inventory: number;
  created_at: string;
  isNew?: boolean;
}
