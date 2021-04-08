/* tslint:disable:no-empty */
import { createContext, useContext } from "react";
import { ComponentData } from "../../model";

export interface EditorComponentTreeContextProps {
  selectedNode?: string;
  setSelectedNode(nodePointer: string): void;
  insertComponent(
    parent: string,
    component: ComponentData,
    index?: number
  ): void;
  deleteComponent(nodePointer: string): void;
  moveComponent(nodePointer: string, newParent: string, index?: number): void;
}

export const EditorComponentTreeContext = createContext<
  EditorComponentTreeContextProps
>({
  selectedNode: undefined,
  setSelectedNode: () => {},
  insertComponent: () => {},
  deleteComponent: () => {},
  moveComponent: () => {}
});

export function useComponentTreeEditor(): EditorComponentTreeContextProps {
  return useContext(EditorComponentTreeContext);
}
