import { storiesOf } from "@storybook/react";
import React from "react";
import { withTheme } from "unofficial-dynamic-content-ui";
import { COMPONENTS } from "../../fixtures";
import { TreeSpec } from "../../model";
import { WithTreeSpec } from "../WithTreeSpec/WithTreeSpec";
import ComponentIcon from "./ComponentIcon";

const spec = new TreeSpec(COMPONENTS);

storiesOf("Icon", module)
  .add("Default", () => withTheme(<ComponentIcon />))
  .add("Specific Component", () =>
    withTheme(
      <WithTreeSpec value={spec}>
        <ComponentIcon name="typography" />
      </WithTreeSpec>
    )
  );
