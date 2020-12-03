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
    this.todoListModel = new TodoListModel();
    this.todoListView = new TodoListView();
  }

  /**
   * Todoを追加するときに呼ばれるリスナー関数
   * @param {string} title
   */
  handleAdd(title) {
    //addTodo(todoItem) {
    //  this.items.push(todoItem);
    //  this.emitChange();
    //}
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
      const todoListElement = this.todoListView.createElement(todoItems, {
        //-- class TodoListView --{
        //createElement(todoItems, { onUpdateTodo, onDeleteTodo }) {
        //  const todoListElement = element`<ul />`;
        //  todoItems.forEach((todoItem) => {
        //    const todoItemView = new TodoItemView();
        //    const todoItemElement = todoItemView.createElement(todoItem, {
        //      onUpdateTodo,
        //      onDeleteTodo,
        //    });
        //    todoListElement.appendChild(todoItemElement);
        //  });
        //  return todoListElement;
        //  }
        //}
        onUpdateTodo: ({ id, completed }) => {
          // チェックボックスが更新されたときに呼ばれるリスナー関数
          this.todoListModel.updateTodo({ id, completed });
          //updateTodo({ id, completed }) {
          //  // `id`が一致するTodoItemを見つけ、あるなら完了状態の値を更新する
          //  const todoItem = this.items.find((todo) => todo.id === id);
          //  if (!todoItem) {
          //    return;
          //  }
          //  todoItem.completed = completed;
          //  this.emitChange();
          //}
        },
        onDeleteTodo: ({ id }) => {
          // 削除ボタンがクリックされたときに呼ばれるリスナー関数
          this.todoListModel.deleteTodo({ id });
          //deleteTodo({ id }) {
          //  this.items = this.items.filter((todo) => {
          //    return todo.id !== id;
          //  });
          //  this.emitChange();
          //}
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
