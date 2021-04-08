import React from "react";
import Component from "./Component";

import { storiesOf } from "@storybook/react";
import { withTheme } from "unofficial-dynamic-content-ui";
import { spec, specEmpty } from "../../fixtures";
import { withChildren, withChildrenPreview, withChildrenImagePreview } from "../Slot/Slot.stories";
import { styles } from "../Toolbox/Toolbox.stories";
import { WithTreeSpecExtended } from "../WithTreeSpec/WithTreeSpecExtended";

const getSpec = (name: string) => {
  return spec.components.find(x => x.name === name);
};

storiesOf("Slot Component", module)
  .add("Default", () => {
    const specValue = getSpec(withChildren.children[0].name);
    return withTheme(
      <WithTreeSpecExtended value={specEmpty}>
        <div style={styles.root}>
          <div style={styles.toolboxPane}>
            {specValue && (
              <Component spec={specValue} node={withChildren.children[0]} />
            )}
          </div>
        </div>
      </WithTreeSpecExtended>
    );
  }).add("With Preview", () => {
  const specValue = getSpec(withChildrenPreview.children[0].name);
  return withTheme(
    <WithTreeSpecExtended value={specEmpty}>
      <div style={styles.root}>
        <div style={styles.toolboxPane}>
          {specValue && (
            <Component spec={specValue} node={withChildrenPreview.children[0]} />
          )}
        </div>
      </div>
    </WithTreeSpecExtended>
  );
})
  .add("With Image Preview", () => {
    const specValue = getSpec(withChildrenImagePreview.children[0].name);
    return withTheme(
      <WithTreeSpecExtended value={specEmpty}>
        <div style={styles.root}>
          <div style={styles.toolboxPane}>
            {specValue && (
              <Component spec={specValue} node={withChildrenImagePreview.children[0]} />
            )}
          </div>
        </div>
      </WithTreeSpecExtended>
    );
  });
