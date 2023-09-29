var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { todoState } from "../state/todoState";
import { autobinder } from "../utils/autobinder";
import { TodoStatus } from "../utils/advancedTypes";
import { Component } from "./Component";
import { TodoItem } from "./TodoItem";
export class Todolist extends Component {
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
    dragLeaveHandler(event) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9kb2xpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2xhc3MvVG9kb2xpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRCxPQUFPLEVBQW9CLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUV0QyxNQUFNLE9BQU8sUUFDWCxTQUFRLFNBQXlDO0lBS2pELFlBQW9CLElBQXFDO1FBQ3ZELEtBQUssQ0FBQyxjQUFjLEVBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxRQUFRLENBQUMsQ0FBQztRQUQ5QixTQUFJLEdBQUosSUFBSSxDQUFpQztRQUZ6RCxrQkFBYSxHQUFXLEVBQUUsQ0FBQztRQUt6QixTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBWSxFQUFFLEVBQUU7WUFDcEMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUN2QyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO29CQUN4QixPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLElBQUksQ0FBQztpQkFDeEM7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtvQkFDMUIsT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLFVBQVUsQ0FBQyxNQUFNLENBQUM7aUJBQzFDO2dCQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsU0FBUyxDQUFDO1lBQzlDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLGFBQWEsR0FB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