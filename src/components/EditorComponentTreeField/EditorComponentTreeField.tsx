import React, { useMemo, useState } from "react";

import {
  Theme,
  withStyles,
  WithStyles,
  Modal,
  Backdrop,
  Fade,
  IconButton,
  Typography
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

import clsx from "clsx";
import {
  EditorField,
  WithEditorFieldProps
} from "unofficial-dynamic-content-ui";

import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Toolbox from "../Toolbox";

import { Slot } from "..";
import {
  ComponentData,
  ComponentSpec,
  ComponentTreeNode,
  ImmutableTreeData,
  SlotTreeNode,
  TreeSpec
} from "../../model";
import { WithTreeSpec } from "../WithTreeSpec/WithTreeSpec";
import { EditorComponentTreeContext } from "./EditorComponentTreeContext";

export const styles = (theme: Theme) => ({
  root: {
    display: "flex",
    border: "1px solid rgba(157,162,162,.3)",
    "border-radius": 5
  },
  toolboxPane: {
    flex: 0.3,
    "border-right": "1px solid #e5e5e5"
  },
  toolbox: {},
  toolbar: {
    "background-color": "#f5f5f5",
    "border-bottom": "1px solid #e5e5e5",
    "border-radius": 5,
    color: theme.palette.primary.main,
    "padding-left": 10,
    "padding-right": 10
  },
  canvasPane: {
    flex: 0.7,
    background: "#f2f2f2",
    padding: "10px 10px 10px 10px",
    maxHeight: (props: any) => props.schema && props.schema.height ? props.schema.height - 30 : 400,
    overflow: 'scroll'
  },
  grow: {
    flexGrow: 1
  },
  slotWrap: {
    marginBottom: 10
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    maxHeight: '90%',
    overflow: 'hidden',
    width: '60%',
    backgroundColor: "#f2f2f2",
    "&:focus": {
      outline: "none"
    }
  },
  dialogHeader: {
    background: '#e5e5e5',
    paddingLeft: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dialogContent: {
    padding: 10,
    overflow: 'scroll',
    maxHeight: 300
  }
});

export interface Props
  extends WithEditorFieldProps<WithStyles<typeof styles>> {
}

const EditorComponentTreeField: React.SFC<Props> = (props: Props) => {
  const { schema, value, onChange, classes, pointer } = props;

  const spec: TreeSpec = TreeSpec.fromSchema(schema);
  const populatedValue: ImmutableTreeData = new ImmutableTreeData(spec, value, '');
  const data: ImmutableTreeData = new ImmutableTreeData(spec, populatedValue.toJSON(), pointer);

  const [selectedNodePointer, setSelectedNodePointer] = useState<string | undefined>(undefined);

  const [selectedComponent, selectedComponentSpec] = useMemo((): [
    ComponentTreeNode | undefined,
    ComponentSpec | undefined
    ] => {
    const selectedNode = data.getNode(selectedNodePointer);
    if (!selectedNode || selectedNode.nodeType !== "component") {
      return [undefined, undefined];
    }

    const componentNode: ComponentTreeNode = selectedNode as ComponentTreeNode;
    const componentSpec = spec.getComponent(componentNode.name);

    if (!componentSpec) {
      return [undefined, undefined];
    }

    return [componentNode, componentSpec];
  }, [selectedNodePointer, data]);

  const renderModal = !!(selectedNodePointer && selectedComponent && selectedComponent.spec && Object.keys(selectedComponent.spec.properties || {}).length);

  const handleUpdate = (newData: ImmutableTreeData) => {
    if (onChange) {
      onChange(newData.toJSON());
    }
  };

  const handleInsertComponent = (
    parent: string,
    component: ComponentData,
    index?: number
  ) => {
    handleUpdate(data.insertComponent(parent, component, index));
  };

  const handleChangeProperties = (val: any) => {
    handleUpdate(data.setComponentProperties(selectedNodePointer, val));
  };

  const handleDeleteComponent = (point: string) => {
    handleUpdate(data.deleteComponent(point));
  };

  const handleMoveComponent = (
    pointerVal: string,
    newParent: string,
    index: number = -1
  ) => {
    const newModel = data.moveComponent(pointerVal, newParent, index);
    handleUpdate(newModel);
    if (selectedNodePointer === pointerVal) {
      if (index === -1) {
        const parent = newModel.getNode(newParent);
        if (parent && parent.nodeType === "slot") {
          setSelectedNodePointer(
            `${newParent}/${(parent as SlotTreeNode).children.length - 1}`
          );
        }
      } else {
        setSelectedNodePointer(`${newParent}/${index}`);
      }
    }
  };

  return (
    <WithTreeSpec value={spec}>
      <DndProvider backend={HTML5Backend}>
        <EditorComponentTreeContext.Provider
          value={{
            selectedNode: selectedNodePointer,
            setSelectedNode: setSelectedNodePointer,
            insertComponent: handleInsertComponent,
            deleteComponent: handleDeleteComponent,
            moveComponent: handleMoveComponent
          }}
        >
          <div className={clsx(classes.root)}>
            <div className={clsx(classes.toolboxPane)}>
              <Toolbox height={schema.height} data={data} />
            </div>
            <div className={clsx(classes.canvasPane)}>
              {data.rootSlots.map(rootSlot => {
                return (
                  <div className={clsx(classes.slotWrap)}>
                    <Slot
                      key={rootSlot.name}
                      node={rootSlot}
                      spec={spec.slots[rootSlot.name]}
                      showTitle={data.rootSlots.length > 1}
                    />
                  </div>
                );
              })}
            </div>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={clsx(classes.modal)}
              open={renderModal}
              onClose={() => setSelectedNodePointer(undefined)}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={renderModal}>
                <div className={clsx(classes.paper)}>
                  <div className={clsx(classes.dialogHeader)}>
                    <Typography variant="body1" className={clsx(classes.dialogHeader)}>
                      {selectedComponent && selectedComponent.spec ? selectedComponent.spec.title || selectedComponent.spec.name : ''}
                    </Typography>
                    <IconButton aria-label="close" onClick={() => setSelectedNodePointer(undefined)}>
                      <Close />
                    </IconButton>
                  </div>
                  <div className={clsx(classes.dialogContent)}>
                    {selectedComponent && selectedComponentSpec ? (
                      <EditorField
                        {...props}
                        onChange={handleChangeProperties}
                        schema={{
                          type: "object",
                          properties: selectedComponentSpec.properties
                        }}
                        value={selectedComponent.properties}
                        pointer={`${selectedComponent.nodePointer}/properties`}
                      />
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              </Fade>
            </Modal>
          </div>
        </EditorComponentTreeContext.Provider>
      </DndProvider>
    </WithTreeSpec>
  );
};

export default withStyles(styles as any, {
  name: "DcEditorComponentTreeField"
})(EditorComponentTreeField);
