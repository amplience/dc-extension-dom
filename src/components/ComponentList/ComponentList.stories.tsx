import React from "react";
import ComponentList from "./ComponentListTree";

import { storiesOf } from "@storybook/react";
import { withTheme } from "unofficial-dynamic-content-ui";
import { spec } from "../../fixtures";
import { styles } from "../Toolbox/Toolbox.stories";
import { WithTreeSpecExtended } from "../WithTreeSpec/WithTreeSpecExtended";

storiesOf("Component List", module).add("Default", () =>
  withTheme(
    <WithTreeSpecExtended value={spec}>
      <div style={styles.root}>
        <div style={styles.toolboxPane}>
          <ComponentList />
        </div>
      </div>
    </WithTreeSpecExtended>
  )
);
