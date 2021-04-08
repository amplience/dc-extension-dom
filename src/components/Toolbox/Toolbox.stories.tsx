import { storiesOf } from "@storybook/react";
import React from "react";
import { withTheme } from "unofficial-dynamic-content-ui";
import { data, spec } from "../../fixtures";
import { WithTreeSpecExtended } from "../WithTreeSpec/WithTreeSpecExtended";
import Toolbox from "./Toolbox";

export const styles = {
  root: {
    border: "1px solid rgba(157,162,162,.3)",
    "border-radius": 5
  },
  toolboxPane: {
    flex: 0.2,
    "border-right": "1px solid #e5e5e5"
  }
};

storiesOf("Toolbox", module)
  .add("Default", () =>
    withTheme(
      <WithTreeSpecExtended value={spec}>
        <div style={styles.root}>
          <div style={styles.toolboxPane}>
            <Toolbox data={data} />
          </div>
        </div>
      </WithTreeSpecExtended>
    )
  );