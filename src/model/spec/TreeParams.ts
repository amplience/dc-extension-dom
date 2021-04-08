import { ComponentSpec } from "./ComponentSpec";
import { SlotSpec } from "./SlotSpec";

export interface TreeParams {
  components: ComponentSpec[];
  slots: {
    [key: string]: SlotSpec;
  };
}
