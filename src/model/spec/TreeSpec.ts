import { ComponentSpec } from "./ComponentSpec";
import { SlotSpec } from "./SlotSpec";
import { TreeParams } from "./TreeParams";

export class TreeSpec {
  public static fromSchema(schema: any): TreeSpec {
    const params = (schema["ui:extension"] || {}).params as TreeParams;
    return new TreeSpec(params.components || [], params.slots || {});
  }
  public components: ComponentSpec[];
  public slots: { [key: string]: SlotSpec };

  constructor(
    components: ComponentSpec[] = [],
    slots: { [key: string]: SlotSpec } = {}
  ) {
    this.components = components;
    this.slots = slots;
  }

  public getComponent(name: string): ComponentSpec | undefined {
    return this.components.find(x => x.name === name);
  }
}
