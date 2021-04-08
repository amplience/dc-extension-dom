import { Tab, Tabs, WithStyles, withStyles } from "@material-ui/core";
import React, { PropsWithChildren, useState } from "react";
import { ImmutableTreeData, TreeSpec } from "../../model";
import ComponentList from "../ComponentList";
import Navigator from "../Navigator";

export const styles = {
  root: {
    padding: 0,
    margin: 0,
    listStyle: "none"
  },
  tabs: {
    width: "100%"
  }
};

export interface Props extends PropsWithChildren<WithStyles<typeof styles>> {
  data?: ImmutableTreeData;
  spec?: TreeSpec;
  height?: number;
}

export const Toolbox: React.SFC<Props> = (props: Props) => {
  const { classes, data, height, ...other } = props;

  const [value, setValue] = useState(0);
  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        className={classes.tabs}
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        variant="standard"
      >
        <Tab label="Components" />
        <Tab label="Navigator" />
      </Tabs>
      {value === 0 && <ComponentList height={height} />}
      {value === 1 && data && <Navigator height={height} data={data} />}
    </div>
  );
};

export default withStyles(styles, { name: "DcToolbox" })(Toolbox);
