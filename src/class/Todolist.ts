import { todoState } from "../state/todoState";
import { autobinder } from "../utils/autobinder";
import { DragTarget, Todo, TodoStatus } from "../utils/advancedTypes";
import { Component } from "./Component";
import { TodoItem } from "./TodoItem";

export class Todolist
  extends Component<HTMLDivElement, HTMLDivElement>
  implements DragTarget
{
  assignedTodos: Todo[] = [];

  constructor(private type: "idea" | "active" | "completed") {
    super("todoListTemp", "todos", `${type}-Todos`);

    todoState.addListner((todo: Todo[]) => {
      const relatedTodo = todo.filter((item) => {
        if (this.type === "idea") {
          return item.status === TodoStatus.idea;
        }
        if (this.type === "active") {
          return item.status === TodoStatus.active;
        }
        return item.status === TodoStatus.completed;
      });
      this.assignedTodos = relatedTodo;
      this.renderTodos();
    });
    this.configure();
    this.renderContent();
  }

  private renderTodos() {
    const ulElement = document.getElementById(
      `${this.type}-Todo-list`
    )! as HTMLUListElement;
    ulElement.innerHTML = "";
    for (const todoItem of this.assignedTodos) {
      new TodoItem(`${this.type}-Todo-list`, todoItem);
    }
  }

  renderContent() {
    const listID = `${this.type}-Todo-list`;
    this.element.querySelector("ul")!.id = listID;
    this.element.querySelector("h2")!.textContent = `${this.type} Todos`;
  }

  @autobinder
  dragOverHandler(event: DragEvent): void {
    event.preventDefault();
    this.element?.classList.add("dragg");
  }

  @autobinder
  dragDropHandler(event: DragEvent): void {
    const todoID = event.dataTransfer!.getData("text/plain");
    todoState.moveTodo(
      todoID,
      this.type === "active"
        ? TodoStatus.active
        : this.type === "completed"
        ? TodoStatus.completed
        : TodoStatus.idea
    );
    this.element?.classList.remove("dragg");
  }

  @autobinder
  dragLeaveHandler(event: DragEvent): void {
    this.element?.classList.remove("dragg");
  }

  configure(): void {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("drop", this.dragDropHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
  }
}
