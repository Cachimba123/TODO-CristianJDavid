import { TodoItem } from "./TodoItem";
import { TodoCollection } from "./TodoCollection";
let todos = [
    new TodoItem(1, "Buy Flowers"), new TodoItem(2, "Get Shoes"),
    new TodoItem(3, "Collect Tickets"), new TodoItem(4, "Call Joe", true)];
let collection = new TodoCollection("Cristian", todos);

console.clear();
console.log(`${collection.userName}'s Todo List` + `(${collection.getItemsCount().incomplete} items to do)`);
//collection.removeComplete()
collection.getTodoItems(true).forEach(item => item.printDetails())


let input=document.getElementById("inputTask") as HTMLInputElement
let button=document.getElementById("addTask") as HTMLButtonElement
let listTasks=document.getElementById("todosTasks") as HTMLUListElement

document.querySelector("#total")!.textContent=`Total de tareas ${collection.getItemsCount().total}. Tareas por completar ${collection.getItemsCount().incomplete}`
document.querySelector("#titleName")!.textContent=collection.userName
button.addEventListener("click",()=>{
    collection.addTodo(input.value)
    rechargeListTasks()
})

const rechargeListTasks=(toggleComplete:boolean=true)=>{
    collection.getTodoItems(toggleComplete).forEach(item=>{
        let li=document.createElement("li")
        li.textContent=item.task
        listTasks.appendChild(li)
    })
}
rechargeListTasks()
let toggleList=document.getElementById("toggleList") as HTMLButtonElement

toggleList.addEventListener("click",()=>{
    let toggleComplete=toggleList.textContent==="Lista completa de tareas:"
    listTasks.innerHTML=""
    rechargeListTasks(toggleComplete)
    toggleList.textContent=toggleComplete?"Lista de tareras incompletas:":"Lista completa de tareas:"
})