class Todolist {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLDivElement;

  constructor() {
    this.templateElement = document.getElementById(
      "todoListTemp"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("todos")! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = importedNode.firstElementChild as HTMLDivElement;

    this.attach();
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

function logger(target: any) {
  console.log(target);
}

@logger
class TodoInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  priorityInputElement: HTMLSelectElement;

  constructor() {
    this.templateElement = document.getElementById(
      "todoAddTemp"
    ) as HTMLTemplateElement;
    this.hostElement = document.getElementById("app") as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = importedNode.firstElementChild as HTMLFormElement;

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
    this.attach();
  }

  private submitHandler(event: Event) {
    event.preventDefault();

    console.log(this.titleInputElement.value);
    console.log(this.descriptionInputElement.value);
    console.log(this.priorityInputElement.value);
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

new Todolist();
new TodoInput();
