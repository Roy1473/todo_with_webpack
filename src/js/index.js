import { hello, App } from "./modules/sub.js";
//import { TodoListModel } from "./model/TodoListModel.js";
//import { TodoItemModel } from "./model/TodoItemModel.js";
//import { render, element } from "./modules/html-util.js";
//import { TodoItemModel } from "./model/TodoItemModel.js";
//import { EventEmitter } from "./modules/eventEmitter.js";
import "@babel/polyfill";
import "../styles/style.scss";
//console.log(hello("こんばんは"));
const app = new App();
app.mount();
//const item = new TodoItemModel({
//  title: "未完了のTodoアイテム",
//  completed: false,
//});
//const completedItem = new TodoItemModel({
//  title: "完了済みのTodoアイテム",
//  completed: true,
//});
//console.log(item.id !== completedItem.id);

//const event = new EventEmitter();
//event.addEventListener("test-event", () => console.log("One!"));
//event.addEventListener("test-event", () => console.log("Two!"));
//event.emit("test-event");

//document.body.textContent = name;

//const APIKEY = "eb4e48e8cf76334c1aa24b48aaae72ee";
//const APIURL =
//  "https://api.themoviedb.org/3/discover/movie?api_key=eb4e48e8cf76334c1aa24b48aaae72ee&sort_by=popularity.desc&page=1";
//const IMAGEPATH = "https://image.tmdb.org/t/p/w300";
//const SEARCHAPI =
//  "https://api.themoviedb.org/3/search/movie?api_key=eb4e48e8cf76334c1aa24b48aaae72ee&page=1&include_adult=false&language=ja-JA&query=";
//
//async function getMovies() {
//  const resp = await fetch(APIURL);
//  const respData = await resp.json();
//  console.log(respData);
//  respData.results.forEach((movie) => {
//    const img = document.createElement("img");
//    img.src = IMAGEPATH + movie.poster_path;
//    document.body.appendChild(img);
//  });
//  return respData;
//}
//getMovies();
