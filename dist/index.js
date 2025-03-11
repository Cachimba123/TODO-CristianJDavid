import { TodoItem } from "./TodoItem.js";
import { TodoCollection } from "./TodoCollection.js";
let todos = [
    new TodoItem(1, "Buy Flowers"), new TodoItem(2, "Get Shoes"),
    new TodoItem(3, "Collect Tickets"), new TodoItem(4, "Call Joe", true)
];
let collection = new TodoCollection("Cristian", todos);
console.clear();
console.log(`${collection.userName}'s Todo List` + `(${collection.getItemsCount().incomplete} items to do)`);
//collection.removeComplete()
collection.getTodoItems(true).forEach(item => item.printDetails());
let input = document.getElementById("inputTask");
let button = document.getElementById("addTask");
let listTasks = document.getElementById("todosTasks");
document.querySelector("#titleName").textContent = collection.userName;
button.addEventListener("click", () => {
    if (!input.value)
        return;
    collection.addTodo(input.value);
    rechargeListTasks();
    input.value = "";
});
document.querySelector("#removeTask").addEventListener("click", () => {
    collection.removeComplete();
    rechargeListTasks();
});
const rechargeListTasks = (toggleComplete = true) => {
    document.querySelector("#total").textContent = `Total de tareas ${collection.getItemsCount().total}. Tareas por completar ${collection.getItemsCount().incomplete}`;
    listTasks.innerHTML = "";
    collection.getTodoItems(toggleComplete).forEach(item => {
        let li = document.createElement("li");
        let button = document.createElement("button");
        button.textContent = item.complete ? "Marcar por completar" : "Marcar como completada";
        button.setAttribute("data-id", item.id.toString());
        button.setAttribute("data-completed", item.complete.toString());
        li.innerHTML = item.complete ? `<s>${item.task}</s>` : item.task;
        li.appendChild(button);
        listTasks.appendChild(li);
        button.addEventListener("click", () => {
            let id = Number(button.getAttribute("data-id"));
            let isCompleted = button.getAttribute("data-completed") === "true";
            collection.markComplete(id, !isCompleted);
            rechargeListTasks();
        });
    });
};
rechargeListTasks();
let toggleList = document.getElementById("toggleList");
toggleList.addEventListener("click", () => {
    let toggleComplete = toggleList.textContent != "Lista completa de tareas:";
    listTasks.innerHTML = "";
    rechargeListTasks(toggleComplete);
    toggleList.textContent = toggleComplete ? "Lista completa de tareas:" : "Lista de tareras incompletas:";
});
