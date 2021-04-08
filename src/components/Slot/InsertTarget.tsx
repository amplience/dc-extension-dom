import { withStyles, WithStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { useDrop } from "react-dnd";

const styles = () => ({
  root: {
    width: "100%",
    height: 8
  },
  hovering: {
    background: "#039be5"
  }
});

interface Props extends WithStyles<typeof styles> {
  className?: string;
  style?: React.CSSProperties;

  canDrop: (item: any) => boolean;
  onDrop: (item: any) => void;
}

const InsertTarget: React.SFC<Props> = props => {
  const { classes, canDrop, onDrop, ...other } = props;

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
      const isHoveringState = monitor.isOver({ shallow: true });

      if (!isHoveringState) {
        return undefined;
      }

      if (didDrop) {
        return;
      }

      onDrop(dropResult);
    }
  });

  return (
    <div
      className={clsx(classes.root, {
        [classes.hovering]: isHovering && isCanDrop
      })}
      ref={drop}
    />
  );
};

export default withStyles(styles)(InsertTarget);
