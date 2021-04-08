import { ComponentSpec } from "../spec";
import { SlotTreeNode } from "./SlotTreeNode";
import { TreeNode } from "./TreeNode";

export interface ComponentTreeNode extends TreeNode {
  name: string;
  properties: any;
  slots: SlotTreeNode[];
  spec: ComponentSpec;
}

export interface ComponentData {
  name: string;
  properties: any;
  slots: { [slotName: string]: ComponentData[] };
}
