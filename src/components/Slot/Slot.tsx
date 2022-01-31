/* tslint:disable:no-shadowed-variable */
import { Typography, WithStyles, withStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { useDrop } from "react-dnd";
import { Component } from "../";
import { SlotSpec, SlotTreeNode } from "../../model";
import { useComponentTreeEditor } from "../EditorComponentTreeField";
import { useTreeSpec } from "../WithTreeSpec/WithTreeSpec";
import InsertTarget from "./InsertTarget";

const checkDrop = (node: SlotTreeNode, item: any) => {
  if (item && item.data && node && node.spec && node.spec.allow) {
    if (
      (node.spec.allow && node.spec.allow === "*") ||
      node.spec.allow.includes(item.data.name)
    ) {
      return true;
    }
  }
  return false;
};

export const styles = {
  root: {
    padding: 0,
    margin: 0,
    background: "white"
  },
  hovering: {
    background: "#039be5"
  },
  canDrop: {
    background: "#7ec0e4"
  },
  title: {
    padding: "5px 10px",
    borderBottom: "1px solid #e5e5e5"
  },
  children: {
    padding: 8,
    minHeight: 30
  }
};

export interface Props extends WithStyles<typeof styles> {
  spec: SlotSpec;
  node: SlotTreeNode;
  showTitle?: boolean;
}

const Slot: React.SFC<Props> = (props: Props) => {
  const { classes, spec, node, showTitle = false, ...other } = props;

  const treeSpec = useTreeSpec();
  const { insertComponent, moveComponent } = useComponentTreeEditor();

  const canDrop = (item: any) => {
    // todo: check if component allows this type of component

    if (!checkDrop(node, item)) {
      return false;
    }

    // check if this would result in trying to add a component to itself
    if (item.type === "component-node") {
      if (node.nodePointer.startsWith(`${item.data.nodePointer}/`)) {
        return false;
      }
    }
    return true;
  };

  const handleDrop = (item: any, index?: number) => {
    switch (item.type) {
      case "component-node":
        // move
        moveComponent(item.data.nodePointer, node.nodePointer, index);
        break;
      case "component":
        // insert
        insertComponent(node.nodePointer, { ...item.data }, index);
        break;
    }
  };

  const [{ isHovering, isCanDrop, item }, drop] = useDrop({
    accept: ["component", "component-node"],
    canDrop,
    collect: monitor => ({
      isHovering: monitor.isOver({ shallow: true }),
      item: monitor.getItem(),
      isCanDrop: monitor.canDrop()
    }),
    drop: (dropResult, monitor) => {
      const data = monitor.getItem();
      const didDrop = monitor.didDrop();
      const isHovering = monitor.isOver({ shallow: true });

      if (!isHovering) {
        return undefined;
      }

      if (didDrop) {
        return;
      }

      handleDrop(dropResult); // append to end
    }
  });

  return (
    <div
      className={clsx(classes.root, {
        [classes.hovering]: isHovering && isCanDrop,
        [classes.canDrop]: !isHovering && isCanDrop
      })}
      ref={drop}
    >
      {showTitle === true && (
        <div className={classes.title}>
          <Typography variant="body1">{spec.title || node.name}</Typography>
        </div>
      )}
      <div className={classes.children}>
        {node.children.map((value, index) => {
          const componentSpec = treeSpec.getComponent(value.name);
          if (!componentSpec) {
            return undefined;
          }
          return (
            <React.Fragment key={index}>
              {/* Add drop target before the item so users can insert before this component */}
              <InsertTarget
                canDrop={canDrop}
                onDrop={item => handleDrop(item, index)}
              />
              <Component spec={componentSpec} node={value} />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default withStyles(styles, { name: "DcComponentTreeSlot" })(Slot);
