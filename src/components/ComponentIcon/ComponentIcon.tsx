import Icon from "@material-ui/core/Icon";
import SettingsIcon from "@material-ui/icons/Settings";
import React from "react";
import { useTreeSpec } from "../WithTreeSpec/WithTreeSpec";

export const styles = {};

export interface Props {
  name?: string;

  [key: string]: any;
}

const ComponentIcon: React.SFC<Props> = (props: Props) => {
  const { name, ...other } = props;

  const treeSpec = useTreeSpec();
  const component = treeSpec.getComponent(name || "");

  if (component && component.icon) {
    return <Icon {...other}>{component.icon}</Icon>;
  }

  return <SettingsIcon {...other} />;
};
export default ComponentIcon;
