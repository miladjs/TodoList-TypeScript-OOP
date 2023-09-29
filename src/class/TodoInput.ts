import { todoState } from "../state/todoState";
import { autobinder } from "../utils/autobinder";
import { validatable, validate } from "../utils/validation";
import { Component } from "./Component";

export class TodoInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  priorityInputElement: HTMLSelectElement;

  constructor() {
    super("todoAddTemp", "app");

    this.titleInputElement = this.element.querySelector(
      "#title"
    )! as HTMLInputElement;

    this.descriptionInputElement = this.element.querySelector(
      "#Description"
    )! as HTMLInputElement;

    this.priorityInputElement = this.element.querySelector(
      "#Priority"
    )! as HTMLSelectElement;

    this.configure();
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.priorityInputElement.value = "low";
  }

  private getTodoInfo(): [string, string, string] | void {
    const title: validatable = {
      value: this.titleInputElement.value,
      required: true,
      minLength: 3,
    };
    const description: validatable = {
      value: this.descriptionInputElement.value,
      required: true,
      minLength: 3,
    };

    const priority = this.priorityInputElement.value;

    if (!validate(title) || !validate(description)) {
      alert("Please Fill All Inputs");
      return;
    } else {
      return [title.value, description.value, priority];
    }
  }

  @autobinder
  private submitHandler(event: Event) {
    event.preventDefault();
    const TodoInput = this.getTodoInfo();
    if (Array.isArray(TodoInput)) {
      const [title, description, priority] = TodoInput;
      todoState.addTodo(title, description, priority);
      this.clearInputs();
    }
  }

  renderContent(): void {}

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }
}
