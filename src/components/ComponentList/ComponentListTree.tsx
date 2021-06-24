import {
  List,
  ListItemIcon,
  ListItemText,
  withStyles,
  WithStyles
} from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowRight } from "@material-ui/icons";
import clsx from "clsx";
import React from "react";
import TreeItem from "../TreeItem/TreeItem";
import TreeView from "../TreeView/TreeView";
import { useTreeSpec } from "../WithTreeSpec/WithTreeSpec";
import ComponentListItem from "./ComponentListItem";

const styles = {
  root: {
    height: (props: any) => props.height,
    overflow: "hidden scroll"
  }
};

interface Props extends WithStyles {
  className?: string;
  height?: number;
  style?: React.CSSProperties;
}

const convertToTree = (data: any) => {
  return data.reduce((acc: any, el: any, i: any) => {
    const groupName = el.group || "root";
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(i);
    return acc;
  }, {});
};

const renderGroup = (treeData: any, treeSpec: any, key: string) => {
  return key !== "root" ? (
    <TreeItem key={key} nodeId={key} label={key} type={"component"}>
      {treeData[key].map((ind: any) => (
        <ComponentListItem
          small={true}
          key={treeSpec[ind].name}
          component={treeSpec[ind]}
        />
      ))}
    </TreeItem>
  ) : null;
};

const renderRootLevel = (treeData: any, treeSpec: any) => {
  return (treeData.root || []).map((ind: any) => (
    <ComponentListItem key={treeSpec[ind].name} component={treeSpec[ind]} />
  ));
};

const ComponentList: React.SFC<Props> = props => {
  const { classes, height, ...other } = props;

  const treeSpec = useTreeSpec();

  const treeData = convertToTree(treeSpec.components);
  return (
    <List
      className={clsx(classes.root)}
      component="ul"
      disablePadding={true}
      dense={true}
      {...other}
    >
      <TreeView
        defaultExpandedNodes={[]}
        onSelectNode={() => ""}
        selectedNodeId={""}
        height={height}
      >
        {Object.keys(treeData).map(key =>
          renderGroup(treeData, treeSpec.components, key)
        )}
        {renderRootLevel(treeData, treeSpec.components)}
      </TreeView>
    </List>
  );
};

export default withStyles(styles)(ComponentList);
