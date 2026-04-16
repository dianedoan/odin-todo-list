const container = document.querySelector(".container");
const sidebar = document.querySelector(".sidebar");

export function displayProjects(inboxProject, projectList) {
    const projectsContainer = document.createElement("div");
    projectsContainer.classList = "project-list";

    // display inbox
    const inboxItem = document.createElement("div");
    inboxItem.classList = "project-item";

    // display project name
    const inboxTitle = document.createElement("h4");
    inboxTitle.textContent = inboxProject.title;
    inboxItem.appendChild(inboxTitle);

    projectsContainer.appendChild(inboxItem);

    // display all projects
    projectList.forEach(project => {
        const projectItem = document.createElement("div");
        projectItem.classList = "project-item";

        // display project name
        const projectTitle = document.createElement("h4");
        projectTitle.textContent = project.title;
        projectItem.appendChild(projectTitle);

        projectsContainer.appendChild(projectItem);
    });

    sidebar.appendChild(projectsContainer);
};

export function displayProjectTodos(project) {
    const contentContainer = document.querySelector(".main-content");

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

        // todo title
        const todoTitle = document.createElement("p");
        todoTitle.textContent = todo.title;
        todoItem.appendChild(todoTitle);

        todoContainer.appendChild(todoItem);
    });

    contentContainer.appendChild(todoContainer);
}