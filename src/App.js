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
    
    getProjectById(projectId) {
        return this.projectList.find(p => p.id === projectId);
    }
    
    createProject(title) {
        const newProject = new Project(title);
        this.projectList.push(newProject);
        this.save();
        return newProject;
    }

    removeProject(project) {
        const projectIndex = this.projectList.findIndex(item => item.id === project.id);
        this.projectList.splice(projectIndex, 1);
        this.save();
    }

    createTodo(project, title, description, dueDate, priority) {
        const newTodo = new Todo(title, description, dueDate, priority, project);
        project.todoList.push(newTodo);
        this.save();
        return newTodo;
    }

    editTodo(todo, title, description, dueDate, priority) {
        todo.title = title;
        todo.description = description;
        todo.dueDate = dueDate;
        todo.priority = priority;
        this.save();
    }
    
    removeTodo(todo) {
        const project = this.projectList.find(p => p.id === todo.projectId);
        const todoIndex = project.todoList.findIndex(item => item.id === todo.id);
        project.todoList.splice(todoIndex, 1);
        this.save();
    }

    // function saves projects (and todos) to localStorage every time a new project (or todo) is created
    save() {
        localStorage.setItem("app", JSON.stringify(this));
    }

    // function looks for saved data in localStorage when the app is loaded
    static load() {
        const data = JSON.parse(localStorage.getItem("app"));

        // create a new app if no data found
        if (!data) return new App();

        // load stored data
        const app = new App();

        // go through project list
        data.projectList.forEach(p => {
            // create project object
            const project = new Project(p.title);

            // set project id
            project.id = p.id;

            // go through todos for each project   
            p.todoList.forEach(t => {
                const todo = new Todo(t.title, t.description, t.dueDate, t.priority, null);
                
                // set todo id
                todo.id = t.id;

                // set todo project id
                todo.projectId = t.projectId;

                // load project todo list
                project.todoList.push(todo);
            });

            // load project list
            app.projectList.push(project);
        });

        return app;
    }
}
