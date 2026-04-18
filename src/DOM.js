import plus from "./images/plus.svg";
import chevronDown from "./images/chevron-down.svg";

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
    const deleteProjectBtn = document.createElement("button");
    deleteProjectBtn.classList = "delete-project-btn";
    deleteProjectBtn.textContent = "Delete Project";
    projectHeader.appendChild(deleteProjectBtn);

    contentContainer.appendChild(projectHeader);

    deleteProjectBtn.addEventListener("click", () => {
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
        
        const todoTitleContainer = document.createElement("div");
        todoTitleContainer.classList = "todo-title-container";
        
        // todo title
        const todoTitle = document.createElement("p");
        todoTitle.textContent = todo.title;
        todoTitleContainer.appendChild(todoTitle);

        // chevron icon
        const chevronDownIcon = document.createElement("img");
        chevronDownIcon.src = chevronDown;
        chevronDownIcon.classList = "todo-chevron";
        todoTitleContainer.appendChild(chevronDownIcon);
        generalTodoContainer.appendChild(todoTitleContainer);

        const priorityDueDateContainer = document.createElement("div");
        priorityDueDateContainer.classList = "priority-duedate-container";

        // priority
        const todoPriority = document.createElement("p");
        todoPriority.textContent = todo.priority;
        todoPriority.classList = "todo-priority";
        priorityDueDateContainer.appendChild(todoPriority);

        // set color based on priority
        if (todo.priority == "low") {
            todoPriority.style.backgroundColor = "#9ff595";
            todoPriority.style.borderColor = "mediumseagreen";
        } else if (todo.priority == "medium") {
            todoPriority.style.backgroundColor = "#f5eb95";
            todoPriority.style.borderColor = "darkgoldenrod";
        } else if (todo.priority == "high") {
            todoPriority.style.backgroundColor = "#ff9999";
            todoPriority.style.borderColor = "darkred";
        } else {
            priorityDueDateContainer.removeChild(todoPriority);
        }
        
        // todo due date
        const todoDueDate = document.createElement("p");
        todoDueDate.textContent = todo.dueDate;
        priorityDueDateContainer.appendChild(todoDueDate);
        generalTodoContainer.appendChild(priorityDueDateContainer);

        todoItem.appendChild(generalTodoContainer);
        todoContainer.appendChild(todoItem);
        
        // expand single todo details on click
        chevronDownIcon.addEventListener("click", () => expandTodo(todoItem, todo, app));
    });
};

function expandTodo(todoItem, todo, app) {
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
    
    // edit button
    const editTodoBtn = document.createElement("button");
    editTodoBtn.classList = "edit-todo-btn";
    editTodoBtn.textContent = "Edit";

    editTodoBtn.setAttribute("command", "show-modal");
    editTodoBtn.setAttribute("commandfor", "edit-todo-dialog");

    todoDetails.appendChild(editTodoBtn);

    // edit todo dialog
    const editTodoDialog = document.createElement("dialog");
    editTodoDialog.id = "edit-todo-dialog";

    // close button
    const closeButton = document.createElement("button");
    closeButton.id = "close-btn";
    closeButton.textContent = "×";
    closeButton.setAttribute("command", "close");
    closeButton.setAttribute("commandfor", "edit-todo-dialog");
    editTodoDialog.appendChild(closeButton);

    // form
    const editForm = document.createElement("form");
    editForm.id = "edit-todo-form";
    
    // modal header
    const editHeader = document.createElement("h4");
    editHeader.textContent = "Edit Todo";
    editForm.appendChild(editHeader);

    const formContainer = document.createElement("div");
    formContainer.classList = "form-container";
    
    // title, description, duedate, priority
    const todoTitleInput = document.createElement("input");
    todoTitleInput.required = true;
    todoTitleInput.placeholder = "Title";
    todoTitleInput.defaultValue = todo.title;
    formContainer.appendChild(todoTitleInput);

    const todoDescriptionInput = document.createElement("textarea");
    todoDescriptionInput.placeholder = "Description";
    todoDescriptionInput.defaultValue = todo.description;
    formContainer.appendChild(todoDescriptionInput);

    const dueDateContainer = document.createElement("div");
    dueDateContainer.classList = "duedate-container";

    const todoDueDateLabel = document.createElement("label");
    todoDueDateLabel.textContent = "Due Date";
    dueDateContainer.appendChild(todoDueDateLabel);

    const todoDueDateInput = document.createElement("input");
    todoDueDateInput.type = "date";
    todoDueDateInput.value = todo.dueDate || "";
    dueDateContainer.appendChild(todoDueDateInput);
    formContainer.appendChild(dueDateContainer);
    
    const priorityContainer = document.createElement("div");

    const priorityLabel = document.createElement("label");
    priorityLabel.textContent = "Priority";
    priorityContainer.appendChild(priorityLabel);
    priorityContainer.classList = "priority-container";

    const priorityRadioContainer = document.createElement("div");
    priorityRadioContainer.classList = "priority-radio-container";

    const todoNoPriorityContainer = document.createElement("div");
    todoNoPriorityContainer.classList = "priority-radio-item";
    const todoNoPriorityInput = document.createElement("input");
    todoNoPriorityInput.type = "radio";
    todoNoPriorityInput.id = "no-priority";
    todoNoPriorityInput.name = "priority";
    todoNoPriorityInput.value = "";
    todoNoPriorityInput.checked = !todo.priority;
    todoNoPriorityContainer.appendChild(todoNoPriorityInput);
    const todoNoPriorityLabel = document.createElement("label");
    todoNoPriorityLabel.textContent = "None";
    todoNoPriorityContainer.appendChild(todoNoPriorityLabel);
    priorityRadioContainer.appendChild(todoNoPriorityContainer);

    const todoLowPriorityContainer = document.createElement("div");
    todoLowPriorityContainer.classList = "priority-radio-item";
    const todoLowPriorityInput = document.createElement("input");
    todoLowPriorityInput.type = "radio";
    todoLowPriorityInput.id = "low";
    todoLowPriorityInput.name = "priority";
    todoLowPriorityInput.value = "low";
    todoLowPriorityInput.checked = todo.priority === "low";
    todoLowPriorityContainer.appendChild(todoLowPriorityInput);
    const todoLowPriorityLabel = document.createElement("label");
    todoLowPriorityLabel.textContent = "Low";
    todoLowPriorityContainer.appendChild(todoLowPriorityLabel);
    priorityRadioContainer.appendChild(todoLowPriorityContainer);

    const todoMediumPriorityContainer = document.createElement("div");
    todoMediumPriorityContainer.classList = "priority-radio-item";
    const todoMediumPriorityInput = document.createElement("input");
    todoMediumPriorityInput.type = "radio";
    todoMediumPriorityInput.id = "medium";
    todoMediumPriorityInput.name = "priority";
    todoMediumPriorityInput.value = "medium";
    todoMediumPriorityInput.checked = todo.priority === "medium";
    todoMediumPriorityContainer.appendChild(todoMediumPriorityInput);
    const todoMediumPriorityLabel = document.createElement("label");
    todoMediumPriorityLabel.textContent = "Medium";
    todoMediumPriorityContainer.appendChild(todoMediumPriorityLabel);
    priorityRadioContainer.appendChild(todoMediumPriorityContainer);

    const todoHighPriorityContainer = document.createElement("div");
    todoHighPriorityContainer.classList = "priority-radio-item";
    const todoHighPriorityInput = document.createElement("input");
    todoHighPriorityInput.type = "radio";
    todoHighPriorityInput.id = "high";
    todoHighPriorityInput.name = "priority";
    todoHighPriorityInput.value = "high";
    todoHighPriorityInput.checked = todo.priority === "high";
    todoHighPriorityContainer.appendChild(todoHighPriorityInput);
    const todoHighPriorityLabel = document.createElement("label");
    todoHighPriorityLabel.textContent = "High";
    todoHighPriorityContainer.appendChild(todoHighPriorityLabel);
    priorityRadioContainer.appendChild(todoHighPriorityContainer);

    priorityContainer.appendChild(priorityRadioContainer);
    formContainer.appendChild(priorityContainer);
    
    editForm.appendChild(formContainer);
    editTodoDialog.appendChild(editForm);

    // modal buttons
    const buttonContainer = document.createElement("div");
    buttonContainer.classList = "button-container";

    // delete button
    const deleteTodoBtn = document.createElement("button");
    deleteTodoBtn.classList = "delete-todo-btn";
    deleteTodoBtn.textContent = "Delete Todo"
    buttonContainer.appendChild(deleteTodoBtn);

    // handle todo delete 
    deleteTodoBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        app.removeTodo(todo);
        
        const currentHeader = contentContainer.querySelector("h2")?.textContent;
        if (currentHeader === app.createInbox().title) {
            displayInboxTodos(app);
        } else {
            displayProjectTodos(project, app);
        }
    });
    
    // submit button
    const submitTodoBtn = document.createElement("button");
    submitTodoBtn.type = "submit";
    submitTodoBtn.classList = "submit-todo-btn";
    submitTodoBtn.textContent = "Save Changes"
    buttonContainer.appendChild(submitTodoBtn);
    
    editForm.appendChild(buttonContainer);
    todoDetails.appendChild(editTodoDialog);

    // handle submit
    editForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // get input values
        const title = todoTitleInput.value.trim();
        const description = todoDescriptionInput.value.trim();
        const dueDate = todoDueDateInput.value;
        const selectedPriority = editTodoDialog.querySelector('input[name="priority"]:checked')?.value;

        // change values
        app.editTodo(todo, title, description, dueDate, selectedPriority);

        editTodoDialog.close();

        const currentHeader = contentContainer.querySelector("h2")?.textContent;

        if (currentHeader === app.createInbox().title) {
            displayInboxTodos(app);
        } else {
            displayProjectTodos(todo.project, app);
        }
    });

    // reset form
    closeModal(editTodoDialog, editForm);
    
    
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
    const newTodo = document.createElement("input");
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

export function handleProjectForm(app) {
    // create project modal
    const createProjectDialog = document.querySelector("#create-project-dialog");
    
    // handle submit
    const createProjectForm = document.querySelector("#create-project-form");
    createProjectForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const createProjectTitleInput = document.querySelector("#create-project-title");
        const projectTitle = createProjectTitleInput.value.trim();

        // prevent empty todo submits
        if (!projectTitle) return;

        // create project
        const project = app.createProject(projectTitle);
        
        // add todos
        const createProjectTodoInput1 = document.querySelector("#create-project-todo1");
        const projectTodo1 = createProjectTodoInput1.value.trim();
        if (projectTodo1) {
            app.createTodo(project, projectTodo1, "", "", "");
        }

        const createProjectTodoInput2 = document.querySelector("#create-project-todo2");
        const projectTodo2 = createProjectTodoInput2.value.trim();
        if (projectTodo2) {
            app.createTodo(project, projectTodo2, "", "", "");
        }
        
        const createProjectTodoInput3 = document.querySelector("#create-project-todo3");
        const projectTodo3 = createProjectTodoInput3.value.trim();
        if (projectTodo3) {
            app.createTodo(project, projectTodo3, "", "", "");
        }

        const createProjectTodoInput4 = document.querySelector("#create-project-todo4");
        const projectTodo4 = createProjectTodoInput4.value.trim();
        if (projectTodo4) {
            app.createTodo(project, projectTodo4, "", "", "");
        }

        // reset form
        createProjectDialog.close();

        // re-render list of projects
        displayProjects(app);

        // re-render inbox todos
        displayInboxTodos(app);

        closeModal(createProjectDialog, createProjectForm)
    });
};

function closeModal(dialog, form) {
    dialog.addEventListener("close", () => {
        form.reset(); // reset form
    });
}
