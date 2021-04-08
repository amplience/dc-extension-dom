import React, { PropsWithChildren } from "react";
import { TreeSpec } from "../../model";

export interface TreeSpecContextParams {
  value: TreeSpec;
}

const TreeSpecContext = React.createContext<TreeSpec>(new TreeSpec());

export function WithTreeSpec(
  props: PropsWithChildren<TreeSpecContextParams>
): JSX.Element {
  return (
    <TreeSpecContext.Provider value={props.value}>
      {props.children}
    </TreeSpecContext.Provider>
  );
}

export function useTreeSpec(): TreeSpec {
  return React.useContext(TreeSpecContext);
}
