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

    getProjectById(projectId) {
        return this.projectList.find(p => p.id === projectId);
    }

    removeProject(project) {
        const projectIndex = this.projectList.findIndex(item => item.id === project.id);
        this.projectList.splice(projectIndex, 1);
    }

    createTodo(project, title, description, dueDate, priority) {
        const newTodo = new Todo(title, description, dueDate, priority, project);
        project.todoList.push(newTodo);
        return newTodo;
    }

    editTodo(todo, title, description, dueDate, priority) {
        todo.title = title;
        todo.description = description;
        todo.dueDate = dueDate;
        todo.priority = priority;
    }
    
    removeTodo(todo) {
        const project = this.projectList.find(p => p.id === todo.projectId);
        const todoIndex = project.todoList.findIndex(item => item.id === todo.id);
        project.todoList.splice(todoIndex, 1);
    }
}
