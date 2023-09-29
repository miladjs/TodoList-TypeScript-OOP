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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWR2YW5jZWRUeXBlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9hZHZhbmNlZFR5cGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVVBLE1BQU0sQ0FBTixJQUFZLFVBSVg7QUFKRCxXQUFZLFVBQVU7SUFDcEIsMkNBQUksQ0FBQTtJQUNKLCtDQUFNLENBQUE7SUFDTixxREFBUyxDQUFBO0FBQ1gsQ0FBQyxFQUpXLFVBQVUsS0FBVixVQUFVLFFBSXJCO0FBRUQsTUFBTSxPQUFPLElBQUk7SUFDZixZQUNTLEVBQVUsRUFDVixLQUFhLEVBQ2IsV0FBbUIsRUFDbkIsUUFBZ0IsRUFDaEIsTUFBa0I7UUFKbEIsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUNWLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQ2hCLFdBQU0sR0FBTixNQUFNLENBQVk7SUFDeEIsQ0FBQztDQUNMIn0=