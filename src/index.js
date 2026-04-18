import "./styles.css";
import App from "./App.js";
import { displayProjects, displayInboxTodos, handleProjectForm } from "./DOM.js";

// load app
const app = App.load();

// inbox startup page
displayInboxTodos(app);

// sidebar
displayProjects(app);

// create project form
handleProjectForm(app);
