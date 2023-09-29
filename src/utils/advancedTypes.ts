export interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}
export interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dragDropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}

export enum TodoStatus {
  idea,
  active,
  completed,
}

export class Todo {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public priority: string,
    public status: TodoStatus
  ) {}
}
