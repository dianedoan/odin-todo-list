const container = document.querySelector(".container");

export function displayProjects(projectList) {
    const projectsContainer = document.createElement("div");
    projectsContainer.classList = "project-list";

    // display all projects
    projectList.forEach(project => {
        const projectItem = document.createElement("div");
        projectItem.classList = "project-item";

        // display project name
        const projectTitle = document.createElement("h2");
        projectTitle.textContent = project.title;
        projectItem.appendChild(projectTitle);

        // display todo list
        const todoContainer = document.createElement("div");
        todoContainer.classList = "todo-list";
        const list = document.createElement("ul");

        project.todoList.forEach(todo => {
            const todoItem = document.createElement("li")

            // todo title
            const todoTitle = document.createElement("p");
            todoTitle.textContent = todo.title;
            todoItem.appendChild(todoTitle);

            todoContainer.appendChild(todoItem);
        });

        projectItem.appendChild(todoContainer);
        projectsContainer.appendChild(projectItem);
    });

    container.appendChild(projectsContainer);
};
