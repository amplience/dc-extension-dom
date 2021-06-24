import {
  Link,
  ListItem,
  ListItemIcon,
  ListItemText,
  WithStyles,
  withStyles
} from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import clsx from "clsx";
import React from "react";
import { useDrag } from "react-dnd";
import { ComponentSpec } from "../../model";
import ComponentIcon from "../ComponentIcon";

const styles = {
  root: {
    transform: "translate3d(0, 0, 0)",
    paddingLeft: (props: any) => (props.small ? 5 : 16)
  },
  info: {
    verticalAlign: "middle"
  },
  iconRoot: {
    minWidth: 40
  }
};

interface Props extends WithStyles {
  component: ComponentSpec;
  className?: string;
  small?: boolean;
  style?: React.CSSProperties;
}

const ComponentListItem: React.SFC<Props> = props => {
  const { component, classes, small, ...other } = props;

  const [{ dragging }, drag, preview] = useDrag({
    item: {
      type: "component",
      data: {
        name: component.name,
        properties: {},
        slots: {}
      }
    },
    collect: monitor => ({
      dragging: monitor.isDragging()
    })
  });

  return (
    <ListItem
      disableRipple={true}
      component={"li"}
      className={clsx(classes.root)}
      button={true}
      ref={drag}
      title={component.title}
    >
      <ListItemIcon className={classes.iconRoot}>
        <ComponentIcon small={small} name={component.name} />
      </ListItemIcon>
      <ListItemText
        primary={component.title}
        secondary={component.description}
      />
      {component.infoLink ? (
        <Link href={component.infoLink} rel="noopener" target="_blank">
          <InfoOutlinedIcon color="primary" className={clsx(classes.info)} />
        </Link>
      ) : null}
    </ListItem>
  );
};

export default withStyles(styles)(ComponentListItem);
