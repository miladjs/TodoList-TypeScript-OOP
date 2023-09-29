import { Todo, TodoStatus } from "../utils/advancedTypes";

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
    this.updateTodo();
  }

  moveTodo(todoId: string, newStatus: TodoStatus) {
    const TodoItem = this.todoList.find((todo) => todo.id === todoId);
    if (TodoItem) {
      TodoItem.status = newStatus;
      this.updateTodo();
    }
  }

  private updateTodo() {
    for (const listnerFn of this.listeners) {
      listnerFn(this.todoList.slice());
    }
  }
}
export const todoState = TodoState.getInstance();
