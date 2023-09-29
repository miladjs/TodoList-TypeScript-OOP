var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autobinder } from "../utils/autobinder";
import Component from "./Component";
export default class TodoItem extends Component {
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
    dragEndHandler(_) {
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
//# sourceMappingURL=TodoItem.js.map