import { storiesOf } from "@storybook/react";
import React from "react";
import {
  EditorRegistry,
  getDefaultRegistry,
  withEditor
} from "unofficial-dynamic-content-ui";
import {
  COMPONENTS,
} from "../../fixtures";
import EditorComponentTreeField from "./EditorComponentTreeField";

const schema = {
  type: "object",

  properties: {
    components: {
      type: "object",
      "ui:widget": "component-tree",
      "ui:extension": {
        params: {
          slots: {
            children: {
              allow: "*"
            }
          },
          components: COMPONENTS
        }
      }
    }
  },

  definitions: {}
};

const value = {
  children: [
    {
      name: "row",
      properties: {},
      slots: {
        children: [{ name: "typography" }]
      }
    }
  ]
};

const registry: EditorRegistry = getDefaultRegistry();
registry.fieldProviders.splice(0, 0, (fieldSchema: any) =>
  fieldSchema && fieldSchema["ui:widget"] === "component-tree"
    ? EditorComponentTreeField
    : undefined
);

storiesOf("Editor Field", module).add("Editor", () =>
  withEditor(schema.properties.components, value, registry)
);
