var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("utils/advancedTypes", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Todo = exports.TodoStatus = void 0;
    var TodoStatus;
    (function (TodoStatus) {
        TodoStatus[TodoStatus["idea"] = 0] = "idea";
        TodoStatus[TodoStatus["active"] = 1] = "active";
        TodoStatus[TodoStatus["completed"] = 2] = "completed";
    })(TodoStatus || (exports.TodoStatus = TodoStatus = {}));
    class Todo {
        constructor(id, title, description, priority, status) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.priority = priority;
            this.status = status;
        }
    }
    exports.Todo = Todo;
});
define("state/todoState", ["require", "exports", "utils/advancedTypes"], function (require, exports, advancedTypes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.todoState = void 0;
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
            const newTodo = new advancedTypes_1.Todo(id, title, description, priority, advancedTypes_1.TodoStatus.idea);
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
    exports.todoState = TodoState.getInstance();
});
define("utils/autobinder", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.autobinder = void 0;
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
    exports.autobinder = autobinder;
});
define("utils/validation", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validate = void 0;
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
    exports.validate = validate;
});
define("class/Component", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Component = void 0;
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
    exports.Component = Component;
});
define("class/TodoInput", ["require", "exports", "state/todoState", "utils/autobinder", "utils/validation", "class/Component"], function (require, exports, todoState_1, autobinder_1, validation_1, Component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TodoInput = void 0;
    class TodoInput extends Component_1.Component {
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
            if (!(0, validation_1.validate)(title) || !(0, validation_1.validate)(description)) {
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
                todoState_1.todoState.addTodo(title, description, priority);
                this.clearInputs();
            }
        }
        renderContent() { }
        configure() {
            this.element.addEventListener("submit", this.submitHandler);
        }
    }
    exports.TodoInput = TodoInput;
    __decorate([
        autobinder_1.autobinder
    ], TodoInput.prototype, "submitHandler", null);
});
define("class/TodoItem", ["require", "exports", "utils/autobinder", "class/Component"], function (require, exports, autobinder_2, Component_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TodoItem = void 0;
    class TodoItem extends Component_2.Component {
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
    exports.TodoItem = TodoItem;
    __decorate([
        autobinder_2.autobinder
    ], TodoItem.prototype, "dragStartHandler", null);
    __decorate([
        autobinder_2.autobinder
    ], TodoItem.prototype, "dragEndHandler", null);
});
define("class/Todolist", ["require", "exports", "state/todoState", "utils/autobinder", "utils/advancedTypes", "class/Component", "class/TodoItem"], function (require, exports, todoState_2, autobinder_3, advancedTypes_2, Component_3, TodoItem_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Todolist = void 0;
    class Todolist extends Component_3.Component {
        constructor(type) {
            super("todoListTemp", "todos", `${type}-Todos`);
            this.type = type;
            this.assignedTodos = [];
            todoState_2.todoState.addListner((todo) => {
                const relatedTodo = todo.filter((item) => {
                    if (this.type === "idea") {
                        return item.status === advancedTypes_2.TodoStatus.idea;
                    }
                    if (this.type === "active") {
                        return item.status === advancedTypes_2.TodoStatus.active;
                    }
                    return item.status === advancedTypes_2.TodoStatus.completed;
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
                new TodoItem_1.TodoItem(`${this.type}-Todo-list`, todoItem);
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
            todoState_2.todoState.moveTodo(todoID, this.type === "active"
                ? advancedTypes_2.TodoStatus.active
                : this.type === "completed"
                    ? advancedTypes_2.TodoStatus.completed
                    : advancedTypes_2.TodoStatus.idea);
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
    exports.Todolist = Todolist;
    __decorate([
        autobinder_3.autobinder
    ], Todolist.prototype, "dragOverHandler", null);
    __decorate([
        autobinder_3.autobinder
    ], Todolist.prototype, "dragDropHandler", null);
    __decorate([
        autobinder_3.autobinder
    ], Todolist.prototype, "dragLeaveHandler", null);
});
define("app/app", ["require", "exports", "class/TodoInput", "class/Todolist"], function (require, exports, TodoInput_1, Todolist_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new TodoInput_1.TodoInput();
    new Todolist_1.Todolist("completed");
    new Todolist_1.Todolist("active");
    new Todolist_1.Todolist("idea");
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3V0aWxzL2FkdmFuY2VkVHlwZXMudHMiLCIuLi9zcmMvc3RhdGUvdG9kb1N0YXRlLnRzIiwiLi4vc3JjL3V0aWxzL2F1dG9iaW5kZXIudHMiLCIuLi9zcmMvdXRpbHMvdmFsaWRhdGlvbi50cyIsIi4uL3NyYy9jbGFzcy9Db21wb25lbnQudHMiLCIuLi9zcmMvY2xhc3MvVG9kb0lucHV0LnRzIiwiLi4vc3JjL2NsYXNzL1RvZG9JdGVtLnRzIiwiLi4vc3JjL2NsYXNzL1RvZG9saXN0LnRzIiwiLi4vc3JjL2FwcC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQVVBLElBQVksVUFJWDtJQUpELFdBQVksVUFBVTtRQUNwQiwyQ0FBSSxDQUFBO1FBQ0osK0NBQU0sQ0FBQTtRQUNOLHFEQUFTLENBQUE7SUFDWCxDQUFDLEVBSlcsVUFBVSwwQkFBVixVQUFVLFFBSXJCO0lBRUQsTUFBYSxJQUFJO1FBQ2YsWUFDUyxFQUFVLEVBQ1YsS0FBYSxFQUNiLFdBQW1CLEVBQ25CLFFBQWdCLEVBQ2hCLE1BQWtCO1lBSmxCLE9BQUUsR0FBRixFQUFFLENBQVE7WUFDVixVQUFLLEdBQUwsS0FBSyxDQUFRO1lBQ2IsZ0JBQVcsR0FBWCxXQUFXLENBQVE7WUFDbkIsYUFBUSxHQUFSLFFBQVEsQ0FBUTtZQUNoQixXQUFNLEdBQU4sTUFBTSxDQUFZO1FBQ3hCLENBQUM7S0FDTDtJQVJELG9CQVFDOzs7Ozs7SUNwQkQsTUFBTSxTQUFTO1FBS2I7WUFKUSxjQUFTLEdBQWMsRUFBRSxDQUFDO1lBQzFCLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFHUCxDQUFDO1FBRXhCLE1BQU0sQ0FBQyxXQUFXO1lBQ2hCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDakIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ3RCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFB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