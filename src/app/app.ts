interface Draggable {
  dragStartHandler(): void;
  dragEndHandler(): void;
}
interface DragTarget {
  dragOverHandler(): void;
  dragDropHandler(): void;
  dragLeaveHandler(): void;
}

interface validatable {
  value: string;
  required?: Boolean;
  minLength?: number;
  maxLength?: number;
}

function validate(entery: validatable) {
  let isValid = true;

  if (entery.required) {
    isValid = isValid && entery.value.trim().length !== 0;
  }
  if (entery.minLength && typeof entery.value === "string") {
    isValid = isValid && entery.value.trim().length >= entery.minLength;
  }
  if (entery.maxLength && typeof entery.value === "string") {
    isValid = isValid && entery.value.trim().length <= entery.maxLength;
  }

  return isValid;
}

function autobinder(_: any, _2: any, descriptor: PropertyDescriptor) {
  const orginalMethod = descriptor.value;

  const myDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const BoundFn = orginalMethod.bind(this);
      return BoundFn;
    },
  };
  return myDescriptor;
}

enum TodoStatus {
  idea,
  active,
  completed,
}

class Todo {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public priority: string,
    public status: TodoStatus
  ) {}
}

type Listner = (todos: Todo[]) => void;

class TodoState {
  private listeners: Listner[] = [];
  private todoList: Todo[] = [];
  private static instance: TodoState;

  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new TodoState();
      return this.instance;
    }
  }

  addListner(listenerFn: Listner) {
    this.listeners.push(listenerFn);
  }

  addTodo(title: string, description: string, priority: string) {
    let id = "";
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

    for (let i = 1; i < 15; i++) {
      const random = Math.floor(Math.random() * charset.length);
      id += charset.charAt(random);
    }

    const newTodo = new Todo(id, title, description, priority, TodoStatus.idea);

    this.todoList.push(newTodo);

    for (const listnerFn of this.listeners) {
      listnerFn(this.todoList.slice());
    }
  }
}
const todoState = TodoState.getInstance();

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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

class TodoItem
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
  dragStartHandler(): void {
    this.element.classList.add("draggItem");
    console.log("drag start");
  }

  @autobinder
  dragEndHandler(): void {
    this.element.classList.remove("draggItem");
    console.log("drag end");
  }

  configure(): void {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }
}

class Todolist
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
  dragOverHandler(): void {
    this.element?.classList.add("dragg");
  }

  @autobinder
  dragDropHandler(): void {}

  @autobinder
  dragLeaveHandler(): void {
    this.element?.classList.remove("dragg");
  }

  configure(): void {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragend", this.dragDropHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
  }
}

class TodoInput extends Component<HTMLDivElement, HTMLFormElement> {
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

new TodoInput();
new Todolist("completed");
new Todolist("active");
new Todolist("idea");
