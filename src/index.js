import "./styles.css";
import { displayProjects, displayInboxTodos, displayTodos } from "./DOM.js";

class App {
    constructor() {
        this.projectList = [];
        this.todoList = []; // todos from all projects in the app
    }

    createInbox() {
        const inbox = new Project("Inbox");
        return inbox;
    }
    
    createProject(title) {
        const newProject = new Project(title);
        this.projectList.push(newProject);
        return newProject;
    }

    createTodo(project, title, description, dueDate, priority) {
        const newTodo = new Todo(title, description, dueDate, priority, project);
        this.todoList.push(newTodo);
        project.todoList.push(newTodo);
        return newTodo;
    }
    
    removeTodo(todo) {
        // remove todo from app todo list
        const index = this.todoList.findIndex(item => item.id === todo.id);
        this.todoList.splice(index, 1); 

        // remove todo from project
        const projectIndex = this.todoList.findIndex(item => item.id === todo.id);
        todo.project.todoList.splice(projectIndex, 1);
    }
}

class Project {
    constructor(title, app) {
        this.title = title;
        this.app = app;
        this.todoList = [];
    }
}

class Todo {
    constructor(title, description, dueDate, priority, project) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
		this.id = crypto.randomUUID();
    }   
}

const app = new App();
const myProject1 = app.createProject("Project 1");
const myProject2 = app.createProject("Project 2");
const todo1 = app.createTodo(myProject1, "finish project", "add styling and finishing touches", "04-14-2026", "high");
const todo2 = app.createTodo(myProject2, "workout", "leg day", "04-19-2026", "medium");

// sidebar
displayProjects(app);

// inbox startup page
displayInboxTodos(app);
