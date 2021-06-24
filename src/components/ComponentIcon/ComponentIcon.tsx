import { withStyles } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import SettingsIcon from "@material-ui/icons/Settings";
import React from "react";
import { useTreeSpec } from "../WithTreeSpec/WithTreeSpec";

export const styles = {
  root: {
    fontSize: (props: any) => (props.small ? "16px !important" : 24)
  }
};

export interface Props {
  name?: string;

  [key: string]: any;
}

const ComponentIcon: React.SFC<Props> = (props: Props) => {
  const { name, classes, ...other } = props;

  const treeSpec = useTreeSpec();
  const component = treeSpec.getComponent(name || "");

  if (component && component.icon) {
    return (
      <Icon className={classes.root} {...other}>
        {component.icon}
      </Icon>
    );
  }

  return <SettingsIcon {...other} />;
};
export default withStyles(styles)(ComponentIcon);
