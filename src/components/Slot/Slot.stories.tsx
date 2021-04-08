import { storiesOf } from "@storybook/react";
import React from "react";
import { withTheme } from "unofficial-dynamic-content-ui";
import { COMPONENTS } from "../../fixtures";
import { SlotSpec, SlotTreeNode, TreeSpec } from "../../model";
import { WithTreeSpecExtended } from "../WithTreeSpec/WithTreeSpecExtended";
import Slot from "./Slot";

const styles = {
  canvasPane: {
    flex: 0.7,
    background: "#f2f2f2",
    padding: "10px 10px 10px 10px"
  }
};
const slotSpec: SlotSpec = {};

const emptyNode: SlotTreeNode = {
  name: "children",
  nodeParent: undefined,
  nodePointer: "/children",
  nodeType: "slot",
  spec: {} as any,
  children: []
};

export const withChildren: SlotTreeNode = {
  name: "children",
  nodeParent: undefined,
  nodePointer: "/children",
  nodeType: "slot",
  spec: {} as any,
  children: [
    {
      name: "typography",
      nodeParent: "/children",
      nodePointer: "/children/0",
      nodeType: "component",
      properties: {},
      spec: {} as any,
      slots: []
    }
  ]
};

export const withChildrenPreview: SlotTreeNode = {
  name: "children",
  nodeParent: undefined,
  nodePointer: "/children",
  nodeType: "slot",
  spec: {} as any,
  children: [
    {
      name: "typography",
      nodeParent: "/children",
      nodePointer: "/children/0",
      nodeType: "component",
      properties: {
        text: "Hello",
        variant: "h1"
      },
      spec: {
        preview: {
          text: "/text"
        }
      } as any,
      slots: []
    }
  ]
};

export const withChildrenImagePreview: SlotTreeNode = {
  name: "children",
  nodeParent: undefined,
  nodePointer: "/children",
  nodeType: "slot",
  spec: {} as any,
  children: [
    {
      name: "image",
      nodeParent: "/children",
      nodePointer: "/children/0",
      nodeType: "component",
      properties: {
        image: {
          defaultHost: "cdn.media.amplience.net",
          endpoint: "csdemo",
          id: "ec083469-ca5e-4bef-ab26-f7dd80fe6cc5",
          name: "all the space look",
          _meta: {
            schema:
              "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
          }
        },
        image1: {
          defaultHost: "cdn.media.amplience.net",
          endpoint: "csdemo",
          id: "ec083469-ca5e-4bef-ab26-f7dd80fe6cc5",
          name: "all the space look",
          _meta: {
            schema:
              "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
          }
        },
        image2: {
          defaultHost: "cdn.media.amplience.net",
          endpoint: "csdemo",
          id: "ec083469-ca5e-4bef-ab26-f7dd80fe6cc5",
          name: "all the space look",
          _meta: {
            schema:
              "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
          }
        },
        image3: {
          defaultHost: "cdn.media.amplience.net",
          endpoint: "csdemo",
          id: "ec083469-ca5e-4bef-ab26-f7dd80fe6cc5",
          name: "all the space look",
          _meta: {
            schema:
              "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
          }
        },
        image4: {
          defaultHost: "cdn.media.amplience.net",
          endpoint: "csdemo",
          id: "ec083469-ca5e-4bef-ab26-f7dd80fe6cc5",
          name: "all the space look",
          _meta: {
            schema:
              "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
          }
        },
        image5: {
          defaultHost: "cdn.media.amplience.net",
          endpoint: "csdemo",
          id: "ec083469-ca5e-4bef-ab26-f7dd80fe6cc5",
          name: "all the space look",
          _meta: {
            schema:
              "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
          }
        }
      },
      spec: {} as any,
      slots: []
    }
  ]
};

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

const spec: TreeSpec = TreeSpec.fromSchema(schema.properties.components);

const StyleWrapper = (props: any) => (
  <div style={styles.canvasPane}>{props.children}</div>
);

storiesOf("Slot", module)
  .add("Default Title", () =>
    withTheme(
      <WithTreeSpecExtended value={spec}>
        <StyleWrapper>
          <Slot node={emptyNode} showTitle={true} spec={slotSpec} />
        </StyleWrapper>
      </WithTreeSpecExtended>
    )
  )
  .add("Custom Title", () =>
    withTheme(
      <WithTreeSpecExtended value={spec}>
        <StyleWrapper>
          <Slot
            node={emptyNode}
            showTitle={true}
            spec={{ ...slotSpec, title: "Page Layout" }}
          />
        </StyleWrapper>
      </WithTreeSpecExtended>
    )
  )
  .add("No Title", () =>
    withTheme(
      <WithTreeSpecExtended value={spec}>
        <StyleWrapper>
          <Slot node={emptyNode} spec={slotSpec} />
        </StyleWrapper>
      </WithTreeSpecExtended>
    )
  )
  .add("With Components", () =>
    withTheme(
      <WithTreeSpecExtended value={spec}>
        <StyleWrapper>
          <Slot node={withChildren} spec={slotSpec} />
        </StyleWrapper>
      </WithTreeSpecExtended>
    )
  )
  .add("With Components Preview", () =>
    withTheme(
      <WithTreeSpecExtended value={spec}>
        <StyleWrapper>
          <Slot node={withChildrenPreview} spec={slotSpec} />
        </StyleWrapper>
      </WithTreeSpecExtended>
    )
  );
