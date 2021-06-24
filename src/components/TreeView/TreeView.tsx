import { List, WithStyles, withStyles } from "@material-ui/core";
import clsx from "clsx";
import React, { PropsWithChildren } from "react";
import TreeViewContext from "./TreeViewContext";

export const styles = {
  root: {
    listStyle: "none",
    /*maxHeight: (props: any) => (props.height ? props.height - 58 : 800),*/
    overflow: "scroll"
  }
};

export interface Props extends PropsWithChildren<WithStyles<typeof styles>> {
  defaultExpandedNodes?: string[];
  onSelectNode?: (nodeId: string) => void;
  selectedNodeId?: string;
  height?: number;
}

export const TreeView: React.SFC<Props> = (props: Props) => {
  const {
    children,
    classes,
    onSelectNode,
    defaultExpandedNodes,
    selectedNodeId,
    ...other
  } = props;

  const [expandedState, setExpandedState] = React.useState(
    defaultExpandedNodes || ([] as string[])
  );
  const expanded = expandedState || [];

  const isExpanded = React.useCallback(id => expanded.indexOf(id) !== -1, [
    expanded
  ]);
  const isSelected = (id: string) => selectedNodeId === id;

  const toggle = (event: any, nodeId: string) => {
    const newExpanded: string[] =
      expanded.indexOf(nodeId) !== -1
        ? expanded.filter(id => id !== nodeId)
        : [nodeId, ...expanded];
    setExpandedState(newExpanded);
  };

  const select = (nodeId: string) => {
    if (onSelectNode) {
      onSelectNode(nodeId);
    }
  };

  return (
    <TreeViewContext.Provider
      value={{
        isExpanded,
        isSelected,
        toggle,
        select
      }}
    >
      <List
        role={"tree"}
        className={clsx(classes.root)}
        component="ul"
        disablePadding={true}
        dense={true}
        {...other}
      >
        {children}
      </List>
    </TreeViewContext.Provider>
  );
};

export default withStyles(styles, { name: "DcTreeView" })(TreeView);
