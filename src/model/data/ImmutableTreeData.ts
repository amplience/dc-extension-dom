import { SlotSpec, TreeSpec } from "../spec";
import { ComponentData, ComponentTreeNode } from "./ComponentTreeNode";
import { SlotTreeNode } from "./SlotTreeNode";
import { TreeNode } from "./TreeNode";

export const pointerValue = (value: any = {}, pointer: string): any => {
  if (pointer.startsWith("/")) {
    pointer = pointer.slice(1);
  }
  const components = pointer.split("/");
  let result: any = value;

  for (const component of components) {
    result = result[component];
    if (!result) {
      return result;
    }
  }

  return result;
};

export class ImmutableTreeData {
  public rootSlots: SlotTreeNode[];
  public allNodes: { [nodePointer: string]: TreeNode };

  constructor(
    public spec: TreeSpec,
    public value: { [slotName: string]: ComponentData[] } = {},
    private fieldPointer: string
  ) {
    this.allNodes = {};

    const convertComponent = (
      data: ComponentData,
      parent: string,
      index: number
    ): ComponentTreeNode | undefined => {
      const componentSpec = spec.getComponent(data.name);

      if (!componentSpec) {
        return undefined;
      }

      const slotSpecs = componentSpec.slots || {};
      const pointer = `${parent}/${index}`;

      const node: ComponentTreeNode = {
        nodeType: "component",
        nodeParent: parent,
        nodePointer: pointer,
        name: data.name,
        properties: data.properties,
        spec: componentSpec,
        slots: Object.keys(slotSpecs).map(slotName => {
          const items: ComponentData[] = data.slots && data.slots[slotName] || [];
          return convertSlot(
            slotName,
            slotSpecs[slotName],
            items,
            `${pointer}/slots`
          );
        })
      };

      this.allNodes[node.nodePointer] = node;
      return node;
    };

    const convertSlot = (
      name: string,
      specValue: SlotSpec,
      data: ComponentData[] = [],
      parent: string
    ): SlotTreeNode => {
      const pointer = `${parent}/${name}`;

      const node: SlotTreeNode = {
        name,
        nodePointer: pointer,
        nodeParent: parent,
        nodeType: "slot",
        spec: specValue,
        children: data
          .map((itemData, index) => convertComponent(itemData, pointer, index))
          .filter(x => x !== undefined) as ComponentTreeNode[]
      };
      this.allNodes[node.nodePointer] = node;
      return node;
    };

    this.rootSlots = Object.keys(spec.slots).map(rootSlotName => {
      const data: ComponentData[] = value[rootSlotName] || [];
      return convertSlot(rootSlotName, spec.slots[rootSlotName], data, "");
    });
  }

  public setComponentProperties(
    pointer: string | undefined,
    properties: any
  ): ImmutableTreeData {
    if (!pointer) {
      return this;
    }

    const newValue = this.cloneValue();
    const parentNode = pointerValue(newValue, pointer);

    if (!parentNode) {
      return this;
    }

    parentNode.properties = properties;
    return new ImmutableTreeData(this.spec, newValue, this.fieldPointer);
  }

  public insertComponent(
    parent: string,
    component: ComponentData,
    index: number = -1
  ): ImmutableTreeData {
    const newValue = this.cloneValue();
    debugger;
    const parentNode = pointerValue(newValue, parent);

    if (!parentNode) {
      return this;
    }

    if (index === -1) {
      parentNode.push(component);
    } else {
      parentNode.splice(index, 0, component);
    }

    return new ImmutableTreeData(this.spec, newValue, this.fieldPointer);
  }

  public deleteComponent(pointer: string): ImmutableTreeData {
    const node = this.getNode(pointer);
    if (!node || !node.nodeParent) {
      return this;
    }

    const newValue = this.cloneValue();

    const parentValue = pointerValue(newValue, node.nodeParent);
    const childValue = pointerValue(newValue, node.nodePointer);

    if (!parentValue || !childValue) {
      return this;
    }

    const index = parentValue.indexOf(childValue);
    if (index === -1) {
      return this;
    }

    parentValue.splice(index, 1);

    return new ImmutableTreeData(this.spec, newValue, this.fieldPointer);
  }

  public moveComponent(
    pointer: string,
    newParent: string,
    index: number = -1
  ): ImmutableTreeData {
    if (newParent.startsWith(pointer + "/")) {
      // You cannot move a component into itself
      return this;
    }

    const node = this.getNode(pointer);
    if (!node) {
      return this;
    }

    const newValue = this.cloneValue();

    const componentValue = pointerValue(newValue, pointer);
    const componentParentValue = node.nodeParent
      ? pointerValue(newValue, node.nodeParent)
      : undefined;
    const newParentValue = pointerValue(newValue, newParent);

    if (!componentValue || !newParentValue) {
      return this;
    }

    const isSameParent = newParentValue === componentParentValue;
    const currentIndex = componentParentValue
      ? componentParentValue.indexOf(componentValue)
      : -1;

    if (isSameParent && currentIndex !== -1 && index !== -1) {
      if (currentIndex < index) {
        componentParentValue.splice(currentIndex, 1);
        componentParentValue.splice(index - 1, 0, componentValue);
      } else if (currentIndex > index) {
        componentParentValue.splice(currentIndex, 1);
        componentParentValue.splice(index, 0, componentValue);
      } else {
        // item did not move
      }
    } else {
      // remove from current parent & insert in new parent
      if (currentIndex !== -1) {
        componentParentValue.splice(currentIndex, 1);
      }
      index === -1
        ? newParentValue.push(componentValue)
        : newParentValue.splice(index, 0, componentValue);
    }

    return new ImmutableTreeData(this.spec, newValue, this.fieldPointer);
  }

  public getNode(id: string | undefined): TreeNode | undefined {
    if (!id) {
      return undefined;
    }
    return this.allNodes[id];
  }

  public toJSON(): { [slotName: string]: ComponentData[] } {
    const result: { [slotName: string]: ComponentData[] } = {};

    const serializeSlot = (slot: SlotTreeNode): ComponentData[] => {
      return slot.children.map(child => {
        const slots: { [slotName: string]: ComponentData[] } = {};
        child.slots.forEach(nestedSlot => {
          slots[nestedSlot.name] = serializeSlot(nestedSlot);
        });
        return {
          name: child.name,
          properties: child.properties,
          slots
        };
      });
    };

    this.rootSlots.map(slot => {
      result[slot.name] = serializeSlot(slot);
    });
    return result;
  }

  private cloneValue(): any {
    return JSON.parse(JSON.stringify(this.value));
  }
}
