var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { todoState } from "../state/todoState";
import { autobinder } from "../utils/autobinder";
import { validate } from "../utils/validation";
import Component from "./Component";
export default class TodoInput extends Component {
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
//# sourceMappingURL=TodoInput.js.map