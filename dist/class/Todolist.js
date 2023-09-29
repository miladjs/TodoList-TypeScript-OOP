var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { todoState } from "../state/todoState";
import { autobinder } from "../utils/autobinder";
import { TodoStatus } from "../utils/advancedTypes";
import Component from "./Component";
import TodoItem from "./TodoItem";
export default class Todolist extends Component {
    constructor(type) {
        super("todoListTemp", "todos", `${type}-Todos`);
        this.type = type;
        this.assignedTodos = [];
        todoState.addListner((todo) => {
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
    renderTodos() {
        const ulElement = document.getElementById(`${this.type}-Todo-list`);
        ulElement.innerHTML = "";
        for (const todoItem of this.assignedTodos) {
            new TodoItem(`${this.type}-Todo-list`, todoItem);
        }
    }
    renderContent() {
        const listID = `${this.type}-Todo-list`;
        this.element.querySelector("ul").id = listID;
        this.element.querySelector("h2").textContent = `${this.type} Todos`;
    }
    dragOverHandler(event) {
        var _a;
        event.preventDefault();
        (_a = this.element) === null || _a === void 0 ? void 0 : _a.classList.add("dragg");
    }
    dragDropHandler(event) {
        var _a;
        const todoID = event.dataTransfer.getData("text/plain");
        todoState.moveTodo(todoID, this.type === "active"
            ? TodoStatus.active
            : this.type === "completed"
                ? TodoStatus.completed
                : TodoStatus.idea);
        (_a = this.element) === null || _a === void 0 ? void 0 : _a.classList.remove("dragg");
    }
    dragLeaveHandler(_) {
        var _a;
        (_a = this.element) === null || _a === void 0 ? void 0 : _a.classList.remove("dragg");
    }
    configure() {
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("drop", this.dragDropHandler);
        this.element.addEventListener("dragleave", this.dragLeaveHandler);
    }
}
__decorate([
    autobinder
], Todolist.prototype, "dragOverHandler", null);
__decorate([
    autobinder
], Todolist.prototype, "dragDropHandler", null);
__decorate([
    autobinder
], Todolist.prototype, "dragLeaveHandler", null);
//# sourceMappingURL=Todolist.js.map