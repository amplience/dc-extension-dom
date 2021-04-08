import { ListItem, ListItemIcon, ListItemText, Link, WithStyles, withStyles } from "@material-ui/core";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import React from "react";
import { useDrag } from "react-dnd";
import { ComponentSpec } from "../../model";
import ComponentIcon from "../ComponentIcon";
import clsx from "clsx";

const styles = {
  root: {
    transform: 'translate3d(0, 0, 0)'
  },
  info: {
    verticalAlign: 'middle'
  }
};

interface Props extends WithStyles {
  component: ComponentSpec;
  className?: string;
  style?: React.CSSProperties;
}

const ComponentListItem: React.SFC<Props> = props => {
  const { component, classes, ...other } = props;

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
    <ListItem disableRipple component={'li'} className={clsx(classes.root)} button={true} ref={drag}>
      <ListItemIcon>
        <ComponentIcon name={component.name} />
      </ListItemIcon>
      <ListItemText
        primary={component.title}
        secondary={component.description}
      />
      {component.infoLink ? (
        <Link href={component.infoLink} rel="noopener" target="_blank">
          <InfoOutlinedIcon
            color="primary"
            className={clsx(classes.info)}
          />
        </Link>
      ) : null}

    </ListItem>
  );
};

export default withStyles(styles)(ComponentListItem);
