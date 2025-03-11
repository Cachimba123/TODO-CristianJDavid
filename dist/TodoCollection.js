import { TodoItem } from "./TodoItem.js";
export class TodoCollection {
    userName;
    todoItems;
    nextId = 1;
    itemMap = new Map();
    constructor(userName, todoItems = []) {
        this.userName = userName;
        this.todoItems = todoItems;
        todoItems.forEach(item => this.itemMap.set(item.id, item));
    }
    addTodo(task) {
        while (this.itemMap.has(this.nextId)) {
            this.nextId++;
        }
        this.itemMap.set(this.nextId, new TodoItem(this.nextId, task));
        return this.nextId++;
    }
    /*  addTodo(task: string): number {
         this.nextId=this.getTodoById(this.nextId).id ?? this.nextId-1;
         this.itemMap.set(this.nextId++, new TodoItem(this.nextId+1, task));
         return this.nextId;
     }
     getTodoById(id: number) : TodoItem {
         return this.itemMap.get(id);
     }
  */
    getTodoItems(includeComplete = false) {
        return [...this.itemMap.values()].filter(item => includeComplete || !item.complete);
    }
    markComplete(id, complete) {
        const todoItem = this.itemMap.get(id);
        if (todoItem) {
            todoItem.complete = complete;
        }
    }
    removeComplete() {
        this.itemMap.forEach(item => {
            if (item.complete) {
                this.itemMap.delete(item.id);
            }
            this.nextId = item.id;
        });
    }
    getItemsCount() {
        return {
            total: this.itemMap.size,
            incomplete: this.getTodoItems(false).length
        };
    }
}
