import Project from "./Project.js";
import Todo from "./Todo.js";

export default class App {
    constructor() {
        this.projectList = [];
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
        project.todoList.push(newTodo);
        return newTodo;
    }
    
    removeTodo(todo) {
        const projectIndex = todo.project.todoList.findIndex(item => item.id === todo.id);
        todo.project.todoList.splice(projectIndex, 1);
    }
}
