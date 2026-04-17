const container = document.querySelector(".container");
const sidebar = document.querySelector(".sidebar");
const contentContainer = document.querySelector(".main-content");
const projectsContainer = document.querySelector(".project-list");

export function displayProjects(app) {
    const inboxItem = document.querySelector(".inbox-item");

    // clear existing display
    projectsContainer.innerHTML = "";

    // re-add inbox
    projectsContainer.appendChild(inboxItem);

    // navigate to inbox
    inboxItem.addEventListener("click", () => displayInboxTodos(app));
    
    // display all projects
    app.projectList.forEach(project => {
        const projectItem = document.createElement("div");
        projectItem.classList = "project-item";

        // display project name
        const projectTitle = document.createElement("h4");
        projectTitle.textContent = project.title;
        projectItem.appendChild(projectTitle);

        projectsContainer.appendChild(projectItem);

        // navigate to corresponding project
        projectItem.addEventListener("click", () => displayProjectTodos(project, app));
    });
};

export function displayInboxTodos(app) {
    // clear existing display
    contentContainer.innerHTML = ""; 

    const projectHeader = document.createElement("div");
    projectHeader.classList = "project-header";
    
    // display inbox name
    const inboxTitle = document.createElement("h2");
    inboxTitle.textContent = app.createInbox().title;
    projectHeader.appendChild(inboxTitle);

    contentContainer.appendChild(projectHeader);

    // display todo list
    const todoContainer = document.createElement("div");
    todoContainer.classList = "todo-list";
    const list = document.createElement("ul");

    // display todos from all projects
    app.projectList.forEach(project => displayTodos(project, app, todoContainer));
    
    contentContainer.appendChild(todoContainer);
}

function displayProjectTodos(project, app) {
    // clear existing display
    contentContainer.innerHTML = ""; 

    const projectHeader = document.createElement("div");
    projectHeader.classList = "project-header";

    // display project name
    const projectTitle = document.createElement("h2");
    projectTitle.textContent = project.title;
    projectHeader.appendChild(projectTitle);

    // delete project button
    const deleteProjectButton = document.createElement("button");
    deleteProjectButton.classList = "delete-project-btn";
    deleteProjectButton.textContent = "Delete Project";
    projectHeader.appendChild(deleteProjectButton);

    contentContainer.appendChild(projectHeader);

    // display todo list
    const todoContainer = document.createElement("div");
    todoContainer.classList = "todo-list";
    const list = document.createElement("ul");

    displayTodos(project, app, todoContainer);

    contentContainer.appendChild(todoContainer);
}

function displayTodos(project, app, todoContainer) {
    project.todoList.forEach(todo => {
        const todoItem = document.createElement("li")
        todoItem.classList = "todo-item";

        const generalTodoContainer = document.createElement("div");
        generalTodoContainer.classList = "general-todo";

        // todo title
        const todoTitle = document.createElement("p");
        todoTitle.textContent = todo.title;
        generalTodoContainer.appendChild(todoTitle);
        
        // todo due date
        const todoDueDate = document.createElement("p");
        todoDueDate.textContent = `DUE: ${todo.dueDate}`;
        generalTodoContainer.appendChild(todoDueDate);

        // delete button
        const todoDelete = document.createElement("button");
        todoDelete.classList = "todo-delete";
        todoDelete.textContent = `×`;
        generalTodoContainer.appendChild(todoDelete);
        
        todoItem.appendChild(generalTodoContainer);
        todoContainer.appendChild(todoItem);
        
        // expand single todo details on click
        todoItem.addEventListener("click", () => expandTodo(todoItem, todo));

        todoDelete.addEventListener("click", (e) => {
            e.stopPropagation();
            app.removeTodo(todo);

            const currentHeader = contentContainer.querySelector("h2")?.textContent;
            if (currentHeader === app.createInbox().title) {
                displayInboxTodos(app);
            } else {
                displayProjectTodos(project, app);
            }
        });
    });
};

function expandTodo(todoItem, todo) {
    // close details if opened 
    const existingDetails = todoItem.querySelector(".todo-details");
    if (todoItem.querySelector(".todo-details")) {
        existingDetails.remove();
        return;
    }

    const todoDetails = document.createElement("div");
    todoDetails.classList = "todo-details";

    // description
    const todoDescription = document.createElement("p");
    todoDescription.textContent = todo.description;

    todoDetails.appendChild(todoDescription);
    todoItem.appendChild(todoDetails);
};
