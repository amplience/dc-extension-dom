/* tslint:disable:no-empty */
import React, { PropsWithChildren } from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { TreeSpec } from "../../model";
import {
  EditorComponentTreeContext,
  EditorComponentTreeContextProps
} from "../EditorComponentTreeField";

export interface TreeSpecContextParams {
  value: TreeSpec;
  backend?: any;
  editorValue?: EditorComponentTreeContextProps;
}

const TreeSpecContext = React.createContext<TreeSpec>(new TreeSpec());

export function WithTreeSpecExtended(
  props: PropsWithChildren<TreeSpecContextParams>
): JSX.Element {
  return (
    <TreeSpecContext.Provider value={props.value}>
      <DndProvider backend={props.backend || HTML5Backend}>
        <EditorComponentTreeContext.Provider
          value={
            props.editorValue || {
              selectedNode: "",
              setSelectedNode: () => {},
              insertComponent: () => {},
              deleteComponent: () => {},
              moveComponent: () => {}
            }
          }
        >
          {props.children}
        </EditorComponentTreeContext.Provider>
      </DndProvider>
    </TreeSpecContext.Provider>
  );
}

export function useTreeSpec(): TreeSpec {
  return React.useContext(TreeSpecContext);
}
