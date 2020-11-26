import { element } from "./html-util.js";
export function hello(greeting) {
  return `${greeting}, テスト`;
}
export class App {
  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");
    let todoItemCount = 0;
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      const todoItemElement = element`<li>${inputElement.value}</li>`;
      containerElement.appendChild(todoItemElement);
      todoItemCount += 1;
      todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;
      inputElement.value = "";
      console.log(`入力値の値: ${inputElement.value}`);
    });
  }
}
