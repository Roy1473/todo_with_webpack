import { TodoListModel } from "../model/TodoListModel.js";
import { TodoItemModel } from "../model/TodoItemModel.js";
import { render, element } from "./html-util.js";

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
      //--onChangeメソッド--  from TodoListModel.js
      //onChange(listener) {
      //  this.addEventListener("change", listener);
      //}

      //--addEventListenerメソッド  from eventEmitter.js
      //addEventListener(type, listener) {
      //  if (!this._listeners.has(type)) {
      //    this._listeners.set(type, new Set());
      //  }
      //  const listenerSet = this._listeners.get(type);
      //  listenerSet.add(listener);
      //}

      // TodoリストをまとめるList要素
      const todoListElement = element`<ul />`;
      // それぞれのTodoItem要素をtodoListElement以下へ追加する

      //--getTodoItemsメソッド from TodoListModel.js
      const todoItems = this.todoListModel.getTodoItems();
      //getTodoItems() {
      //  return this.items;
      //}
      todoItems.forEach((item) => {
        // 完了済みならchecked属性をつけ、未完了ならchecked属性を外す
        // input要素にはcheckboxクラスをつける
        const todoItemElement = item.completed
          ? element`<li><input type="checkbox" class="checkbox" checked><s>${item.title}</s><button class="delete">x</button></li>`
          : element`<li><input type="checkbox" class="checkbox">${item.title}<button class="delete">x</button></li>`;
        console.log(todoItemElement);
        // チェックボックスがトグルしたときのイベントにリスナー関数を登録
        const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
        inputCheckboxElement.addEventListener("change", () => {
          this.todoListModel.updateTodo({
            // 指定したTodoアイテムの完了状態を反転させる
            //--updateTodoメソッド from TodoListModel.js
            //updateTodo({ id, completed }) {
            //  // `id`が一致するTodoItemを見つけ、あるなら完了状態の値を更新する
            //  const todoItem = this.items.find((todo) => todo.id === id);
            //  if (!todoItem) {
            //    return;
            //  }
            //  todoItem.completed = completed;
            //  this.emitChange();
            //}

            //--emitChangeメソッド from TodoListModel.js
            //emitChange() {
            //  this.emit("change");
            //}

            //--emitメソッド　from eventEmitter.js
            //emit(type) {
            //  // 指定したイベントに対応するSetを取り出し、すべてのリスナー関数を呼び出す
            //  const listenerSet = this._listeners.get(type);
            //  if (!listenerSet) {
            //    return;
            //  }
            //  listenerSet.forEach((listener) => {
            //    listener.call(this);
            //  });
            //}

            id: item.id,
            completed: !item.completed,
          });
        });
        // 削除ボタン(x)がクリックされたときにTodoListModelからアイテムを削除する
        const deleteButtonElement = todoItemElement.querySelector(".delete");
        deleteButtonElement.addEventListener("click", () => {
          //--deleteTodoメソッド
          //deleteTodo({ id }) {
          //  this.items = this.items.filter((todo) => {
          //    return todo.id !== id;
          //  });
          //  this.emitChange();
          //}
          this.todoListModel.deleteTodo({
            id: item.id,
          });
        });
        todoListElement.appendChild(todoItemElement);
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
      // 新しいTodoItemをTodoListへ追加する
      this.todoListModel.addTodo(
        //addTodoメソッド
        //addTodo(todoItem) {
        //  this.items.push(todoItem);
        //  this.emitChange();
        //}
        new TodoItemModel({
          title: inputElement.value,
          completed: false,
        })
      );
      inputElement.value = "";
    });
  }
}
