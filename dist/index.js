"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TodoItem_1 = require("./TodoItem");
const TodoCollection_1 = require("./TodoCollection");
let todos = [
    new TodoItem_1.TodoItem(1, "Buy Flowers"), new TodoItem_1.TodoItem(2, "Get Shoes"),
    new TodoItem_1.TodoItem(3, "Collect Tickets"), new TodoItem_1.TodoItem(4, "Call Joe", true)
];
let collection = new TodoCollection_1.TodoCollection("Adam", todos);
console.clear();
console.log(`${collection.userName}'s Todo List` + `(${collection.getItemsCount().incomplete} items to do)`);
//collection.removeComplete()
collection.getTodoItems(true).forEach(item => item.printDetails());
