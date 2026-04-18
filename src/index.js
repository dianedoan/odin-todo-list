import "./styles.css";
import App from "./App.js";
import { displayProjects, displayInboxTodos, handleProjectForm } from "./DOM.js";

const app = new App();
const myProject1 = app.createProject("Project 1");
const myProject2 = app.createProject("Project 2");
const todo1 = app.createTodo(myProject1, "finish project", "add styling and finishing touches", "2026-04-14", "high");
const todo2 = app.createTodo(myProject2, "workout", "leg day", "2026-04-19", "medium");
const todo3 = app.createTodo(myProject2, "finish chores", "wash dishes", "2026-04-21", "low");
const todo4 = app.createTodo(myProject1, "buy groceries", "buy bread", "2026-04-22", "");

// sidebar
displayProjects(app);

// inbox startup page
displayInboxTodos(app);

// create project form
handleProjectForm(app);
