import { TodoItem } from "./TodoItem";

type ItemCounts = {
    total: number;
    incomplete: number;
}

export class TodoCollection {
    private nextId: number = 1;
    private itemMap= new Map<number, TodoItem>();

    constructor(public userName: string, public todoItems: TodoItem[] = []) {
        todoItems.forEach(item => this.itemMap.set(item.id, item));
    }

    addTodo(task: string): number {
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
    getTodoItems(includeComplete: boolean=false): TodoItem[] {
        return [...this.itemMap.values()].filter(item => includeComplete || !item.complete);
    }
    markComplete(id: number, complete: boolean) {
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
            this.nextId=item.id;
        })
    }

    getItemsCount(): ItemCounts {
        return {
            total: this.itemMap.size,
            incomplete: this.getTodoItems(false).length
        };
    }
}