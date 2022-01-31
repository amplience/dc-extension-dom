import { withStyles } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import SettingsIcon from "@material-ui/icons/Settings";
import React from "react";
import { useTreeSpec } from "../WithTreeSpec/WithTreeSpec";
const isUrl = /^(http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

export const styles = {
  root: {
    fontSize: (props: any) => (props.small ? "16px !important" : 24),
    marginLeft: "6px"
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
        {component.icon.match(isUrl) ? (
          <img style={{ width: "100%" }} src={component.icon} />
        ) : (
          component.icon
        )}
      </Icon>
    );
  }

  return <SettingsIcon {...other} />;
};
export default withStyles(styles)(ComponentIcon);
