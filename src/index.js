import "./styles.css";
import App from "./App.js";
import { displayProjects, displayInboxTodos } from "./DOM.js";

const app = new App();
const myProject1 = app.createProject("Project 1");
const myProject2 = app.createProject("Project 2");
const todo1 = app.createTodo(myProject1, "finish project", "add styling and finishing touches", "04-14-2026", "high");
const todo2 = app.createTodo(myProject2, "workout", "leg day", "04-19-2026", "medium");

// sidebar
displayProjects(app);

// inbox startup page
displayInboxTodos(app);
