export interface TreeNode {
  nodePointer: string;
  nodeType: "component" | "slot";
  nodeParent: string | undefined;
}
