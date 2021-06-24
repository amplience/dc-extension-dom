import {
  Collapse,
  IconButton,
  Typography,
  WithStyles,
  withStyles
} from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import clsx from "clsx";
import React, { PropsWithChildren, useMemo } from "react";

import { DeleteIcon } from "unofficial-dynamic-content-ui";
import { Slot } from "..";
import { ComponentSpec, ComponentTreeNode, pointerValue } from "../../model";
import ComponentIcon from "../ComponentIcon";
import { useComponentTreeEditor } from "../EditorComponentTreeField";

import { useDrag } from "react-dnd";
import { ComponentPreview } from "../ComponentPreview";

export const styles = {
  root: {
    padding: 0,
    margin: 0,
    listStyle: "none",
    border: "1px solid #f2fafe",
    background: "white",
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    transform: "translate3d(0, 0, 0)" // workaround for html5 d&d
  },
  header: {
    background: "#e5e5e5",
    display: "flex",
    flexDirection: "row" as "row",
    cursor: "pointer"
  },
  selected: {
    background: "#039be5",
    color: "#fff"
  },
  headerTitle: {
    flex: 1,
    padding: "8px 0px"
  },
  headerIcon: {
    alignItems: "center" as "center",
    justifyContent: "center" as "center",
    display: "flex",
    margin: "0px 5px"
  },
  headerActions: {
    alignItems: "center" as "center",
    justifyContent: "center" as "center",
    display: "flex",
    margin: "0px 5px"
  },
  preview: {},
  slots: {
    padding: 8,
    background: "#f2f2f2"
  },
  deleteButton: {
    color: "currentcolor",

    "& svg": {
      fill: "currentcolor"
    }
  }
};

export interface Props extends PropsWithChildren<WithStyles<typeof styles>> {
  spec: ComponentSpec;
  node: ComponentTreeNode;
}

const walkJson = (input: any, visitor: (x: any) => void) => {
  if (!input) {
    return;
  }

  visitor(input);

  if (Array.isArray(input)) {
    for (const i of input) {
      walkJson(input[i], visitor);
    }
  } else if (typeof input === "object") {
    for (const key of Object.keys(input)) {
      walkJson(input[key], visitor);
    }
  }
};

export const Component: React.SFC<Props> = (props: Props) => {
  const { classes, spec, node, ...other } = props;
  const [expandedState, setExpandedState] = React.useState(false);
  const slots = spec.slots || {};
  const text = useMemo(() => {
    return (
      node.spec &&
      node.spec.preview &&
      pointerValue(node.properties, node.spec.preview.text)
    );
  }, [node]);
  const imagesArray = useMemo(() => {
    const images: any[] = [];
    if (node.spec && node.spec.preview && node.spec.preview.image) {
      const value = pointerValue(node.properties, node.spec.preview.image);
      if (value) {
        images.push(value);
      }
    } else {
      walkJson(node.properties, value => {
        if (
          value &&
          value._meta &&
          value._meta.schema ===
            "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
        ) {
          images.push(value);
        }
      });
    }
    return images;
  }, [node]);

  const needPreview = text || (imagesArray && imagesArray.length);

  const {
    selectedNode,
    setSelectedNode,
    deleteComponent
  } = useComponentTreeEditor();

  const handleSelect = () => {
    setSelectedNode(node.nodePointer);
  };

  const handleDelete = () => {
    deleteComponent(node.nodePointer);
  };

  const [{ dragging }, drag, preview] = useDrag({
    item: {
      type: "component-node",
      data: node
    },
    collect: monitor => ({
      dragging: monitor.isDragging()
    })
  });

  return (
    <div className={clsx(classes.root)} ref={drag}>
      <div
        className={clsx(classes.header, {
          [classes.selected]: selectedNode === node.nodePointer
        })}
        onClick={handleSelect}
      >
        <div className={classes.headerIcon}>
          <ComponentIcon name={node.name} />
        </div>
        <Typography variant="body1" className={classes.headerTitle}>
          {spec.title || spec.name}
        </Typography>
        <div className={classes.headerActions}>
          {needPreview ? (
            <IconButton
              className={classes.deleteButton}
              onClick={e => {
                e.stopPropagation();
                setExpandedState(!expandedState);
              }}
              size="small"
            >
              {!expandedState ? (
                <KeyboardArrowDown width={"24px"} height={"24px"} />
              ) : (
                <KeyboardArrowUp width={"24px"} height={"24px"} />
              )}
            </IconButton>
          ) : null}
          <IconButton
            className={classes.deleteButton}
            onClick={e => {
              e.stopPropagation();
              handleDelete();
            }}
            size="small"
          >
            {DeleteIcon}
          </IconButton>
        </div>
      </div>
      <Collapse unmountOnExit={true} in={expandedState}>
        <div className={classes.preview}>
          <ComponentPreview text={text} images={imagesArray} />
        </div>
      </Collapse>
      {node.slots.length > 0 && (
        <div className={classes.slots}>
          {node.slots.map(slotNode => {
            return (
              <Slot
                key={slotNode.name}
                node={slotNode}
                spec={slots[slotNode.name]}
                showTitle={node.slots.length > 1}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default withStyles(styles, { name: "DcComponentTreeComponent" })(
  Component
);
