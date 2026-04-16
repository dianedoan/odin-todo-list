const container = document.querySelector(".container");
const sidebar = document.querySelector(".sidebar");
const contentContainer = document.querySelector(".main-content");

export function displayProjects(app) {
    const projectsContainer = document.createElement("div");
    projectsContainer.classList = "project-list";
    
    // clear existing display
    projectsContainer.innerHTML = ""; 

    const inboxItem = document.createElement("div");
    inboxItem.classList = "project-item";

    // display project name
    const inboxTitle = document.createElement("h4");
    inboxTitle.textContent = app.createInbox().title;
    inboxItem.appendChild(inboxTitle);

    projectsContainer.appendChild(inboxItem);

    // navigate to corresponding project
    inboxItem.addEventListener("click", () => {
        displayInboxTodos(app);
    });

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
        projectItem.addEventListener("click", () => {
            displayProjectTodos(project);
        });
    });

    sidebar.appendChild(projectsContainer);
};

export function displayInboxTodos(app) {
    // clear existing display
    contentContainer.innerHTML = ""; 

    // display project name
    const inboxTitle = document.createElement("h2");
    inboxTitle.textContent = app.createInbox().title;
    contentContainer.appendChild(inboxTitle);

    // display todo list
    const todoContainer = document.createElement("div");
    todoContainer.classList = "todo-list";
    const list = document.createElement("ul");

    app.todoList.forEach(todo => {
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
        
        todoDelete.addEventListener("click", (e) => {
            e.stopPropagation();

            // remove todo from todo list
            app.removeTodo(todo);

            // re-display todo list
            displayInboxTodos(app);
        });

        todoItem.appendChild(generalTodoContainer);     

        // expand single todo details on click
        todoItem.addEventListener("click", () => {
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
        });

        todoContainer.appendChild(todoItem);
    });

    contentContainer.appendChild(todoContainer);
}

export function displayProjectTodos(project, app) {
    contentContainer.innerHTML = ""; // clear existing display

    // display project name
    const projectTitle = document.createElement("h2");
    projectTitle.textContent = project.title;
    contentContainer.appendChild(projectTitle);

    // display todo list
    const todoContainer = document.createElement("div");
    todoContainer.classList = "todo-list";
    const list = document.createElement("ul");

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
        
        todoDelete.addEventListener("click", (e) => {
            e.stopPropagation();

            // remove todo from todo list
            app.removeTodo(todo);
            console.log(app.todoList);
            console.log(project.todoList);

            // re-display todo list
            displayProjectTodos(project);
        });

        todoItem.appendChild(generalTodoContainer);     

        // expand single todo details on click
        todoItem.addEventListener("click", () => {
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
        });

        todoContainer.appendChild(todoItem);
    });

    contentContainer.appendChild(todoContainer);
}
