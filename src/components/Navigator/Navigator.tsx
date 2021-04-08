import { withStyles, WithStyles } from "@material-ui/core";
import SelectAllIcon from "@material-ui/icons/SelectAll";
import React from "react";
import {
  ComponentTreeNode,
  ImmutableTreeData,
  SlotTreeNode
} from "../../model";
import ComponentIcon from "../ComponentIcon";
import { useComponentTreeEditor } from "../EditorComponentTreeField";
import TreeItem from "../TreeItem/TreeItem";
import TreeView from "../TreeView/TreeView";

const styles = () => ({});

interface Props extends WithStyles<typeof styles> {
  className?: string;
  style?: React.CSSProperties;
  data: ImmutableTreeData;
  height?: number;
}

const Navigator: React.SFC<Props> = props => {
  const { data, height, ...other } = props;

  const { setSelectedNode, selectedNode } = useComponentTreeEditor();

  const renderComponents = (components: ComponentTreeNode[]) => {
    return components.map(component => (
      <TreeItem
        key={component.nodePointer}
        nodeId={component.nodePointer}
        label={component.spec.title || component.name}
        icon={<ComponentIcon name={component.name} />}
      >
        {renderSlots(component.slots)}
      </TreeItem>
    ));
  };

  const renderSlots = (slots: SlotTreeNode[]) => {
    if (slots.length === 1) {
      // just render the components if there is only 1 slot
      return renderComponents(slots[0].children);
    }
    return slots.map(slot => {
      return (
        <TreeItem
          key={slot.nodePointer}
          nodeId={slot.nodePointer}
          icon={<SelectAllIcon />}
          label={slot.spec.title || slot.name}
        >
          {renderComponents(slot.children)}
        </TreeItem>
      );
    });
  };

  const handleNodeSelected = (nodeId: string) => {
    // only allow components to be selected
    const node = data.getNode(nodeId);
    if (node && node.nodeType === "component") {
      setSelectedNode(nodeId);
    }
  };

  const defaultExpandedNodes = [undefined as any];

  return (
    <TreeView
      defaultExpandedNodes={defaultExpandedNodes}
      onSelectNode={handleNodeSelected}
      selectedNodeId={selectedNode}
      height={height}
    >
      {renderSlots(data.rootSlots)}
    </TreeView>
  );
};

export default withStyles(styles)(Navigator);
