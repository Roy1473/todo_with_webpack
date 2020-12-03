import { element } from "../modules/html-util.js";
import { TodoItemView } from "./TodoItemView.js";
export class TodoListView {
  /**
   * `todoItems`に対応するTodoリストのHTML要素を作成して返す
   * @param {TodoItemModel[]} todoItems TodoItemModelの配列
   * @param {function({id:string, completed: boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
   * @param {function({id:string})} onDeleteTodo 削除ボタンのクリックイベントリスナー
   * @returns {Element} TodoItemModelの配列に対応したリストのHTML要素
   */
  createElement(todoItems, { onUpdateTodo, onDeleteTodo }) {
    const todoListElement = element`<ul />`;
    todoItems.forEach((todoItem) => {
      const todoItemView = new TodoItemView();
      //-- class TodoItemView.js--
      //createElement(todoItem, { onUpdateTodo, onDeleteTodo }) {
      //  const todoItemElement = todoItem.completed
      //    ? element`<li><input type="checkbox" class="checkbox" checked><s>${todoItem.title}</s><button class="delete">x</button></li>`
      //    : element`<li><input type="checkbox" class="checkbox">${todoItem.title}<button class="delete">x</button></li>`;
      //  const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
      //  inputCheckboxElement.addEventListener("change", () => {
      //    onUpdateTodo({
      //      id: todoItem.id,
      //      completed: !todoItem.completed,
      //    });
      //  });
      //  const deleteButtonElement = todoItemElement.querySelector(".delete");
      //  deleteButtonElement.addEventListener("click", () => {
      //    onDeleteTodo({
      //      id: todoItem.id,
      //    });
      //  });
      //  return todoItemElement;
      //}
      const todoItemElement = todoItemView.createElement(todoItem, {
        onUpdateTodo,
        onDeleteTodo,
      });
      todoListElement.appendChild(todoItemElement);
    });
    return todoListElement;
  }
}
