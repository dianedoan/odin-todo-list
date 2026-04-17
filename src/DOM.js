import plus from "./images/plus.svg";

const container = document.querySelector(".container");
const sidebar = document.querySelector(".sidebar");
const contentContainer = document.querySelector(".main-content");
const projectsContainer = document.querySelector(".project-list");

export function displayProjects(app) {
    const inboxItem = document.querySelector(".inbox-item");

    // create project modal
    const createProjectModal = document.querySelector("#create-project-dialog");

    // close modal 
    createProjectModal.addEventListener("close", () => {
        // reset form
    });

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

    deleteProjectButton.addEventListener("click", () => {
        // delete project
        app.removeProject(project);

        // re-render sidebar project list
        displayProjects(app);

        // display default page
        displayInboxTodos(app);
    });

    // display todo list
    const todoContainer = document.createElement("div");
    todoContainer.classList = "todo-list";

    // new todo button
    addTodo(todoContainer, project, app);

    displayTodos(project, app, todoContainer);

    contentContainer.appendChild(todoContainer);
}

function displayTodos(project, app, todoContainer) {
    project.todoList.forEach(todo => {
        const todoItem = document.createElement("div")
        todoItem.classList = "todo-item";

        const generalTodoContainer = document.createElement("div");
        generalTodoContainer.classList = "general-todo";

        // todo title
        const todoTitle = document.createElement("p");
        todoTitle.textContent = todo.title;
        generalTodoContainer.appendChild(todoTitle);
        
        // todo due date
        const todoDueDate = document.createElement("p");
        todoDueDate.textContent = todo.dueDate;
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

function addTodo(todoContainer, project, app) {
    const addTodoForm = document.createElement("form");
    addTodoForm.classList = "add-todo";
    
    // icon
    const plusIcon = document.createElement("img");
    plusIcon.src = plus;
    plusIcon.classList = "todo-plus";
    plusIcon.type = "submit";
    addTodoForm.appendChild(plusIcon);
    
    // input
    const newTodo = document.createElement("input")
    newTodo.type = "text";
    newTodo.placeholder = "Add todo...";
    addTodoForm.appendChild(newTodo);

    // handle submit
    addTodoForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // remove any whitespaces
        const todoInput = newTodo.value.trim();

        // prevent empty todo submits
        if (!todoInput) return;

        // create todo
        app.createTodo(project, todoInput, "", "", "");

        // clear input
        newTodo.value = "";

        // re-render current project
        displayProjectTodos(project, app);
    });

    // plus icon submit button
    plusIcon.addEventListener("click", () => {
        addTodoForm.requestSubmit();
    });

    todoContainer.appendChild(addTodoForm);
};
