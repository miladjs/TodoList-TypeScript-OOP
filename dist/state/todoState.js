import { Todo, TodoStatus } from "../utils/advancedTypes";
class TodoState {
    constructor() {
        this.listeners = [];
        this.todoList = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        else {
            this.instance = new TodoState();
            return this.instance;
        }
    }
    addListner(listenerFn) {
        this.listeners.push(listenerFn);
    }
    addTodo(title, description, priority) {
        let id = "";
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
        for (let i = 1; i < 15; i++) {
            const random = Math.floor(Math.random() * charset.length);
            id += charset.charAt(random);
        }
        const newTodo = new Todo(id, title, description, priority, TodoStatus.idea);
        this.todoList.push(newTodo);
        this.updateTodo();
    }
    moveTodo(todoId, newStatus) {
        const TodoItem = this.todoList.find((todo) => todo.id === todoId);
        if (TodoItem) {
            TodoItem.status = newStatus;
            this.updateTodo();
        }
    }
    updateTodo() {
        for (const listnerFn of this.listeners) {
            listnerFn(this.todoList.slice());
        }
    }
}
export const todoState = TodoState.getInstance();
//# sourceMappingURL=todoState.js.map