import { storiesOf } from "@storybook/react";
import React from "react";
import { dataEmpty, dataNotEmpty, spec, specEmpty } from "../../fixtures";
import { WithTreeSpecExtended } from "../WithTreeSpec/WithTreeSpecExtended";
import Navigator from "./Navigator";

import { withTheme } from "unofficial-dynamic-content-ui";

export const styles = {
  root: {
    display: "flex",
    border: "1px solid rgba(157,162,162,.3)",
    "border-radius": 5
  },
  toolboxPane: {
    flex: 0.2,
    "border-right": "1px solid #e5e5e5"
  }
};

storiesOf("Navigator", module)
  .add("Default", () =>
    withTheme(
      <WithTreeSpecExtended value={spec}>
        <div style={styles.root}>
          <div style={styles.toolboxPane}>
            <Navigator data={dataNotEmpty} />
          </div>
        </div>
      </WithTreeSpecExtended>
    )
  )
  .add("Empty", () =>
    withTheme(
      <WithTreeSpecExtended value={specEmpty}>
        <div style={styles.root}>
          <div style={styles.toolboxPane}>
            <Navigator data={dataEmpty} />
          </div>
        </div>
      </WithTreeSpecExtended>
    )
  );
