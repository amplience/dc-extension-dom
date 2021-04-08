import { ImmutableTreeData, TreeSpec } from "../model";
import { COMPONENTS } from "./index";

export const schema = {
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

export const schemaEmpty = {
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
          components: []
        }
      }
    }
  },

  definitions: {}
};

const value = {
  children: []
};

const valueNotEmpty = {
  children: [
    {
      name: "row",
      properties: {},
      slots: {
        children: [
          {
            name: "typography",
            properties: {},
            slots: {}
          }
        ]
      }
    }
  ]
};

export const spec: TreeSpec = TreeSpec.fromSchema(schema.properties.components);
export const specEmpty: TreeSpec = TreeSpec.fromSchema(
  schemaEmpty.properties.components
);

export const data: ImmutableTreeData = new ImmutableTreeData(spec, value, "");
export const dataNotEmpty: ImmutableTreeData = new ImmutableTreeData(
  spec,
  valueNotEmpty,
  ""
);
export const dataEmpty: ImmutableTreeData = new ImmutableTreeData(
  specEmpty,
  value,
  ""
);
