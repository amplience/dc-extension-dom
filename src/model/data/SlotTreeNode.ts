import { SlotSpec } from "../spec";
import { ComponentTreeNode } from "./ComponentTreeNode";
import { TreeNode } from "./TreeNode";

export interface SlotTreeNode extends TreeNode {
  name: string;
  children: ComponentTreeNode[];
  spec: SlotSpec;
}
