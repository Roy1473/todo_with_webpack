import { hello, App } from "./sub.js";
import "@babel/polyfill";
import "./style.scss";
const app = new App();
console.log(hello("こんばんは"));
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
