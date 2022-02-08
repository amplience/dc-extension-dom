export const ROW_SPEC = {
  name: "row",
  title: "Row",
  description: "",
  icon: "calendar_view_day",
  properties: {},
  slots: {
    children: {
      allow: "*"
    }
  }
};

export const COLUMN_SPEC = {
  name: "column",
  title: "Column",
  description: "",
  icon: "view_column",
  properties: {},
  slots: {
    children: {
      allow: "*"
    }
  }
};

export const TYPOGRAPHY_SPEC = {
  name: "typography",
  title: "Typography",
  icon: "text_format",
  description: "",
  preview: {
    text: "/text"
  },
  properties: {
    variant: {
      type: "string",
      title: "Variant",
      enum: ["h1", "h2", "h3", "h4", "h5", "h6", "body1", "body2"]
    },
    text: {
      type: "string",
      title: "Text"
    },
    color: {
      type: "string",
      format: "color",
      title: "Text"
    }
  },
  slots: {}
};

export const IMAGE_SPEC = {
  name: "image",
  title: "Image",
  icon: "image",
  description: "",
  properties: {
    image: {
      allOf: [
        {
          $ref:
            "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
        }
      ],
      default: {
        _meta: {
          schema:
            "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
        },
        id: "286e4760-1812-4e3a-81ab-d2e3bf32b9b5",
        name: "blue-tie",
        endpoint: "ampproduct",
        defaultHost: "cdn.media.amplience.net"
      }
    }
  },
  slots: {}
};

export const PRODUCT_IMAGE_SPEC = {
  name: "product_image",
  title: "Product Image",
  icon: "sell",
  group: "Product",
  description: "Some description here",
  properties: {
    variant: {
      type: "string",
      enum: ["full-width", "column"]
    }
  },
  slots: {}
};

export const PRODUCT_NAME_SPEC = {
  name: "product_name",
  title: "Product Name",
  icon: "sell",
  group: "Product",
  description: "",
  properties: {
    variant: {
      type: "string",
      title: "Variant",
      enum: ["h1", "h2", "h3", "h4", "h5", "h6", "body1", "body2"]
    }
  },
  slots: {}
};

export const PRODUCT_PRICE_SPEC = {
  name: "product_price",
  title: "Product Price",
  icon: "sell",
  group: "Product",
  description: "",
  properties: {
    variant: {
      type: "string",
      title: "Variant",
      enum: ["h1", "h2", "h3", "h4", "h5", "h6", "body1", "body2"]
    }
  },
  slots: {}
};

export const CONTENT_SLOT_SPEC = {
  name: "content_slot",
  title: "Content Slot",
  icon: "move_to_inbox",
  description: "",
  properties: {},
  slots: {}
};

export const RULE_BASED_CONTENT_SPEC = {
  name: "rule_based_content",
  title: "Rule Based Content",
  icon: "rule",
  description: "",
  properties: {},
  slots: {}
};

export const COMPONENTS = [
  ROW_SPEC,
  COLUMN_SPEC,
  TYPOGRAPHY_SPEC,
  IMAGE_SPEC,
  PRODUCT_IMAGE_SPEC,
  PRODUCT_NAME_SPEC,
  PRODUCT_PRICE_SPEC,
  CONTENT_SLOT_SPEC,
  RULE_BASED_CONTENT_SPEC
];
