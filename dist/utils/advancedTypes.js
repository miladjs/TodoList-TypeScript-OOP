export var TodoStatus;
(function (TodoStatus) {
    TodoStatus[TodoStatus["idea"] = 0] = "idea";
    TodoStatus[TodoStatus["active"] = 1] = "active";
    TodoStatus[TodoStatus["completed"] = 2] = "completed";
})(TodoStatus || (TodoStatus = {}));
export class Todo {
    constructor(id, title, description, priority, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.status = status;
    }
}
//# sourceMappingURL=advancedTypes.js.map