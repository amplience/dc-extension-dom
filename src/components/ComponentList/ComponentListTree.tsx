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
    overflow: "hidden auto"
  }
};

interface Props extends WithStyles {
  className?: string;
  height?: number;
  open?: boolean;
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

const renderGroup = (
  treeData: any,
  treeSpec: any,
  key: string,
  open?: boolean
) => {
  return key !== "root" ? (
    <TreeItem key={key} nodeId={key} label={key} open={open} type={"component"}>
      {treeData[key].map((ind: any) => (
        <ComponentListItem
          small={true}
          open={open}
          key={treeSpec[ind].name}
          component={treeSpec[ind]}
        />
      ))}
    </TreeItem>
  ) : null;
};

const renderRootLevel = (treeData: any, treeSpec: any, open?: boolean) => {
  return (treeData.root || []).map((ind: any) => (
    <ComponentListItem
      open={open}
      key={treeSpec[ind].name}
      component={treeSpec[ind]}
    />
  ));
};

const ComponentList: React.SFC<Props> = props => {
  const { classes, height, open, ...other } = props;

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
          renderGroup(treeData, treeSpec.components, key, open)
        )}
        {renderRootLevel(treeData, treeSpec.components, open)}
      </TreeView>
    </List>
  );
};

export default withStyles(styles)(ComponentList);
