import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
  WithStyles,
  withStyles
} from "@material-ui/core";
import clsx from "clsx";
import React, { PropsWithChildren } from "react";

import Collapse from "@material-ui/core/Collapse";
import { KeyboardArrowDown, KeyboardArrowRight } from "@material-ui/icons";
import TreeViewContext from "../TreeView/TreeViewContext";

const styles = (theme: Theme) => ({
  root: {
    listStyle: "none",
    outline: 0,
    WebkitTapHighlightColor: "transparent",
    color: (props: any) =>
      props.type === "component"
        ? theme.palette.text.primary
        : theme.palette.text.secondary,
    display: "block"
  },
  /* Pseudo-class applied to the root element when expanded. */
  expanded: {},
  /* Styles applied to the `role="group"` element. */
  group: {
    margin: 0,
    padding: 0,
    marginLeft: 0
  },
  /* Styles applied to the tree node content. */
  content: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.text.primary
    }
  },
  selected: {
    color: theme.palette.primary.main
  },
  /* Styles applied to the tree node icon and collapse/expand icon. */
  iconContainer: {
    width: 24,
    minWidth: 53,
    display: "flex",
    justifyContent: "flex-start",
    marginLeft: 7
  },
  indent: {
    width: 24
  },
  /* Styles applied to the label element. */
  label: {
    width: "100%"
  }
});

export interface TreeItemProps
  extends PropsWithChildren<WithStyles<typeof styles>> {
  nodeId?: string;
  label: string;
  type?: string;
  open?: boolean;
  icon?: React.ReactElement;
}

const TreeItem: React.SFC<TreeItemProps> = (props: TreeItemProps) => {
  const {
    children,
    classes,
    nodeId = "",
    label,
    type,
    icon,
    open = true,
    ...other
  } = props;

  const { isExpanded, isSelected, toggle, select } = React.useContext(
    TreeViewContext
  );

  const nodeRef = React.useRef(null);
  const contentRef = React.useRef(null);

  const expandable = Boolean(
    Array.isArray(children) ? children.length : children
  );
  const expanded = isExpanded ? isExpanded(nodeId) : false;
  const selected = isSelected ? isSelected(nodeId) : false;

  const handleClick = (event: any) => {
    if (!selected) {
      select(nodeId);
    }

    if (expandable && !expanded && toggle) {
      toggle(event, nodeId);
    }
  };

  const handleClickIcon = (event: any) => {
    event.stopPropagation();
    if (expandable && toggle) {
      toggle(event, nodeId);
    }
  };

  const expandIcon = expandable ? (
    expanded ? (
      <KeyboardArrowDown style={{ width: 24, height: 24 }} />
    ) : (
      <KeyboardArrowRight style={{ width: 24, height: 24 }} />
    )
  ) : null;

  return (
    <ListItem
      className={clsx(classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected
      })}
      disableRipple={true}
      component={"li"}
      button={true}
      role="treeitem"
      title={label}
      aria-expanded={expandable ? expanded : undefined}
      {...other}
    >
      <div className={classes.content} ref={contentRef} onClick={handleClick}>
        {expandIcon ? (
          <ListItemIcon
            onClick={handleClickIcon}
            className={classes.iconContainer}
          >
            {expandIcon}
          </ListItemIcon>
        ) : (
          <div className={clsx(classes.indent)} />
        )}
        {icon}
        <ListItemText
          primary={open ? label : ""}
          onClick={type === "component" ? handleClickIcon : () => ""}
        />
      </div>
      {children && (
        <Collapse
          unmountOnExit={true}
          className={classes.group}
          in={expanded}
          component="ul"
        >
          {children}
        </Collapse>
      )}
    </ListItem>
  );
};

export default withStyles(styles, { name: "DcTreeItem" })(TreeItem);
