export enum URLPath {
  login = "/login",
  register = "/register",
  home = "/",
  DASHBOARD = "/dashboard",
}

export const API_URL_TODO = "https://jsonplaceholder.cypress.io/todos";
export const TODO_KEY = "todoList" + localStorage.getItem("email");
