import { Typography, withStyles, WithStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

const styles = () => ({
  root: {
    overflow: "hidden"
  },
  image: {
    maxHeight: 200,
    marginRight: 5
  },
  text: {
    margin: 5
  },
  imageContainer: {
    display: "flex",
    overflow: "scroll",
    padding: 5
  }
});

interface Props extends WithStyles<typeof styles> {
  className?: string;
  style?: React.CSSProperties;
  images?: any;
  text?: string;
}

const ComponentPreview: React.SFC<Props> = props => {
  const { classes, images, text, ...other } = props;

  return (
    <div className={clsx(classes.root)}>
      {images && images.length ? (
        <div className={clsx(classes.imageContainer)}>
          {images.map((imageObject: any) => (
            <img
              className={classes.image}
              alt="preview"
              src={`//${imageObject.defaultHost}/i/${imageObject.endpoint}/${imageObject.name}`}
            />
          ))}
        </div>
      ) : null}
      {text ? (
        <Typography className={clsx(classes.text)} variant="body1">
          {text}
        </Typography>
      ) : null}
    </div>
  );
};

export default withStyles(styles)(ComponentPreview);
