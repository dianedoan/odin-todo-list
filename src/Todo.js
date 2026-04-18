export default class Todo {
    constructor(title, description, dueDate, priority, project) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.projectId = project ? project.id : null;
		this.id = crypto.randomUUID();
    }   
}
