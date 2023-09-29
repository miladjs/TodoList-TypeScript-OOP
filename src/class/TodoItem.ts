import { autobinder } from "../utils/autobinder";
import { Draggable, Todo } from "../utils/advancedTypes";
import { Component } from "./Component";

export class TodoItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private todo: Todo;

  constructor(HostId: string, todo: Todo) {
    super("todoTemp", HostId, todo.id);
    this.todo = todo;
    this.renderContent();
    this.configure();
  }

  renderContent(): void {
    this.element.querySelector("h3")!.textContent = this.todo.title;
    this.element.querySelector("p")!.textContent = this.todo.description;
    this.element.querySelector("span")!.textContent = this.todo.priority;
  }

  @autobinder
  dragStartHandler(event: DragEvent): void {
    this.element.classList.add("draggItem");
    event.dataTransfer!.setData("text/plain", this.todo.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  @autobinder
  dragEndHandler(event: DragEvent): void {
    this.element.classList.remove("draggItem");
  }

  configure(): void {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }
}
