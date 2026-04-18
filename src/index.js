import "./styles.css";
import App from "./App.js";
import { displayProjects, displayInboxTodos, handleProjectForm } from "./DOM.js";

// load app
const app = App.load();

// sidebar
displayProjects(app);

// inbox startup page
displayInboxTodos(app);

// create project form
handleProjectForm(app);
