"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function validate(entery) {
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
function autobinder(_, _2, descriptor) {
    const orginalMethod = descriptor.value;
    const myDescriptor = {
        configurable: true,
        get() {
            const BoundFn = orginalMethod.bind(this);
            return BoundFn;
        },
    };
    return myDescriptor;
}
var TodoStatus;
(function (TodoStatus) {
    TodoStatus[TodoStatus["idea"] = 0] = "idea";
    TodoStatus[TodoStatus["active"] = 1] = "active";
    TodoStatus[TodoStatus["completed"] = 2] = "completed";
})(TodoStatus || (TodoStatus = {}));
class Todo {
    constructor(id, title, description, priority, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.status = status;
    }
}
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
const todoState = TodoState.getInstance();
class Component {
    constructor(TemplateID, HostID, ElementID) {
        this.templateElement = document.getElementById(TemplateID);
        this.hostElement = document.getElementById(HostID);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (ElementID) {
            this.element.id = ElementID;
        }
        this.attach();
    }
    attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
}
class TodoItem extends Component {
    constructor(HostId, todo) {
        super("todoTemp", HostId, todo.id);
        this.todo = todo;
        this.renderContent();
        this.configure();
    }
    renderContent() {
        this.element.querySelector("h3").textContent = this.todo.title;
        this.element.querySelector("p").textContent = this.todo.description;
        this.element.querySelector("span").textContent = this.todo.priority;
    }
    dragStartHandler(event) {
        this.element.classList.add("draggItem");
        event.dataTransfer.setData("text/plain", this.todo.id);
        event.dataTransfer.effectAllowed = "move";
    }
    dragEndHandler(event) {
        this.element.classList.remove("draggItem");
    }
    configure() {
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
    }
}
__decorate([
    autobinder
], TodoItem.prototype, "dragStartHandler", null);
__decorate([
    autobinder
], TodoItem.prototype, "dragEndHandler", null);
class Todolist extends Component {
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
class TodoInput extends Component {
    constructor() {
        super("todoAddTemp", "app");
        this.titleInputElement = this.element.querySelector("#title");
        this.descriptionInputElement = this.element.querySelector("#Description");
        this.priorityInputElement = this.element.querySelector("#Priority");
        this.configure();
    }
    clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.priorityInputElement.value = "low";
    }
    getTodoInfo() {
        const title = {
            value: this.titleInputElement.value,
            required: true,
            minLength: 3,
        };
        const description = {
            value: this.descriptionInputElement.value,
            required: true,
            minLength: 3,
        };
        const priority = this.priorityInputElement.value;
        if (!validate(title) || !validate(description)) {
            alert("Please Fill All Inputs");
            return;
        }
        else {
            return [title.value, description.value, priority];
        }
    }
    submitHandler(event) {
        event.preventDefault();
        const TodoInput = this.getTodoInfo();
        if (Array.isArray(TodoInput)) {
            const [title, description, priority] = TodoInput;
            todoState.addTodo(title, description, priority);
            this.clearInputs();
        }
    }
    renderContent() { }
    configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }
}
__decorate([
    autobinder
], TodoInput.prototype, "submitHandler", null);
new TodoInput();
new Todolist("completed");
new Todolist("active");
new Todolist("idea");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQWlCQSxTQUFTLFFBQVEsQ0FBQyxNQUFtQjtJQUNuQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFFbkIsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO1FBQ25CLE9BQU8sR0FBRyxPQUFPLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO0tBQ3ZEO0lBQ0QsSUFBSSxNQUFNLENBQUMsU0FBUyxJQUFJLE9BQU8sTUFBTSxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDeEQsT0FBTyxHQUFHLE9BQU8sSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDO0tBQ3JFO0lBQ0QsSUFBSSxNQUFNLENBQUMsU0FBUyxJQUFJLE9BQU8sTUFBTSxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDeEQsT0FBTyxHQUFHLE9BQU8sSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDO0tBQ3JFO0lBRUQsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQUVELFNBQVMsVUFBVSxDQUFDLENBQU0sRUFBRSxFQUFPLEVBQUUsVUFBOEI7SUFDakUsTUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztJQUV2QyxNQUFNLFlBQVksR0FBdUI7UUFDdkMsWUFBWSxFQUFFLElBQUk7UUFDbEIsR0FBRztZQUNELE1BQU0sT0FBTyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekMsT0FBTyxPQUFPLENBQUM7UUFDakIsQ0FBQztLQUNGLENBQUM7SUFDRixPQUFPLFlBQVksQ0FBQztB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