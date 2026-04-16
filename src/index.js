import "./styles.css";
import { displayProjects, displayTodos } from "./DOM.js";

class App {
    constructor() {
        this.projectList = [];
    }

    // inbox contains all todos
    createInbox() {
        const inbox = new Project("Inbox");
        
        this.projectList.forEach(project => {
            project.todoList.forEach(todo => {
                inbox.todoList.push(todo);
            });
        });
        
        return inbox;
    }
    
    createProject(title) {
        const newProject = new Project(title);
        this.projectList.push(newProject);
        return newProject;
    }
}

class Project {
    constructor(title) {
        this.title = title;
        this.todoList = [];
    }

    createTodo(title, description, dueDate, priority) {
        let newTodo = new Todo(title, description, dueDate, priority);
        this.todoList.push(newTodo);
    }

    removeTodo(todo) {
        const index = this.todoList.findIndex(item => item.id === todo.id); // find index
        this.todoList.splice(index, 1); // remove todo from todo list
    }
}

class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
		this.id = crypto.randomUUID();
    }   
}

const app = new App();
const myProject1 = app.createProject("Project 1");
const myProject2 = app.createProject("Project 2");
const todo1 = myProject1.createTodo("finish project", "add styling", "04-14-2026", "high");
const todo2 = myProject1.createTodo("finish chores", "wash dishes", "04-21-2026", "low");
const todo3 = myProject2.createTodo("workout", "leg day", "04-19-2026", "medium");

// startup default page
displayProjects(app.createInbox(), app.projectList);
displayTodos(app.createInbox());
