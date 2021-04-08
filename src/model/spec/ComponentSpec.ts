import { SlotSpec } from "./SlotSpec";

export interface ComponentSpec {
  name: string;
  title?: string;
  infoLink?: string;
  description?: string;
  preview?: { [key: string]: any };
  icon?: string;
  group?: string;
  properties?: { [key: string]: any };
  slots?: {
    [key: string]: SlotSpec;
  };
}
