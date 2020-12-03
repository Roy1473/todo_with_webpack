import { TodoListModel } from "../model/TodoListModel.js";
import { TodoItemModel } from "../model/TodoItemModel.js";
import { TodoListView } from "../view/TodoListView.js";
import { render } from "./html-util.js";
export function hello(greeting) {
  return `${greeting}, テスト`;
}
export class App {
  constructor() {
    // 1. TodoListの初期化
    //--継承コンストラクタ from  class TodoListModel extends EventEmitter ;
    //this.items[]
    //this._listeners = new Map
    this.todoListModel = new TodoListModel([]);
    this.todoListView = new TodoListView();
  }

  /**
   * Todoを追加するときに呼ばれるリスナー関数
   * @param {string} title
   */
  handleAdd(title) {
    this.todoListModel.addTodo(
      new TodoItemModel({
        title: title,
        completed: false,
      })
    );
  }
  /**
   * Todoの状態を更新したときに呼ばれるリスナー関数
   * @param {{ id:number, completed: boolean }}
   */
  handleUpdate({ id, completed }) {
    this.todoListModel.updateTodo({ id, completed });
  }
  /**
   * Todoを削除したときに呼ばれるリスナー関数
   * @param {{ id: number }}
   */
  handleDeleted({ id }) {
    this.todoListModel.deleteTodo({ id });
  }
  mount() {
    //form
    const formElement = document.querySelector("#js-form");
    //input area
    const inputElement = document.querySelector("#js-form-input");
    //todoリスト表示エリア
    const containerElement = document.querySelector("#js-todo-list");
    //todoの数
    const todoItemCountElement = document.querySelector("#js-todo-count");
    // 2. TodoListModelの状態が更新されたら表示を更新する
    this.todoListModel.onChange(() => {
      //--getTodoItemsメソッド from TodoListModel.js
      const todoItems = this.todoListModel.getTodoItems();
      //getTodoItems() {
      //  return this.items;
      //}
      const todoListView = new TodoListView();
      const todoListElement = todoListView.createElement(todoItems, {
        onUpdateTodo: ({ id, completed }) => {
          // チェックボックスが更新されたときに呼ばれるリスナー関数
          this.todoListModel.updateTodo({ id, completed });
        },
        onDeleteTodo: ({ id }) => {
          // 削除ボタンがクリックされたときに呼ばれるリスナー関数
          this.todoListModel.deleteTodo({ id });
        },
      });
      // containerElementの中身をtodoListElementで上書きする
      render(todoListElement, containerElement);
      //--renderメソッド form html-util.js
      //function render(bodyElement, containerElement) {
      //  // containerElementの中身を空にする
      //  containerElement.innerHTML = "";
      //  // containerElementの直下にbodyElementを追加する
      //  containerElement.appendChild(bodyElement);
      //}

      // アイテム数の表示を更新
      todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
    });
    // 3. フォームを送信したら、新しいTodoItemModelを追加する
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleAdd(inputElement.value);
      inputElement.value = "";
    });
  }
}
