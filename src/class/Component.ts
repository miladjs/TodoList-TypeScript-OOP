export default abstract class Component<
  T extends HTMLElement,
  U extends HTMLElement
> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(TemplateID: string, HostID: string, ElementID?: string) {
    this.templateElement = document.getElementById(
      TemplateID
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(HostID)! as T;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = importedNode.firstElementChild as U;
    if (ElementID) {
      this.element.id = ElementID;
    }
    this.attach();
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }

  abstract renderContent(): void;
  abstract configure(): void;
}
